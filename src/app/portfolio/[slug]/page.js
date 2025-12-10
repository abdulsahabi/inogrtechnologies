import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Calendar, User } from "lucide-react";
import Footer from "@/components/layout/footer";

// MOCK DETAILS (Replace with Firebase fetch later)
const PROJECT_DETAILS = {
  "kebbi-health-portal": {
    title: "Kebbi State Health Portal",
    category: "Web Development",
    client: "Ministry of Health",
    timeline: "3 Months",
    image: "bg-gradient-to-br from-blue-900 to-slate-900",
    challenge:
      "The state hospitals were relying on paper records, leading to slow patient processing and lost data.",
    solution:
      "We built a secure, cloud-based Patient Management System (PMS) using Next.js and Firebase. It allows doctors to retrieve patient history in seconds.",
    results: [
      "50% reduction in patient wait times",
      "Zero data loss in first 6 months",
      "Deployed to 5 major hospitals",
    ],
    tech: ["Next.js 14", "Firebase Auth", "Firestore", "Tailwind CSS"],
  },
  // Add others or handle default...
};

export default function ProjectPage({ params }) {
  const slug = params.slug;
  const project = PROJECT_DETAILS[slug];

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* HERO */}
      <section
        className={`pt-40 pb-20 px-4 md:px-6 relative overflow-hidden ${project.image}`}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container max-w-5xl mx-auto relative z-10 text-white">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Work
          </Link>
          <span className="block text-sm font-bold uppercase tracking-wider text-primary mb-4">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
            {project.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/20 pt-8">
            <div>
              <span className="text-xs text-white/60 uppercase block mb-1">
                Client
              </span>
              <span className="font-bold">{project.client}</span>
            </div>
            <div>
              <span className="text-xs text-white/60 uppercase block mb-1">
                Timeline
              </span>
              <span className="font-bold">{project.timeline}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 px-4 md:px-6">
        <div className="container max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Main Story */}
          <div className="md:col-span-2 space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                The Challenge
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                The Solution
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Key Results
              </h3>
              <ul className="space-y-3">
                {project.results.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                  >
                    <CheckCircle2
                      className="text-primary shrink-0 mt-1"
                      size={18}
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
