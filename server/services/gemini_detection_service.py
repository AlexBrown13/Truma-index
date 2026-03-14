import os, json
from google import genai

from dotenv import load_dotenv
load_dotenv()

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

SYSTEM_PROMPT = """
אתה עוזר דיגיטלי אמפתי שמטרתו להבין את סוג המשתמש שלומד על טראומה.

עליך לשאול את המשתמש 5 שאלות בלבד.

נושאי השאלות:

1. מה המשתמש רוצה להבין על טראומה
2. מה הביא אותו לכאן היום
3. איזה סוג מידע על טראומה מעניין אותו
4. עד כמה לעומק הוא רוצה ללמוד
5. איך הכי נוח לו ללמוד

כללים חשובים:

- שאל שאלה אחת בכל פעם
- לאחר תשובת המשתמש המשך לשאלה הבאה
- ניתן לשנות מעט את ניסוח השאלה לפי תשובת המשתמש אך שמור על הרעיון המרכזי
- שמור על טון רגוע ואמפתי
- אל תיתן אבחון רפואי

לאחר 5 תשובות עליך לזהות פרסונה אחת בלבד מתוך שתי האפשרויות:

חוקר  
או  
מתעניין בטראומה

עליך גם להסביר בקצרה למה בחרת בפרסונה זו על סמך התשובות של המשתמש.

החזר תמיד תשובה בפורמט JSON בלבד.

במהלך שלב השאלות החזר:

{
 "question_number": <מספר השאלה>,
 "message": "<השאלה הבאה למשתמש>",
 "persona": null,
 "reason": null
}

לאחר שנענו כל 5 השאלות החזר:

{
 "question_number": 5,
 "message": "תודה על התשובות שלך. עכשיו אני מבין טוב יותר את סוג המידע שאתה מחפש.",
 "persona": "<חוקר / מתעניין בטראומה>",
 "reason": "<הסבר קצר למה הפרסונה הזו נבחרה על סמך תשובות המשתמש>"
}

חשוב:
- החזר תמיד JSON תקין בלבד
- אל תוסיף טקסט מחוץ ל-JSON
"""

def ask_gemini(history):
    try:
        contents = []

        contents.append({
            "role": "user",
            "parts": [{"text": SYSTEM_PROMPT}]
        })

        for msg in history:
            contents.append({
                "role": msg["role"],
                "parts": [{"text": msg["content"]}]
            })

            response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=contents
        )

        data = json.loads(response.text)
        return data
    
    except genai.errors.ClientError as e:
        print(str(e))
        return {
            "question_number": None,
            "message": f"Gemini API error",
            "persona": None,
            "reason": None
        }

    except Exception as e:
        print(str(e))
        return {
            "question_number": None,
            "message": "שגיאה בחיבור לשרת",
            "persona": None,
            "reason": None
        }
