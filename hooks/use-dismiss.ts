"use client";

import { useEffect, useRef } from "react";

/** Closes a popover when you click outside it or hit Escape. */
export function useDismiss(onDismiss: () => void, enabled = true) {
  const ref = useRef<HTMLDivElement>(null);
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    if (!enabled) return;

    const onPointer = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) onDismissRef.current();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismissRef.current();
    };

    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled]);

  return ref;
}
