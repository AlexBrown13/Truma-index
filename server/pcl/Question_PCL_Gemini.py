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

answers_pcl_example = [
    "בכלל לא",
    "מעט",
    "מעט",
    "במידה בינונית",
    "מעט",
    "במידה בינונית",
    "מעט",
    "מעט",
    "במידה בינונית",
    "במידה בינונית",
    "במידה בינונית",
    "מעט",
    "מעט",
    "מעט",
    "במידה בינונית",
    "מעט",
    "במידה בינונית",
    "במידה בינונית",
    "מעט",
    "במידה בינונית"
]

def pcl_assessment():
    user_responses = []
    print(get_display("--- תחילת הערכת PCL-5 ---"))
    
    for i, question in enumerate(questions_pcl, 1):
        display_question = get_display(f"שאלה {i}: {question} \nתשובה שלך:")
        print(display_question)
        #answer = input()
        answer = answers_pcl_example[i-1] # temp answers
        user_responses.append({"q_num": i, "question": question, "answer": answer})
        print("\n")

    formatted_responses = "\n".join([f"{r['q_num']}. שאלה: {r['question']} | תשובה: {r['answer']}" for r in user_responses])
    
    prompt = f"""
    להלן תשובות של משתמש לשאלון PCL-5. 
    עבור כל שאלה, דרג את עוצמת הסבל על סולם PCL-5:
    0 - בכלל לא
    1 - מעט מאוד
    2 - במידה בינונית
    3 - במידה רבה
    4 - במידה רבה מאוד
    תחזיר רק מספר בודד בין 0 ל-4. 
    
    "להלן רשימה של בעיות ותופעות מהן סובלים לעיתים אנשים בתגובה לאירועי חיים מלחיצים "
    "שקרו להם או למישהו\\י קרוב. עבור כל היגד סמן באיזו מידה הפריע לך בעיה זו בחודש האחרון. - "
    התשובות:
    {formatted_responses}
    
    תחזיר את התוצאה בפורמט JSON בלבד, כרשימה של מספרים (integers) המייצגים את הציונים לפי הסדר.
    לדוגמה: [0, 2, 4, 1, ...] 
    """

    try:
        response = client.models.generate_content(
            model='gemini-3-flash-preview',
            contents=prompt,
            config={'response_mime_type': 'application/json'}
        )

        scores = json.loads(response.text)
        for i, score in enumerate(scores):
            # score 0-4 valid
            user_responses[i]['score'] = score

        return user_responses
        
    except Exception as e:
        print(e)
        return None


final_data = pcl_assessment()
total_score = sum(int(item.get('score', 0)) for item in final_data)
print(get_display(f"--- סיכום ---"))
print(get_display(f"הציון הכולל (Trauma Index) הוא: {total_score}/80"))
print(f"\n{final_data}")
