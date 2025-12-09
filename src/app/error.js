"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-xl backdrop-blur-sm"
      >
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          System Malfunction
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          We encountered an unexpected error processing your request. Our
          engineering team has been notified.
        </p>

        <div className="space-y-3">
          {/* Retry Button - Tries to re-render the segment */}
          <button
            onClick={reset}
            className="w-full py-3 px-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
          >
            <RefreshCcw size={16} /> Try Again
          </button>

          {/* Safe Exit */}
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={16} /> Return to Safety
          </button>
        </div>

        {/* Technical Error Code (Optional - for debugging) */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800">
          <p className="text-xs text-gray-400 font-mono">
            Error Code: 500_INTERNAL_SERVER_ERROR
          </p>
        </div>
      </motion.div>
    </div>
  );
}
