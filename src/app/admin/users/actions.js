"use server";

import { adminAuth, adminDb } from "@/lib/firebase-admin-server";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/email"; // <--- Import Email Helper

// --- HELPER: SERIALIZE DATA ---
const serializeData = (data) => ({
  ...data,
  createdAt: data.createdAt?.toDate().toISOString() || null,
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
      ...serializeData(doc.data()),
    }));
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return [];
  }
}

// 2. INVITE USER (Create & Email)
export async function inviteUser(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const role = formData.get("role");
  let password = formData.get("password");

  if (!password || password.trim() === "") {
    password = "Inogr" + Math.random().toString(36).slice(-6) + "!";
  }

  try {
    // A. Create Auth User
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    // B. Set Claims
    await adminAuth.setCustomUserClaims(userRecord.uid, {
      role,
      admin: role === "Super Admin" || role === "Admin",
    });

    // C. Create DB Record
    await adminDb.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      email,
      role,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "Admin Console",
    });

    // D. SEND WELCOME EMAIL
    await sendEmail({
      to: email,
      subject: "Welcome to InoGr Admin Portal 🚀",
      html: `
        <div style="font-family: sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #4cb050;">Welcome Aboard!</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>An account has been created for you on the InoGr Technologies Admin Portal.</p>
          
          <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Role:</strong> ${role}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Temporary Password:</strong> <code style="background: #e4e4e7; padding: 2px 6px; border-radius: 4px;">${password}</code></p>
          </div>

          <p>Please log in and change your password immediately.</p>
          <a href="${process.env.NEXT_PUBLIC_HOST}/login" style="display: inline-block; background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">Go to Login</a>
        </div>
      `,
    });

    revalidatePath("/admin/users");
    return { success: true, message: `User created! Email sent to ${email}.` };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

// 3. UPDATE USER ROLE (And Notify)
export async function updateUserRole(uid, newRole) {
  try {
    // 1. Update Claims
    await adminAuth.setCustomUserClaims(uid, {
      role: newRole,
      admin: newRole === "Super Admin" || newRole === "Admin",
    });

    // 2. Update DB
    await adminDb.collection("users").doc(uid).update({
      role: newRole,
      updatedAt: new Date(),
    });

    // 3. Get Email to Notify User
    const userRecord = await adminAuth.getUser(uid);
    if (userRecord.email) {
      await sendEmail({
        to: userRecord.email,
        subject: "Your Role Has Changed",
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h3>Role Update</h3>
            <p>Your access level on InoGr Admin has been updated to: <strong>${newRole}</strong>.</p>
            <p>Please log out and log back in for the changes to take full effect.</p>
          </div>
        `,
      });
    }

    revalidatePath("/admin/users");
    return { success: true, message: "Role updated & notification sent." };
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

// 5. ADMIN RESET PASSWORD (And Email)
export async function resetUserPassword(uid) {
  const tempPassword = "Inogr" + Math.random().toString(36).slice(-6) + "!";

  try {
    await adminAuth.updateUser(uid, { password: tempPassword });

    // Send Email
    const userRecord = await adminAuth.getUser(uid);
    if (userRecord.email) {
      await sendEmail({
        to: userRecord.email,
        subject: "Security Alert: Password Reset",
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <p>Your password was reset by an administrator.</p>
            <p><strong>New Password:</strong> ${tempPassword}</p>
            <p>Use this to log in, then update your password in Settings.</p>
          </div>
        `,
      });
    }

    return {
      success: true,
      message: "Password reset & email sent.",
      password: tempPassword,
    };
  } catch (error) {
    console.error("Reset Error:", error);
    return { success: false, message: error.message };
  }
}
