import React from "react";
import { Box, Typography } from "@mui/material";

export default function CardTextByEvent(props) {
  const city = props.cityName;
  const story = props.story;
  const date = props.date;

  return (
    <Box
      sx={{
        p: 2, // padding
        borderRadius: 2,
        textAlign: "right", // aligns text for Hebrew or RTL
        direction: "rtl", // ensures right-to-left text
      }}
    >
      {city !== "" && story !== "" && date !== "" ? (
        <>
          <Typography variant="h5" gutterBottom>
            אזור: {city} תאריך: {date}
          </Typography>
          <Typography variant="body1">{story}</Typography>
        </>
      ) : (
        <Typography variant="body1">
          לחץ על סמן במפה כדי לקבל את הסיפור
        </Typography>
      )}
    </Box>
  );
}
