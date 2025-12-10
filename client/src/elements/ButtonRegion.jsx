import React from "react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box, Typography } from "@mui/material";

export default function ButtonRegion() {
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
        מחוזות
      </Typography>
      <ButtonGroup orientation="vertical" variant="contained">
        <Button>צפון</Button>
        <Button>מזרח</Button>
        <Button>מערב</Button>
        <Button>דרום</Button>
      </ButtonGroup>
    </Box>
  );
}
