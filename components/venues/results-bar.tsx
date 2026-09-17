"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown";
import { PRICE_BOUNDS, PRICE_CURRENCY } from "@/lib/constants";
import { cn } from "@/lib/cn";
import type { VenueAmenity } from "@/types";

/**
 * The summary row that sits above the results grid: the match count, the
 * active filters as removable pills, and the sort control on the right.
 */

const SORTS = [
  { value: "featured", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
] as const;

const AMENITY_LABELS: Record<VenueAmenity, string> = {
  wifi: "Wi-Fi",
  parking: "Parking",
  catering: "Catering",
  av: "AV kit",
  outdoor: "Outdoor",
  bar: "Bar",
  accessible: "Accessible",
  overnight: "Overnight",
};

type Chip = { key: string; label: string; remove: (next: URLSearchParams) => void };

/** Drops one value out of a comma-joined param, deleting it when empty. */
function dropFromList(next: URLSearchParams, name: string, value: string) {
  const rest = (next.get(name) ?? "").split(",").filter((item) => item && item !== value);
  if (rest.length > 0) next.set(name, rest.join(","));
  else next.delete(name);
}

export function ResultsBar({ total, city }: { total: number; city?: string }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const type = params.get("type");
  const sort = params.get("sort") ?? "featured";
  const sortLabel = SORTS.find((item) => item.value === sort)?.label ?? SORTS[0].label;
  const mapOpen = params.get("view") === "map";

  const push = (mutate: (next: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    router.push(`${pathname}?${next.toString()}`);
  };

  const chips = buildChips(params);

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 text-md text-neutral-500">
          {total.toLocaleString()}{" "}
          <span className="font-semibold text-foreground">{spaceLabel(type, total)}</span>
          {city ? ` near ${city}` : null}
        </p>

        <button
          type="button"
          onClick={() =>
            push((next) => {
              if (mapOpen) next.delete("view");
              else next.set("view", "map");
            })
          }
          className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-neutral-200 bg-white px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-neutral-300 xl:hidden"
        >
          {mapOpen ? <ListGlyph /> : <MapGlyph />}
          {mapOpen ? "Show List" : "Show Map"}
        </button>

        <SortMenu
          label={sortLabel}
          value={sort}
          onChange={(value) =>
            push((next) => {
              if (value === "featured") next.delete("sort");
              else next.set("sort", value);
            })
          }
        />
      </div>

      {chips.length > 0 ? (
        <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => push(chip.remove)}
              className="inline-flex shrink-0 items-center gap-2.5 rounded-pill border border-neutral-200 bg-surface px-3.5 py-2 text-base font-medium text-foreground transition-colors hover:border-neutral-300"
            >
              {chip.label}
              <X className="size-3.5 text-neutral-400" aria-hidden />
              <span className="sr-only">Remove filter</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** "Photo Studio" → "photo studios"; no type filter → "spaces". */
function spaceLabel(type: string | null, total: number) {
  const base = (type ?? "space").toLowerCase();
  if (total === 1) return base;
  return base.endsWith("s") ? base : `${base}s`;
}

function buildChips(params: URLSearchParams): Chip[] {
  const chips: Chip[] = [];

  const keyword = params.get("q");
  if (keyword) {
    chips.push({ key: "q", label: `“${keyword}”`, remove: (next) => next.delete("q") });
  }

  if (params.get("minRating")) {
    chips.push({
      key: "verified",
      label: "Verified",
      remove: (next) => next.delete("minRating"),
    });
  }

  const minGuests = params.get("guests");
  const maxGuests = params.get("maxGuests");
  if (maxGuests) {
    chips.push({
      key: "guests",
      label:
        minGuests && maxGuests
          ? `${minGuests}-${maxGuests} guests`
          : `Up to ${maxGuests} guests`,
      remove: (next) => {
        next.delete("maxGuests");
      },
    });
  }

  const minPrice = Number(params.get("minPrice") ?? PRICE_BOUNDS.min);
  const maxPrice = Number(params.get("maxPrice") ?? PRICE_BOUNDS.max);
  if (params.get("minPrice") || params.get("maxPrice")) {
    chips.push({
      key: "price",
      label: `${PRICE_CURRENCY} ${minPrice.toLocaleString()} – ${maxPrice.toLocaleString()}`,
      remove: (next) => {
        next.delete("minPrice");
        next.delete("maxPrice");
      },
    });
  }

  for (const amenity of (params.get("amenities") ?? "").split(",").filter(Boolean)) {
    const label = AMENITY_LABELS[amenity as VenueAmenity];
    if (label) {
      chips.push({
        key: `amenity-${amenity}`,
        label,
        remove: (next) => dropFromList(next, "amenities", amenity),
      });
    }
  }

  for (const occasion of (params.get("occasion") ?? "").split(",").filter(Boolean)) {
    chips.push({
      key: `occasion-${occasion}`,
      label: occasion,
      remove: (next) => dropFromList(next, "occasion", occasion),
    });
  }

  return chips;
}

function SortMenu({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Dropdown
      className="hidden shrink-0 xl:block"
      menuRole="listbox"
      triggerClassName="inline-flex items-center gap-2 rounded-pill px-2 py-2 text-base font-medium text-foreground transition-colors hover:text-brand"
      menuClassName="z-30 w-search-tab rounded-sm"
      trigger={({ open }) => (
        <>
          <SortGlyph />
          <span className="whitespace-nowrap">Sort by: {label}</span>
          <ChevronDown className={cn("size-3.5 opacity-70 transition-transform", open && "rotate-180")} />
        </>
      )}
    >
      {SORTS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="option"
          aria-selected={option.value === value}
          onClick={() => onChange(option.value)}
          className={cn(
            "block w-full px-4 py-2.5 text-left text-base font-medium hover:bg-neutral-100",
            option.value === value ? "text-brand" : "text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </Dropdown>
  );
}

function MapGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M2 4.2 5.8 2.5v11L2 13.2V4.2ZM5.8 2.5 10.2 4.2v11L5.8 13.5V2.5ZM10.2 4.2 14 2.5v11l-3.8 1.7V4.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ListGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path d="M3 4h10M3 8h10M3 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SortGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M5 2.5v11M5 13.5 2.5 11M11 13.5v-11M11 2.5 13.5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
