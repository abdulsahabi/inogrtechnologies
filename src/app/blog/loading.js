import React from "react";
import { Newspaper, Search } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* HEADER SKELETON */}
      <section className="pt-32 pb-12 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-900">
        <div className="container max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl w-full">
              {/* Badge Skeleton */}
              <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded-full mb-6 animate-pulse" />

              {/* Title Skeleton */}
              <div className="h-12 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-lg mb-4 animate-pulse" />

              {/* Subtitle Skeleton */}
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            </div>

            {/* Search Skeleton */}
            <div className="w-full md:w-[300px] h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
          </div>

          {/* Categories Skeleton */}
          <div className="flex gap-2 mt-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 w-24 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>

      {/* GRID SKELETON */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col h-full">
                {/* Image Placeholder */}
                <div className="aspect-[16/9] rounded-2xl bg-gray-200 dark:bg-zinc-800 animate-pulse mb-6" />

                {/* Meta Row */}
                <div className="flex gap-4 mb-3">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>

                {/* Title */}
                <div className="h-8 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-3" />

                {/* Excerpt */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
