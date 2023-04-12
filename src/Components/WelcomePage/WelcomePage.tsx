/* External dependencies */
import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

/* Local dependencies */
import "./style.scss";

export default function WelcomePage() {
  const [isVisible, setIsVisible] = useState(true);
  const [display, setDisplay] = useState("block");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay("none");
    }, 3100);
    return () => clearTimeout(timer);
  });

  return (
    <Box
      bg="black"
      pos="fixed"
      left="0"
      right="0"
      top="0"
      bottom="0"
      zIndex="3"
      display={display}
      className={`welcome-container ${isVisible ? "visible" : ""}`}
    >
      <Box
        className="welcome-message"
        minH="100%"
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
        <Text color="#C7C4C4" textAlign="center" fontSize="22px" mb="24px">
          medical
          <span style={{ color: "#E11F26" }}>switzerland</span>
        </Text>
        <Text
          textColor="#C7C4C4"
          textAlign="center"
          fontSize="32px"
          fontFamily="inter"
          fontWeight="700"
        >
          PATIENTENAKTE
        </Text>
      </Box>
    </Box>
  );
}
