"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-zinc-800">
      <div className="container px-4 md:px-6 pt-16 pb-8">
        {/* TOP SECTION: Brand & Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* COLUMN 1: BRAND (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
                <Image
                  src="/logo.jpeg"
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-black dark:text-white">
                Ino<span className="text-primary">Gr</span> Technologies
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              Building the digital infrastructure for Northern Nigeria. We
              combine enterprise-grade engineering with local accessibility.
            </p>

            {/* Socials */}
            <div className="flex gap-4">
              <SocialLink icon={Twitter} href="#" label="Twitter" />
              <SocialLink icon={Instagram} href="#" label="Instagram" />
              <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
              <SocialLink icon={Facebook} href="#" label="Facebook" />
            </div>
          </div>

          {/* COLUMNS 2-5: LINKS */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Tech Services */}
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-6">
                Solutions
              </h4>
              <ul className="space-y-4 text-sm text-gray-500 dark:text-zinc-400">
                <li>
                  <FooterLink href="/software/web">Web Development</FooterLink>
                </li>
                <li>
                  <FooterLink href="/software/mobile">Mobile Apps</FooterLink>
                </li>
                <li>
                  <FooterLink href="/software/ai">AI Integration</FooterLink>
                </li>
                <li>
                  <FooterLink href="/software/backend">
                    Enterprise APIs
                  </FooterLink>
                </li>
              </ul>
            </div>

            {/* Hub Services */}
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-6">
                The Hub
              </h4>
              <ul className="space-y-4 text-sm text-gray-500 dark:text-zinc-400">
                <li>
                  <FooterLink href="/cafe">Café Services</FooterLink>
                </li>
                <li>
                  <FooterLink href="/cafe/branding">Branding</FooterLink>
                </li>
                <li>
                  <FooterLink href="/cafe/printing">Printing & Docs</FooterLink>
                </li>
                <li>
                  <FooterLink href="/cafe/telecom">POS & Data</FooterLink>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-6">
                Company
              </h4>
              <ul className="space-y-4 text-sm text-gray-500 dark:text-zinc-400">
                <li>
                  <FooterLink href="/about">About Us</FooterLink>
                </li>
                <li>
                  <FooterLink href="/careers">Careers</FooterLink>
                </li>
                <li>
                  <FooterLink href="/blog">News & Blog</FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">Contact</FooterLink>
                </li>
              </ul>
            </div>

            {/* Legal / Contact */}
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-6">
                Contact
              </h4>
              <ul className="space-y-4 text-sm text-gray-500 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-primary" />
                  <span>Kebbi State, Nigeria</span>
                </li>
                <li className="flex items-center gap-2 text-wrap">
                  <Mail size={16} className="shrink-0 text-primary" />
                  <span className="">
                    inogrworks
                    <br />
                    @gmail.com
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0 text-primary" />
                  <span>+234 907 145 5425</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: The "Enterprise" Status Bar */}
        <div className="pt-8 mt-16 border-t border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Copyright */}
          <div className="text-sm text-gray-500 dark:text-zinc-500">
            © 2025 InoGr Technologies. All rights reserved.
          </div>

          {/* Right: System Status & Links */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Legal Links */}
            <div className="flex gap-6 text-sm text-gray-500 dark:text-zinc-500 font-medium">
              <Link
                href="/privacy"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>

            {/* THE ENTERPRISE TOUCH: System Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/20">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <span className="text-[11px] font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">
                All Systems Normal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-1 hover:text-primary transition-colors"
    >
      {children}
      <ArrowUpRight
        size={12}
        className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
      />
    </Link>
  );
}

function SocialLink({ icon: Icon, href, label }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-zinc-400 hover:bg-primary hover:text-white transition-all"
    >
      <Icon size={18} />
    </Link>
  );
}
