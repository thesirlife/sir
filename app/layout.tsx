import type { Metadata } from "next";
import { Gloock, Roboto } from "next/font/google";
import "./globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

const gloock = Gloock({
  weight: "400",
  variable: "--font-gloock",
  preload: false,
});

const roboto = Roboto({
  weight: "400",
  variable: "--font-roboto",
  preload: false,
});

export const metadata: Metadata = {
  title: "SIR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* Maybe remove this or investigate more if needed to make MUI/Tailwind happy, it's causing a style flash after painting */}
        <CssBaseline />
        {/*  */}
        <html lang="en">
          <body className={`${gloock.variable} ${roboto.variable}`}>
            {children}
          </body>
        </html>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
