import React from "react";
import { ArrowLeft } from "lucide-react";

export default function LoadingPost() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* HEADER */}
      <div className="pt-32 pb-12 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-900">
        <div className="container max-w-3xl mx-auto">
          {/* Back Button */}
          <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded mb-8 animate-pulse" />

          {/* Category Badge */}
          <div className="h-6 w-20 bg-gray-200 dark:bg-zinc-800 rounded mb-4 animate-pulse" />

          {/* Huge Title */}
          <div className="space-y-3 mb-6">
            <div className="h-10 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-10 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          </div>

          {/* Meta Data */}
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Main Article */}
          <div className="md:col-span-3">
            {/* Featured Image */}
            <div className="aspect-video w-full bg-gray-200 dark:bg-zinc-800 rounded-3xl mb-12 animate-pulse" />

            {/* Text Paragraphs */}
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />

              <div className="h-8 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded mt-8 mb-4 animate-pulse" />

              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="h-40 bg-gray-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
