import { Box } from "@mui/material";

export default function BackgroundSection() {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage:
          "url('https://www.natal.org.il/wp-content/uploads/2023/12/FS.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: "0.6",
        filter: "drop-shadow(0px 15px 20px rgba(0,0,0,0.35))", // shadow below a background image
      }}
    ></Box>
  );
}
