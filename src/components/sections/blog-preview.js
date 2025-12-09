import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { getPublicPosts } from "@/app/blog/actions"; // Use the Server Action

export default async function BlogPreview() {
  // 1. FETCH REAL DATA
  const allPosts = await getPublicPosts();

  // 2. SLICE DATA
  // If no posts, we might want to hide the section or show a "Coming Soon"
  if (!allPosts || allPosts.length === 0) return null;

  const featuredPost = allPosts[0];
  const recentPosts = allPosts.slice(1, 4);

  return (
    <section className="py-20 md:py-24 bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-900">
      <div className="container px-4 md:px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Latest <span className="text-primary">Insights</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg text-sm md:text-base">
              Tech trends, student resources, and updates from the hub.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>

        {/* ASYMMETRIC GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* --- LEFT COLUMN: FEATURED POST --- */}
          <div className="lg:col-span-2 group flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="block relative overflow-hidden rounded-3xl aspect-video md:aspect-[2/1] mb-6"
            >
              {/* Image Handling */}
              <div
                className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${
                  featuredPost.image?.startsWith("bg-")
                    ? featuredPost.image
                    : "bg-gray-100"
                }`}
              >
                {!featuredPost.image?.startsWith("bg-") && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

              {/* Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
                  <Tag size={12} /> {featuredPost.category}
                </span>
              </div>
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {featuredPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {featuredPost.readTime}
                </span>
              </div>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="block group-hover:text-primary transition-colors"
              >
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  {featuredPost.title}
                </h3>
              </Link>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all pt-1"
              >
                Read Full Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* --- RIGHT COLUMN: RECENT LIST --- */}
          <div className="flex flex-col gap-6 lg:border-l border-gray-100 dark:border-zinc-800 lg:pl-12">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
              Recent Updates
            </h4>

            {recentPosts.map((post, idx) => (
              <div
                key={post.id}
                className="animate-in fade-in slide-in-from-right-4 duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex gap-4 items-start"
                >
                  {/* Thumbnail */}
                  <div
                    className={`shrink-0 h-24 w-24 rounded-2xl overflow-hidden relative ${
                      post.image?.startsWith("bg-") ? post.image : "bg-gray-100"
                    }`}
                  >
                    {!post.image?.startsWith("bg-") && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-center h-24">
                    <span className="text-[10px] font-bold uppercase text-primary mb-1">
                      {post.category}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-2 text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span className="text-gray-300">•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

            <Link
              href="/blog"
              className="mt-4 flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              View Archive <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
