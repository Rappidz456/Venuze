"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useLockBody } from "@/hooks/use-lock-body";
import { cn } from "@/lib/cn";

export function Modal({
  open,
  title,
  onClose,
  children,
  className,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useLockBody(open);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-overlay animate-fade-in"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          "relative z-10 max-h-dialog w-full overflow-y-auto rounded-t-2xl bg-surface p-5 shadow-modal animate-scale-in sm:max-w-xl sm:rounded-xl sm:p-7",
          className,
        )}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id="modal-title" className="text-2xl font-semibold">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full bg-neutral-100 text-foreground transition-colors hover:bg-neutral-200"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
