"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // <--- IMPORTED IMAGE COMPONENT
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Coffee,
  Target,
  Users,
  Globe,
  Award,
  ChevronRight,
  CheckCircle2,
  Building2,
} from "lucide-react";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission"); // mission | vision | values

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* 1. HERO SECTION */}
      <section className="pt-10 pb-16 md:pb-24 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

        <div className="container max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider mb-6 text-zinc-600 dark:text-zinc-400 animate-in fade-in zoom-in duration-500">
            <Building2 size={12} />
            <span>Since 2024</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-[1.1] animate-in slide-in-from-bottom-4 fade-in duration-700">
            Innovating for Kebbi. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">
              Connecting the World.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100">
            InoGr Technologies is a hybrid technology company. We blend high-end
            software engineering with essential community services to bridge the
            digital divide in Northern Nigeria.
          </p>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="py-12 border-b border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <StatItem number="50+" label="Projects Shipped" delay={0} />

            <StatItem number="99%" label="Uptime Guarantee" delay={200} />
            <StatItem number="24/7" label="Hub Accessibility" delay={300} />
          </div>
        </div>
      </section>

      {/* 3. DNA SECTION */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: The Story */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Two Worlds. <br /> One{" "}
                <span className="text-primary">Ecosystem.</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                We noticed a gap. While the world was racing towards AI and
                Cloud Computing, our local community in Kebbi still struggled
                with basic digital access.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <strong>InoGr was born to fix both.</strong> We built a
                world-class software team to serve global clients, and used the
                resources to build a state-of-the-art Digital Hub for students
                and locals.
              </p>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/contact"
                  className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  Work With Us
                </Link>
                <Link
                  href="/cafe"
                  className="px-8 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  Visit The Hub
                </Link>
              </div>
            </div>

            {/* Right: DNA Cards */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-[100px] rounded-full opacity-50"></div>

              <div className="relative space-y-4">
                <div className="group p-6 rounded-3xl bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 shadow-xl hover:border-primary/50 transition-all">
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-4">
                    <Code2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Engineering Arm
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Building SaaS platforms, Mobile Apps, and AI tools for
                    businesses across Nigeria and beyond.
                  </p>
                </div>

                <div className="group p-6 rounded-3xl bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 shadow-xl hover:border-orange-500/50 transition-all md:translate-x-8">
                  <div className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center mb-4">
                    <Coffee size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Community Hub
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Providing high-speed internet, printing, and digital
                    registration services for 5,000+ students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUES SECTION */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-900/30">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Philosophy
            </h2>

            <div className="inline-flex p-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl mx-auto">
              {["mission", "vision", "values"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all",
                    activeTab === tab
                      ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              {activeTab === "mission" && (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 p-8 md:p-12 rounded-3xl text-center shadow-sm"
                >
                  <div className="h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                    <Target size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    The Mission
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {'"'}To democratize access to world-class technology in
                    Northern Nigeria by building superior software solutions
                    while simultaneously providing the physical infrastructure
                    students need to succeed.{'"'}
                  </p>
                </motion.div>
              )}

              {activeTab === "vision" && (
                <motion.div
                  key="vision"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 p-8 md:p-12 rounded-3xl text-center shadow-sm"
                >
                  <div className="h-16 w-16 mx-auto bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-purple-600 mb-6">
                    <Globe size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    The Vision
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {'"'}To become the undisputed technology hub of Kebbi State,
                    creating a ripple effect that turns the region into a center
                    for digital innovation and entrepreneurship by 2030.{'"'}
                  </p>
                </motion.div>
              )}

              {activeTab === "values" && (
                <motion.div
                  key="values"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid md:grid-cols-3 gap-6"
                >
                  <ValueCard
                    title="Excellence"
                    desc="We don't ship average code. Every pixel matters."
                    icon={Award}
                    color="text-yellow-500"
                    bg="bg-yellow-500/10"
                  />
                  <ValueCard
                    title="Accessibility"
                    desc="Tech shouldn't be for the elite. We keep barriers low."
                    icon={Users}
                    color="text-blue-500"
                    bg="bg-blue-500/10"
                  />
                  <ValueCard
                    title="Integrity"
                    desc="We deliver what we promise. No hidden fees."
                    icon={CheckCircle2}
                    color="text-green-500"
                    bg="bg-green-500/10"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. TEAM TEASER */}
      <section className="py-20 px-4 md:px-6 border-t border-gray-100 dark:border-zinc-900">
        <div className="container max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Meet the Minds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember
              name="Sahabi Abdulrahaman"
              role="Lead Software Engineer"
              image="/abdul.jpeg"
            />
            <TeamMember
              name="Adamu Danjumma"
              role="Head of Operations"
              image="/adamu.jpeg"
            />
            <TeamMember
              name="Sahal Abdullahi"
              role="Creative Director"
              image="/sahal.jpeg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// --- SUB-COMPONENTS ---

function StatItem({ number, label, delay }) {
  return (
    <div
      className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
        {number}
      </div>
      <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {label}
      </div>
    </div>
  );
}

function ValueCard({ title, desc, icon: Icon, color, bg }) {
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 p-6 rounded-2xl text-left">
      <div
        className={`h-12 w-12 rounded-xl ${bg} ${color} flex items-center justify-center mb-4`}
      >
        <Icon size={24} />
      </div>
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
  );
}

// UPDATED TEAM MEMBER COMPONENT
function TeamMember({ name, role, image }) {
  return (
    <div className="group">
      <div className="aspect-square rounded-3xl bg-gray-100 dark:bg-zinc-900 mb-4 overflow-hidden relative border border-gray-100 dark:border-zinc-800">
        {/* Render Image if provided, else fallback to Icon */}
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-zinc-700">
            <Users size={48} />
          </div>
        )}

        {/* Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        {name}
      </h3>
      <p className="text-primary font-medium text-sm">{role}</p>
    </div>
  );
}
