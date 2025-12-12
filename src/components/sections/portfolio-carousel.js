"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

// --- HELPER: STRIP HTML TAGS ---
const stripHtml = (html) => {
  if (!html) return "";
  // Simple regex strip is sufficient for card previews
  return html.replace(/<[^>]*>?/gm, "");
};

export default function PortfolioCarousel({ projects }) {
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
    <>
      <div
        ref={scrollRef}
        className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar"
      >
        {projects.map((project, idx) => (
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
                className={`aspect-[16/10] w-full relative overflow-hidden ${
                  project.image.startsWith("bg-") ? project.image : ""
                }`}
              >
                {!project.image.startsWith("bg-") && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

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

                {/* FIX: STRIP HTML TAGS HERE */}
                <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-2">
                  {stripHtml(project.desc)}
                </p>

                {/* Tech Stack */}
                <div className="mt-auto flex flex-wrap gap-2">
                  {(Array.isArray(project.tags)
                    ? project.tags
                    : (project.tags || "").split(",")
                  ).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-bold text-gray-600 dark:text-zinc-300"
                    >
                      {t.trim()}
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
    </>
  );
}
