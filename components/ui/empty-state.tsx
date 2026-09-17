import { Button } from "@/components/ui/button";

/**
 * The "No data found" screen from the Figma: centred monitor + magnifier
 * illustration over a short heading and helper line.
 */
export function EmptyState({
  title = "No data found for your search.",
  copy = "Explore other options or clear filters to see more results.",
  actionLabel,
  onAction,
}: {
  title?: string;
  copy?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center md:py-20">
      <NoDataArt />
      <h3 className="mt-6 text-md font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-70 text-sm leading-5 text-neutral-500">{copy}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

function NoDataArt() {
  return (
    <svg viewBox="0 0 200 150" className="h-32.5 w-45" fill="none" aria-hidden>
      <rect x="38" y="28" width="118" height="82" rx="8" className="fill-neutral-100" />
      <rect x="44" y="34" width="106" height="64" rx="4" className="fill-white stroke-neutral-200" strokeWidth="1.5" />
      <circle cx="52" cy="42" r="2" className="fill-neutral-300" />
      <circle cx="58.5" cy="42" r="2" className="fill-neutral-300" />
      <circle cx="65" cy="42" r="2" className="fill-neutral-300" />
      <rect x="78" y="110" width="38" height="8" rx="2" className="fill-neutral-200" />
      <rect x="68" y="118" width="58" height="6" rx="3" className="fill-neutral-200" />

      <path d="M58 58h36l12 12v32H58z" className="fill-brand-coral/40 stroke-brand-coral/70" strokeWidth="1.5" />
      <path d="M94 58v12h12" className="stroke-brand-coral/70" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M66 80h18M66 88h12" className="stroke-white" strokeWidth="2" strokeLinecap="round" />

      <circle cx="48" cy="52" r="8" className="fill-brand-coral" />
      <path d="m45 49 6 6M51 49l-6 6" className="stroke-white" strokeWidth="1.8" strokeLinecap="round" />

      <circle cx="138" cy="48" r="22" className="fill-white stroke-neutral-300" strokeWidth="5" />
      <path d="m154 64 14 14" className="stroke-neutral-300" strokeWidth="6" strokeLinecap="round" />
      <path d="m130 40 16 16M146 40l-16 16" className="stroke-brand" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}
