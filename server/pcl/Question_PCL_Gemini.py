import os
import json
from google import genai
from dotenv import load_dotenv
from bidi.algorithm import get_display # arrange the text Hebrew

load_dotenv()

# Initialize the client
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))


questions_pcl = [
    "זיכרונות חוזרים ונשנים, לא רצוניים, של החוויה הטראומטית",
    "חלומות טורדניים או חוזרים של החוויה הטראומטית",
    "הרגשה או התנהגות פתאומית כאילו החוויה הטראומטית ממש שבה ומתרחשת שוב (כאילו את.ה ממש חי.ה אותו שוב)",
    "הרגשת מצוקה נפשית כאשר נזכרת בחוויה הטראומטית",
    "חווית תגובות גופניות חזקות כאשר נזכרת בחוויה הטראומטית (למשל, דפיקות לב, קשיי נשימה, הזעה)",
    "הימנעות ממחשבות, רגשות או תחושות גופניות שהזכירו לך את החוויה הטראומטית",
    "הימנעות מגורמים חיצוניים שהזכירו לך את החוויה הטראומטית (כמו: אנשים, מקומות, שיחות, חפצים, פעילויות או מצבים)",
    "קושי לזכור חלקים חשובים מתוך החוויה הטראומטית (לא כתוצאה מפגיעת ראש / תרופות / סמים)",
    "אמונות שליליות חזקות לגבי עצמך, אחרים או העולם (למשל, אני אדם רע, משהו ממש לא בסדר איתי, אי אפשר לסמוך על אף אחד, העולם הוא מקום מסוכן)",
    "האשמה של עצמך או של מישהו אחר לגבי האירוע הטראומטי או מה שקרה בעקבותיו",
    "רגשות שליליים חזקים כמו פחד, אימה, כעס, אשמה או בושה",
    "אובדן עניין בפעילויות פנאי שנהנית מהן בעבר",
    "תחושת ריחוק או ניתוק מאחרים",
    "קושי לחוות רגשות חיוביים, כמו אהבה או שמחה",
    "הרגשת עצבנות, כעסנות או התנהגות תוקפנית",
    "לקיחת יותר מדי סיכונים, או עשיית דברים שיכולים להזיק לעצמך (לדוגמה - יחסי מין מסוכנים, נהיגה חסרת זהירות, התקפי זלילה וכדומה)",
    "תחושה של \"דריכות על\", עמידה על המשמר או ערנות מוגברת במיוחד",
    "הרגשה שאת.ה נוטה להיבהל או קופצני.ת מאוד",
    "קושי להתרכז",
    "קושי להירדם או להשאר ישנ.ה"
]


def pcl_assessment():
    conversation_data = []

    print(get_display("--- תחילת הערכת PCL-5 ---"))
    
    for i, question in enumerate(questions_pcl, 1):
        display_question = get_display(f"שאלה {i}: {question}")
        print(display_question)
        answer = input(get_display("תשובה שלך: ")).strip()
        
        
        prompt = f"""
        המשתמש ענה על השאלה הבאה משאלון PCL-5:

        שאלה: {question}
        תשובה: {answer}

        אנא הגב בצורה אמפתית, תומכת ולא שיפוטית כמו צ'אטבוט טיפולי.
        אל תחזיר ציונים מספריים.
        אל תנתח טכנית.
        כתוב תגובה קצרה ומכילה.
        """

        try:
            response = client.models.generate_content(
                model='gemini-3-flash-preview',
                contents=prompt,
            )

            ai_response = response.text

            conversation_data.append({
                "question_number": i,
                "question": question,
                "user_answer": answer,
                "ai_response": ai_response
            })

            print(get_display("\nתגובה:\n"))
            print(get_display(ai_response))
            print("\n" + "-" * 50 + "\n")
            
        except Exception as e:
            print("Error: ", e)
            return None
    
    return conversation_data


# Run assessment
data = pcl_assessment()
print(get_display("\n--- סיום השאלון ---\n"))
print("האובייקט שנשמר:\n")
print(data)