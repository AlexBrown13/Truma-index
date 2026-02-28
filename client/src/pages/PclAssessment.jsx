import React, { useState } from "react";

const QUESTIONS = [
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
  'תחושה של "דריכות על", עמידה על המשמר או ערנות מוגברת במיוחד',
  "הרגשה שאת.ה נוטה להיבהל או קופצני.ת מאוד",
  "קושי להתרכז",
  "קושי להירדם או להשאר ישנ.ה",
];

export default function PclAssessment() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(QUESTIONS.length).fill("")); //Array(QUESTIONS.length).fill("")
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitToGemini();
    }
  };

  const submitToGemini = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5500/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await response.json();
      setResult(data.total);
    } catch (err) {
      console.log("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%`,
            }}
          ></div>
        </div>

        <span className="text-sm text-gray-400">
          שאלה {currentIndex + 1} מתוך {QUESTIONS.length}
        </span>
        <h2 className="text-xl font-bold mt-2 mb-6">
          {QUESTIONS[currentIndex]}
        </h2>

        <textarea
          autoFocus
          className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 outline-none transition h-32"
          placeholder="תאר/י בפירוט באיזו מידה זה הפריע לך בחודש האחרון..."
          value={answers[currentIndex]}
          onChange={(e) => {
            const newAns = [...answers];
            newAns[currentIndex] = e.target.value;
            setAnswers(newAns);
          }}
        />

        <div className="flex justify-between mt-8">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="text-gray-500 hover:text-black disabled:opacity-30"
          >
            חזור
          </button>

          <button
            onClick={handleNext}
            disabled={!answers[currentIndex].trim() || loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            {loading
              ? "מנתח..."
              : currentIndex === QUESTIONS.length - 1
              ? "סיים ונתח"
              : "המשך"}
          </button>
        </div>
      </div>
      <div>result: {result}/80</div>
    </div>
  );
}
