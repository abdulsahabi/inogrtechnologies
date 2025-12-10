"use server";

import { adminDb } from "@/lib/firebase-admin-server";
import { revalidatePath } from "next/cache";

// --- HELPER: SERIALIZE FIRESTORE DATA ---
const serializeData = (data) => ({
  ...data,
  createdAt: data.createdAt?.toDate().toISOString() || null,
});

// 1. CREATE PROJECT
export async function createProject(prevState, formData) {
  const title = formData.get("title");
  const category = formData.get("category"); // Web, Mobile, Design
  const desc = formData.get("desc");
  const year = formData.get("year");
  const image = formData.get("image"); // URL from Supabase
  const tagsString = formData.get("tags"); // "Next.js, React, Maps"

  // Convert comma-separated string to array
  const tags = tagsString
    ? tagsString
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t)
    : [];

  // Auto-generate slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  try {
    await adminDb.collection("projects").doc(slug).set({
      slug,
      title,
      category,
      desc,
      year,
      image,
      tags,
      createdAt: new Date(),
    });

    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// 2. GET PROJECTS (Fixed Serialization)
export async function getAdminProjects() {
  try {
    const snapshot = await adminDb
      .collection("projects")
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) return [];

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...serializeData(doc.data()), // <--- Now safe for Client Components
    }));
  } catch (error) {
    console.error("Portfolio Fetch Error:", error);
    return [];
  }
}

// 3. DELETE PROJECT
export async function deleteProject(slug) {
  try {
    await adminDb.collection("projects").doc(slug).delete();
    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to delete." };
  }
}
