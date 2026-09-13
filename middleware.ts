import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/repositories",
  "/analytics",
  "/ai-analysis",
  "/news",
  "/trending",
  "/learning",
  "/settings",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    const session = request.cookies.get("techpulse_session")?.value;
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/repositories/:path*",
    "/analytics/:path*",
    "/ai-analysis/:path*",
    "/news/:path*",
    "/trending/:path*",
    "/learning/:path*",
    "/settings/:path*",
  ],
};
