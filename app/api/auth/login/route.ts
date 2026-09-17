import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/constants";
import { loginSchema } from "@/lib/validations";

const REQRES_URL = process.env.REQRES_API_URL ?? "https://reqres.in/api";
const REQRES_KEY = process.env.REQRES_API_KEY ?? "reqres-free-v1";

function displayName(email: string) {
  const local = email.split("@")[0] ?? "Guest";
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid login details" },
      { status: 400 },
    );
  }

  const response = await fetch(`${REQRES_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": REQRES_KEY,
    },
    body: JSON.stringify(parsed.data),
  });

  const payload = (await response.json()) as { token?: string; error?: string };

  if (!response.ok || !payload.token) {
    return NextResponse.json(
      { error: payload.error ?? "Invalid email or password" },
      { status: 401 },
    );
  }

  const session = Buffer.from(
    JSON.stringify({
      token: payload.token,
      email: parsed.data.email,
    }),
  ).toString("base64");

  const jar = await cookies();
  jar.set(AUTH_COOKIE, session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({
    user: {
      email: parsed.data.email,
      name: displayName(parsed.data.email),
    },
  });
}
