"use client";

import React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Code2,
  Smartphone,
  Brain,
  Palette,
  Server,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/layout/footer";

const DATA = {
  web: {
    title: "Enterprise Web Development",
    subtitle: "Scalable Digital Ecosystems & SaaS Platforms",
    description:
      "We engineer robust, future-proof web solutions designed for high scalability and conversion. From complex B2B dashboards to immersive B2C platforms, we utilize Next.js and server-side rendering to deliver sub-second load times, superior SEO ranking, and enterprise-grade security standards.",
    icon: Code2,
    features: [
      "Progressive Web App (PWA) Architecture",
      "Advanced SEO & Core Web Vitals Optimization",
      "Headless CMS & Dynamic Content Modeling",
      "WCAG 2.1 Accessibility Compliance",
      "Global CDN & Edge Caching Integration",
    ],
    tech: [
      "PHP",
      "Laravel",
      "MySQL",
      "Node.js",
      "Express.js",
      "Next.js 16",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Redis",
      "Shared Hosting",
      "TanStack Query", // Added for state/data management
      "Shadcn/UI", // Added for accessible component systems
      "Playwright", // Added for E2E testing
      "Vercel", // Added for deployment
      "Zod", // Added for schema validation
    ],
  },
  mobile: {
    title: "Mobile Application Engineering",
    subtitle: "Native-Grade iOS & Android Experiences",
    description:
      "Extend your digital footprint to mobile with high-fidelity applications. We leverage a unified codebase architecture to deploy strictly native-feeling apps to both the App Store and Play Store simultaneously, ensuring feature parity, rapid iteration cycles, and seamless hardware integration.",
    icon: Smartphone,
    features: [
      "Cross-Platform Native Modules",
      "Offline-First Architecture & Data Sync",
      "Biometric Authentication (FaceID/TouchID)",
      "Deep Linking & Push Notification Systems",
      "Automated CI/CD Store Deployment",
    ],
    tech: [
      "React Native",
      "Flutter",
      "TypeScript",
      "Redux Toolkit",
      "GraphQL",

      "Expo Application Services",
      "Firebase Suite",
      "SQLite/Realm",
      "NativeWind",
      "React Navigation", // Added for routing
      "Fastlane", // Added for deployment automation
      "Detox", // Added for grey-box testing
      "Swift/Kotlin", // Added for custom native modules
      "Tamagui", // Added for high-performance UI
    ],
  },
  ai: {
    title: "AI & Cognitive Computing",
    subtitle: "Data-Driven Automation & Intelligence",
    description:
      "Transform raw data into actionable insights. We integrate cutting-edge Large Language Models (LLMs) and predictive algorithms into your business logic to automate complex support workflows, personalize user experiences, and provide real-time decision support systems.",
    icon: Brain,
    features: [
      "Context-Aware Conversational Agents (RAG)",
      "Predictive Analytics & Customer Churn Modeling",
      "Automated Document Processing & OCR",
      "Fine-Tuned Proprietary Models",
      "Vector Database Integration",
    ],
    tech: [
      "Python",
      "LangChain",
      "OpenAI API",
      "TensorFlow",
      "Pinecone",
      "Hugging Face",
      "PyTorch", // Added for deep learning framework
      "LlamaIndex", // Added specifically for RAG data ingestion
      "Anthropic Claude", // Added as alternative LLM
      "Pandas/NumPy", // Added for data manipulation
      "Scikit-learn", // Added for traditional ML algorithms
    ],
  },
  design: {
    title: "Strategic UI/UX Design",
    subtitle: "Human-Centric Digital Interfaces",
    description:
      "We bridge the gap between user needs and business goals. Our design process relies on data-driven user research and iterative testing to create design systems that ensure brand consistency, reduce cognitive load, and maximize user retention across all touchpoints.",
    icon: Palette,
    features: [
      "User Journey Mapping & Persona Research",
      "High-Fidelity Interactive Prototyping",
      "Atomic Design Systems & Component Libraries",
      "A/B Testing & Usability Audits",
      "Motion Design & Micro-interactions",
    ],
    tech: [
      "Figma",
      "Adobe XD",
      "Framer",
      "Lottie",
      "Storybook",
      "Miro", // Added for whiteboarding/flows
      "Adobe After Effects", // Added for advanced motion design
      "Maze", // Added for user testing
      "Zeplin", // Added for developer handoff
    ],
  },
  backend: {
    title: "Cloud Infrastructure & Backend",
    subtitle: "High-Availability Distributed Systems",
    description:
      "The backbone of your technology. We architect secure, microservices-ready backends capable of handling massive concurrency. Our focus is on data integrity, zero-downtime deployments, and banking-grade security protocols to protect your sensitive intellectual property.",
    icon: Server,
    features: [
      "RESTful & GraphQL API Architecture",
      "Database Sharding & Optimization",
      "Role-Based Access Control (RBAC)",
      "Containerization & Orchestration",
      "Real-time Socket Communication",
    ],
    tech: [
      "Node.js",
      "NestJS",
      "Supabase",
      "AWS (Lambda/S3)",
      "Docker",
      "Kubernetes",
      "Terraform", // Added for Infrastructure as Code
      "Kafka", // Added for event streaming
      "Prisma", // Added for ORM
      "GraphQL", // Added for flexible API queries
      "Datadog", // Added for monitoring/logging
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = DATA[slug];

  if (!service) return notFound();

  const Icon = service.icon;

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* HEADER: Compact & Clean */}
      <section className="pt-1 pb-12 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-900">
        <div className="container max-w-4xl mx-auto">
          <Link
            href="/software"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> All Services
          </Link>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <Icon size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                {service.title}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {service.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT: Flat Design (No Shadows) */}
      <section className="py-12 px-4 md:px-6">
        <div className="container max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
          {/* LEFT: Info */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                Overview
              </h3>
              <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                What{"'"}s Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 py-3 px-4 rounded-lg bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800"
                  >
                    <Check size={16} className="text-primary" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Tech & CTA (Sticky on Desktop) */}
          <div className="space-y-8 md:sticky md:top-32 h-fit">
            {/* Tech Stack: Clean Tags */}
            <div className="border-t border-gray-100 dark:border-zinc-800 pt-6 md:pt-0 md:border-0">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA: Flat Button, High Contrast */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Ready to Start?
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Let{"'"}s discuss how we can build this for your business.
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors active:scale-95"
              >
                Get a Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
