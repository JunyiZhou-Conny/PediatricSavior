import os
from flask import Flask, Response, request, jsonify, send_from_directory
from pymongo import MongoClient
from flask_cors import CORS 
from flask_cors import cross_origin
from AssistantAPICall.main import *  # Make sure this import includes all needed functions
from dotenv import load_dotenv
from datetime import datetime, timezone
from bson import json_util
import base64
load_dotenv()


app = Flask(__name__) 
CORS(app)

# Set up MongoDB connection 
client = MongoClient(os.environ.get('MONGO_DB_CONNECTION_STRING', 'your_default_connection_string'))
db = client[os.environ.get('DB_NAME', 'Chatbot_Data')]


simulationFile = loadFile("backend/AssistantAPICall/case_1.json")

temp_message = ""

# Assuming global variables for managing conversation state
conversation_thread = None
conversation_run = None

@app.route('/api/instruction-text', methods=['GET'])
def get_instruction_text():
    directory_path = './AssistantAPICall/'
    filename = 'instruction_text.txt'
    return send_from_directory(directory_path, filename)

@app.route('/api/save-instruction-text', methods=['POST'])
def save_instruction_text():
    data = request.get_json()
    text = data['text']
    with open('backend/AssistantAPICall/instruction_text.txt', 'w') as file:
        file.write(text)
    return {'status': 'File saved successfully'}

def store_conversation(user_input, bot_response, participantID):
    """Store the conversation in the MongoDB collection."""
    conversation_data = {
        'user_input': user_input,
        'bot_response': bot_response,
        'participantID': participantID, #Store participantID with each conversation
        'timestamp': datetime.now(timezone.utc) # Store the current timestamp
    }
    try:
        # Insert the conversation data into the 'conversations' collection
        db.conversations.insert_one(conversation_data)
    except Exception as e:
        print(f"An error occurred while inserting to MongoDB: {e}")


@app.route('/init-conversation', methods=['POST'])
@cross_origin()
def init_conversation():

    print("Received init-conversation request with data:", request.json)

    global conversation_thread, conversation_run, simulationFile
    if conversation_thread is None or conversation_run is None:
        # Only initialize if not already done
        data = request.json
        init_input = data.get('init_input', '')  # Optional initial input to start the conversation
        conversation_thread, conversation_run, simulationFile = initialize(init_input, simulationFile)
        print("Conversation intialized")
        return jsonify({"message": "Conversation initialized"}), 200
    else:
      return jsonify({"error": "Invalid request", "details": str(request.json)}), 400

@app.route('/submit-data', methods=['POST'])
@cross_origin()
def submit_data():
    data = request.json
    result = db.cases.insert_one(data)
    return jsonify({"message": "Data received", "id": str(result.inserted_id)}), 200

@app.route('/submit-user-input', methods=['POST'])
@cross_origin()
def submit_user_input():
    global conversation_thread, conversation_run, simulationFile, temp_message
    if conversation_thread is None or conversation_run is None:
        return jsonify({"error": "Conversation not initialized"}), 400

    data = request.json
    user_input = data.get('text')
    participantID = data.get('participantID')  # Retrieve participantID from request data

    if not user_input:
        return jsonify({"error": "No input provided"}), 400
    if not participantID:
        return jsonify({"error": "Participant ID is required"}), 400
    
    try:
    # Submit the new user input to the ongoing conversation
        conversation_run = submit_message(conversation_thread, user_input, simulationFile)
    
    # Wait for the run to complete and fetch the last message
        wait_on_run(conversation_run, conversation_thread)
        last_message = getChatHistory(conversation_thread)[-1]

    except Exception as e:
        return jsonify({"error": f"Failed to process message: {str(e)}"}), 500

    # Store the conversation after each exchange, including participantID
    store_conversation(user_input, last_message, participantID)

    temp_message = last_message
    
    return jsonify({"response": last_message})

@app.route('/get-message', methods=['GET'])
@cross_origin()
def get_message():
    global temp_message
    if conversation_thread is not None:
        return jsonify({"message": temp_message})
    else:
        return jsonify({"error": "No conversation started"})

@app.route('/chat-history/<participant_id>', methods=['GET'])
def get_chat_history(participant_id):
    try:
        # Construct the aggregation pipeline
        pipeline = [
            {'$match': {'participantID': participant_id}},
            {'$sort': {'timestamp': -1}},  # Sorting in descending order
            {
                '$group': {
                    '_id': {
                        'day': {'$dayOfMonth': '$timestamp'},
                        'month': {'$month': '$timestamp'},
                        'year': {'$year': '$timestamp'}
                    },
                    'conversations': {'$push': '$$ROOT'}
                }
            },
            {'$sort': {'_id': -1}}  # Ensure groups are sorted by most recent first
        ]
        # Execute the aggregation
        result = db.conversations.aggregate(pipeline)

        # Convert the aggregation result into a list
        chat_history = list(result)

        # Serialize the result to JSON using json_util.dumps
        return Response(json_util.dumps(chat_history), mimetype='application/json')
    except Exception as e:
        app.logger.error(f"Unexpected error: {e}")
        # Serialize the error using json_util.dumps
        return Response(json_util.dumps({"error": str(e)}), mimetype='application/json', status=500)


@app.route('/get-image/<id>')
def get_image(id):
    collection = db['image']
    try:
        # Assuming 'id' is stored as a string; convert to ObjectId if stored as BSON
        # For BSON ObjectId, use: from bson import ObjectId; query = {"_id": ObjectId(id)}
        document = collection.find_one({"id": int(id)})
        if document:
            # Assuming the image is stored in the 'image_data' field as binary
            image_data = document['image']
            # Convert binary to Base64 for easy transmission
            encoded_image = base64.b64encode(image_data).decode('utf-8')
            return jsonify({"image": f"data:image/jpeg;base64,{encoded_image}"})
        else:
            return jsonify({"error": "Image not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500






if __name__ == '__main__':
    app.run(port=4999)