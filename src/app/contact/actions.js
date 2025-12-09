"use server";

import { adminDb } from "@/lib/firebase-admin-server";
import { sendEmail } from "@/lib/email"; // <--- Import the helper

export async function submitContactForm(data) {
  try {
    if (!data.name || !data.email || !data.message) {
      return { success: false, message: "Missing required fields." };
    }

    // 1. Save to Database
    await adminDb.collection("messages").add({
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp || "Not provided",
      service: data.service,
      message: data.message,
      status: "Unread",
      createdAt: new Date(),
    });

    // 2. Send Auto-Reply to Customer
    await sendEmail({
      to: data.email,
      subject: `We received your inquiry: ${data.service}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hello ${data.name},</h2>
          <p>Thanks for reaching out to InoGr Technologies. We have received your message regarding <strong>${data.service}</strong>.</p>
          <p>Our team is reviewing it and will get back to you shortly.</p>
          <hr />
          <p style="color: #666; font-size: 12px;">Your Message:<br/>"${data.message}"</p>
        </div>
      `,
    });

    // 3. (Optional) Send Notification to You (Admin)
    await sendEmail({
      to: process.env.GMAIL_USER,
      subject: `New Inquiry from ${data.name}`,
      html: `<p>New message from <strong>${data.name}</strong> (${data.email}):</p><p>${data.message}</p>`,
    });

    return { success: true };
  } catch (error) {
    console.error("Contact Error:", error);
    return { success: false, message: "Server Error" };
  }
}
