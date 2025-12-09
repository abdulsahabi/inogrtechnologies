"use server";

import { sendEmail } from "@/lib/email";
import { adminDb } from "@/lib/firebase-admin-server";

export async function sendReplyEmail(
  messageId,
  userEmail,
  replyText,
  adminUser
) {
  try {
    // 1. Send the email with a personalized signature
    await sendEmail({
      to: userEmail,
      subject: "Re: Your Inquiry to InoGr Technologies",
      html: `
        <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
          <p>${replyText}</p>
          <br/>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="color: #666; font-size: 14px;">
            Best regards,<br/>
            <strong>${adminUser.name}</strong><br/>
            <span style="color: #888; font-size: 12px;">InoGr Technologies Team</span>
          </p>
        </div>
      `,
    });

    // 2. Update Database with "Who done it"
    await adminDb
      .collection("messages")
      .doc(messageId)
      .update({
        status: "Replied",
        replySentAt: new Date(),
        repliedBy: {
          name: adminUser.name,
          email: adminUser.email,
          photo: adminUser.photo || null,
        },
        replyText: replyText, // Optional: Save what was sent for history
      });

    return { success: true };
  } catch (error) {
    console.error("Reply Error:", error);
    return { success: false, message: error.message };
  }
}
