import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/lib/constants";
import type { AuthUser } from "@/types";

const REQRES_URL = process.env.REQRES_API_URL ?? "https://reqres.in/api";
const REQRES_KEY = process.env.REQRES_API_KEY ?? "reqres-free-v1";
const USERS_TTL_MS = 5 * 60 * 1000;

export type AuthSession = {
  token: string;
  email: string;
  name: string;
  avatar?: string;
};

type ReqResUser = {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

let usersCache: { at: number; users: ReqResUser[] } | null = null;

export function displayNameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "Guest";
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function clearReqResUsersCache() {
  usersCache = null;
}

async function fetchReqResUsers() {
  if (usersCache && Date.now() - usersCache.at < USERS_TTL_MS) {
    return usersCache.users;
  }

  const pages = await Promise.all(
    [1, 2].map((page) =>
      fetch(`${REQRES_URL}/users?page=${page}`, {
        headers: { "x-api-key": REQRES_KEY },
        next: { revalidate: 300 },
      }).then(async (response) => {
        if (!response.ok) return [] as ReqResUser[];
        const payload = (await response.json()) as { data?: ReqResUser[] };
        return payload.data ?? [];
      }),
    ),
  );

  const users = pages.flat();
  usersCache = { at: Date.now(), users };
  return users;
}

/** Name belongs to the logged-in email; photo can still be any ReqRes avatar. */
export async function fetchReqResProfile(email: string) {
  const users = await fetchReqResUsers();
  const match = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  const photo = users.length ? users[Math.floor(Math.random() * users.length)] : undefined;

  return {
    name: match ? `${match.first_name} ${match.last_name}` : displayNameFromEmail(email),
    avatar: photo?.avatar ?? match?.avatar,
  };
}

export function encodeSession(session: AuthSession) {
  return Buffer.from(JSON.stringify(session)).toString("base64");
}

export function parseSession(raw: string | undefined): AuthSession | null {
  if (!raw) return null;

  try {
    const decoded = JSON.parse(Buffer.from(raw, "base64").toString("utf8")) as Partial<AuthSession>;
    if (!decoded.email || !decoded.token) return null;
    return {
      token: decoded.token,
      email: decoded.email,
      name: decoded.name || displayNameFromEmail(decoded.email),
      avatar: decoded.avatar,
    };
  } catch {
    return null;
  }
}

export function toAuthUser(session: AuthSession): AuthUser {
  return {
    email: session.email,
    name: session.name,
    avatar: session.avatar,
  };
}

export async function writeSessionCookie(session: AuthSession) {
  const jar = await cookies();
  jar.set(AUTH_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}
