import type { Config } from "tailwindcss";
import { blueGrey } from "@mui/material/colors";

const config: Config = {
  // settings to get Tailwind to work with MUI
  corePluginsorePlugins: {
    preflight: false,
  },
  // // // // //
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "pattern-green": "url('./green-background.jpg')",
        auth: "url('./auth.jpg')",
      },
      container: {
        screens: {
          xl: "1152px",
        },
      },
      colors: {
        green: {
          primary: "var(--green-primary)",
          secondary: "var(--green-secondary)",
        },
        navy: {
          primary: "var(--navy-primary)",
          secondary: "var(--navy-secondary)",
        },
        blue: {
          primary: "var(--blue-primary)",
        },
        blueGrey: {
          primary: blueGrey[800],
          dark: blueGrey[900],
          50: blueGrey[50],
        },
        orange: {
          primary: "var(--orange-primary)",
          light: "var(--orange-light)",
        },
      },
      fontFamily: {
        gloock: ["var(--font-gloock)"],
        roboto: ["var(--font-roboto)"],
        bitter: ["var(--font-bitter)"],
      },
      maxWidth: {
        50: '50%',
        60: '60%',
        70: '70%',
      }
    },
  },
  plugins: [],
};
export default config;
