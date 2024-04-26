from pymongo import MongoClient
import gridfs
import sys
import os

def upload_file_to_gridfs():
    client = MongoClient('mongodb+srv://simonliu:MclPLjTi3HpYSlrb@cluster0.yrzkofs.mongodb.net/')
    db = client[os.environ.get('DB_NAME', 'Chatbot_Data')]
    print(db)
    collection = db['instruction']
    fs = gridfs.GridFS(db)
    file_path = 'backend/AssistantAPICall/instruction_text.txt'

    with open(file_path, 'rb') as file_to_upload:
        file_id = fs.put(file_to_upload, filename='instruction.txt')
        print(f"File uploaded successfully. File ID: {file_id}")

upload_file_to_gridfs()


