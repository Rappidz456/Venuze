import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";

export function Logo({
  inverted = false,
  wordmark = "auto",
  className,
}: {
  inverted?: boolean;
  wordmark?: "auto" | "from-md" | "always";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2", className)}
      aria-label="Venuze home"
    >
      <Image
        src="/images/venuze-logo.png"
        alt=""
        width={34}
        height={34}
        className="h-8 w-8 shrink-0 object-contain"
        priority
      />
      <span
        className={cn(
          "text-lg font-semibold lowercase leading-none tracking-wide xl:text-xl",
          inverted ? "text-white" : "text-foreground",
          wordmark === "always" && "inline",
          wordmark === "from-md" && "hidden md:inline",
          wordmark === "auto" && "hidden xl:inline",
        )}
      >
        venuze
      </span>
    </Link>
  );
}
