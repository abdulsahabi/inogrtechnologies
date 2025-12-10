"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // To read ?category=Tech
import {
  Search,
  Calendar,
  Clock,
  ChevronRight,
  Newspaper,
  ChevronLeft,
} from "lucide-react";

const CATEGORIES = ["All", "Tech", "Business", "Student Life", "Design"];
const ITEMS_PER_PAGE = 6;

export default function BlogClient({ initialPosts = [] }) {
  const searchParams = useSearchParams();
  const postsTopRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. SYNC URL PARAMS ON LOAD
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && CATEGORIES.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("All");
    }
  }, [searchParams]);

  // 2. FILTERING LOGIC
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Category Match
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      // Search Match (Title OR Excerpt)
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, initialPosts]);

  // 3. PAGINATION LOGIC
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Scroll Helper
  const scrollToGrid = () => {
    if (postsTopRef.current) {
      const y =
        postsTopRef.current.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToGrid();
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    scrollToGrid();
    // Update URL without reload
    window.history.pushState({}, "", `/blog?category=${category}`);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setCurrentPage(1);
    scrollToGrid();
    window.history.pushState({}, "", "/blog");
  };

  return (
    <>
      {/* HEADER SECTION */}
      <section className="pt-6 pb-12 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-900">
        <div className="container max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider mb-6 text-zinc-600 dark:text-zinc-400">
                <Newspaper size={12} />
                <span>InoGr Insights</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
                News & <span className="text-primary">Articles.</span>
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Trends, tutorials, and updates from the digital frontier.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-auto relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full md:w-[300px] pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 mt-8 hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                  activeCategory === cat
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "bg-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white border-transparent hover:bg-gray-100 dark:hover:bg-zinc-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section ref={postsTopRef} className="py-12 md:py-20 px-4 md:px-6">
        <div className="container max-w-5xl mx-auto">
          {currentPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-in fade-in zoom-in duration-500">
                {currentPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full"
                  >
                    {/* Image Handling */}
                    <div
                      className={`relative aspect-[16/9] overflow-hidden rounded-2xl mb-6 bg-zinc-100 dark:bg-zinc-900 ${
                        post.image?.startsWith("bg-") ? post.image : ""
                      }`}
                    >
                      {!post.image?.startsWith("bg-") && (
                        /* Fallback for real images if needed later */
                        <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-800" />
                      )}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-black/30 backdrop-blur-md rounded-full border border-white/10">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium uppercase tracking-wide">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:gap-3 transition-all">
                        Read Article{" "}
                        <ChevronRight size={16} className="text-primary" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm font-bold text-gray-900 dark:text-white px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 mb-4">
                <Search
                  size={24}
                  className="text-gray-400 dark:text-zinc-500"
                />
              </div>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No articles found.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
