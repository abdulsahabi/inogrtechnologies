"use client";

import React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Printer,
  PenTool,
  FileText,
  Wifi,
  ArrowRight,
  Star,
} from "lucide-react";
import Footer from "@/components/layout/footer";

const DATA = {
  printing: {
    title: "Printing & Documentation",
    subtitle: "High-Definition Prints & Binding",
    description:
      "We offer professional printing services for students and businesses. From final year projects to office memos, our laser printers ensure sharp text and vibrant colors.",
    icon: Printer,
    menuTitle: "Available Services",
    menu: [
      "A4 / A3 Laser Printing",
      "Photocopying & Scanning",
      "Spiral & Hardcover Binding",
      "Project Formatting",
      "Lamination (ID Card / A4)",
      "Typesetting & Editing",
    ],
    features: [
      "Instant Delivery",
      "Student Discounts",
      "Bulk Printing Support",
      "Confidentiality",
    ],
  },
  branding: {
    title: "Design & Branding",
    subtitle: "Visual Identity for Businesses",
    description:
      "Stand out with professional graphics. Our design team creates logos, flyers, and business cards that give your brand a premium look.",
    icon: PenTool,
    menuTitle: "Design Packages",
    menu: [
      "Logo Design",
      "Business Cards",
      "Flyers & Posters",
      "Letterheads",
      "Social Media Graphics",
      "Brand Guidelines",
    ],
    features: [
      "Unique Concepts",
      "High-Res Files",
      "Fast Turnaround",
      "Revisions Included",
    ],
  },
  online: {
    title: "Online Services",
    subtitle: "Registrations & Applications",
    description:
      "Skip the stress of navigating complex portals. We handle official registrations for CAC, Schools, and Government agencies accurately.",
    icon: FileText,
    menuTitle: "Registration Support",
    menu: [
      "CAC Business Name",
      "JAMB / WAEC Registration",
      "School Admission Forms",
      "Remita Payments",
      "NIN / NIMC Services",
      "Email & CV Creation",
    ],
    features: [
      "Accredited Agents",
      "Error-Free Data Entry",
      "Instant Confirmation",
      "Support",
    ],
  },
  telecom: {
    title: "POS & Telecom",
    subtitle: "Cash & Connectivity",
    description:
      "Your local financial point. Withdraw cash, transfer funds, or top up your data instantly without visiting the bank.",
    icon: Wifi,
    menuTitle: "Transaction Menu",
    menu: [
      "Cash Withdrawal (POS)",
      "Bank Transfers",
      "MTN / Airtel / Glo Data",
      "Airtime Top-up",
      "Electricity Bills",
      "Cable TV Subs (DSTV/GOTV)",
    ],
    features: [
      "Low Charges",
      "Instant Reflection",
      "Network Reliability",
      "Open Late",
    ],
  },
};

export default function CafeServiceDetail() {
  const { slug } = useParams();
  const service = DATA[slug];

  if (!service) return notFound();

  const Icon = service.icon;

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* HEADER */}
      <section className="pt-10 pb-12 px-4 md:px-6 border-b border-gray-100 dark:border-zinc-900">
        <div className="container max-w-4xl mx-auto">
          <Link
            href="/cafe"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Hub
          </Link>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0 text-orange-600 dark:text-orange-500">
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

      {/* CONTENT */}
      <section className="py-12 px-4 md:px-6">
        <div className="container max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
          {/* LEFT: Info */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                Description
              </h3>
              <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                Why Choose Us
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

          {/* RIGHT: Menu & CTA */}
          <div className="space-y-8 md:sticky md:top-32 h-fit">
            {/* Service Menu */}
            <div className="border-t border-gray-100 dark:border-zinc-800 pt-6 md:pt-0 md:border-0">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                {service.menuTitle}
              </h4>
              <div className="flex flex-col gap-2">
                {service.menu.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-zinc-900 last:border-0"
                  >
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {item}
                    </span>
                    <Star size={12} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Need this service?
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Visit our hub or chat with us to get started instantly.
              </p>

              <div className="space-y-3">
                {/* Primary: Chat */}
                <a
                  href="https://wa.me/234801234567"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors active:scale-95"
                >
                  WhatsApp Us <ArrowRight size={16} />
                </a>

                {/* Secondary: Contact Page */}
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Find Location
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
