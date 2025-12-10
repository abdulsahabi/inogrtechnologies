"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";

// --- PROJECT DATA ---
const ALL_PROJECTS = [
  {
    slug: "kebbi-health-portal",
    title: "Kebbi State Health Portal",
    category: "Web Development",
    image: "bg-gradient-to-br from-blue-950 to-slate-900",
    desc: "A centralized hospital management system connecting 5 major hospitals.",
    tags: ["Next.js", "Firebase", "HealthTech"],
    year: "2025",
  },
  {
    slug: "campus-ride-app",
    title: "Campus Ride",
    category: "Mobile App",
    image: "bg-gradient-to-br from-emerald-950 to-teal-900",
    desc: "Uber-style transport booking app for University students.",
    tags: ["React Native", "Maps", "Transport"],
    year: "2024",
  },
  {
    slug: "agrotech-branding",
    title: "AgroTech Identity",
    category: "Graphic Design",
    image: "bg-gradient-to-br from-orange-950 to-red-900",
    desc: "Complete brand overhaul and packaging design for a local startup.",
    tags: ["Branding", "Packaging", "Identity"],
    year: "2025",
  },
  {
    slug: "student-portal",
    title: "FUBK Student Portal",
    category: "Web Development",
    image: "bg-gradient-to-br from-purple-950 to-indigo-900",
    desc: "Modernizing the course registration interface for 10,000+ students.",
    tags: ["Education", "Portal", "UX/UI"],
    year: "2024",
  },
  {
    slug: "fintech-ui",
    title: "PayEasy Wallet UI",
    category: "Graphic Design",
    image: "bg-gradient-to-br from-cyan-950 to-blue-900",
    desc: "UI/UX Design for a local fintech startup's mobile wallet.",
    tags: ["Fintech", "Mobile UI", "Figma"],
    year: "2025",
  },
  {
    slug: "logistics-dashboard",
    title: "LogiTrack Dashboard",
    category: "Web Development",
    image: "bg-gradient-to-br from-zinc-800 to-black",
    desc: "Real-time fleet tracking dashboard for logistics companies.",
    tags: ["React", "Mapbox", "SaaS"],
    year: "2025",
  },
];

const CATEGORIES = ["All", "Web Development", "Mobile App", "Graphic Design"];
const ITEMS_PER_PAGE = 6;

function PortfolioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const gridTopRef = useRef(null);

  // 1. SYNC URL TO STATE ON LOAD
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && CATEGORIES.includes(categoryFromUrl)) {
      setFilter(categoryFromUrl);
    } else {
      setFilter("All");
    }

    // Simulate initial load delay for skeleton
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // --- FILTER LOGIC ---
  const filteredProjects = ALL_PROJECTS.filter(
    (p) => filter === "All" || p.category === filter
  );

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // --- HANDLERS ---
  const handleFilterChange = (cat) => {
    setLoading(true); // Trigger skeleton
    setFilter(cat);
    setCurrentPage(1);

    // Update URL without reloading page
    if (cat === "All") {
      router.push("/portfolio", { scroll: false });
    } else {
      router.push(`/portfolio?category=${encodeURIComponent(cat)}`, {
        scroll: false,
      });
    }

    // Short delay to show transition
    setTimeout(() => {
      setLoading(false);
      scrollToGrid();
    }, 300);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToGrid();
  };

  const scrollToGrid = () => {
    if (gridTopRef.current) {
      const y =
        gridTopRef.current.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="pt-6 pb-12 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider mb-6 text-zinc-600 dark:text-zinc-400"
            >
              <Layers size={12} />
              <span>Our Portfolio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-[1.1]"
            >
              Work that <span className="text-primary">Matters.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 dark:text-gray-400 max-w-xl"
            >
              We don't just write code or design logos. We build digital assets
              that drive growth for businesses in Northern Nigeria.
            </motion.p>
          </div>
        </div>
      </section>

      {/* STICKY FILTER BAR */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 py-4">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap",
                  filter === cat
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GALLERY GRID */}
      <section ref={gridTopRef} className="py-12 md:py-20 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          {loading ? (
            // SKELETON LOADER
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-[32px] overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 h-full"
                >
                  <div className="w-full aspect-square md:aspect-[16/10] bg-gray-200 dark:bg-zinc-800" />
                  <div className="p-8 space-y-4">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded" />
                    <div className="h-8 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
                      <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // REAL CONTENT
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {currentProjects.map((project) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="block h-full"
                    >
                      <div className="relative overflow-hidden rounded-[32px] bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-500">
                        {/* Image */}
                        <div
                          className={`relative w-full aspect-square md:aspect-[16/10] overflow-hidden ${project.image}`}
                        >
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                            <div className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 backdrop-blur-md">
                              View Case Study <ArrowUpRight size={18} />
                            </div>
                          </div>

                          <div className="absolute top-6 right-6">
                            <span className="px-3 py-1 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-bold font-mono">
                              {project.year}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">
                                {project.category}
                              </span>
                              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                            </div>
                            <div className="md:hidden h-10 w-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-900 dark:text-white">
                              <ArrowUpRight size={20} />
                            </div>
                          </div>

                          <p className="text-sm md:text-base text-gray-500 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-2">
                            {project.desc}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((t) => (
                              <span
                                key={t}
                                className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-xs font-semibold text-gray-600 dark:text-zinc-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-xl text-gray-500">
                    No projects found in this category.
                  </p>
                  <button
                    onClick={() => handleFilterChange("All")}
                    className="mt-4 text-primary font-bold hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-12 w-12 flex items-center justify-center rounded-full border border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-12 w-12 flex items-center justify-center rounded-full border border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

// --- MAIN PAGE EXPORT ---
export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Suspense fallback={<div className="h-screen bg-white dark:bg-black" />}>
        <PortfolioContent />
      </Suspense>
    </main>
  );
}
