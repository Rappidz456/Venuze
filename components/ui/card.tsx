import { cn } from "@/lib/cn";
import { Link } from "@/components/ui/link";
import { CoverImage } from "@/components/ui/image";

/**
 * White lifted card from the search grid / featured rail.
 * Pass extra classes for hover lift, padding lives in CardBody.
 */
export function Card({
  as: Comp = "article",
  className,
  children,
}: {
  as?: "article" | "div";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Comp className={cn("overflow-hidden rounded-lg bg-surface shadow-card", className)}>
      {children}
    </Comp>
  );
}

export function CardMedia({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("relative", className)}>{children}</div>;
}

export function CardBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

/**
 * Image tile with the hover-zoom + gradient fade used on categories,
 * vendors, and destination cards. Overlay class is per-section because
 * the Figma fades aren't identical.
 */
export function MediaTile({
  href,
  src,
  alt,
  sizes,
  overlayClassName = "bg-tile-fade",
  className,
  children,
}: {
  href: string;
  src: string;
  alt: string;
  sizes?: string;
  overlayClassName?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn("group relative isolate overflow-hidden rounded-lg", className)}
    >
      <CoverImage
        src={src}
        alt={alt}
        sizes={sizes}
        className="transition-transform duration-500 group-hover:scale-105"
      />
      <div className={cn("absolute inset-0", overlayClassName)} />
      {children}
    </Link>
  );
}
