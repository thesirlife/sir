"use client";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      // is there a way to just use the css variables defined in globals.css? seems like MUI doesn't support that
      palette: {
        warning: {
          main: "#b6622d",
        },
        info: {
          main: "#0288d1",
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        colorWarning: ({ theme }) => ({
          backgroundColor: theme.vars.palette.warning.main,
        }),
      },
    },
  },
});

export { theme };
