"use client";

import { useEffect, useState } from "react";
import { CoverImage } from "@/components/ui/image";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/venues";
import type { Venue } from "@/types";

/**
 * The map from the Figma search results screen. Docked sits in the desktop
 * column; full fills the iPad/mobile map view after Show Map.
 */
export function MapPanel({
  venues,
  variant = "docked",
}: {
  venues: Venue[];
  variant?: "docked" | "full";
}) {
  const [selected, setSelected] = useState<string | null>(venues[0]?.id ?? null);
  const full = variant === "full";

  useEffect(() => {
    setSelected((current) =>
      current && venues.some((venue) => venue.id === current)
        ? current
        : (venues[0]?.id ?? null),
    );
  }, [venues]);

  const active = venues.find((venue) => venue.id === selected) ?? null;

  return (
    <div
      className={cn(
        "relative h-full min-h-map overflow-hidden bg-map",
        full ? "rounded-none" : "rounded-l-md",
      )}
    >
      <CoverImage
        src="/images/Rectangle%20257.png"
        alt=""
        sizes={full ? "100vw" : "(min-width: 1280px) 421px, 36vw"}
        className="object-top"
      />

      {full ? null : (
        <IconButton
          label="Expand map"
          className="absolute right-3 top-3 z-30 size-8 rounded-xs bg-white text-neutral-800 shadow-soft transition-colors hover:text-brand"
        >
          <ExpandGlyph />
        </IconButton>
      )}

      {venues.slice(0, 8).map((venue, index) => {
        const spot = PIN_SPOTS[index % PIN_SPOTS.length];
        return (
          <button
            key={venue.id}
            type="button"
            onClick={() => setSelected(venue.id)}
            aria-label={`Show ${venue.name} on the map`}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110",
              venue.id === selected ? "z-20 scale-110 text-brand" : "z-10 text-brand/80",
            )}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <svg viewBox="0 0 24 24" className={cn("drop-shadow", full ? "size-8" : "size-6")} fill="currentColor" aria-hidden>
              <path d="M12 20.7 4.9 13.4a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l.6.6.6-.6a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5L12 20.7Z" />
            </svg>
          </button>
        );
      })}

      {active ? (
        <div
          className={cn(
            "absolute z-30 overflow-hidden rounded-sm bg-white shadow-modal",
            full
              ? "left-1/2 top-[22%] w-52 -translate-x-1/2 md:w-60"
              : "left-1/2 top-popup w-arrow -translate-x-1/2",
          )}
        >
          <Link href={`/venues/${active.id}`} className="block">
            <div className={cn("relative", full ? "h-28 md:h-32" : "h-21.5")}>
              <CoverImage
                src={active.image}
                alt={active.name}
                sizes={full ? "240px" : "190px"}
              />
            </div>
            <div className="p-2.5">
              <p className="line-clamp-1 text-sm font-semibold text-neutral-900">
                {active.name}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-brand">
                <svg viewBox="0 0 12 12" className="size-2.5" fill="none" aria-hidden>
                  <path
                    d="M6 10.5S9.5 7.6 9.5 5.2a3.5 3.5 0 1 0-7 0C2.5 7.6 6 10.5 6 10.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                {active.city}, {active.country}
              </p>
              {full ? null : (
                <p className="mt-1.5 text-xs text-neutral-500">
                  From{" "}
                  <span className="text-xs font-bold text-neutral-900">
                    {formatPrice(active.priceFrom)}
                  </span>
                  /hour
                </p>
              )}
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

const PIN_SPOTS = [
  { x: 62, y: 33 },
  { x: 44, y: 38 },
  { x: 78, y: 37 },
  { x: 52, y: 44 },
  { x: 68, y: 45 },
  { x: 60, y: 52 },
  { x: 36, y: 49 },
  { x: 72, y: 58 },
];

function ExpandGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M6 2H2v4M10 2h4v4M10 14h4v-4M6 14H2v-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
