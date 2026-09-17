import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-page px-5 md:px-8 lg:px-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Section heading per the Figma home page: 44px SemiBold title on a 50px
 * leading, 20px regular copy under it, both centred inside a 1200px column.
 */
export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-content",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-2.5 text-sm font-medium uppercase tracking-widest text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-semibold leading-heading tracking-tight md:text-4xl lg:text-5xl lg:leading-section lg:tracking-tighter",
          tone === "light" ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mt-2.5 text-md font-regular leading-normal tracking-wide lg:text-xl lg:leading-7.5",
            align === "center" && "mx-auto",
            tone === "light" ? "text-white/80" : "text-foreground",
          )}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}

/** The 42px circular carousel arrows that sit at the end of several sections. */
export function CarouselArrows({
  onPrev,
  onNext,
  label,
  className,
}: {
  onPrev: () => void;
  onNext: () => void;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <ArrowButton direction="left" label={`Previous ${label}`} onClick={onPrev} />
      <ArrowButton direction="right" label={`Next ${label}`} onClick={onNext} />
    </div>
  );
}

function ArrowButton({
  direction,
  label,
  onClick,
}: {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <IconButton
      label={label}
      onClick={onClick}
      className="size-10.5 rounded-full bg-neutral-100 text-neutral-800 shadow-soft transition-transform hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 24 24" className="size-4.5" fill="none" aria-hidden>
        <path
          d={direction === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconButton>
  );
}
