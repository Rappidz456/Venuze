import { cn } from "@/lib/cn";

/** Labelled text input with the 12px radius from the form spec. */

type FieldProps = {
  label?: string;
  error?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Field({
  label,
  error,
  hint,
  id,
  className,
  ...props
}: FieldProps) {
  return (
    <label className="flex w-full flex-col gap-1.5 text-left" htmlFor={id}>
      {label ? (
        <span className="text-sm font-medium text-neutral-500">{label}</span>
      ) : null}
      <input
        id={id}
        className={cn(
          "h-12 w-full rounded-md border bg-surface px-4 text-md text-foreground outline-none transition-colors placeholder:text-neutral-400",
          error
            ? "border-danger"
            : "border-neutral-200 focus:border-brand",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-sm text-danger">{error}</span> : null}
      {hint && !error ? (
        <span className="text-sm text-neutral-400">{hint}</span>
      ) : null}
    </label>
  );
}
