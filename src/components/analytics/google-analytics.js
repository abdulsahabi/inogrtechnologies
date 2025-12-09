"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }) {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // 1. Check if consent was already given in the past
    const consent = localStorage.getItem("inogr_cookie_consent");
    if (consent === "granted") {
      setConsentGiven(true);
    }

    // 2. Listen for the "Accept" click in real-time (Custom Event)
    const handleConsentUpdate = () => {
      if (localStorage.getItem("inogr_cookie_consent") === "granted") {
        setConsentGiven(true);
      }
    };

    window.addEventListener("inogr_consent_updated", handleConsentUpdate);

    return () => {
      window.removeEventListener("inogr_consent_updated", handleConsentUpdate);
    };
  }, []);

  // If no consent, render NOTHING.
  if (!consentGiven) return null;

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
