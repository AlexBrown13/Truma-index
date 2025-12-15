import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

export default function MyForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    // role: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        textAlign: "right",
        direction: "rtl",
      }}
    >
      <Typography variant="h5" mb={2}>
        טופס
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="הודעה"
            name="message"
            multiline
            minRows={3}
            value={form.message}
            onChange={handleChange}
            fullWidth
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#f8e087",
              color: "#000",
            }}
          >
            הרשמה
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
