"use server";

import { adminDb } from "@/lib/firebase-admin-server";
import { revalidatePath } from "next/cache";

// --- HELPER: Calculate Read Time ---
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>?/gm, "");
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// --- HELPER: Create URL-Friendly Slug ---
function createSlug(title) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") +
    "-" +
    Math.floor(Math.random() * 1000)
  );
}

// 1. CREATE POST ACTION
export async function createPost(formData) {
  const title = formData.get("title");
  const excerpt = formData.get("excerpt");
  const category = formData.get("category");
  const content = formData.get("content");
  const image = formData.get("image");

  if (!title || !content) {
    return { success: false, message: "Title and Content are required." };
  }

  try {
    const slug = createSlug(title);
    const readTime = calculateReadTime(content);

    const dateOptions = { month: "short", day: "numeric", year: "numeric" };
    const dateDisplay = new Date().toLocaleDateString("en-US", dateOptions);

    await adminDb.collection("posts").doc(slug).set({
      slug,
      title,
      excerpt,
      category,
      content,
      image,
      readTime,
      date: dateDisplay,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      status: "Published",
    });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");

    return { success: true, message: "Post published successfully!" };
  } catch (error) {
    console.error("Create Post Error:", error);
    return { success: false, message: error.message };
  }
}
