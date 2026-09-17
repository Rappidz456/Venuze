import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/constants";
import {
  displayNameFromEmail,
  fetchReqResProfile,
  parseSession,
  toAuthUser,
  writeSessionCookie,
} from "@/lib/auth-session";

export async function GET() {
  const jar = await cookies();
  const session = parseSession(jar.get(AUTH_COOKIE)?.value);

  if (!session) {
    return NextResponse.json({ user: null });
  }

  const expectedName = displayNameFromEmail(session.email);
  if (session.name !== expectedName || !session.avatar) {
    const profile = await fetchReqResProfile(session.email);
    session.name = profile.name;
    session.avatar = session.avatar ?? profile.avatar;
    await writeSessionCookie(session);
  }

  return NextResponse.json({ user: toAuthUser(session) });
}
