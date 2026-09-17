import { cn } from "@/lib/cn";

/**
 * Fixed top bar. `inverted` is the transparent home-hero state;
 * `bordered` is the solid venues chrome. `stacked` is the two-row
 * mobile compact bar (logo + account, search underneath).
 */
export function Navbar({
  inverted = false,
  bordered = false,
  stacked = false,
  logo,
  center,
  actions,
}: {
  inverted?: boolean;
  bordered?: boolean;
  stacked?: boolean;
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
      <div
        className={cn(
          "relative mx-auto w-full min-w-0 max-w-frame",
          stacked
            ? "grid grid-cols-[1fr_auto] items-center px-4 pb-3 pt-3 md:flex md:h-header md:justify-between md:gap-3 md:px-6 md:py-0 lg:px-10"
            : "flex h-14 items-center justify-between gap-2 px-4 sm:h-16 md:h-header md:gap-3 md:px-6 lg:px-10",
        )}
      >
        {logo}
        {center}
        {actions}
      </div>
    </header>
  );
}
