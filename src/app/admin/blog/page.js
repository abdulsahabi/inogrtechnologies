"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  FileText,
  Trash2,
  Edit,
  ExternalLink,
  Eye,
  RefreshCcw,
  Calendar,
} from "lucide-react";
import { getAdminPosts, deletePost } from "./actions";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    const data = await getAdminPosts();
    setPosts(data);
    setLoading(false);
  }

  const handleDelete = async (slug) => {
    if (!confirm("Delete this post permanently?")) return;
    setPosts(posts.filter((p) => p.slug !== slug));
    await deletePost(slug);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Blog Content
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm">
              Manage your news and articles.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadPosts}
              className="p-2.5 rounded-lg border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <Link
              href="/admin/blog/new"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Create Post</span>
            </Link>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search titles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-zinc-600"
          />
        </div>
      </div>

      {/* MOBILE LIST (Visible < md) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-3 animate-pulse"
            >
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded"></div>
            </div>
          ))
        ) : filteredPosts.length === 0 ? (
          <EmptyState />
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-gray-500 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 break-all">
                      {post.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-zinc-500 block">
                      {post.displayDate}
                    </span>
                  </div>
                </div>
                <span className="shrink-0 inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700">
                  {post.category}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-zinc-400 border-t border-b border-gray-100 dark:border-zinc-800 py-3">
                <div className="flex items-center gap-1">
                  <Eye size={14} /> {post.views || 0} Views
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} /> {post.readTime}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-xs font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-zinc-700"
                >
                  <ExternalLink size={14} /> View
                </a>
                <Link
                  href={`/admin/blog/${post.slug}`}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-xs font-bold hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors border border-gray-200 dark:border-zinc-700"
                >
                  <Edit size={14} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors border border-gray-200 dark:border-zinc-700"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE (Visible >= md) */}
      <div className="hidden md:block bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-zinc-950 text-gray-500 dark:text-zinc-400 border-b border-gray-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">Article</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Date</th>

              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {loading ? (
              [1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-12 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                  </td>
                  <td className="px-6 py-4"></td>
                </tr>
              ))
            ) : filteredPosts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500 dark:text-zinc-500"
                >
                  <EmptyState />
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr
                  key={post.slug}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-gray-200 dark:border-zinc-700">
                        <FileText
                          size={18}
                          className="text-gray-500 dark:text-zinc-500"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white line-clamp-1">
                          {post.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-zinc-500">
                          /{post.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-zinc-400">
                    {post.displayDate}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-400 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="View Live"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <Link
                        href={`/admin/blog/${post.slug}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-500 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete"
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
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 mb-4">
        <FileText size={24} className="text-gray-400 dark:text-zinc-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        No posts found
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Get started by creating a new article.
      </p>
    </div>
  );
}
