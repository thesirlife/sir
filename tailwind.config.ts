import type { Config } from "tailwindcss";

const config: Config = {
  // settings to get Tailwind to work with MUI
  corePluginsorePlugins: {
    preflight: false,
  },
  //
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
      },
      colors: {
        green: {
          primary: "var(--green-primary)",
        },
        navy: {
          primary: "var(--navy-primary)",
          secondary: "var(--navy-secondary)",
        },
        blue: {
          primary: "var(--blue-primary)",
        },
        orange: {
          primary: "var(--orange-primary)",
        },
      },
      fontFamily: {
        gloock: ["var(--font-gloock)"],
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [],
};
export default config;
