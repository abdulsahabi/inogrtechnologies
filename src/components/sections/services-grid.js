"use client";

import React, { useRef } from "react";
import Link from "next/link";
// Removed Framer Motion import to save bundle size
import {
  ArrowRight,
  Code2,
  Coffee,
  Cpu,
  Wifi,
  ChevronLeft,
  ChevronRight,
  Activity,
  Clock,
} from "lucide-react";

export default function ServicesGrid() {
  const scrollContainerRef = useRef(null);

  // Manual Scroll Logic
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 md:py-24 bg-gray-50 dark:bg-zinc-950 overflow-hidden relative">
      {/* OPTIMIZATION: CSS Pattern instead of external image request (Faster Load) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* HEADER */}
        <div className="text-left mb-8 md:mb-12 space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Two Worlds. <span className="text-primary">One Vision.</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-xl dark:text-gray-400 max-w-2xl">
            Swipe to explore our Enterprise Tech or Local Hub services.
          </p>
        </div>

        {/* CAROUSEL */}
        <div
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* --- CARD 1: SOFTWARE --- */}
          <div className="snap-center shrink-0 w-[280px] md:w-auto h-[360px] md:h-[350px] md:col-span-2 group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 transition-transform duration-300 hover:scale-[1.02]">
            {/* Live Status Badge */}
            <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md z-20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">
                Systems Online
              </span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-primary/10 z-0" />

            <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
              <div className="bg-zinc-800/50 w-fit p-3 rounded-2xl backdrop-blur-md border border-white/10">
                <Code2 className="text-primary h-6 w-6 md:h-8 md:w-8" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Software & Tech
                </h3>
                <p className="text-zinc-400 text-xs md:text-base leading-relaxed line-clamp-3">
                  Enterprise Web Apps, Mobile Development, and AI Solutions
                  built for scale.
                </p>
                <Link
                  href="/software"
                  className="inline-flex items-center gap-2 text-primary text-sm font-semibold mt-2 group-hover:gap-4 transition-all"
                >
                  Explore Tech <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* --- CARD 2: CAFE --- */}
          <div className="snap-center shrink-0 w-[280px] md:w-auto h-[360px] md:h-auto md:row-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 transition-transform duration-300 hover:scale-[1.02]">
            {/* Open Status Badge */}
            <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-md z-20">
              <Clock size={12} className="text-orange-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Open Now
              </span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/30 dark:to-black/40 z-0" />

            <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
              <div className="bg-orange-100 dark:bg-orange-900/20 w-fit p-3 rounded-2xl">
                <Coffee className="text-orange-600 dark:text-orange-400 h-6 w-6 md:h-8 md:w-8" />
              </div>

              <div className="mt-auto space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Café & Hub
                </h3>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    High-Speed Printing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Branding & Design
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> CAC
                    Registration
                  </li>
                </ul>
                <Link
                  href="/cafe"
                  className="block w-full py-3 text-center rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  Visit Hub
                </Link>
              </div>
            </div>
          </div>

          {/* --- CARD 3: AI --- */}
          <div className="snap-center shrink-0 w-[280px] md:w-auto h-[360px] md:h-[250px] relative overflow-hidden rounded-3xl bg-primary text-white border border-primary/50 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
            <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
              <div>
                <Cpu className="h-6 w-6 md:h-8 md:w-8 mb-4 opacity-80" />
                <h3 className="text-xl md:text-2xl font-bold">AI Powered</h3>
                <p className="text-green-100 text-xs md:text-sm mt-2">
                  Integrating Machine Learning into business logic.
                </p>
              </div>
              <Activity className="absolute bottom-6 right-6 h-12 w-12 opacity-20 animate-pulse" />
            </div>
          </div>

          {/* --- CARD 4: HUB --- */}
          <div className="snap-center shrink-0 w-[280px] md:w-auto h-[360px] md:h-[250px] relative overflow-hidden rounded-3xl bg-zinc-900 dark:bg-black border border-zinc-800 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
            <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
              <div>
                <Wifi className="h-6 w-6 md:h-8 md:w-8 mb-4 text-primary" />
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Digital Hub
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm mt-2">
                  Reliable internet access point.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex justify-end items-end gap-4 mt-8 md:hidden">
          <button
            onClick={() => scroll("left")}
            className="h-12 w-12 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors shadow-sm active:scale-95"
          >
            <ChevronLeft
              size={24}
              className="text-gray-600 dark:text-gray-300"
            />
          </button>

          <button
            onClick={() => scroll("right")}
            className="h-12 w-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-md active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
