"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Brain,
  Palette,
  Server,
  Terminal,
} from "lucide-react";
import Footer from "@/components/layout/footer";

const SERVICES = [
  {
    slug: "web",
    title: "Web Development",
    desc: "Scalable websites & SaaS platforms.",
    icon: Code2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    slug: "mobile",
    title: "Mobile Apps",
    desc: "Native iOS & Android solutions.",
    icon: Smartphone,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    slug: "ai",
    title: "AI & Machine Learning",
    desc: "Automation & chatbots.",
    icon: Brain,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    slug: "design",
    title: "UI/UX Design",
    desc: "User-centric interfaces.",
    icon: Palette,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    slug: "backend",
    title: "Backend Systems",
    desc: "Robust APIs & databases.",
    icon: Server,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export default function SoftwarePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* HERO: Clean, Fast, No Heavy Images */}
      <section className="pt-32 pb-12 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-800">
        <div className="container max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider mb-6 text-zinc-600 dark:text-zinc-400">
            <Terminal size={12} />
            <span>Engineering</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-4 leading-[1.1]">
            Digital <span className="text-primary">Empires.</span>
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
            Enterprise-grade technical solutions. Built for scale, optimized for
            speed.
          </p>
        </div>
      </section>

      {/* SERVICES: List View (Mobile) / Grid (Desktop) */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          {/* Mobile: A clean, bordered list (No Shadows) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 divide-y md:divide-y-0 divide-gray-100 dark:divide-zinc-900 border-t border-b md:border-0 border-gray-100 dark:border-zinc-900">
            {SERVICES.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/software/${service.slug}`}
                className="block group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }} // Faster animation
                  className="py-6 md:p-8 md:rounded-3xl md:bg-zinc-50 md:dark:bg-zinc-900/50 md:border border-transparent md:hover:border-primary/20 transition-all flex md:flex-col items-center md:items-start gap-4 md:gap-0"
                >
                  {/* Icon */}
                  <div
                    className={`h-10 w-10 md:h-12 md:w-12 rounded-xl ${service.bg} ${service.color} flex items-center justify-center md:mb-6 shrink-0`}
                  >
                    <service.icon size={20} className="md:w-6 md:h-6" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed md:mb-6 line-clamp-2 md:line-clamp-none">
                      {service.desc}
                    </p>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:gap-3 transition-all">
                      Details <ArrowRight size={16} className="text-primary" />
                    </div>
                  </div>

                  {/* Mobile Chevron (Standard iOS pattern) */}
                  <ArrowRight size={16} className="text-gray-300 md:hidden" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
