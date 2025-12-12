import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white dark:bg-black animate-pulse">
      {/* --- HERO SKELETON --- */}
      <section className="relative pt-6 pb-20 px-4 md:px-6 overflow-hidden">
        <div className="container max-w-5xl mx-auto relative z-10">
          {/* Back Link Placeholder */}
          <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded mb-8" />

          {/* Title & Badge Placeholder */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-4 w-full md:w-2/3">
              {/* Category Badge */}
              <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded-full" />
              {/* Title */}
              <div className="h-12 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
            </div>

            {/* Year Badge Placeholder */}
            <div className="h-10 w-20 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
          </div>
        </div>
      </section>

      {/* --- IMAGE SKELETON --- */}
      <section className="px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="w-full aspect-video rounded-3xl bg-gray-200 dark:bg-zinc-800" />
        </div>
      </section>

      {/* --- CONTENT SKELETON --- */}
      <section className="py-20 px-4 md:px-6">
        <div className="container max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Main Content Placeholder */}
          <div className="md:col-span-2 space-y-8">
            <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-800 rounded" />

            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
            </div>

            <div className="space-y-4 pt-4">
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-4/5 bg-gray-200 dark:bg-zinc-800 rounded" />
            </div>
          </div>

          {/* Sidebar Placeholder */}
          <div className="space-y-8">
            {/* Tech Stack Card */}
            <div className="h-40 w-full bg-gray-200 dark:bg-zinc-800 rounded-3xl" />
            {/* CTA Card */}
            <div className="h-48 w-full bg-gray-200 dark:bg-zinc-800 rounded-3xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
