"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // <--- THIS WAS MISSING OR DELETED
import {
  LayoutDashboard,
  Users,
  FileText,
  MapPin,
  LogOut,
  Shield,
  X,
  Moon,
  Sun,
  User,
  MessageSquare,
  Briefcase,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const ADMIN_LINKS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
    badge: true,
  },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { name: "My Profile", href: "/admin/profile", icon: User },
];

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname(); // This line was causing the crash
  const { setTheme, theme } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const tokenResult = await currentUser.getIdTokenResult();
        setUser({
          name: currentUser.displayName || "Admin User",
          email: currentUser.email,
          role: tokenResult.claims.role || "User",
          photo: currentUser.photoURL,
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed inset-0 bg-black/80 z-40 backdrop-blur-sm transition-opacity md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Shield size={18} />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">
              InoGr Admin
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-zinc-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {ADMIN_LINKS.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                <link.icon
                  size={18}
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-white"
                      : "text-zinc-500 group-hover:text-white"
                  )}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 space-y-4">
          <div className="flex items-center gap-3 px-2">
            {loading ? (
              <div className="flex items-center gap-3 w-full animate-pulse">
                <div className="h-10 w-10 rounded-full bg-zinc-800" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-20 bg-zinc-800 rounded" />
                  <div className="h-2 w-28 bg-zinc-800 rounded" />
                </div>
              </div>
            ) : (
              <>
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-inner border border-white/10 shrink-0">
                  {user?.name?.[0] || <User size={18} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-zinc-500 truncate flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    {user?.role}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="h-px bg-zinc-800 w-full" />

          <div className="grid grid-cols-2 gap-2">
            {mounted ? (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-zinc-400 bg-zinc-800/50 hover:bg-zinc-800 hover:text-white transition-colors border border-zinc-800 hover:border-zinc-700"
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            ) : (
              <div className="h-9 w-full bg-zinc-800 rounded-lg animate-pulse" />
            )}

            <a
              href="/api/logout"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition-colors border border-red-500/10 hover:border-red-500/20"
            >
              <LogOut size={14} />
              Log Out
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
