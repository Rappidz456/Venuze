import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-brand text-white shadow-tight hover:bg-brand-orange-mid active:translate-y-px",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:text-foreground",
  outline:
    "border border-neutral-200 bg-transparent text-foreground hover:border-brand hover:text-brand",
  ghost: "bg-transparent text-foreground hover:bg-neutral-100",
  gradient:
    "bg-brand-gradient text-white shadow-tight hover:opacity-90 active:translate-y-px",
} as const;

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-md",
  lg: "h-14 px-7 text-md",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-medium tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
