"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("inogr_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("inogr_cookie_consent", "granted");
    setIsVisible(false);

    // --- NEW: Dispatch Custom Event ---
    // This tells the Analytics component to wake up immediately
    window.dispatchEvent(new Event("inogr_consent_updated"));
  };

  const handleDecline = () => {
    localStorage.setItem("inogr_cookie_consent", "denied");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          // FIXED CLASSES BELOW:
          // Mobile: bottom-4 left-4 right-4 (Centers it)
          // Desktop (md): left-auto right-6 (Moves it back to the corner)
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[60] md:max-w-sm w-auto"
        >
          <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl relative">
            {/* Icon Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                <Cookie size={20} />
              </div>
              <div className="flex-1 pr-6">
                {" "}
                {/* Added padding-right to avoid close button overlap */}
                <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1">
                  We value your privacy
                </h4>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  We use cookies to enhance your experience. Read our{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleDecline}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} /> Accept
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
