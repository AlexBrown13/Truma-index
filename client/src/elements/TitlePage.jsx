import { Box, Typography } from "@mui/material";

export default function TitlePage(props) {
  return (
    <Box
      style={{ display: "flex", justifyContent: "center" }}
      sx={{
        mt: 3,
        mb: 3,
        p: 4,
        backgroundColor: "#7eaa85",
        direction: "rtl",
        borderRadius: 6,
        height: 50,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography variant="h3" sx={{ color: "#fff" }}>
          {props.name}
        </Typography>
      </Box>
    </Box>
  );
}
