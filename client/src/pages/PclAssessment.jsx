import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

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
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5, direction: "rtl" }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        {/* Progress */}
        <Typography variant="body2" color="text.secondary" mb={1}>
          שאלה {currentIndex + 1} מתוך {QUESTIONS.length}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={((currentIndex + 1) / QUESTIONS.length) * 100}
          sx={{
            height: 12, 
            borderRadius: 6,
            mb: 3,
            transform: "scaleX(-1)", 
          }}
        />

        {/* Question */}
        <Typography variant="h6" mb={3}>
          {QUESTIONS[currentIndex]}
        </Typography>

        {/* Answer */}
        <TextField
          fullWidth
          multiline
          rows={5}
          variant="outlined"
          placeholder="תאר/י בפירוט באיזו מידה זה הפריע לך בחודש האחרון..."
          value={answers[currentIndex]}
          onChange={(e) => {
            const newAns = [...answers];
            newAns[currentIndex] = e.target.value;
            setAnswers(newAns);
          }}
        />

        {/* Buttons */}
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            חזור
          </Button>

          <Button
            variant="contained"
            disabled={!answers[currentIndex].trim() || loading}
            onClick={handleNext}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {currentIndex === QUESTIONS.length - 1 ? "סיים ונתח" : "המשך"}
          </Button>
        </Box>

        {/* Result */}
        {result !== null && (
          <Typography mt={4} variant="h6" color="primary">
            התוצאה שלך: {result} / 80
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
