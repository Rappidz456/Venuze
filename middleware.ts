import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, ROUTES } from "@/lib/constants";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  if (pathname === ROUTES.login && token) {
    return NextResponse.redirect(new URL(ROUTES.home, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login"],
};
