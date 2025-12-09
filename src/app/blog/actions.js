"use server";

import { adminDb } from "@/lib/firebase-admin-server";

// Helper to serialize Firestore data
const serializeData = (data) => {
  return {
    ...data,
    createdAt: data.createdAt?.toDate().toISOString() || null,
    updatedAt: data.updatedAt?.toDate().toISOString() || null,
  };
};

// 1. GET ALL PUBLIC POSTS (For the Feed)
export async function getPublicPosts() {
  try {
    // In a real app, you might filter by where('status', '==', 'Published')
    const snapshot = await adminDb
      .collection("posts")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...serializeData(data),
      };
    });
  } catch (error) {
    console.error("Public Blog Fetch Error:", error);
    return [];
  }
}

// 2. GET SINGLE POST (For the Article Page)
export async function getPublicPostBySlug(slug) {
  try {
    const doc = await adminDb.collection("posts").doc(slug).get();

    if (!doc.exists) return null;

    return {
      id: doc.id,
      ...serializeData(doc.data()),
    };
  } catch (error) {
    console.error("Public Post Error:", error);
    return null;
  }
}
