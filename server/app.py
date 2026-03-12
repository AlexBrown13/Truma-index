import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from data.questions import QUESTIONS
from models.conversation import create_conversation, save_message, get_history, get_conversation, update_index
from services.gemini_service import ask_gemini

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.post("/api/chat")
def chat():
    data = request.json
    user_id = data["userId"]
    user_answer = data['text'] # message
    conversation_id = data['conversationId'] # conversation_id

    # new conversation
    if not conversation_id:
        conversation_id = os.urandom(8).hex()
        create_conversation(conversation_id, user_id)
        first_question = QUESTIONS[0]
        
        save_message(conversation_id, "question", first_question, False)
    
        return jsonify({
            "conversationId": conversation_id,
            "message": first_question,
            "questionIndex": 0,
            "done": False
        })


    # get conversation
    conversation = get_conversation(user_id, conversation_id)
 
    if not conversation:
        return jsonify({"error": "Conversation not found"}), 404

    index = conversation["questionIndex"]

    # save user answer
    save_message(conversation_id, "user", user_answer, False)
    history = get_history(conversation_id)
  

    # check if finished all questions
    if index+1 == len(QUESTIONS):
        summary_prompt = "השיחה הסתיימה, תן סיכום קצר ואמפתי על השיחה"
        summary = ask_gemini(history, summary_prompt, user_answer)
        save_message(conversation_id, "summary", summary, True)
        update_index(conversation_id, index)
        
        return jsonify({
        "conversationId": conversation_id,
        "message": summary,
        "questionIndex": index,
        "done": True
    })


    # next question
    next_question = QUESTIONS[index+1]
    
    ai_response = ask_gemini(history, next_question, user_answer)
    save_message(conversation_id, "ai", ai_response, False)
    save_message(conversation_id, "question", next_question, False)
    update_index(conversation_id, index+1)


    return jsonify({
        "conversationId": conversation_id,
        "message": f"{ai_response}\n\n{next_question}",
        "questionIndex": index+1,
        "done": False
    })

if __name__ == "__main__":
    app.run(port=8000, debug=True)