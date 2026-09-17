import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/constants";

function displayName(email: string) {
  const local = email.split("@")[0] ?? "Guest";
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function GET() {
  const jar = await cookies();
  const raw = jar.get(AUTH_COOKIE)?.value;

  if (!raw) {
    return NextResponse.json({ user: null });
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(raw, "base64").toString("utf8"),
    ) as { email?: string };

    if (!decoded.email) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        email: decoded.email,
        name: displayName(decoded.email),
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
