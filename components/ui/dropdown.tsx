"use client";

import { useState } from "react";
import { useDismiss } from "@/hooks/use-dismiss";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";

type Trigger = React.ReactNode | ((state: { open: boolean }) => React.ReactNode);

/**
 * Click-to-open menu used by the header, compact search, and sort control.
 * The panel markup stays with the caller so each menu can keep its own
 * radius / offset from the file.
 */
export function Dropdown({
  trigger,
  children,
  align = "right",
  menuClassName,
  triggerClassName,
  menuRole = "menu",
  className,
}: {
  trigger: Trigger;
  children: React.ReactNode;
  align?: "left" | "right" | "center" | "stretch";
  menuClassName?: string;
  triggerClassName?: string;
  menuRole?: "menu" | "listbox";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useDismiss(() => setOpen(false));

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup={menuRole}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={triggerClassName}
      >
        {typeof trigger === "function" ? trigger({ open }) : trigger}
      </button>
      {open ? (
        <div
          role={menuRole}
          className={cn(
            "absolute z-50 mt-2 overflow-hidden rounded-md bg-white py-1 shadow-modal",
            align === "right" && "right-0",
            align === "left" && "left-0",
            align === "center" && "left-1/2 -translate-x-1/2",
            align === "stretch" && "inset-x-0",
            menuClassName,
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function DropdownItem({
  href,
  children,
  onClick,
  className,
  active = false,
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}) {
  const classes = cn(
    "block w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-neutral-100",
    active ? "text-brand" : "text-foreground",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
