"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin/sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white flex transition-colors duration-300">
      {/* 1. The Smart Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 transition-all duration-300">
        {/* Admin Topbar */}
        <header className="h-16 border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 transition-colors duration-300">
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Menu size={24} />
            </button>

            <h2 className=" md:ml-4 text-sm font-medium text-gray-500 dark:text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Enterprise Portal
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-500 dark:text-zinc-500 hidden sm:block">
              Super Admin
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 border border-gray-200 dark:border-zinc-700 shadow-inner"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 md:ml-5">{children}</main>
      </div>
    </div>
  );
}
