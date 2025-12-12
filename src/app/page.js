import React, { Suspense } from "react";
import Hero from "@/components/sections/hero";
import ServicesGrid from "@/components/sections/services-grid";
import PortfolioPreview from "@/components/sections/portfolio-preview"; // <--- Import Portfolio
import Newsletter from "@/components/sections/newsletter";
import BlogPreview from "@/components/sections/blog-preview";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-black">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Services Carousel */}
      <ServicesGrid />

      {/* 3. PORTFOLIO SECTION (With Skeleton) */}
      <Suspense fallback={<PortfolioSkeleton />}>
        <PortfolioPreview />
      </Suspense>

      {/* 4. Newsletter Break */}
      <Newsletter />

      {/* 5. Blog Section (With Skeleton) */}
      <Suspense fallback={<BlogPreviewSkeleton />}>
        <BlogPreview />
      </Suspense>

      <Footer />
    </main>
  );
}

// --- PORTFOLIO SKELETON ---
function PortfolioSkeleton() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-t border-gray-200 dark:border-zinc-800">
      <div className="container px-4 md:px-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <div className="h-8 w-40 bg-gray-200 dark:bg-zinc-800 rounded-full" />
            <div className="h-10 w-64 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
            <div className="h-4 w-96 bg-gray-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="hidden md:block h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-full rounded-3xl overflow-hidden bg-white dark:bg-black border border-gray-200 dark:border-zinc-800"
            >
              {/* Image Area */}
              <div className="aspect-[4/3] bg-gray-200 dark:bg-zinc-800" />

              {/* Content Area */}
              <div className="p-6 space-y-4">
                <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded" />
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded" />
                  <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- BLOG SKELETON (Kept from previous steps) ---
function BlogPreviewSkeleton() {
  return (
    <section className="py-24 bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-900">
      <div className="container px-4 md:px-6 animate-pulse">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-gray-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-4 w-96 bg-gray-200 dark:bg-zinc-800 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-gray-200 dark:bg-zinc-800 rounded-3xl mb-6"></div>
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded"></div>
          </div>
          <div className="flex flex-col gap-6 lg:pl-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-24 w-24 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
