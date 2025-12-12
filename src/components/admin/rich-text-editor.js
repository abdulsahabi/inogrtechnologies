"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import for SSR compatibility
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function RichTextEditor({ value, onChange }) {
  // Enterprise Toolbar Configuration
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [2, 3, 4, false] }], // H2, H3, H4, Normal
        ["bold", "italic", "underline", "strike", "blockquote"], // Text Styles
        [{ color: [] }, { background: [] }], // Text Color & Highlight
        [{ align: [] }], // Left, Center, Right, Justify
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ], // Lists & Indent
        ["link", "image", "video", "code-block"], // Media & Code
        ["clean"], // Clear Formatting
      ],
    }),
    []
  );

  return (
    // Added 'sticky top-0' class wrapper for mobile usability
    <div className="group relative bg-white dark:bg-black text-black dark:text-white rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 focus-within:ring-2 focus-within:ring-primary/50 transition-all flex flex-col h-full">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Type something brilliant..."
        className="flex flex-col h-full"
      />
    </div>
  );
}
