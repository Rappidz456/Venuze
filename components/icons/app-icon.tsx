import { cn } from "@/lib/cn";

export const ICONS = {
  search: "/icons/search.svg",
  venue: "/icons/venue.svg",
  vendors: "/icons/vendors.svg",
  listing: "/icons/listing.svg",
  heart: "/icons/heart.svg",
} as const;

type IconName = keyof typeof ICONS;

export function MaskIcon({
  src,
  className,
  title,
}: {
  src: string;
  className?: string;
  title?: string;
}) {
  return (
    <span
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("app-icon inline-block shrink-0 bg-current", className)}
      style={{
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
      }}
    />
  );
}

export function AppIcon({
  name,
  className,
  title,
}: {
  name: IconName;
  className?: string;
  title?: string;
}) {
  return <MaskIcon src={ICONS[name]} className={className} title={title} />;
}
