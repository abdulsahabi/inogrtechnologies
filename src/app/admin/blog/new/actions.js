"use server";

import { adminDb } from "@/lib/firebase-admin-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const category = formData.get("category");
  const excerpt = formData.get("excerpt");
  const content = formData.get("content");
  // For now, we select a random gradient if no image URL is provided
  const image =
    formData.get("image") || "bg-gradient-to-br from-zinc-800 to-black";

  const slug = generateSlug(title);
  const date = formatDate(new Date());
  const readTime = calculateReadTime(content);

  try {
    // Save to Firestore 'posts' collection
    // We use .set() with the slug as the ID so URL matches ID
    await adminDb.collection("posts").doc(slug).set({
      slug,
      title,
      category,
      excerpt,
      date, // "Dec 6, 2025"
      readTime, // "5 min read"
      image,
      views: 0,
      content, // HTML String
      createdAt: new Date(), // For sorting
      status: "Published",
    });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");

    return { success: true };
  } catch (error) {
    console.error("Create Post Error:", error);
    return { success: false, message: error.message };
  }
}
