"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Printer,
  PenTool,
  FileText,
  Wifi,
  Coffee,
} from "lucide-react";
import Footer from "@/components/layout/footer";

const SERVICES = [
  {
    slug: "printing",
    title: "Printing & Documentation",
    desc: "High-speed laser printing, photocopying, scanning, and professional binding.",
    icon: Printer,
    color: "text-blue-600",
    bg: "bg-blue-600/10",
  },
  {
    slug: "branding",
    title: "Design & Branding",
    desc: "Logo creation, business cards, flyers, and full corporate identity packages.",
    icon: PenTool,
    color: "text-purple-600",
    bg: "bg-purple-600/10",
  },
  {
    slug: "online",
    title: "Online Services",
    desc: "CAC Registration, JAMB/School forms, Remita payments, and NIN services.",
    icon: FileText,
    color: "text-green-600",
    bg: "bg-green-600/10",
  },
  {
    slug: "telecom",
    title: "POS & Telecom",
    desc: "Instant cash withdrawal, transfer, airtime top-up, and data bundles.",
    icon: Wifi,
    color: "text-orange-600",
    bg: "bg-orange-600/10",
  },
];

export default function CafePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* HERO: Warm & Welcoming */}
      <section className="pt-10 pb-12 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-800">
        <div className="container max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-xs font-bold uppercase tracking-wider mb-6 text-orange-700 dark:text-orange-400">
            <Coffee size={12} />
            <span>The Digital Hub</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-4 leading-[1.1]">
            Essential <span className="text-primary">Services.</span>
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
            From business registration to high-quality printing. We provide the
            essential tools students and businesses need to operate.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 divide-y md:divide-y-0 divide-gray-100 dark:divide-zinc-900 border-t border-b md:border-0 border-gray-100 dark:border-zinc-900">
            {SERVICES.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/cafe/${service.slug}`}
                className="block group"
              >
                <div
                  className="py-6 md:p-8 md:rounded-3xl md:bg-zinc-50 md:dark:bg-zinc-900/50 md:border border-transparent md:hover:border-primary/20 transition-all flex md:flex-col items-center md:items-start gap-4 md:gap-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${idx * 100}ms` }}
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
                      View Menu{" "}
                      <ArrowRight size={16} className="text-primary" />
                    </div>
                  </div>

                  {/* Mobile Chevron */}
                  <ArrowRight size={16} className="text-gray-300 md:hidden" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
