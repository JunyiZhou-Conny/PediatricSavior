import os
from flask import Flask, Response, request, jsonify, send_from_directory
from pymongo import MongoClient
from flask_cors import CORS
from flask_cors import cross_origin
# from AssistantAPICall.main import *  # Make sure this import includes all needed functions
from CompletionsAPI.main import *
from dotenv import load_dotenv
from datetime import datetime, timezone
from bson import json_util
import base64
from werkzeug.utils import secure_filename
from bson import ObjectId
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Backend API is running. Use the appropriate endpoints for API functionality.'

# Set up MongoDB connection
client = MongoClient("mongodb+srv://simonliu:MclPLjTi3HpYSlrb@cluster0.yrzkofs.mongodb.net/")
db = client[os.environ.get('DB_NAME', 'Chatbot_Data')]

temp_message = ""

# Assuming global variables for managing conversation state
bmv_assistant = None
case_description = None
global_participant_id = None
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INSTRUCTION_FILE = os.path.join(BASE_DIR, "CompletionsAPI", "instruction_text.txt")
with open(INSTRUCTION_FILE, "r", encoding="utf-8", errors='replace') as file:
    instruction_text = file.read()


@app.route('/api/instruction-text', methods=['GET'])
def get_instruction_text():
    return send_from_directory(os.path.dirname(INSTRUCTION_FILE), os.path.basename(INSTRUCTION_FILE))


@app.route('/api/save-instruction-text', methods=['POST'])
def save_instruction_text():
    data = request.get_json()
    text = data['text']
    with open(INSTRUCTION_FILE, 'w') as file:
        file.write(text)
    return {'status': 'File saved successfully'}


@app.route('/reset-conversation', methods=['POST'])
def reset_conversation():
    print('resetting conversation')
    global bmv_assistant, case_description
    bmv_assistant = reset(case_description)
    return '', 204  # No Content response


@app.route('/submit-chat-history', methods=['POST'])
@cross_origin()
def store_conversation():
    global global_participant_id
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    conversation_data = {
        'participantID': global_participant_id,
        'timestamp': datetime.now(timezone.utc),
        'history': data
    }
    try:
        result = db.conversations.update_one(
            {'participantID': global_participant_id},
            {'$set': conversation_data},
            upsert=True
        )
        if result.upserted_id:
            return jsonify({'status': 'History uploaded successfully'}), 201
        else:
            return jsonify({'status': 'History updated successfully'}), 200
    except Exception as e:
        print(f"An error occurred while inserting to MongoDB: {e}")
        return jsonify({'error': str(e)}), 500


def get_conversation_history_from_db(participant_id):
    try:
        collection = db['conversations']
        # Query MongoDB for the conversation history
        history = list(collection.find({"participantID": participant_id}, {'_id': 0}))
        print(history)
        return history
    except Exception as e:
        print(f"An error occurred while fetching data: {e}")
        return []

