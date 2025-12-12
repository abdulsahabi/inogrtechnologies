import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Layers, Cpu } from "lucide-react";
import Footer from "@/components/layout/footer";
import { getPublicProjectBySlug } from "../actions";

// 1. IMPORT QUILL STYLES (Crucial for rendering the rich text)
import "react-quill-new/dist/quill.snow.css";

// 2. DYNAMIC METADATA
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study`,
    description: project.desc.replace(/<[^>]*>?/gm, "").substring(0, 160), // Strip HTML for SEO desc
    openGraph: {
      title: project.title,
      description: project.desc.replace(/<[^>]*>?/gm, "").substring(0, 160),
      images: [
        {
          url: project.image?.startsWith("http") ? project.image : "/logo.jpeg",
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }) {
  // 3. FETCH REAL DATA
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-6 pb-20 px-4 md:px-6 overflow-hidden">
        {/* Background Image (Blurred) */}
        <div className="absolute inset-0 z-0">
          {project.image?.startsWith("bg-") ? (
            <div
              className={`w-full h-full ${project.image} opacity-20 dark:opacity-10`}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.image}
              alt=""
              className="w-full h-full object-cover opacity-20 dark:opacity-10 blur-3xl"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-black dark:via-transparent dark:to-black" />
        </div>

        <div className="container max-w-5xl mx-auto relative z-10">
          {/* Back Link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Work
          </Link>

          {/* Title & Badge */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                <Layers size={12} /> {project.category}
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white leading-[1.1]">
                {project.title}
              </h1>
            </div>

            {/* Year Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
              <Calendar size={16} className="text-gray-500" />
              <span className="font-mono font-bold text-gray-900 dark:text-white">
                {project.year}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SHOWCASE IMAGE --- */}
      <section className="px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
            {project.image?.startsWith("bg-") ? (
              <div className={`absolute inset-0 ${project.image}`} />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* --- CONTENT & DETAILS --- */}
      <section className="py-20 px-4 md:px-6">
        <div className="container max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Main Content (RICH TEXT) */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                The Overview
              </h3>

              {/* THE FIX: Use Quill classes to render HTML correctly */}
              <div className="ql-snow">
                <div
                  className="ql-editor !p-0 !h-auto !min-h-0 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sans"
                  dangerouslySetInnerHTML={{ __html: project.desc }}
                />
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200 dark:border-zinc-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Cpu size={18} className="text-primary" /> Tech Stack
              </h4>

              {/* Handle Tag String (e.g. "React,Firebase") or Array */}
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(project.tags)
                  ? project.tags
                  : (project.tags || "").split(",")
                ).map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 shadow-sm"
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-black dark:bg-white p-6 rounded-3xl text-white dark:text-black shadow-xl">
              <h4 className="font-bold text-lg mb-2">
                Need something similar?
              </h4>
              <p className="text-sm opacity-80 mb-6">
                Let's build your next big project together.
              </p>
              <Link
                href="/contact"
                className="block w-full py-3 bg-primary hover:bg-primary-dark text-white text-center font-bold rounded-xl transition-colors"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
