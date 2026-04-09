import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes — no auth check needed
const PUBLIC_PREFIXES = ["/sign-in", "/api/", "/_next", "/favicon", "/templates"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic =
    pathname === "/" ||
    PUBLIC_PREFIXES.some((p) => pathname.startsWith(p)) ||
    pathname.includes(".");

  if (isPublic) return NextResponse.next();

  // Check session cookie set by Firebase auth
  const session = request.cookies.get("fb_session");
  if (!session?.value) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Also export as default for compatibility
export default proxy;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|templates|.*\\..*).*)"],
};
