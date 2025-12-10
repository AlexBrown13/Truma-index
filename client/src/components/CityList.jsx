import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function CityList() {
  const cities = ["תל אביב", "ירושלים", "חיפה", "באר שבע", "אילת", "נתניה"];

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 300,
        textAlign: "right",
        direction: "rtl",
      }}
    >
      <Typography variant="h5" gutterBottom>
        רשימת ערים
      </Typography>
      <List>
        {cities.map((city, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText primary={city} sx={{ textAlign: "right" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
