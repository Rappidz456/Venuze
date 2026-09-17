import NextLink from "next/link";

/**
 * App-wide Link. Always go through here instead of next/link so we can
 * swap prefetch / scroll behaviour in one place later.
 */
export function Link({
  className,
  ...props
}: React.ComponentProps<typeof NextLink>) {
  return <NextLink className={className} {...props} />;
}
