import { cn } from "@/lib/cn";

/**
 * Fixed top bar. `inverted` is the transparent home-hero state;
 * `bordered` is the solid venues chrome. Everything else (logo, search,
 * account) is slotted in so this file doesn't know about routes.
 */
export function Navbar({
  inverted = false,
  bordered = false,
  logo,
  center,
  actions,
}: {
  inverted?: boolean;
  bordered?: boolean;
  logo: React.ReactNode;
  center?: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        inverted
          ? "bg-transparent"
          : bordered
            ? "border-b border-neutral-200 bg-surface"
            : "bg-surface/95 shadow-header backdrop-blur-md",
      )}
    >
      <div className="relative mx-auto flex h-14 w-full min-w-0 max-w-frame items-center justify-between gap-2 px-4 sm:h-16 md:h-header md:gap-3 md:px-6 lg:px-10">
        {logo}
        {center}
        {actions}
      </div>
    </header>
  );
}
