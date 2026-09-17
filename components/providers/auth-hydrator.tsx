"use client";

import { useSessionQuery } from "@/hooks/use-auth";

export function AuthHydrator() {
  useSessionQuery();
  return null;
}
