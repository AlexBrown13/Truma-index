import bgImage from "../assets/images/NATAL_Logo_New_GREEN.png";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export default function BackgroundSection() {
  return (
    <Box
      component={motion.div} // Box becomes animated
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 0.9 }}
      transition={{
        duration: 5, //from start to finish
        delay: 0.5, //waits before starting
        ease: "easeInOut", // both slowly start and end
      }}
      sx={{
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: "0.8",
        // border: "1px solid red",
        //filter: "drop-shadow(0px 15px 20px rgba(0,0,0,0.35))", // shadow below a background image
      }}
    ></Box>
  );
}
