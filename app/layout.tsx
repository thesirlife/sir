import type { Metadata } from "next";
import { Gloock, Roboto, Bitter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { theme } from "./theme";

const gloock = Gloock({
  weight: "400",
  variable: "--font-gloock",
  preload: false,
});

const bitter = Bitter({
  weight: "400",
  variable: "--font-bitter",
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
      <CssVarsProvider theme={theme}>
        <html lang="en">
          <body
            className={`${gloock.variable} ${roboto.variable} ${bitter.variable}`}
          >
            {children}
          </body>
          <GoogleAnalytics gaId="G-MMYG827PJL" />
        </html>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}
