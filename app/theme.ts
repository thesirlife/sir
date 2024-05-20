"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    warning: {
      main: "var(--orange-primary)",
    },
    info: {
      main: "var(--blue-primary)",
    },
  },
});

export { theme };
