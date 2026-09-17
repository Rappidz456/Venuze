import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";

export function Logo({
  inverted = false,
  className,
}: {
  inverted?: boolean;
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
        className="h-7 w-7 shrink-0 object-contain md:h-8 md:w-8"
        priority
      />
      <span
        className={cn(
          "hidden text-lg font-semibold lowercase leading-none tracking-wide xl:inline xl:text-xl",
          inverted ? "text-white" : "text-foreground",
        )}
      >
        venuze
      </span>
    </Link>
  );
}
