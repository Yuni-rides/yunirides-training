import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const PUBLIC_ROUTES = ["/login", "/forgot-password", "/register"];
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  // If NO token and NOT a public route, go to login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If YES token and IS a public route, go to dashboard
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

