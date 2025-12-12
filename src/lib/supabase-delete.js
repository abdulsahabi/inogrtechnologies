"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function deleteImageFromSupabase(imageUrl) {
  if (!imageUrl) return;

  try {
    // 1. Validation
    if (!imageUrl.includes("/storage/v1/object/public/")) {
      console.warn(
        "⚠️ URL does not look like a standard Supabase Storage URL:",
        imageUrl
      );
      return;
    }

    // 2. Parse the URL
    const url = new URL(imageUrl);
    const fullPathEncoded = url.pathname.split("/storage/v1/object/public/")[1];
    const fullPathDecoded = decodeURIComponent(fullPathEncoded);

    // 3. Extract Bucket vs. File Path
    // The FIRST segment is ALWAYS the bucket name.
    const [bucket, ...rest] = fullPathDecoded.split("/");
    const filePath = rest.join("/");

    // --- 🔍 DEBUG LOGS (Check your terminal for this!) ---
    console.log("--- SUPABASE DELETE DEBUG ---");
    console.log("URL:", imageUrl);
    console.log("Detected Bucket:", bucket);
    console.log("Detected File Path:", filePath);
    // ----------------------------------------------------

    if (!bucket || !filePath) {
      console.error("❌ Failed to parse bucket or path.");
      return;
    }

    // 4. Execute Delete
    const { data, error } = await supabaseAdmin.storage
      .from(bucket) // <--- Make sure this matches your actual Bucket Name in Supabase
      .remove([filePath]);

    if (error) {
      console.error("❌ Supabase API Error:", error.message);
    } else {
      // Supabase returns an empty array if file wasn't found, so we check that too.
      if (data && data.length > 0) {
        console.log(`✅ Successfully deleted file from bucket '${bucket}'.`);
      } else {
        console.warn(
          `⚠️ Command sent, but Supabase didn't confirm deletion. Check if '${filePath}' actually existed in '${bucket}'.`
        );
      }
    }
    console.log("-----------------------------");
  } catch (error) {
    console.error("❌ Delete Helper Exception:", error.message);
  }
}
