"use server";

import { adminDb } from "@/lib/firebase-admin-server";
import { sendEmail } from "@/lib/email";

export async function subscribeNewsletter(email, interests) {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Invalid email address." };
  }

  try {
    const existing = await adminDb
      .collection("subscribers")
      .where("email", "==", email)
      .get();

    if (!existing.empty) {
      const docId = existing.docs[0].id;
      await adminDb.collection("subscribers").doc(docId).update({
        interests: interests,
        updatedAt: new Date(),
        status: "Active",
      });
      return { success: true, message: "Preferences updated!" };
    }

    await adminDb.collection("subscribers").add({
      email,
      interests,
      createdAt: new Date(),
      status: "Active",
      source: "Website Footer",
    });

    // --- 2026 ENTERPRISE EMAIL TEMPLATE ---
    await sendEmail({
      to: email,
      subject: "Welcome to the Future of Kebbi Tech 🚀",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <style>
            body { margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
            .header { background: #000000; padding: 40px; text-align: center; }
            .logo { color: #fff; font-size: 24px; font-weight: 800; text-decoration: none; letter-spacing: -1px; }
            .logo span { color: #4cb050; }
            .content { padding: 40px; color: #333333; line-height: 1.6; }
            .h1 { font-size: 28px; font-weight: 800; color: #18181b; margin-bottom: 16px; letter-spacing: -0.5px; }
            .text { font-size: 16px; color: #52525b; margin-bottom: 24px; }
            .tag-container { margin: 24px 0; }
            .tag { display: inline-block; background: #ecfdf5; color: #059669; padding: 6px 12px; border-radius: 100px; font-size: 12px; font-weight: 700; margin-right: 8px; border: 1px solid #d1fae5; text-transform: uppercase; letter-spacing: 0.5px; }
            .btn { display: inline-block; background: #4cb050; color: #ffffff; padding: 14px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; margin-top: 10px; box-shadow: 0 4px 12px rgba(76, 176, 80, 0.3); }
            .footer { background: #fafafa; padding: 30px; text-align: center; font-size: 12px; color: #a1a1aa; border-top: 1px solid #f4f4f5; }
            .link { color: #a1a1aa; text-decoration: underline; }
            
            @media (prefers-color-scheme: dark) {
              .container { background: #18181b; border: 1px solid #27272a; }
              .h1 { color: #ffffff; }
              .text { color: #a1a1aa; }
              .footer { background: #27272a; border-top: 1px solid #3f3f46; }
              .tag { background: #064e3b; color: #6ee7b7; border-color: #065f46; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <a href="https://inogrtechnologies.com" class="logo">Ino<span>Gr</span></a>
            </div>

            <div class="content">
              <div class="h1">You're officially on the list.</div>
              <p class="text">Hi there,</p>
              <p class="text">Thank you for joining <strong>InoGr Technologies</strong>. You are now part of Kebbi State's fastest-growing digital ecosystem.</p>
              
              <p class="text">We've customized your feed based on your interests:</p>
              <div class="tag-container">
                ${interests
                  .map((i) => `<span class="tag">${i}</span>`)
                  .join("")}
              </div>

              <p class="text">Expect curated insights, student offers, and tech news directly in your inbox. No spam, just value.</p>

              <center>
                <a href="https://inogrtechnologies.com/blog" class="btn">Read Latest Insights</a>
              </center>
            </div>

            <div class="footer">
              <p>InoGr Technologies • Federal University Birnin Kebbi • Kebbi State, NG</p>
              <p>
                <a href="#" class="link">Unsubscribe</a> • 
                <a href="https://inogrtechnologies.com/privacy" class="link">Privacy Policy</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
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
