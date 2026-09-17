import { ROUTES } from "@/lib/constants";

/** Home and the venues/services tree require a session. */
export function isProtectedPath(pathname: string) {
  return pathname === ROUTES.home || pathname === ROUTES.venues || pathname.startsWith(`${ROUTES.venues}/`);
}

/** Only allow in-app return paths so login cannot bounce off-site. */
export function safeReturnPath(from: string | null | undefined) {
  if (!from) return ROUTES.home;
  if (!from.startsWith("/") || from.startsWith("//")) return ROUTES.home;
  if (from === ROUTES.login || from.startsWith(`${ROUTES.login}?`)) return ROUTES.home;
  return from;
}
