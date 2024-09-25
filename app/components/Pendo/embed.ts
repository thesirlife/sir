import { useEffect } from "react";

export default function PendoScript({ session }: any) {
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
      `;
      document.body.appendChild(script);
    }
  }, [session]);

  return null;
}