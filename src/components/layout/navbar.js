"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Code2,
  Smartphone,
  Brain,
  Palette,
  Server,
  Printer,
  PenTool,
  Wifi,
  FileText,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Users, // Imported for generic team icon
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION ---
const navConfig = [
  { name: "Home", href: "/", type: "link" },
  {
    name: "Software Solutions",
    href: "/software",
    type: "dropdown",
    items: [
      {
        title: "Web Development",
        href: "/software/web",
        icon: Code2,
        desc: "Scalable websites & SaaS",
      },
      {
        title: "Mobile Apps",
        href: "/software/mobile",
        icon: Smartphone,
        desc: "iOS & Android solutions",
      },
      {
        title: "AI & ML",
        href: "/software/ai",
        icon: Brain,
        desc: "Smart automation & chatbots",
      },
      {
        title: "UI/UX Design",
        href: "/software/design",
        icon: Palette,
        desc: "User-centric interfaces",
      },
      {
        title: "Backend Systems",
        href: "/software/backend",
        icon: Server,
        desc: "Robust APIs & databases",
      },
    ],
  },
  {
    name: "Café Services",
    href: "/cafe",
    type: "dropdown",
    items: [
      {
        title: "Printing & Docs",
        href: "/cafe/printing",
        icon: Printer,
        desc: "High-quality printing",
      },
      {
        title: "Design & Branding",
        href: "/cafe/branding",
        icon: PenTool,
        desc: "Logos & business cards",
      },
      {
        title: "Online Services",
        href: "/cafe/online",
        icon: FileText,
        desc: "CAC & Govt registrations",
      },
      {
        title: "POS & Telecom",
        href: "/cafe/telecom",
        icon: Wifi,
        desc: "Payments, airtime & data",
      },
    ],
  },
  {
    name: "Blog",
    href: "/blog",
    type: "dropdown",
    items: [
      {
        title: "Tech Trends",
        href: "/blog?category=Tech",
        icon: TrendingUp,
        desc: "Latest in AI & Code",
      },
      {
        title: "Business Guide",
        href: "/blog?category=Business",
        icon: Briefcase,
        desc: "CAC & Startups",
      },
      {
        title: "Student Life",
        href: "/blog?category=Student Life",
        icon: GraduationCap,
        desc: "Campus Resources",
      },
      {
        title: "Design & Creative",
        href: "/blog?category=Design",
        icon: Palette,
        desc: "Visual trends",
      },
    ],
  },
  // --- UPDATED ABOUT SECTION (With Team Images) ---
  {
    name: "About",
    href: "/about",
    type: "dropdown",
    items: [
      {
        title: "Our Mission",
        href: "/about",
        icon: Users,
        desc: "Vision & Philosophy",
      },
      // TEAM MEMBERS (Using 'image' instead of 'icon')
      {
        title: "Abdulrahaman",
        href: "/about",
        image: "/abdul.jpeg",
        desc: "Lead Software Engineer",
      },
      {
        title: "Adamu",
        href: "/about",
        image: "/adamu.jpeg",
        desc: "Head of Operations",
      },
      {
        title: "Sahal",
        href: "/about",
        image: "/sahal.jpeg",
        desc: "Creative Director",
      },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState(null);
  const pathname = usePathname();

  // ENTERPRISE LOGIC: Hide Navbar on Admin Pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock Body Scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <nav
        onMouseLeave={() => setHoveredIndex(null)}
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b",
          scrolled
            ? "border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-sm"
            : "border-transparent bg-transparent backdrop-blur-none"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-20 items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 group z-50">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors">
                <Image
                  src="/logo.jpeg"
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-black dark:text-white">
                <span className="text-primary">Technologies</span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-2">
              {navConfig.map((item, idx) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(idx)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-1",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    {item.name}
                    {item.type === "dropdown" && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform",
                          hoveredIndex === idx ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {hoveredIndex === idx && item.type === "dropdown" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[350px] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden p-2"
                      >
                        <div className="grid gap-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                            >
                              {/* RENDER LOGIC: Image vs Icon */}
                              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                {subItem.image ? (
                                  <Image
                                    src={subItem.image}
                                    alt={subItem.title}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <subItem.icon size={20} />
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                  {subItem.title}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                  {subItem.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/contact"
                className="bg-primary px-6 py-2 rounded-full text-white font-medium hover:bg-primary-dark transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* MOBILE TOGGLE BUTTON */}
            <div className="flex md:hidden gap-4 items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="text-gray-600 dark:text-gray-300 p-2"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-black md:hidden flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100 dark:border-gray-800">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20">
                  <Image
                    src="/logo.jpeg"
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight text-black dark:text-white">
                  <span className="text-primary">Technologies</span>
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {navConfig.map((item, idx) => (
                <div
                  key={item.name}
                  className="border-b border-gray-100 dark:border-gray-800 pb-4"
                >
                  {item.type === "link" ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-2xl font-bold text-gray-800 dark:text-gray-100"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div className="flex flex-col">
                      <button
                        onClick={() =>
                          setMobileExpandedIndex(
                            mobileExpandedIndex === idx ? null : idx
                          )
                        }
                        className="flex items-center justify-between text-2xl font-bold text-gray-800 dark:text-gray-100 w-full"
                      >
                        {item.name}
                        <ChevronDown
                          size={24}
                          className={cn(
                            "transition-transform duration-200",
                            mobileExpandedIndex === idx ? "rotate-180" : ""
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpandedIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pl-2 pt-4 gap-3">
                              {item.items.map((sub) => (
                                <Link
                                  key={sub.title}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400 py-2 group"
                                >
                                  {/* RENDER LOGIC: Mobile Image vs Icon */}
                                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-gray-50 dark:bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-colors flex items-center justify-center">
                                    {sub.image ? (
                                      <Image
                                        src={sub.image}
                                        alt={sub.title}
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <sub.icon size={18} />
                                    )}
                                  </div>
                                  <span className="text-lg font-medium">
                                    {sub.title}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-500">
                    Appearance
                  </span>
                  <ThemeToggle />
                </div>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary text-white text-center py-4 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
