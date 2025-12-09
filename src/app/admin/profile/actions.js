"use server";

import { adminAuth, adminDb } from "@/lib/firebase-admin-server";
import { revalidatePath } from "next/cache";

export async function updateProfile(uid, formData) {
  const name = formData.get("name");
  const password = formData.get("password");

  try {
    // 1. Prepare Update Object for Authentication
    const authUpdate = { displayName: name };
    if (password && password.trim() !== "") {
      authUpdate.password = password;
    }

    // 2. Update Firebase Authentication (Login Data)
    await adminAuth.updateUser(uid, authUpdate);

    // 3. Update Firestore (Database Data)
    // This ensures the "User Management" table shows the new name too
    await adminDb.collection("users").doc(uid).update({
      name: name,
      updatedAt: new Date(),
    });

    // 4. Revalidate pages to show new data immediately
    revalidatePath("/admin");
    revalidatePath("/admin/users");

    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.error("Profile Update Error:", error);
    return { success: false, message: error.message };
  }
}
