"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Coffee, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-black py-24 md:py-32 lg:py-40">
      {/* 1. Dynamic Background Grid (Fades out at bottom) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* 2. Top Green Glow (Ambient Light) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-20 h-[300px] w-[600px] rounded-full bg-primary/20 blur-[100px] opacity-50 dark:opacity-30 pointer-events-none"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Main Headline with Gradient Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl leading-[1.1]"
          >
            Building the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">
              Digital Future{" "}
            </span>
            <br className="hidden md:block" />
            Serving the{" "}
            <span className="text-gray-600 dark:text-gray-300">Community.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto max-w-[700px] text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            From high-end enterprise software & AI solutions to essential
            student services. We bridge the gap between global innovation and
            local accessibility.
          </motion.p>

          {/* "Rich" Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 pt-4"
          >
            {/* Button 1: Tech (Primary with Sheen) */}
            <Link
              href="/software"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-dark hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Code2 size={18} />
                Build Software
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
            </Link>

            {/* Button 2: Café (Glass Outline) */}
            <Link
              href="/cafe"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm px-8 font-medium text-gray-900 dark:text-white transition-all hover:bg-gray-100 dark:hover:bg-zinc-800 hover:border-gray-300 dark:hover:border-gray-700"
            >
              <Coffee
                size={18}
                className="text-gray-500 group-hover:text-primary transition-colors"
              />
              Visit Café
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
