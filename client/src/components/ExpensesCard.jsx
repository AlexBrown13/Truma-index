import { Link } from "react-router-dom";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

export default function CardExpenses() {
  const cards = [
    {
      id: 1,
      title: { content: "עלויות ישירות", color: "#fff" },
      text: {
        color: "#fff",
        content: ["קצבאות שיקום", "טיפול פסיכולוגי", "אבטלה זמנית"],
      },
      bgcolor: "#41645a",
    },
    {
      id: 2,
      title: { content: "עלויות עקיפות", color: "#fff" },
      text: {
        color: "#000",
        content: [
          "אבדן פריון (אבטלה קבועה, אבדן מס)",
          "פגיעה במעגלי תמיכה",
          "שניוניים",
          "תפוקת עבודה ויצרנות נמוכים",
          "תגובה לפגיעה: בריחת מוחות ועזיבה",
        ],
      },
      bgcolor: "#7eaa85",
    },
    {
      id: 3,
      title: { content: "עלויות עקיפות", color: "#fff" },
      text: {
        color: "#000",
        content: [
          "פגיעה בהון אנושי (הכשרות, לימודים)",
          "פגיעה באמון",
          "פגיעה במוטיבציה דיכאון, אובדנות",
        ],
      },
      bgcolor: "#7eaa85",
    },
    {
      id: 4,
      title: { content: "עלויות עקיפות", color: "#fff" },
      text: {
        color: "#000",
        content: ["תוצר מקומי גולמי נמוך יותר", "תוצר לאומי גולמי נמוך יותר"],
      },
      bgcolor: "#7eaa85",
    },
    {
      id: 5,
      title: { content: "עלויות עקיפות", color: "#fff" },
      text: {
        color: "#000",
        content: ["תאונות", "התמכרויות", "אלימות", "מחלות"],
      },
      bgcolor: "#7eaa85",
    },
  ];

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f6e4dc",
        direction: "rtl",
        textAlign: "right",
      }}
    >
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <Card
              sx={{
                width: 200,
                height: "100%",
                borderRadius: 6,
                boxShadow: 3,
                backgroundColor: card.bgcolor,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
                  color={card.title.color}
                >
                  {card.title.content}
                </Typography>

                {card.text.content.map((line, index) => (
                  <div key={index}>
                    <hr
                      style={{
                        margin: "3px",
                        border:
                          card.id === 1
                            ? "1px solid #7eaa85"
                            : "1px solid #41645a",
                      }}
                    />
                    <Typography color={card.text.color} sx={{ mr: 1 }}>
                      <Link
                        to={"/accidents"}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {line}
                      </Link>
                    </Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
