"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  Eye,
  RefreshCcw,
  Calendar,
  Layers,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import { getAdminProjects, deleteProject } from "./actions";

const ITEMS_PER_PAGE = 6;

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // LOAD DATA
  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    const data = await getAdminProjects();
    setProjects(data);
    setLoading(false);
  }

  // DELETE HANDLER
  const handleDelete = async (slug) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    // Optimistic Update
    setProjects((prev) => prev.filter((p) => p.slug !== slug));
    await deleteProject(slug);
  };

  // FILTER & PAGINATION LOGIC
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const currentData = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Portfolio Manager
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">
            Curate and manage your case studies.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={loadProjects}
            className="p-3 rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            title="Refresh List"
          >
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
          </button>

          <Link
            href="/admin/portfolio/new"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            <Plus size={20} /> Add Project
          </Link>
        </div>
      </div>

      {/* --- TOOLBAR --- */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search projects by name or category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-zinc-600"
        />
      </div>

      {/* --- MOBILE VIEW: RICH CARDS (Visible < md) --- */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {loading ? (
          <SkeletonCards />
        ) : currentData.length === 0 ? (
          <EmptyState />
        ) : (
          currentData.map((project) => (
            <div
              key={project.slug}
              className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm flex flex-col"
            >
              {/* Image Cover */}
              <div className="relative aspect-video w-full bg-gray-100 dark:bg-black">
                {project.image.startsWith("bg-") ? (
                  <div className={`absolute inset-0 ${project.image}`} />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-400">
                    <Calendar size={12} /> {project.year}
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <a
                    href={`/portfolio/${project.slug}`}
                    target="_blank"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-bold text-gray-700 dark:text-zinc-300"
                  >
                    <ExternalLink size={14} /> View
                  </a>
                  <button
                    onClick={() => handleDelete(project.slug)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-xs font-bold text-red-600 dark:text-red-400"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- DESKTOP VIEW: LIST (Visible >= md) --- */}
      <div className="hidden md:block bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-zinc-950/50 text-gray-500 dark:text-zinc-400 border-b border-gray-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">
                Project Info
              </th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">
                Category
              </th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">
                Year
              </th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {loading ? (
              <SkeletonRows />
            ) : currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <EmptyState />
                </td>
              </tr>
            ) : (
              currentData.map((project) => (
                <tr
                  key={project.slug}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="h-12 w-20 rounded-lg overflow-hidden bg-gray-200 dark:bg-zinc-800 shrink-0 relative border border-gray-200 dark:border-zinc-700">
                        {project.image.startsWith("bg-") ? (
                          <div
                            className={`absolute inset-0 ${project.image}`}
                          />
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={project.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white text-base">
                          {project.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-zinc-500">
                          /{project.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-zinc-400 font-mono text-xs">
                    {project.year}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDelete(project.slug)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION --- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-bold text-gray-600 dark:text-zinc-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-16 w-16 bg-gray-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
        <Layers size={24} className="text-gray-400 dark:text-zinc-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        No projects found
      </h3>
      <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 max-w-xs">
        Get started by adding your first case study to the portfolio.
      </p>
    </div>
  );
}

function SkeletonCards() {
  return [1, 2, 3].map((i) => (
    <div
      key={i}
      className="bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-gray-200 dark:border-zinc-800 space-y-4 animate-pulse"
    >
      <div className="aspect-video w-full bg-gray-200 dark:bg-zinc-800 rounded-2xl" />
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded" />
    </div>
  ));
}

function SkeletonRows() {
  return [1, 2, 3, 4].map((i) => (
    <tr key={i} className="animate-pulse">
      <td className="px-6 py-4 flex gap-4">
        <div className="h-12 w-20 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded" />
          <div className="h-3 w-20 bg-gray-200 dark:bg-zinc-800 rounded" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-24 bg-gray-200 dark:bg-zinc-800 rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-12 bg-gray-200 dark:bg-zinc-800 rounded" />
      </td>
      <td className="px-6 py-4" />
    </tr>
  ));
}
