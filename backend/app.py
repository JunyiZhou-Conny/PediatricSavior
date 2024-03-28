from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS 
from AssistantAPICall.main import *  # Make sure this import includes all needed functions
from auth0_management import get_management_api_token, fetch_user_data

app = Flask(__name__) 
CORS(app)

# Set up MongoDB connection 
Mongoclient = os.environ.get('MONGODB_URI')
client = MongoClient(Mongoclient)  
db = client['gpt_prompt']

simulationFile = loadFile("backend/AssistantAPICall/case_1.json")

temp_message = ""

from dotenv import load_dotenv
import os

# Specify the path to your custom-named env file
dotenv_path = os.path.join(os.path.dirname(__file__), 'key.env')

# Load the environment variables from your file
load_dotenv(dotenv_path)

# Use environment variables for configuration
auth0_domain = os.environ.get('AUTH0_DOMAIN')
client_id = os.environ.get('AUTH0_CLIENT_ID')
client_secret = os.environ.get('AUTH0_CLIENT_SECRET')

@app.route('/get-user/<user_id>', methods=['GET'])
def get_user(user_id):
    # Obtain an access token for the Auth0 Management API
    access_token = get_management_api_token(AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET)
    
    # Fetch user data from the Auth0 Management API using the access token
    if access_token:
        user_data = fetch_user_data(AUTH0_DOMAIN, user_id, access_token)
        if user_data:
            return jsonify(user_data), 200
        else:
            return jsonify({"error": "Failed to fetch user data"}), 500
    else:
        return jsonify({"error": "Failed to obtain access token"}), 500

# Assuming global variables for managing conversation state
conversation_thread = None
conversation_run = None

@app.route('/init-conversation', methods=['POST'])
def init_conversation():
    global conversation_thread, conversation_run, simulationFile
    if conversation_thread is None or conversation_run is None:
        # Only initialize if not already done
        data = request.json
        init_input = data.get('init_input', '')  # Optional initial input to start the conversation
        conversation_thread, conversation_run, simulationFile = initialize(init_input, simulationFile)
        print("Conversation intialized")
        return jsonify({"message": "Conversation initialized"}), 200
    else:
        return jsonify({"error": "Conversation already initialized"}), 400

@app.route('/submit-data', methods=['POST'])
def submit_data():
    data = request.json
    result = db.phase_data.insert_one(data)
    return jsonify({"message": "Data received", "id": str(result.inserted_id)}), 200

@app.route('/submit-user-input', methods=['POST'])
def submit_user_input():
    global conversation_thread, conversation_run, simulationFile, temp_message
    if conversation_thread is None or conversation_run is None:
        return jsonify({"error": "Conversation not initialized"}), 400

    data = request.json
    user_input = data.get('text')
    if not user_input:
        return jsonify({"error": "No input provided"}), 400
    
    # Submit the new user input to the ongoing conversation
    conversation_run = submit_message(conversation_thread, user_input, simulationFile)
    
    # Wait for the run to complete and fetch the last message
    wait_on_run(conversation_run, conversation_thread)
    last_message = getChatHistory(conversation_thread)[-1]
    temp_message = last_message
    
    return jsonify({"response": last_message})

@app.route('/get-message', methods=['GET'])
def get_message():
    global temp_message
    if conversation_thread is not None:
        return jsonify({"message": temp_message})
    else:
        return jsonify({"error": "No conversation started"})

if __name__ == '__main__':
    app.run()