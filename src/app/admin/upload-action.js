"use server";

import { createClient } from "@supabase/supabase-js";

// Enterprise Security Config
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// Initialize Supabase Admin Client (Safe on Server)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function uploadFile(formData) {
  const file = formData.get("file");
  const folder = formData.get("folder") || "general";

  // 1. Validation Layer
  if (!file) {
    return { success: false, message: "No file detected." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      message: "Invalid format. Only JPG, PNG, WEBP, and GIF allowed.",
    };
  }

  if (file.size > MAX_SIZE) {
    return { success: false, message: "File too large. Maximum size is 5MB." };
  }

  try {
    // 2. Prepare File
    // Sanitize filename to prevent errors with special characters
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, "-").toLowerCase();
    const uniqueFilename = `${folder}/${Date.now()}-${cleanName}`;

    // Convert file to buffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Upload to Supabase 'uploads' bucket
    const { error: uploadError } = await supabase.storage
      .from("uploads") // Make sure this bucket exists and is Public!
      .upload(uniqueFilename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // 4. Generate Public URL
    const { data } = supabase.storage
      .from("uploads")
      .getPublicUrl(uniqueFilename);

    return { success: true, url: data.publicUrl };
  } catch (error) {
    console.error("Upload Error:", error);
    return { success: false, message: "Upload failed. Check server logs." };
  }
}
