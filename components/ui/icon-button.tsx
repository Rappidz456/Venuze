import { cn } from "@/lib/cn";

/** Round / square icon hit target. Sizing and colour stay at the call site. */
export function IconButton({
  label,
  className,
  children,
  type = "button",
  ...props
}: {
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </button>
  );
}
