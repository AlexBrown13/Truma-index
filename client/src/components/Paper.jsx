import { Box, Card, Button, Avatar } from "@mui/material";
import { BookOpen, Heart, Lightbulb, Star } from "lucide-react";

export default function Paper() {
  const note = {
    id: 1,
    icon: "lightbulb",
    text: "Trauma",
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
        padding: 0,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 200,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 1,
          boxShadow: 3,
          "&:hover": {
            boxShadow: 6,
          },
          transition: "all 0.3s ease",
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            background: "linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)",
          }}
        >
          <Lightbulb size={32} color="white" />
        </Avatar>

        <Box
          component="p"
          sx={{
            fontSize: "1.7rem",
            color: "#555",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {note.text}
        </Box>

        <Button
          sx={{
            backgroundColor: "#6a4b1a",
            color: "white",
            padding: "6px 16px",
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#1f4ab5",
            },
            transition: "all 0.2s ease",
          }}
        >
          Read More
        </Button>
      </Card>
    </Box>
  );
}
