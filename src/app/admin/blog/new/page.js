"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "./actions";
import { uploadFile } from "../../upload-action";
import RichTextEditor from "@/components/admin/rich-text-editor";
import {
  ArrowLeft,
  Save,
  Loader2,
  UploadCloud,
  CheckCircle2,
  Wand2,
  AlignLeft,
  Hash,
  Tag,
  Layout,
} from "lucide-react";
import imageCompression from "browser-image-compression";
import { cn } from "@/lib/utils";

export default function NewPostPage() {
  const router = useRouter();

  // --- STATE ---
  const [status, setStatus] = useState("idle"); // idle | compressing | uploading | saving | success
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Content State
  const [content, setContent] = useState("");

  // --- SMART IMAGE HANDLER (Cover Image) ---
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Instant Preview
    setPreviewUrl(URL.createObjectURL(file));
    setStatus("compressing");

    // 2. Smart Compression
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
      alert("Compression failed. Try a smaller image.");
      setStatus("idle");
      setImageFile(null);
    }
  };

  // --- SUBMISSION ---
  async function handleSubmit(e) {
    e.preventDefault();
    if (status !== "idle") return;

    if (!content.trim()) {
      alert("Please write some content!");
      return;
    }

    const formData = new FormData(e.target);
    formData.set("content", content); // Inject HTML from Editor

    try {
      let imageUrl = "";

      // 1. Upload Cover Image
      if (imageFile) {
        setStatus("uploading");
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        uploadData.append("folder", "blog_covers"); // Separate folder for covers

        const uploadRes = await uploadFile(uploadData);
        if (!uploadRes.success) throw new Error(uploadRes.message);
        imageUrl = uploadRes.url;
      } else {
        // Allow using the gradient preset if no file uploaded?
        // For now, let's enforce image or handle gradient in value
        const presetImage = formData.get("image_preset");
        if (!presetImage && !imageFile) {
          alert("Please select a cover image.");
          setStatus("idle");
          return;
        }
        imageUrl = presetImage || "";
      }

      // 2. Save Post
      setStatus("saving");
      // If we have a Cloudinary URL, use it. Otherwise use the dropdown value.
      if (imageUrl) {
        formData.set("image", imageUrl);
      }

      const result = await createPost(formData);

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
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold uppercase tracking-wider text-zinc-500">
          <Wand2 size={12} /> Smart Editor
        </div>
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
                type="text"
                placeholder="e.g. The Future of AI in Kebbi"
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
                rows={3}
                placeholder="A short summary for SEO..."
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
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <UploadCloud size={24} className="mb-2" />
                    <span className="text-[10px] uppercase font-bold">
                      Upload
                    </span>
                  </div>
                )}
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
                <Save size={20} /> Publish Article
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
                <Loader2 size={20} className="animate-spin" /> Saving Data...
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle2 size={20} /> Article Live!
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
