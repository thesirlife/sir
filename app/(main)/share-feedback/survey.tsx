"use client";

import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const metadata = {
  title: "Share Feedback",
  description: "Share feedback about your experience with SIR.",
};

const script =
  '<script>(function(t,e,s,n){var o,a,c;t.SMCX=t.SMCX||[],e.getElementById(n)||(o=e.getElementsByTagName(s),a=o[o.length-1],c=e.createElement(s),c.type="text/javascript",c.async=!0,c.id=n,c.src="https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd30kMLlLtc4okiu60NJiBPZL_2B0E5IF2y8F6rnYa_2F7lnV.js",a.parentNode.insertBefore(c,a))})(window,document,"script","smcx-sdk");</script>';

const Survey = () => {
  return (
    <div
      id="survey"
      className="container pb-12"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
};

export default Survey;
