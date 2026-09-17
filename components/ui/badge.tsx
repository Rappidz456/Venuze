import { cn } from "@/lib/cn";

/** Small pill used on venue detail and filter chips. */

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "gold";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-sm font-medium",
        tone === "neutral" && "bg-neutral-100 text-slate",
        tone === "brand" && "bg-brand text-white",
        tone === "gold" && "bg-neutral-50 text-neutral-800",
      )}
    >
      {children}
    </span>
  );
}
