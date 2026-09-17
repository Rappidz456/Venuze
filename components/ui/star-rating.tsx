import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function StarRating({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm font-medium", className)}>
      <Star className="size-3.5 fill-brand-gold text-brand-gold" />
      {value.toFixed(1)}
    </span>
  );
}
