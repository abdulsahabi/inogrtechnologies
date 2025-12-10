"use server";

import { adminDb } from "@/lib/firebase-admin-server";
import { revalidatePath } from "next/cache";

const serializeData = (data) => ({
  ...data,
  createdAt: data.createdAt?.toDate().toISOString() || null,
  dateDisplay: data.createdAt?.toDate().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
});

// 1. GET SUBSCRIBERS
export async function getSubscribers() {
  try {
    const snapshot = await adminDb
      .collection("subscribers")
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...serializeData(doc.data()),
    }));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

// 2. DELETE SUBSCRIBER
export async function deleteSubscriber(id) {
  try {
    await adminDb.collection("subscribers").doc(id).delete();
    revalidatePath("/admin/newsletter");
    return { success: true, message: "Subscriber removed." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
