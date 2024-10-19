"use client";

import { useEffect } from "react";

export default function PendoScript({ session, pendoAccountId }: any) {
  useEffect(() => {
    if (session) {
      const emailAddress = session?.user?.email
          ? session.user.email
          : "Not Logged In";
      const name = session?.user?.name ? session.user.name : "Not Logged In";
      const userId = session?.user?.id ? session.user.id : "Not Logged In";

      const script = document.createElement("script");
      script.id = "pendo-script";
      script.type = "text/javascript";
      script.async = true;
      script.defer = true;
      script.innerHTML = `
          pendo.initialize({
            visitor: {
              id: "${userId}",
              email: "${emailAddress}",
              firstName: "${name}",
            },
            account: {
              id: "${pendoAccountId}",
              accountName: "SIR Digital Hub",
            }
          });
      `;
      document.body.appendChild(script);
    }
  }, [session]);

  return null;
}