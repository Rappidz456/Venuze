import { ROUTES } from "@/lib/constants";

export const HEADER_SCROLL_THRESHOLD = 72;

/** Compact chrome once Home is scrolled, and on every other site route. */
export function isHeaderCompact(pathname: string, hasScrolled: boolean) {
  return pathname !== ROUTES.home || hasScrolled;
}
