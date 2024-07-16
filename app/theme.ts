"use client";
import {
  createTheme,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    warning: {
      main: "#b6622d",
      light: "#C96C32",
    },
    info: {
      main: "#0288d1",
    },
    primary: {
      main: "#405444",
      light: "#8c988f",
    },
    background: {
      default: blueGrey[50],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        colorWarning: ({ theme }) => ({
          backgroundColor: theme.palette.warning.main,
        }),
        outlined: ({ theme }) => ({
          backgroundColor: blueGrey[50],
        }),
        outlinedWarning: ({ theme }) => ({
          backgroundColor: "transparent",
          borderTopLeftRadius: "0.15rem",
          borderBottomLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "0.15rem",
        }),
        contained: ({ theme }) => ({
          padding: "0.5rem 1rem",
        }),
        containedWarning: ({ theme }) => ({
          borderTopLeftRadius: "0.15rem",
          borderBottomLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "0.15rem",
        }),
        containedSecondary: ({ theme }) => ({
          backgroundColor: blueGrey[50],
          color: theme.palette.primary.main,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
          },
        }),
        text: ({ theme }) => ({
          padding: 0,
          "&:hover": {
            backgroundColor: "transparent",
            color: blueGrey[800],
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        filledSecondary: ({ theme }) => ({
          backgroundColor: theme.palette.warning.main,
          color: theme.palette.common.white,
          border: `1px solid ${theme.palette.warning.main}`,

          "&:hover": {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.common.white,
          },
        }),
        filledPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        }),
        outlinedSecondary: ({ theme }) => ({
          "&.MuiChip-clickable": {
            backgroundColor: "#15253b",
            color: theme.palette.common.white,
            border: `1px solid ${theme.palette.warning.main}`,
            "&:hover": {
              backgroundColor: theme.palette.warning.main,
            },
          },
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& > .MuiOutlinedInput-notchedOutline": {
            // borderColor: theme.vars.palette.warning.main,
            // borderWidth: "2px",
          },
        }),
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.common.white,
          "&.Mui-selected": {
            backgroundColor: blueGrey[800],
          },
        }),
      },
    },
  },
});

export { theme };
