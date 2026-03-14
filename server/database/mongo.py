import os
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()

client = MongoClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]

messages_collection = db["conversations_test"]
detection_person_collection = db["detection_person"]