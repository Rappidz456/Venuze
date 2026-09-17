import { NextResponse, type NextRequest } from "next/server";
import { isProtectedPath } from "@/lib/auth-redirect";
import { AUTH_COOKIE, ROUTES } from "@/lib/constants";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const { pathname, search } = request.nextUrl;

  if (pathname === ROUTES.login) {
    if (token) {
      return NextResponse.redirect(new URL(ROUTES.home, request.url));
    }
    return NextResponse.next();
  }

  if (isProtectedPath(pathname) && !token) {
    const login = new URL(ROUTES.login, request.url);
    const from = `${pathname}${search}`;
    if (from && from !== ROUTES.home) login.searchParams.set("from", from);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/venues", "/venues/:path*"],
};
