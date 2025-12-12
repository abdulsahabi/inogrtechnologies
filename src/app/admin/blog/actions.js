"use server";

import { adminDb } from "@/lib/firebase-admin-server";
import { revalidatePath } from "next/cache";
import { deleteImageFromSupabase } from "@/lib/supabase-delete"; // ✅ Correct Import

// Helper to serialize Firestore data
const serializeData = (data) => {
  return {
    ...data,
    // Convert Firestore Timestamp to ISO String if it exists
    createdAt: data.createdAt?.toDate().toISOString() || null,
    updatedAt: data.updatedAt?.toDate().toISOString() || null,
    // Convert any other date fields if necessary
    date: data.date || null,
  };
};

// 1. GET ALL POSTS (Admin View)
export async function getAdminPosts() {
  try {
    const snapshot = await adminDb
      .collection("posts")
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...serializeData(data),
        // Create a nice display date for the table
        displayDate: data.createdAt?.toDate().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

// 2. GET SINGLE POST (For Edit)
export async function getPostBySlug(slug) {
  try {
    const doc = await adminDb.collection("posts").doc(slug).get();
    if (!doc.exists) return null;

    // SERIALIZE HERE TOO
    return {
      id: doc.id,
      ...serializeData(doc.data()),
    };
  } catch (error) {
    console.error("Get Single Post Error:", error);
    return null;
  }
}

// 2. DELETE POST ACTION (Fixed to match Portfolio)
export async function deletePost(slug) {
  try {
    // A. Fetch document first
    const docRef = adminDb.collection("posts").doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return { success: false, message: "Post not found." };
    }

    const postData = docSnap.data();

    // B. Delete Image from Supabase
    if (postData.image && postData.image.startsWith("http")) {
      await deleteImageFromSupabase(postData.image);
    }

    // C. Delete Document
    await docRef.delete();

    revalidatePath("/blog");
    revalidatePath("/admin/blog");

    return { success: true, message: "Post and image deleted." };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, message: "Failed to delete post." };
  }
}

// 4. UPDATE POST (With Image Cleanup)
export async function updatePost(slug, formData) {
  const title = formData.get("title");
  const category = formData.get("category");
  const excerpt = formData.get("excerpt");
  const content = formData.get("content");
  const newImage = formData.get("image");

  try {
    // A. Fetch current data to see what the OLD image was
    const docRef = adminDb.collection("posts").doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return { success: false, message: "Post not found." };
    }

    const oldData = docSnap.data();
    const oldImage = oldData.image;

    // B. Detect if Image Changed
    // If we have a new image URL, and it's different from the old one...
    if (newImage && newImage !== oldImage) {
      // ...and the old one was a real URL (not a gradient or empty)
      if (oldImage && oldImage.startsWith("http")) {
        console.log("🗑️ Image changed. Deleting old image...");
        await deleteImageFromSupabase(oldImage);
      }
    }

    // C. Update Database
    await docRef.update({
      title,
      category,
      excerpt,
      content,
      image: newImage,
      updatedAt: new Date(),
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, message: "Failed to update post." };
  }
}
