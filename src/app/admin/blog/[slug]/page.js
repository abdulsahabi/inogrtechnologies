"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  UploadCloud,
  CheckCircle2,
  AlignLeft,
  Hash,
  Tag,
  Layout,
} from "lucide-react";
import { updatePost, getPostBySlug } from "../actions"; // Adjusted import path based on folder structure
import { uploadFile } from "../../upload-action"; // Adjusted import path
import RichTextEditor from "@/components/admin/rich-text-editor";
import imageCompression from "browser-image-compression";
import { cn } from "@/lib/utils";

export default function EditPostPage() {
  const router = useRouter();
  const { slug } = useParams();

  // --- STATE ---
  const [loading, setLoading] = useState(true); // Loading initial data
  const [status, setStatus] = useState("idle"); // idle | compressing | uploading | saving | success

  // Data State
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");

  // Image State
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 1. LOAD POST DATA
  useEffect(() => {
    async function load() {
      const data = await getPostBySlug(slug);

      if (!data) {
        alert("Post not found");
        router.push("/admin/blog");
        return;
      }

      setPost(data);
      setContent(data.content); // Initialize Editor Content

      // If the current image is a URL (not a gradient), show preview
      if (data.image && !data.image.startsWith("bg-")) {
        setPreviewUrl(data.image);
      }

      setLoading(false);
    }
    load();
  }, [slug, router]);

  // 2. IMAGE HANDLER (Same as New Post)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setStatus("compressing");

    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      initialQuality: 0.8,
    };

    try {
      let compressedFile = await imageCompression(file, options);
      setImageFile(compressedFile);
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  // 3. SUBMIT HANDLER
  async function handleSubmit(e) {
    e.preventDefault();
    if (status !== "idle") return;

    const formData = new FormData(e.target);
    formData.set("content", content); // Inject Editor HTML

    try {
      let imageUrl = post.image; // Default to existing image

      // A. Upload NEW Image if selected
      if (imageFile) {
        setStatus("uploading");
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        uploadData.append("folder", "blog_covers");

        const res = await uploadFile(uploadData);
        if (!res.success) throw new Error(res.message);
        imageUrl = res.url;
      }

      // B. Save Update
      setStatus("saving");
      formData.set("image", imageUrl);

      const result = await updatePost(slug, formData);

      if (result.success) {
        setStatus("success");
        setTimeout(() => router.push("/admin/blog"), 1000);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
      setStatus("idle");
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
        >
          <ArrowLeft size={16} /> Cancel
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Edit Article
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Meta Data Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <AlignLeft size={14} /> Title
              </label>
              <input
                name="title"
                required
                defaultValue={post.title}
                type="text"
                className="w-full bg-transparent text-2xl md:text-3xl font-black text-gray-900 dark:text-white outline-none border-b border-gray-200 dark:border-zinc-800 focus:border-primary pb-2 transition-colors placeholder:text-gray-300 dark:placeholder:text-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Hash size={14} /> Excerpt
              </label>
              <textarea
                name="excerpt"
                required
                defaultValue={post.excerpt}
                rows={3}
                className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary outline-none resize-none"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm h-fit">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Tag size={14} /> Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  defaultValue={post.category}
                  className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary outline-none appearance-none font-medium"
                >
                  <option value="Tech">Tech</option>
                  <option value="Business">Business</option>
                  <option value="Student Life">Student Life</option>
                  <option value="Design">Design</option>
                </select>
              </div>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                  <Layout size={14} /> Cover Image
                </label>
                {status === "compressing" && (
                  <span className="text-xs text-primary animate-pulse">
                    Optimizing...
                  </span>
                )}
              </div>

              <div
                className={cn(
                  "relative w-full aspect-video rounded-xl overflow-hidden border-2 border-dashed transition-all group bg-gray-50 dark:bg-zinc-900/50",
                  previewUrl
                    ? "border-primary/50"
                    : "border-gray-300 dark:border-zinc-700 hover:border-primary"
                )}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={status !== "idle"}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                {previewUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={`w-full h-full object-cover transition-opacity ${
                      status === "compressing"
                        ? "opacity-50 blur-sm"
                        : "opacity-100"
                    }`}
                  />
                ) : (
                  // Show existing gradient if no URL
                  <div
                    className={`w-full h-full ${
                      post.image.startsWith("bg-")
                        ? post.image
                        : "bg-gray-100 flex items-center justify-center"
                    }`}
                  >
                    {!post.image.startsWith("bg-") && (
                      <UploadCloud className="text-gray-400" />
                    )}
                  </div>
                )}

                {/* Overlay Helper Text */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="text-xs font-bold text-white uppercase">
                    Change Image
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RICH TEXT EDITOR */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider pl-1">
            Article Content
          </label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end pt-4 sticky bottom-6 z-20">
          <button
            type="submit"
            disabled={status !== "idle"}
            className={cn(
              "px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl hover:shadow-2xl disabled:opacity-80 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0",
              status === "success"
                ? "bg-green-500 text-white w-full md:w-auto justify-center"
                : "bg-primary hover:bg-primary-dark text-white w-full md:w-auto justify-center"
            )}
          >
            {status === "idle" && (
              <>
                <Save size={20} /> Save Changes
              </>
            )}
            {status === "compressing" && (
              <>
                <Loader2 size={20} className="animate-spin" /> Optimizing...
              </>
            )}
            {status === "uploading" && (
              <>
                <UploadCloud size={20} className="animate-bounce" />{" "}
                Uploading...
              </>
            )}
            {status === "saving" && (
              <>
                <Loader2 size={20} className="animate-spin" /> Saving...
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle2 size={20} /> Updated!
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