@app.route('/get-last-cases', methods=['GET'])
def get_last_cases():
    try:
        pipeline = [
            {'$sort': {'timestamp': -1}},
            {'$group': {
                '_id': '$participantID',
                'lastConversation': {'$first': '$$ROOT'}
            }},
            {'$project': {
                '_id': 0,
                'participantID': '$lastConversation.participantID',
                'timestamp': '$lastConversation.timestamp'
            }},
            {'$sort': {'timestamp': -1}},
        ]
        
        last_cases = list(db.conversations.aggregate(pipeline))
        return jsonify(last_cases)
    except Exception as e:
        app.logger.error(f"Error fetching last cases: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/check-participant-id/<participant_id>', methods=['GET'])
def check_participant_id(participant_id):
    try:
        # Check if the participant ID exists in the database
        conversation_exists = db.conversations.find_one({"participantID": participant_id}) is not None
        return jsonify({"exists": conversation_exists}), 200
    except Exception as e:
        app.logger.error(f"Error checking participant ID: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/get-conversation-history/<participant_id>', methods=['GET'])
def get_conversation_history(participant_id):
    try:
        conversation = db.conversations.find_one(
            {"participantID": participant_id},
            {'_id': 0}
        )
        
        if not conversation:
            return jsonify({"error": "No conversation history found"}), 404
        
        # Ensure the history is a list of messages
        history = conversation.get('history', [])
        if isinstance(history, str):
            history = json.loads(history)
        elif isinstance(history, dict):
            history = history.get('history', [])
        
        formatted_conversation = {
            "timestamp": conversation.get('timestamp'),
            "history": history
        }
        
        return jsonify({"conversationHistory": [formatted_conversation]})
    except Exception as e:
        app.logger.error(f"Error fetching conversation history: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/set-participant-id', methods=['POST'])
def set_participant_id():
    global global_participant_id
    participant_id = request.json.get('participantID')
    if participant_id:
        global_participant_id = participant_id
        print(global_participant_id)
        return {'message': 'Participant ID set successfully'}, 200
    return {'error': 'No Participant ID provided'}, 400


@app.route('/init-conversation', methods=['POST'])
@cross_origin()
def init_conversation():
    print("Received init-conversation request with data:", request.json)
    global bmv_assistant, case_description, instruction_text
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    INSTRUCTION_FILE = os.path.join(BASE_DIR, "backend", "CompletionsAPI", "instruction_text.txt")
    print(INSTRUCTION_FILE)
    with open(INSTRUCTION_FILE, "r", encoding='utf-8', errors='replace') as file:
        instruction = file.read()
    case_description = next(db['case'].aggregate([{'$sample': {'size': 1}}]), None)
    # if bmv_assistant is None:
    bmv_assistant = initialize(case_description, instruction)
    print("Conversation initialized")
    return jsonify({"message": "Conversation initialized"}), 200
    #else:
    #    return jsonify({"error": "Invalid request", "details": str(request.json)}), 400


@app.route('/submit-data', methods=['POST'])
@cross_origin()
def submit_data():
    data = request.json
    result = db.cases.insert_one(data)
    return jsonify({"message": "Data received", "id": str(result.inserted_id)}), 200


@app.route('/submit-user-input', methods=['POST'])
@cross_origin()
def submit_user_input():
    global bmv_assistant, temp_message
    if bmv_assistant is None:
        return jsonify({"error": "Conversation not initialized"}), 400

    data = request.json
    user_input = data['text']
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    bmv_assistant.submit_message(user_input)
    return {'message': 'User message submitted successfully'}, 200

@app.route('/stream-chat', methods=['GET'])
@cross_origin()
def stream_chat():
    return Response(bmv_assistant.stream_response(), content_type='text/event-stream')


    last_message = bmv_assistant.get_response()
    temp_message = last_message
    #print(last_message)
    #print(bmv_assistant.chat_history)
    #print(bmv_assistant.chat_history_without_system_message)
    return jsonify({"response": last_message})


@app.route('/get-message', methods=['GET'])
@cross_origin()
def get_message():
    global temp_message
    if bmv_assistant is not None:
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
    
@app.route('/get_images', methods=['GET'])
def get_images():
    collection = db['image']
    try:
        documents = collection.find({})
        images = []
        for doc in documents:
            encoded_image = base64.b64encode(doc['image']).decode('utf-8')
            images.append({
                "id": doc['id'],
                "url": f"data:image/jpeg;base64,{encoded_image}"
            })
        return jsonify({"images": images}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/upload_image', methods=['POST'])
def upload_image():
    collection = db['image']
    
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Save the file to memory instead of disk, and store it in MongoDB as binary data
        filename = secure_filename(file.filename)
        file_data = file.read()

        # Create a document to store in MongoDB
        image_document = {
            "id": collection.count_documents({}) + 1,  # Simple auto-incrementing id
            "filename": filename,
            "image": file_data
        }

        # Insert the document into the MongoDB collection
        collection.insert_one(image_document)

        return jsonify({"id": image_document["id"], "filename": filename}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/delete_image/<int:id>', methods=['DELETE'])
def delete_image(id):
    collection = db['image']
    try:
        result = collection.delete_one({"id": id})
        if result.deleted_count == 1:
            return jsonify({"success": True, "message": "Image deleted successfully"}), 200
        else:
            return jsonify({"error": "Image not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_cases', methods=['GET'])
def get_cases():
    collection = db['case']
    try:
        cases = list(collection.find({}))
        for case in cases:
            case['_id'] = str(case['_id'])  # Convert BSON ObjectId to string
        return jsonify({"cases": cases}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_case/<id>', methods=['GET'])
def get_case(id):
    collection = db['case']
    try:
        case = collection.find_one({"_id": ObjectId(id)})
        if case:
            case['_id'] = str(case['_id'])  # Convert ObjectId to string
            
            # Convert phases dictionary to a list of key-value pairs
            phases_list = [{"key": k, "value": v} for k, v in case.items()]

            # Return the case as usual but include the list of phases
            case['phases'] = phases_list  # Attach the ordered list of phases
            return jsonify({"data": phases_list}), 200
        else:
            return jsonify({"error": "Case not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/update_case/<id>', methods=['PUT'])
def update_case(id):
    collection = db['case']
    try:
        data = request.json  # Assuming case data comes as JSON
        print(data)
        result = collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.modified_count == 1:
            return jsonify({"success": True, "message": "Case updated successfully"}), 200
        else:
            return jsonify({"error": "Case not found or no changes made"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete_case/<id>', methods=['DELETE'])
def delete_case(id):
    collection = db['case']
    try:
        result = collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return jsonify({"success": True, "message": "Case deleted successfully"}), 200
        else:
            return jsonify({"error": "Case not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/add_case', methods=['POST'])
def add_case():
    collection = db['case']
    try:
        data = request.json
        result = collection.insert_one(data)
        if result.inserted_id:
            return jsonify({"success": True, "message": "Case added successfully", "id": str(result.inserted_id)}), 201
        else:
            return jsonify({"error": "Failed to add case"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_entries', methods=['GET'])
def get_entries():
    knowledge_collection = db['knowledge']
    entries = list(knowledge_collection.find())
    for entry in entries:
        entry['_id'] = str(entry['_id'])  # Convert ObjectId to string for JSON serialization
    return jsonify({'entries': entries})

@app.route('/get-knowledge/<overview>', methods=['GET'])
def get_knowledge(overview):
    knowledge_collection = db['knowledge']
    entry = knowledge_collection.find_one({"overview": overview})
    detail = entry['detail']
    bmv_assistant.submit_knowledge(detail)
    print(detail)
    return jsonify({'detail': detail})

@app.route('/add_entry', methods=['POST'])
def add_entry():
    knowledge_collection = db['knowledge']
    data = request.json
    new_entry = {
        'overview': data['overview'],
        'detail': data['detail']
    }
    result = knowledge_collection.insert_one(new_entry)
    new_entry['_id'] = str(result.inserted_id)
    return jsonify({'entry': new_entry}), 201

@app.route('/update_entry/<entry_id>', methods=['PUT'])
def update_entry(entry_id):
    knowledge_collection = db['knowledge']
    data = request.json
    result = knowledge_collection.update_one(
        {'_id': ObjectId(entry_id)},
        {'$set': {
            'overview': data['overview'],
            'detail': data['detail']
        }}
    )
    if result.matched_count == 0:
        return jsonify({'error': 'Entry not found'}), 404
    updated_entry = knowledge_collection.find_one({'_id': ObjectId(entry_id)})
    updated_entry['_id'] = str(updated_entry['_id'])
    return jsonify({'entry': updated_entry}), 200

@app.route('/delete_entry/<entry_id>', methods=['DELETE'])
def delete_entry(entry_id):
    print(entry_id)
    knowledge_collection = db['knowledge']
    result = knowledge_collection.delete_one({'_id': ObjectId(entry_id)})
    if result.deleted_count == 1:
            return jsonify({"success": True, "message": "Entry deleted successfully"}), 200
    else:
        return jsonify({"error": "Entry not found"}), 404

if __name__ == '__main__':
    app.run(port=4999)