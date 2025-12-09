"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText, Mail } from "lucide-react";
import Footer from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* HEADER */}
      <section className="pt-10 pb-12 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-900">
        <div className="container max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Return Home
          </Link>

          <div className="inline-flex items-center ml-3 gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider mb-6 text-zinc-600 dark:text-zinc-400">
            <Shield size={12} />
            <span>Legal Compliance</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Last Updated:{" "}
            <span className="text-gray-900 dark:text-white font-medium">
              December 7, 2025
            </span>
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container max-w-4xl mx-auto grid md:grid-cols-4 gap-12">
          {/* LEFT: Content */}
          <div className="md:col-span-3 space-y-12">
            <PolicySection
              title="1. Introduction"
              content="InoGr Technologies ('we', 'us', or 'our') respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you."
            />

            <PolicySection
              title="2. The Data We Collect"
              content="We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:"
            >
              <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-600 dark:text-gray-300">
                <li>
                  <strong>Identity Data:</strong> includes first name, last
                  name, username or similar identifier.
                </li>
                <li>
                  <strong>Contact Data:</strong> includes billing address,
                  delivery address, email address and telephone numbers.
                </li>
                <li>
                  <strong>Technical Data:</strong> includes internet protocol
                  (IP) address, browser type and version, time zone setting and
                  location.
                </li>
                <li>
                  <strong>Usage Data:</strong> includes information about how
                  you use our website, products and services.
                </li>
              </ul>
            </PolicySection>

            <PolicySection
              title="3. How We Use Your Data"
              content="We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:"
            >
              <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-600 dark:text-gray-300">
                <li>
                  Where we need to perform the contract we are about to enter
                  into or have entered into with you.
                </li>
                <li>
                  Where it is necessary for our legitimate interests (or those
                  of a third party) and your interests and fundamental rights do
                  not override those interests.
                </li>
                <li>
                  Where we need to comply with a legal or regulatory obligation.
                </li>
              </ul>
            </PolicySection>

            <PolicySection
              title="4. Data Security"
              content="We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know."
            />

            <PolicySection
              title="5. Your Legal Rights"
              content="Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent."
            />
          </div>

          {/* RIGHT: Sidebar (Quick Summary) */}
          <div className="md:col-span-1 space-y-6 md:sticky md:top-32 h-fit">
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                <Lock size={14} /> At a Glance
              </h4>
              <ul className="space-y-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-primary" /> We use encryption
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-primary" /> No data selling
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-primary" /> Cookie control
                </li>
              </ul>
            </div>

            {/* <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                <Mail size={14} /> Contact DPO
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Have questions about your data? Contact our Data Protection
                Officer.
              </p>
              <a
                href="mailto:privacy@inogr.com"
                className="block w-full py-2.5 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 text-center text-sm font-bold hover:border-primary transition-colors"
              >
                privacy@inogr.com
              </a>
            </div> */}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Helper Component for Content Blocks
function PolicySection({ title, content, children }) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
        {content}
      </p>
      {children}
    </section>
  );
}

function Check({ className, size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
