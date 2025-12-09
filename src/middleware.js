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
];

export async function middleware(request) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // From your client config
    cookieName: "AuthToken",
    cookieSignatureKeys: ["secret-key-1", "secret-key-2"], // Change these in production!
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 24, // 12 days
    },
    serviceAccount: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    // THE SECURITY CHECK
    handleValidToken: async ({ token, decodedToken }, headers) => {
      // 1. Block Non-Admins from /admin
      if (request.nextUrl.pathname.startsWith("/admin")) {
        if (!decodedToken.admin) {
          return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
      }
      return NextResponse.next({ request: { headers } });
    },
    handleInvalidToken: async (reason) => {
      // 2. Redirect to Login if accessing protected route
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
