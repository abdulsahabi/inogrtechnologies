import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getPublicProjects } from "@/app/portfolio/actions"; // Import the Server Action
import PortfolioCarousel from "./portfolio-carousel"; // We'll move the client logic here

export default async function PortfolioPreview() {
  // 1. FETCH REAL DATA
  const allProjects = await getPublicProjects();

  // If no projects, don't render the section (or render a placeholder)
  if (!allProjects || allProjects.length === 0) return null;

  // Take the first 3 or 4 for the preview
  const projects = allProjects.slice(0, 4);

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

        {/* --- CAROUSEL (Client Logic) --- */}
        {/* We pass the data to a Client Component to handle the scrolling refs */}
        <PortfolioCarousel projects={projects} />
      </div>
    </section>
  );
}
