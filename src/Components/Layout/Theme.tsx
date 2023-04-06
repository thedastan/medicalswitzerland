// External dependencies
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    darkGrey: "#131518",
    gray: "#595959",
    littleBlack: "#070707",
    lightGray: "#D9D9D9",
    middleGray: "#C7C4C4",
    red: "#E11F26",
    secondaryLittleGray: "#141414",
  },
  fonts: {
    inter: "Inter, sans-serif",
    commissioner: "Commissioner, sans-serif",
  },
  fontSizes: {
    xs: "10px",
    sm: "12px",
    md: "32px",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
});
