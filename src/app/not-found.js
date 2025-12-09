import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-white dark:bg-black">
      {/* OPTIMIZATION: CSS Gradient instead of external image request */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>

      {/* Icon with CSS Animation (animate-bounce is built into Tailwind) */}
      <div className="relative mb-8 animate-in zoom-in duration-500">
        <div className="h-24 w-24 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center rotate-3">
          <FileQuestion size={40} className="text-primary" />
        </div>
        <div className="absolute -inset-1 bg-primary/20 rounded-3xl blur-md -z-10 animate-pulse"></div>
      </div>

      {/* Text with CSS Staggered Animation */}
      <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-600 mb-4 animate-in slide-in-from-bottom-5 fade-in duration-700">
        404
      </h1>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100 fill-mode-both">
        Signal Lost in the Void
      </h2>

      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8 animate-in slide-in-from-bottom-7 fade-in duration-700 delay-200 fill-mode-both">
        The page you are looking for has been moved, deleted, or never existed.
        Let{"'"}s get you back on track.
      </p>

      {/* Static Buttons (Instant Interaction) */}
      <div className="flex gap-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300 fill-mode-both">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Go Back
        </Link>

        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark hover:scale-105 transition-all flex items-center gap-2"
        >
          <Home size={16} /> Return Home
        </Link>
      </div>
    </div>
  );
}
