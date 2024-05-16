import type { Metadata } from "next";
import { Gloock, Roboto } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={`${gloock.variable} ${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
