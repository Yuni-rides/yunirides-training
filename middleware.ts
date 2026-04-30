// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get("access_token")?.value;

//   const PUBLIC_ROUTES = ["/login", "/forgot-password", "/register"];
//   const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

//   // If NO token and NOT a public route, go to login
//   if (!token && !isPublicRoute) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // If YES token and IS a public route, go to dashboard
//   if (token && isPublicRoute) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const PUBLIC_ROUTES = ["/login", "/forgot-password", "/register"];
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// YEH HISSA ADD KARO:
export const config = {
  matcher: [
    /*
     * In paths pe middleware RUN NAHI HOGA:
     * - api (API routes)
     * - _next/static (static files like CSS/JS)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Images (png, jpg, jpeg, svg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$|.*\\.css$).*)',
  ],
};