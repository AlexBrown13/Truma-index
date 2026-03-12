from database.mongo import messages_collection
from datetime import datetime


def create_conversation(conversation_id, user_id):
    messages_collection.insert_one({
        "conversationId": conversation_id,
        "userId": user_id,
        "questionIndex": 0,
        "done": False,
        "messages": [],
        "createdAt": datetime.utcnow()
    })


def save_message(conversation_id, role, text, done):
    messages_collection.update_one(
       {"conversationId": conversation_id},
       {
            "$push": {
                "messages": {
                    "role": role,
                    "text": text,
                    #"timestamp": datetime.utcnow()
                }
            }
       }
    )


def get_conversation(user_id, conv_id):
    return messages_collection.find_one({
        "conversationId": conv_id,
        "userId": user_id
    })


def update_index(conversation_id, index):
    messages_collection.update_one(
        {"conversationId": conversation_id},
        {"$set": {"questionIndex": index}}
    )


def get_history(conversation_id):
    conv = messages_collection.find_one({"conversationId": conversation_id})

    if not conv:
        return []

    return conv["messages"]