import NextImage, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

/**
 * Thin next/image wrapper so pages don't import the framework primitive
 * directly. Pass width/height for intrinsic images, or use CoverImage
 * when the parent is `position: relative` and we need fill + cover.
 */
export function Image({ alt, ...props }: ImageProps) {
  return <NextImage alt={alt} {...props} />;
}

export function CoverImage({
  alt,
  sizes = "100vw",
  className,
  ...props
}: Omit<ImageProps, "fill" | "alt"> & { alt: string }) {
  return (
    <NextImage
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
      {...props}
    />
  );
}
