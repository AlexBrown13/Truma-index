from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from services.gemini_detection_service import ask_gemini
import os

# MongoDB setup
mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
mongo_client = MongoClient(mongo_uri)
db = mongo_client["trauma_chatbot"]
identify_collection = db["identify_persona"]


identify_per = Blueprint('identify', __name__)

conversations = {}

@identify_per.route("/identify", methods=["POST"]) # @identify_per.post
def identify():
    data = request.json
    user_message = data.get("message")
    conversation_id = data.get("conversationId")

    if not conversation_id:
        # New conversation
        conversation_id = os.urandom(6).hex()
        conversations[conversation_id] = []
        identify_collection.insert_one({
            "conversation_id": conversation_id,
            "messages": [],
            "persona": None,
            "persona_reason": None
        })
    
    history = conversations.get(conversation_id, [])

    # Adding messages from the user
    history.append({
        "role": "user",
        "content": user_message
    })

    # Call to Gemini api with all messages
    ai_response = ask_gemini(history)
    print(f"\n\nai_response = {ai_response}\n\n")

    # Adding message to history
    history.append({
        "role": "model",
        "content": ai_response["message"]
    })

    conversations[conversation_id] = history

    # Save in database
    # update_doc = {
    #     "$push": {"messages": {"role": "user", "content": user_message}}
    # }

    # update_doc["$push"]["messages"] = {
    #     "$each": [{"role": "model", "content": ai_response["message"]}]
    # }

    update_doc = {
        "$push": {
            "messages": {
                "$each": [
                    {"role": "user", "content": user_message},
                    {"role": "model", "content": ai_response["message"]}]
            }
        }
    }

    # Check persona existence
    if ai_response.get("persona"):
        update_doc["$set"] = {
            "persona": ai_response["persona"],
            "persona_reason": ai_response["reason"]
        }

    identify_collection.update_one(
        {"conversation_id": conversation_id},
        update_doc
    )

    return jsonify({
        "conversationId": conversation_id,
        "message": ai_response["message"],
        "question_number": ai_response.get("question_number"),
        "persona": ai_response.get("persona"),
        "reason": ai_response.get("reason")
    })