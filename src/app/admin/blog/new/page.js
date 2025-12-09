"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { createPost } from "./actions";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function NewPostPage() {
  const router = useRouter();

  async function clientAction(formData) {
    const result = await createPost(null, formData);
    if (result.success) {
      router.push("/admin/blog");
    } else {
      alert("Error: " + result.message);
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4 md:pt-0">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          New Article
        </h1>
      </div>

      <form action={clientAction} className="space-y-8">
        {/* Main Inputs Card */}
        <div className="space-y-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 md:p-8 rounded-3xl shadow-sm">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
              Article Title
            </label>
            <input
              name="title"
              required
              type="text"
              placeholder="e.g., The Future of Tech"
              className="w-full bg-transparent text-2xl md:text-4xl font-black text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-zinc-700 outline-none border-b border-gray-200 dark:border-zinc-800 focus:border-primary pb-2 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary outline-none appearance-none"
                >
                  <option value="Tech">Tech</option>
                  <option value="Business">Business</option>
                  <option value="Student Life">Student Life</option>
                  <option value="Design">Design</option>
                </select>
                {/* Custom Arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m1 1 4 4 4-4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Cover Style Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
                Cover Style
              </label>
              <div className="relative">
                <select
                  name="image"
                  className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary outline-none appearance-none"
                >
                  <option value="bg-gradient-to-br from-purple-900 to-indigo-900">
                    Purple/Indigo Gradient
                  </option>
                  <option value="bg-gradient-to-br from-green-900 to-emerald-900">
                    Green/Emerald Gradient
                  </option>
                  <option value="bg-gradient-to-br from-orange-900 to-red-900">
                    Orange/Red Gradient
                  </option>
                  <option value="bg-gradient-to-br from-blue-900 to-cyan-900">
                    Blue/Cyan Gradient
                  </option>
                  <option value="bg-zinc-800">Solid Dark Gray</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m1 1 4 4 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Excerpt Textarea */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
              Short Summary
            </label>
            <textarea
              name="excerpt"
              required
              rows={2}
              placeholder="A brief preview shown on the homepage..."
              className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary outline-none resize-none placeholder:text-gray-400 dark:placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* Content Editor */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider ml-2">
            Main Content (HTML Supported)
          </label>
          <textarea
            name="content"
            required
            rows={15}
            placeholder="<p>Start writing your story here...</p>"
            className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 text-base md:text-lg text-gray-800 dark:text-gray-300 focus:border-primary outline-none font-mono leading-relaxed placeholder:text-gray-400 dark:placeholder:text-zinc-600"
          />
          <p className="text-xs text-gray-500 dark:text-zinc-500 pl-4">
            Tip: You can use basic HTML tags like &lt;h3&gt;, &lt;p&gt;, and
            &lt;ul&gt;.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-end pt-4 sticky bottom-4 md:static">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center"
    >
      {pending ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          <Save size={18} /> Publish Post
        </>
      )}
    </button>
  );
}
