import { apiLogin } from "next-firebase-auth-edge/api"; //
import { NextResponse } from "next/server";

export const runtime = "edge"; // Runs fast on the Edge

export async function GET(request) {
  return apiLogin(request, {
    GET: {
      headers: {
        "Cache-Control": "no-store",
      },
    },
    cookieName: "AuthToken",
    cookieSignatureKeys: ["secret-key-1", "secret-key-2"],
    serviceAccount: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 24,
    },
  });
}
