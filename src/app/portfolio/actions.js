"use server";

import { adminDb } from "@/lib/firebase-admin-server";

// Helper to serialize Firestore data
const serializeData = (data) => ({
  ...data,
  createdAt: data.createdAt?.toDate().toISOString() || null,
});

// 1. GET ALL PUBLIC PROJECTS
export async function getPublicProjects() {
  try {
    const snapshot = await adminDb
      .collection("projects")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...serializeData(doc.data()),
    }));
  } catch (error) {
    console.error("Public Portfolio Fetch Error:", error);
    return [];
  }
}

// 2. GET SINGLE PROJECT BY SLUG
export async function getPublicProjectBySlug(slug) {
  try {
    const doc = await adminDb.collection("projects").doc(slug).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...serializeData(doc.data()) };
  } catch (error) {
    return null;
  }
}
