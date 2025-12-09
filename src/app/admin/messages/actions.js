"use server";

import { adminDb } from "@/lib/firebase-admin-server";
import { revalidatePath } from "next/cache";

// --- HELPER: SERIALIZE FIRESTORE DATA ---
const serializeData = (data) => ({
  ...data,
  // 1. Convert createdAt
  createdAt: data.createdAt?.toDate().toISOString() || null,

  // 2. Convert replySentAt (This was causing the crash!)
  replySentAt: data.replySentAt?.toDate().toISOString() || null,

  // 3. Create a nice display string
  dateDisplay: data.createdAt?.toDate().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
});

// 1. GET MESSAGES
export async function getMessages() {
  try {
    const snapshot = await adminDb
      .collection("messages")
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

// 2. MARK AS READ
export async function markAsRead(id) {
  try {
    await adminDb.collection("messages").doc(id).update({ status: "Read" });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// 3. DELETE MESSAGE
export async function deleteMessage(id) {
  try {
    await adminDb.collection("messages").doc(id).delete();
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
