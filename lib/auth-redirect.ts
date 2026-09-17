import { ROUTES } from "@/lib/constants";

/** Only allow in-app return paths so login cannot bounce off-site. */
export function safeReturnPath(from: string | null | undefined) {
  if (!from) return ROUTES.home;
  if (!from.startsWith("/") || from.startsWith("//")) return ROUTES.home;
  if (from === ROUTES.login || from.startsWith(`${ROUTES.login}?`)) return ROUTES.home;
  return from;
}
