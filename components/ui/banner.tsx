import { cn } from "@/lib/cn";
import { CoverImage } from "@/components/ui/image";

/**
 * Full-bleed photo band (hero, featured). Image is optional — grow/host
 * CTAs are gradient-only and use BannerPanel instead.
 */
export function Banner({
  src,
  alt = "",
  sizes = "100vw",
  overlayClassName,
  imageClassName,
  priority = false,
  className,
  id,
  children,
}: {
  src?: string;
  alt?: string;
  sizes?: string;
  overlayClassName?: string;
  imageClassName?: string;
  priority?: boolean;
  className?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative isolate overflow-hidden", className)}>
      {src ? (
        <CoverImage
          src={src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
      ) : null}
      {overlayClassName ? (
        <div className={cn("absolute inset-0", overlayClassName)} />
      ) : null}
      {children}
    </section>
  );
}

/** Inner rounded banner that sits inside a Container (grow + closing CTA). */
export function BannerPanel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)}>{children}</div>
  );
}
