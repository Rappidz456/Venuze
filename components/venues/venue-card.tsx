"use client";

import { AppIcon } from "@/components/icons/app-icon";
import { Card, CardBody, CardMedia } from "@/components/ui/card";
import { CoverImage } from "@/components/ui/image";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/venues";
import { useUiStore } from "@/stores/ui-store";
import type { Venue } from "@/types";

/**
 * Venue card as drawn in the Figma (search results and featured rail):
 * photo with verified pill, share/save controls, gallery arrows and dots;
 * then a two-line title, orange location line, bordered meta chips, and a
 * price beside an outlined "View details" action.
 */
export function VenueCard({
  venue,
  size = "md",
}: {
  venue: Venue;
  size?: "md" | "lg";
}) {
  const saved = useUiStore((state) => state.savedVenueIds.includes(venue.id));
  const toggleSaved = useUiStore((state) => state.toggleSaved);
  const large = size === "lg";

  return (
    <Card
      className={cn(
        "group transition-transform duration-300 hover:-translate-y-1",
        large && "h-full",
      )}
    >
      <CardMedia className={large ? "h-44 sm:h-48" : "h-45"}>
        <Link href={`/venues/${venue.id}`} className="block h-full">
          <CoverImage
            src={venue.image}
            alt={venue.name}
            sizes={
              large
                ? "(max-width: 768px) 85vw, (max-width: 1024px) 340px, 25vw"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 46vw, 320px"
            }
          />
        </Link>

        {venue.featured ? (
          <span className="pointer-events-none absolute left-3 top-3 rounded-pill bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm sm:left-3.5 sm:top-3.5">
            Verified
          </span>
        ) : null}

        <div className="absolute right-3 top-3 flex items-center gap-1.5 sm:right-3.5 sm:top-3.5">
          <IconButton
            label="Share venue"
            className="size-7 rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <ShareGlyph />
          </IconButton>
          <IconButton
            label={saved ? "Remove from saved" : "Save venue"}
            onClick={() => toggleSaved(venue.id)}
            className={cn(
              "size-7 rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60",
              saved ? "text-brand" : "text-white",
            )}
          >
            <AppIcon name="heart" className={cn("size-3.5", saved && "bg-brand")} />
          </IconButton>
        </div>

        {/* gallery controls — revealed on hover, as in the design */}
        <GalleryArrow side="left" />
        <GalleryArrow side="right" />

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1"
        >
          <i className="size-1 rounded-full bg-white/60" />
          <i className="size-1.5 rounded-full bg-white" />
          <i className="size-1 rounded-full bg-white/60" />
        </span>
      </CardMedia>

      <CardBody className={large ? "p-5" : "p-4"}>
        <Link href={`/venues/${venue.id}`}>
          <h3
            className={cn(
              "line-clamp-2 font-semibold tracking-wide text-neutral-900",
              large
                ? "text-md leading-5.5 md:text-md md:leading-6"
                : "text-base leading-5",
            )}
          >
            {venue.name}
          </h3>
        </Link>

        <p className="mt-2.5 flex items-center gap-1.5 text-sm font-semibold text-brand">
          <PinGlyph />
          {venue.city}
          {venue.country === "UK" ? ", SW1" : `, ${venue.country}`}
        </p>

        <ul className="mt-3 flex flex-wrap items-center gap-1.5">
          <MetaChip icon={<PeopleGlyph />}>{venue.capacity}+</MetaChip>
          <MetaChip icon={<AreaGlyph />}>2,000 sq ft</MetaChip>
          <MetaChip icon={<ParkGlyph />}>Free parking</MetaChip>
          <MetaChip>+25 more</MetaChip>
        </ul>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-neutral-150 pt-3.5">
          <p className="text-sm text-neutral-500">
            From{" "}
            <span className="text-base font-bold text-neutral-900">
              {formatPrice(venue.priceFrom)}
            </span>
            /hour
          </p>
          <Link
            href={`/venues/${venue.id}`}
            className="shrink-0 rounded-pill border border-brand px-3.5 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
          >
            View details
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

function MetaChip({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="inline-flex items-center gap-1 rounded-pill border border-neutral-200 px-2 py-1 text-xs text-neutral-600">
      {icon}
      {children}
    </li>
  );
}

function GalleryArrow({ side }: { side: "left" | "right" }) {
  return (
    <IconButton
      label={side === "left" ? "Previous photo" : "Next photo"}
      className={cn(
        "absolute top-1/2 size-7 -translate-y-1/2 rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/65 group-hover:opacity-100 focus-visible:opacity-100",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
        <path
          d={side === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconButton>
  );
}

function ShareGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M8 10.5V2.5m0 0L5.4 5.1M8 2.5l2.6 2.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 9v3.6c0 .5.4.9.9.9h7.2c.5 0 .9-.4.9-.9V9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinGlyph() {
  return (
    <svg viewBox="0 0 12 12" className="size-3.5 shrink-0" fill="none" aria-hidden>
      <path
        d="M6 10.5S9.5 7.6 9.5 5.2a3.5 3.5 0 1 0-7 0C2.5 7.6 6 10.5 6 10.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="5.1" r="1.2" fill="currentColor" />
    </svg>
  );
}

function PeopleGlyph() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 text-neutral-400" fill="none" aria-hidden>
      <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 11.5c.4-1.8 1.7-2.7 3-2.7s2.6.9 3 2.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="10" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 11.5c.3-1.2 1.1-1.8 2-1.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function AreaGlyph() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 text-neutral-400" fill="none" aria-hidden>
      <path d="M8.5 2.5H11.5V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 11.5H2.5V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 2.5 8 6M2.5 11.5 6 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ParkGlyph() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 text-neutral-400" fill="none" aria-hidden>
      <path d="M2 9.5h10M3 9.5V7l1.2-2.4h5.6L11 7v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="4.5" cy="10.5" r="1" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9.5" cy="10.5" r="1" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
