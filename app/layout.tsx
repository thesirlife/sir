import type { Metadata } from "next";
import Script from "next/script";
import { auth } from "@/auth";
import { Gloock, Roboto, Bitter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import HubspotTracking from "@/app/components/Hubspot/embed";
import PendoTracking from "@/app/components/Pendo/embed";

import "./globals.css";

import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
	const emailAddress = session?.user?.email ? session.user.email : null;
	const name = session?.user?.name ? session.user.name : null;
	const userId = session?.user?.id ? session.user.id : null;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body
            className={`${gloock.variable} ${roboto.variable} ${bitter.variable}`}
          >
            {children}
            <Script
              type="text/javascript"
              id="hs-script-loader"
              async
              defer
              src="//js.hs-scripts.com/44439799.js"
              strategy="beforeInteractive"
            />
            <HubspotTracking session={session} />
						<div id="pendo thing here" />
            <Script id="pendo-script" strategy="afterInteractive">
							{`
								(function(apiKey){
										(function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
										v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
												o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
												y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
												z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');

										pendo.initialize({
												visitor: {
														id: "${userId}",
														email: "${emailAddress}",
														firstName: "${name}",
												},

												account: {
														id: "${process.env.PENDO_ACCOUNT_ID}",
														accountName: "SIR Digital Hub",
												}
										});
								})('${process.env.PENDO_API_KEY}');
							`}
						</Script>
          </body>
          <GoogleAnalytics gaId="G-L7T5ZQH0G5" />
        </html>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
