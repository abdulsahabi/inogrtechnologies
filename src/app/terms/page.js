"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Scale,
  FileText,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import Footer from "@/components/layout/footer";

export default function TermsPage() {
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

          <div className="inline-flex ml-3 items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider mb-6 text-zinc-600 dark:text-zinc-400">
            <Scale size={12} />
            <span>Legal Agreement</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Terms of Service
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
          {/* LEFT: Content (3 Cols) */}
          <div className="md:col-span-3 space-y-12">
            <TermSection
              title="1. Acceptance of Terms"
              content="By accessing and using the services provided by InoGr Technologies ('we', 'us', or 'our'), including our Software Solutions and InoGr Hub Café services, you agree to comply with and be bound by the following terms and conditions."
            />

            <TermSection
              title="2. Services Provided"
              content="InoGr Technologies operates as a hybrid technology company providing:"
            >
              <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-600 dark:text-gray-300">
                <li>
                  <strong>Software Development:</strong> Custom web, mobile, and
                  AI solutions for enterprise and individual clients.
                </li>
                <li>
                  <strong>Café & Hub Services:</strong> Physical services
                  including printing, internet access, branding, and POS
                  transactions at our Kebbi State location.
                </li>
              </ul>
            </TermSection>

            <TermSection
              title="3. Payments & Refunds"
              content="Payment terms vary by service:"
            >
              <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-600 dark:text-gray-300">
                <li>
                  <strong>Software Projects:</strong> Require a 60% upfront
                  deposit before work commences. The remaining balance is due
                  upon project completion. Refunds are only issued if we fail to
                  deliver the agreed-upon scope.
                </li>
                <li>
                  <strong>Café Services:</strong> All physical services
                  (printing, registration) must be paid for immediately upon
                  service delivery. No refunds are issued for printed materials
                  once approved by the customer.
                </li>
              </ul>
            </TermSection>

            <TermSection
              title="4. User Responsibilities"
              content="You agree to use our services only for lawful purposes. You must not use our digital platforms or physical hub to transmit any material that is offensive, defamatory, or infringes on intellectual property rights."
            />

            <TermSection
              title="5. Limitation of Liability"
              content="InoGr Technologies shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our services. For data services (NIN/CAC), we act as processing agents and are not liable for delays caused by government server downtimes."
            />

            <TermSection
              title="6. Changes to Terms"
              content="We reserve the right to modify these terms at any time. Significant changes will be communicated via our website or email newsletter."
            />
          </div>

          {/* RIGHT: Sidebar (Sticky) */}
          <div className="md:col-span-1 space-y-6 md:sticky md:top-32 h-fit">
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                <AlertCircle size={14} /> Key Highlights
              </h4>
              <ul className="space-y-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span> No refunds on printed
                  items.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span> 60% deposit for dev
                  projects.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span> Lawful use only.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                <HelpCircle size={14} /> Questions?
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Clarify any part of this agreement before using our services.
              </p>
              <Link
                href="/contact"
                className="block w-full py-2.5 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 text-center text-sm font-bold hover:border-primary transition-colors"
              >
                Contact Legal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Helper Component for Content Blocks
function TermSection({ title, content, children }) {
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
