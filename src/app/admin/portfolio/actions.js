"use server";

import { adminDb } from "@/lib/firebase-admin-server";
import { revalidatePath } from "next/cache";
import { deleteImageFromSupabase } from "@/lib/supabase-delete"; // <--- NEW IMPORT

// --- HELPER: SERIALIZE FIRESTORE DATA ---
const serializeData = (data) => ({
  ...data,
  createdAt: data.createdAt?.toDate().toISOString() || null,
});

// 1. CREATE PROJECT
// Updated signature to accept formData directly as the first argument
export async function createProject(formData) {
  const title = formData.get("title");
  const category = formData.get("category"); // Web, Mobile, Design
  const desc = formData.get("desc"); // HTML Content from Rich Text Editor
  const year = formData.get("year");
  const image = formData.get("image"); // URL from Cloudinary
  const tagsString = formData.get("tags"); // "Next.js, React, Maps"

  // Basic Validation
  if (!title || !desc || !image) {
    return { success: false, message: "Missing required fields." };
  }

  // Convert comma-separated string to array
  const tags = tagsString
    ? tagsString
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t)
    : [];

  // Auto-generate slug (e.g., "Kebbi Health Portal" -> "kebbi-health-portal")
  const slug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") +
    "-" +
    Math.floor(Math.random() * 1000); // Add randomness to ensure uniqueness

  try {
    await adminDb.collection("projects").doc(slug).set({
      slug,
      title,
      category,
      desc, // This is now Rich Text HTML
      year,
      image,
      tags,
      createdAt: new Date(),
    });

    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Create Project Error:", error);
    return { success: false, message: error.message };
  }
}

// 2. GET PROJECTS (For Admin Dashboard)
export async function getAdminProjects() {
  try {
    const snapshot = await adminDb
      .collection("projects")
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) return [];

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...serializeData(doc.data()),
    }));
  } catch (error) {
    console.error("Portfolio Fetch Error:", error);
    return [];
  }
}

// 3. DELETE PROJECT
export async function deleteProject(slug) {
  try {
    const docRef = adminDb.collection("projects").doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return { success: false, message: "Project not found." };
    }

    const projectData = docSnap.data();

    // Delete Image from Supabase
    if (projectData.image && projectData.image.startsWith("http")) {
      await deleteImageFromSupabase(projectData.image);
    }

    await docRef.delete();

    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");

    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, message: "Failed to delete project." };
  }
}
