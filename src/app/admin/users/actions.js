"use server";

import { adminAuth, adminDb } from "@/lib/firebase-admin-server";
import { revalidatePath } from "next/cache";

// --- HELPER: SERIALIZE DATA ---
const serializeData = (data) => ({
  ...data,
  // 1. Serialize createdAt
  createdAt: data.createdAt?.toDate().toISOString() || null,

  // 2. NEW: Serialize updatedAt (Fixes your crash)
  updatedAt: data.updatedAt?.toDate().toISOString() || null,
});

// 1. FETCH USERS
export async function getUsers() {
  try {
    const snapshot = await adminDb
      .collection("users")
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) return [];

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...serializeData(doc.data()), // <--- Uses the updated serializer
    }));
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return [];
  }
}

// 2. INVITE USER (Create)
export async function inviteUser(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const role = formData.get("role");
  let password = formData.get("password");

  if (!password || password.trim() === "") {
    password = "Inogr" + Math.random().toString(36).slice(-6) + "!";
  }

  try {
    // A. Create Authentication User
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    // B. Set Custom Claims
    await adminAuth.setCustomUserClaims(userRecord.uid, {
      role,
      admin: role === "Super Admin" || role === "Admin",
    });

    // C. Create Database Record
    await adminDb.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      email,
      role,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(), // Initialize this field
      createdBy: "Admin Console",
    });

    revalidatePath("/admin/users");
    return { success: true, message: `User created! Password: ${password}` };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// 3. UPDATE USER ROLE
export async function updateUserRole(uid, newRole) {
  try {
    await adminAuth.setCustomUserClaims(uid, {
      role: newRole,
      admin: newRole === "Super Admin" || newRole === "Admin",
    });

    await adminDb.collection("users").doc(uid).update({
      role: newRole,
      updatedAt: new Date(), // Updates timestamp
    });

    revalidatePath("/admin/users");
    return { success: true, message: "Role updated successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// 4. DELETE USER
export async function deleteUser(uid) {
  try {
    await adminAuth.deleteUser(uid);
    await adminDb.collection("users").doc(uid).delete();

    revalidatePath("/admin/users");
    return { success: true, message: "User deleted." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// 5. ADMIN RESET PASSWORD
export async function resetUserPassword(uid) {
  // Generate a secure random password
  const tempPassword = "Inogr" + Math.random().toString(36).slice(-6) + "!";

  try {
    // Force update in Firebase Auth
    await adminAuth.updateUser(uid, { password: tempPassword });

    return {
      success: true,
      message: "Password reset successful.",
      password: tempPassword, // Send this back to UI to show the admin
    };
  } catch (error) {
    console.error("Reset Error:", error);
    return { success: false, message: error.message };
  }
}
