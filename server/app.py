import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
CORS(app)

# --- Gemini ---
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel(
    model_name="gemini-3-flash-preview",
    system_instruction="""
    אתה מנהל שיחה בעברית.
    המטרה: לשאול שאלות של שאלון PCL-5 אחת אחרי השנייה.
    ענה בצורה קצרה וידידותית.
    אין להשתמש במספרים כלל — רק טקסט.
    בכל תשובה:
    - שיקוף קצר
    - הצגת השאלה הבאה
    כאשר נגמרות השאלות תן סיכום קצר.
    """
)

# --- Questions ---
PCL5_QUESTIONS = [
    "זיכרונות חוזרים ונשנים, לא רצוניים, של החוויה הטראומטית",
    "חלומות טורדניים או חוזרים של החוויה הטראומטית",
    "הרגשה פתאומית כאילו החוויה הטראומטית מתרחשת שוב",
    "הרגשת מצוקה נפשית כאשר נזכרת בחוויה הטראומטית",
    "תגובות גופניות חזקות כאשר נזכרת בחוויה הטראומטית",
    "הימנעות ממחשבות או רגשות המזכירים את החוויה",
    "הימנעות מאנשים או מצבים המזכירים את החוויה",
    "קושי לזכור חלקים מהחוויה",
    "אמונות שליליות לגבי עצמך או העולם",
    "האשמה עצמית או אשמת אחרים לגבי האירוע",
    "רגשות שליליים חזקים",
    "אובדן עניין בפעילויות שנהנית מהן בעבר",
    "תחושת ריחוק מאנשים",
    "קושי לחוות רגשות חיוביים",
    "עצבנות או תוקפנות",
    "לקיחת סיכונים או התנהגויות מזיקות",
    "דריכות או ערנות מוגברת",
    "נטייה להיבהל בקלות",
    "קושי להתרכז",
    "קושי להירדם או להישאר ישן"
]

# --- MongoDB ---
mongo = MongoClient(os.environ["MONGO_URL"])
db = mongo["chatbot"]
conversations = db["conversations"]


@app.post("/api/chat")
def chat():
    data = request.json
    user_id = data["userId"]
    user_answer = data["text"]
    conv_id = data.get("conversationId")

    # --- First conversation ---
    if not conv_id:
        conv_id = os.urandom(8).hex()

        first_q = PCL5_QUESTIONS[0]
        bot_text = f"שלום. נתחיל בשאלון.\n\nשאלה ראשונה:\n{first_q}"

        conversations.insert_one({
            "conversationId": conv_id,
            "userId": user_id,
            "questionIndex": 0,
            "messages": [
                {"role": "user", "text": user_answer},
                {"role": "bot", "text": bot_text}
            ],
            "done": False
        })

        return jsonify({
            "conversationId": conv_id,
            "message": bot_text,
            "questionIndex": 0,
            "done": False
        })

    # --- Conversation ---
    conv = conversations.find_one({
        "conversationId": conv_id,
        "userId": user_id
    })

    if not conv:
        return jsonify({"error": "Conversation not found"}), 404

    idx = conv["questionIndex"]

    conversations.update_one(
        {"conversationId": conv_id},
        {"$push": {"messages": {"role": "user", "text": user_answer}}}
    )

    # Are there more questions
    if idx + 1 < len(PCL5_QUESTIONS):

        next_q = PCL5_QUESTIONS[idx + 1]

        prompt = f"""
        המשתמש כתב: "{user_answer}"

        כתוב תגובה קצרה הכוללת:
        - שיקוף קצר
        - השאלה הבאה: "{next_q}"
        """

        response = model.generate_content(prompt)
        bot_msg = response.text.strip()

        conversations.update_one(
            {"conversationId": conv_id},
            {
                "$set": {"questionIndex": idx + 1},
                "$push": {"messages": {"role": "bot", "text": bot_msg}}
            }
        )

        return jsonify({
            "conversationId": conv_id,
            "message": bot_msg,
            "questionIndex": idx + 1,
            "done": False
        })

    # --- Summery ---
    sum_prompt = f"""
    המשתמש כתב בתשובה האחרונה: "{user_answer}"
    סכם את השיחה בקצרה בעברית ללא מספרים.
    """

    response = model.generate_content(sum_prompt)
    bot_msg = response.text.strip()

    conversations.update_one(
        {"conversationId": conv_id},
        {
            "$set": {"done": True},
            "$push": {"messages": {"role": "bot", "text": bot_msg}}
        }
    )

    return jsonify({
        "conversationId": conv_id,
        "message": bot_msg,
        "questionIndex": idx,
        "done": True
    })


if __name__ == "__main__":
    app.run(port=8000, debug=True)