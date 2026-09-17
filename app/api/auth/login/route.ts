import { NextResponse } from "next/server";
import { fetchReqResProfile, writeSessionCookie } from "@/lib/auth-session";
import { loginSchema } from "@/lib/validations";
import type { AuthUser } from "@/types";

const REQRES_URL = process.env.REQRES_API_URL ?? "https://reqres.in/api";
const REQRES_KEY = process.env.REQRES_API_KEY ?? "reqres-free-v1";

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

  const profile = await fetchReqResProfile(parsed.data.email);
  const user: AuthUser = {
    email: parsed.data.email,
    name: profile.name,
    avatar: profile.avatar,
  };

  await writeSessionCookie({
    token: payload.token,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  });

  return NextResponse.json({ user });
}
