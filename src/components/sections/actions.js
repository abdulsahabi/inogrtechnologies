"use server";

import { adminDb } from "@/lib/firebase-admin-server";

export async function subscribeNewsletter(email, interests) {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Invalid email address." };
  }

  try {
    // Check if already subscribed
    const existing = await adminDb
      .collection("subscribers")
      .where("email", "==", email)
      .get();

    if (!existing.empty) {
      // Update interests if already exists
      const docId = existing.docs[0].id;
      await adminDb.collection("subscribers").doc(docId).update({
        interests,
        updatedAt: new Date(),
      });
      return { success: true, message: "Subscription updated!" };
    }

    // Create new subscriber
    await adminDb.collection("subscribers").add({
      email,
      interests,
      createdAt: new Date(),
      status: "Active",
    });

    return { success: true, message: "Successfully subscribed!" };
  } catch (error) {
    console.error("Newsletter Error:", error);
    return {
      success: false,
      message: "Failed to subscribe. Please try again.",
    };
  }
}
