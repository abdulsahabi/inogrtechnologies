import { NextResponse } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/contact",
  "/about",
  "/software",
  "/cafe",
  "/portfolio",
];

export async function middleware(request) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    cookieName: "AuthToken",
    cookieSignatureKeys: ["secret-key-1", "secret-key-2"],
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 24,
    },
    serviceAccount: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    // --- DEBUGGING SECTION ---
    handleValidToken: async ({ token, decodedToken }, headers) => {
      // LOG THE TOKEN TO CONSOLE
      console.log("----------------------------------------------");
      console.log("🔐 Middleware verified user:", decodedToken.email);
      console.log(
        "📜 Custom Claims:",
        decodedToken.admin ? "HAS ADMIN" : "NO ADMIN",
        decodedToken
      );
      console.log("----------------------------------------------");

      if (request.nextUrl.pathname.startsWith("/admin")) {
        // If 'admin' is missing or false, this triggers
        if (!decodedToken.admin) {
          console.log("⛔ ACCESS DENIED: User is not admin");
          return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
      }
      return NextResponse.next({ request: { headers } });
    },
    handleInvalidToken: async (reason) => {
      console.log("⚠️ Invalid Token:", reason);
      if (request.nextUrl.pathname.startsWith("/admin")) {
        return redirectToLogin(request, {
          path: "/login",
          publicPaths: PUBLIC_PATHS,
        });
      }
      return NextResponse.next();
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
