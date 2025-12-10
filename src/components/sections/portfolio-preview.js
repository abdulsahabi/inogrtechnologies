"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Layers,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PORTFOLIO_DATA = [
  {
    slug: "kebbi-health-portal",
    title: "Kebbi Health Portal",
    category: "Web Platform",
    image: "bg-gradient-to-br from-blue-950 to-slate-900",
    desc: "Centralized hospital management system connecting 5 major state hospitals.",
    tech: ["Next.js", "Firebase"],
  },
  {
    slug: "campus-ride-app",
    title: "Campus Ride",
    category: "Mobile App",
    image: "bg-gradient-to-br from-emerald-950 to-teal-900",
    desc: "Uber-style transport booking app for University students with offline SMS support.",
    tech: ["React Native", "Maps API"],
  },
  {
    slug: "agrotech-branding",
    title: "AgroTech Identity",
    category: "Brand Design",
    image: "bg-gradient-to-br from-orange-950 to-red-900",
    desc: "Complete brand overhaul, logo design, and packaging for a local agricultural startup.",
    tech: ["Illustrator", "Figma"],
  },
];

export default function PortfolioPreview() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#050505] border-t border-gray-100 dark:border-white/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              <Layers size={12} />
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              Built by <span className="text-primary">InoGr.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg text-sm md:text-lg leading-relaxed">
              Digital assets that solve real problems. From enterprise
              dashboards to creative branding.
            </p>
          </div>

          {/* Desktop "View All" */}
          <Link
            href="/portfolio"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-primary transition-colors group"
          >
            View Full Portfolio{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* --- CAROUSEL (Mobile) / GRID (Desktop) --- */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar"
        >
          {PORTFOLIO_DATA.map((project, idx) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group block snap-center shrink-0 w-[85vw] md:w-auto h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative overflow-hidden rounded-[24px] bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 flex flex-col h-full hover:border-primary/50 transition-colors duration-500"
              >
                {/* Image Area */}
                <div
                  className={`aspect-[16/10] w-full ${project.image} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                  {/* Floating Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white">
                      {project.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-4 right-4 h-10 w-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-2">
                    {project.desc}
                  </p>

                  {/* Tech Stack */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-bold text-gray-600 dark:text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* --- MOBILE CONTROLS (Bottom) --- */}
        <div className="flex justify-between items-center mt-4 md:hidden">
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="h-10 w-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="h-10 w-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <Link
            href="/portfolio"
            className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1"
          >
            See All <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
