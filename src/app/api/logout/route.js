import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  // 1. Delete the Secure Session Cookie
  const cookieStore = await cookies();
  cookieStore.delete("AuthToken");

  // 2. FORCE Redirect to Login Page
  // We use the request URL to determine the correct domain (localhost vs production)
  return NextResponse.redirect(new URL("/login", request.url));
}
