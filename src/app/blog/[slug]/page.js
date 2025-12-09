import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import Footer from "@/components/layout/footer";
import { getPublicPostBySlug } from "../actions";

// 1. GENERATE METADATA FOR SEO
export async function generateMetadata({ params }) {
  const { slug } = await params; // <--- FIX 1: Await params
  const post = await getPublicPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: "/logo.jpeg",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function BlogPost({ params }) {
  // 2. FETCH DATA ON SERVER
  const { slug } = await params; // <--- FIX 2: Await params here too
  const post = await getPublicPostBySlug(slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <article>
        {/* HERO HEADER */}
        <header className="pt-32 pb-12 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/20">
          <div className="container max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Insights
            </Link>

            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-primary mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar size={16} /> {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} /> {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="container max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid md:grid-cols-4 gap-12">
            {/* MAIN TEXT */}
            <div className="md:col-span-3">
              <div
                className={`w-full aspect-video rounded-3xl mb-12 shadow-2xl overflow-hidden relative ${
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
              </div>

              <div
                className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white 
                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed 
                prose-a:text-primary hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* SIDEBAR */}
            <div className="md:col-span-1 space-y-8 md:sticky md:top-32 h-fit">
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <Share2 size={14} /> Share
                </h4>
                <div className="flex gap-2">
                  <button className="h-10 w-10 rounded-full bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 flex items-center justify-center hover:text-blue-500 transition-colors">
                    <Twitter size={18} />
                  </button>
                  <button className="h-10 w-10 rounded-full bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 flex items-center justify-center hover:text-blue-700 transition-colors">
                    <Facebook size={18} />
                  </button>
                  <button className="h-10 w-10 rounded-full bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 flex items-center justify-center hover:text-blue-600 transition-colors">
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
