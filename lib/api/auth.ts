import { api } from "@/lib/api/client";
import type { AuthUser, LoginPayload } from "@/types";

export async function loginRequest(payload: LoginPayload) {
  const { data } = await api.post<{ user: AuthUser }>("/auth/login", payload);
  return data.user;
}

export async function logoutRequest() {
  await api.post("/auth/logout");
}

export async function fetchSession() {
  const { data } = await api.get<{ user: AuthUser | null }>("/auth/me");
  return data.user;
}
