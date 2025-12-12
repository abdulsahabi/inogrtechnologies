"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../actions";
import { uploadFile } from "../../upload-action";
import RichTextEditor from "@/components/admin/rich-text-editor"; // <--- IMPORT EDITOR
import {
  ArrowLeft,
  Save,
  Loader2,
  UploadCloud,
  X,
  CheckCircle2,
  Wand2,
  Layers,
  Cpu,
  Calendar,
} from "lucide-react";
import imageCompression from "browser-image-compression";
import { cn } from "@/lib/utils";

export default function NewProjectPage() {
  const router = useRouter();

  // --- STATE ---
  const [status, setStatus] = useState("idle"); // idle | compressing | uploading | saving | success
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Smart Tags State
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Rich Text State (New)
  const [desc, setDesc] = useState("");

  // --- SMART IMAGE HANDLER ---
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

      // Safety Check: If still huge, compress aggressively
      if (compressedFile.size > 1024 * 1024) {
        compressedFile = await imageCompression(file, {
          ...options,
          maxSizeMB: 0.5,
          initialQuality: 0.6,
        });
      }

      setImageFile(compressedFile);
      setStatus("idle"); // Ready
    } catch (error) {
      console.error(error);
      alert("Compression failed. Try a smaller image.");
      setStatus("idle");
      setImageFile(null);
    }
  };

  // --- SMART TAG ENGINE ---
  const handleTagInput = (e) => {
    const val = e.target.value;
    if (val.endsWith(",")) {
      const newTag = val.slice(0, -1).trim(); // Remove comma
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    } else {
      setTagInput(val);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // --- SUBMISSION ---
  async function handleSubmit(e) {
    e.preventDefault();
    if (status !== "idle") return; // Prevent double click

    if (!desc.trim()) {
      alert("Please write a project description.");
      return;
    }

    const formData = new FormData(e.target);

    // Inject our "Smart Tags" into the form data as a string
    formData.set("tags", tags.join(","));

    // Inject Rich Text Content
    formData.set("desc", desc);

    try {
      let imageUrl = "";

      // 1. Upload Phase
      if (imageFile) {
        setStatus("uploading");
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        uploadData.append("folder", "portfolio");

        const uploadRes = await uploadFile(uploadData);
        if (!uploadRes.success) throw new Error(uploadRes.message);
        imageUrl = uploadRes.url;
      } else {
        alert("Please select a cover image.");
        setStatus("idle");
        return;
      }

      // 2. Saving Phase
      setStatus("saving");
      formData.set("image", imageUrl);
      const result = await createProject(formData); // Removed 'null' argument if using server actions directly

      if (result.success) {
        setStatus("success");
        setTimeout(() => router.push("/admin/portfolio"), 1000); // Wait for success animation
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
        {/* Main Card */}
        <div className="space-y-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 md:p-8 rounded-3xl shadow-sm">
          {/* Title Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
              Project Title
            </label>
            <input
              name="title"
              required
              type="text"
              placeholder="e.g. Kebbi Health Portal"
              className="w-full bg-transparent text-3xl md:text-4xl font-black text-gray-900 dark:text-white outline-none border-b border-gray-200 dark:border-zinc-800 focus:border-primary pb-4 transition-all placeholder:text-gray-300 dark:placeholder:text-zinc-700"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Category Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Layers size={14} /> Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary outline-none appearance-none font-medium"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Graphic Design">Graphic Design</option>
                </select>
                {/* Arrow Icon */}
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

            {/* Year Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Calendar size={14} /> Year
              </label>
              <input
                name="year"
                required
                type="text"
                placeholder="2025"
                className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary outline-none font-medium"
              />
            </div>
          </div>

          {/* RICH TEXT EDITOR (Replaced Textarea) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider pl-1">
              Case Study (Description)
            </label>
            <RichTextEditor value={desc} onChange={setDesc} />
          </div>

          {/* Smart Tags Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={14} /> Tech Stack
            </label>
            <div className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 min-h-[50px] flex flex-wrap gap-2 items-center focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 transition-all">
              {/* Render Pills */}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 text-xs font-bold px-2 py-1 rounded-md border border-gray-200 dark:border-zinc-700 flex items-center gap-1 animate-in zoom-in-50 duration-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {/* The Input */}
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInput}
                placeholder={
                  tags.length === 0
                    ? "Type e.g. React, Firebase, (comma to add)"
                    : ""
                }
                className="bg-transparent text-sm text-gray-900 dark:text-white outline-none flex-1 min-w-[120px]"
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    tagInput === "" &&
                    tags.length > 0
                  ) {
                    removeTag(tags[tags.length - 1]);
                  }
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (tagInput.trim()) {
                      setTags([...tags, tagInput.trim()]);
                      setTagInput("");
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Image Upload UI */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
                Cover Image
              </label>
              {status === "compressing" && (
                <span className="text-xs font-bold text-primary animate-pulse">
                  Optimizing Image...
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
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageChange}
                disabled={status !== "idle"}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />

              {previewUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={previewUrl}
                  alt="Preview"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    status === "compressing"
                      ? "opacity-50 blur-sm"
                      : "opacity-100"
                  }`}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:text-primary mb-3 transition-colors">
                    <UploadCloud size={28} />
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-zinc-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Max 5MB • JPG, PNG, WEBP
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
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
                <Save size={20} /> Publish Project
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
                <CheckCircle2 size={20} /> Project Live!
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
