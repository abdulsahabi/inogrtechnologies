"use server";

import { adminDb } from "@/lib/firebase-admin-server";
import { revalidatePath } from "next/cache";

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

// 3. DELETE POST
export async function deletePost(slug) {
  try {
    await adminDb.collection("posts").doc(slug).delete();
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true, message: "Post deleted successfully." };
  } catch (error) {
    return { success: false, message: "Failed to delete post." };
  }
}

// 4. UPDATE POST
export async function updatePost(slug, formData) {
  const title = formData.get("title");
  const category = formData.get("category");
  const excerpt = formData.get("excerpt");
  const content = formData.get("content");
  const image = formData.get("image");

  try {
    await adminDb.collection("posts").doc(slug).update({
      title,
      category,
      excerpt,
      content,
      image,
      updatedAt: new Date(), // Firestore handles Date objects on write, but not on read
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, message: "Failed to update post." };
  }
}
