import os
from google import generativeai as genai
from dotenv import load_dotenv
#from models.conversation import get_history

load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel(
    model_name="gemini-3-flash-preview", # gemini-2.5-flash-lite
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

# todo use conversation history
def ask_gemini(history, question, user_message):
    print(f'history = {history}\n\n')
    print(f'question = {question}\n\n')
    print(f'user_message = {user_message}\n\n')
    messages = [
        {"role": "system", "parts": [question]},
        {"role": "user", "parts": [user_message]}
    ]

    response = model.generate_content(messages)
    return response.text