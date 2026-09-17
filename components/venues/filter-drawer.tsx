"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RangeSlider } from "@/components/ui/range-slider";
import { PRICE_BOUNDS, PRICE_CURRENCY } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { useUiStore } from "@/stores/ui-store";
import type { VenueCategory } from "@/types";

/** Venue types exactly as the Figma lists them, mapped onto the data model. */
const VENUE_TYPES: { label: string; category: VenueCategory }[] = [
  { label: "Office Space", category: "corporate" },
  { label: "Meeting", category: "corporate" },
  { label: "Private Party", category: "private-party" },
  { label: "Villa", category: "celebration" },
  { label: "Bar", category: "private-party" },
  { label: "Loft", category: "private-party" },
  { label: "Appartment", category: "private-party" },
  { label: "Ballroom", category: "celebration" },
  { label: "Restaurant", category: "celebration" },
  { label: "Studio", category: "studio" },
  { label: "House", category: "celebration" },
  { label: "Gallery", category: "studio" },
  { label: "test", category: "studio" },
];

const OCCASIONS = [
  "Wedding",
  "Reception",
  "Ceremony",
  "Engagement",
  "Birthday",
  "Babyshower",
  "Concert/Performance",
  "Brand Launch",
  "Fashion Show",
  "Corporate Event",
  "Conference",
  "Pop-up",
] as const;

const CAPACITY_BOUNDS = { min: 10, max: 1500 } as const;
const VERIFIED_RATING = 4.8;

const money = (value: number) => `${PRICE_CURRENCY} ${value.toFixed(2)}`;

export function FilterDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const open = useUiStore((state) => state.isFilterOpen);
  const closeFilter = useUiStore((state) => state.closeFilter);
  const closeRef = useRef<HTMLButtonElement>(null);

  const initial = useMemo(
    () => ({
      type: params.get("type") ?? "",
      minGuests: Number(params.get("guests") ?? CAPACITY_BOUNDS.min),
      maxGuests: Number(params.get("maxGuests") ?? CAPACITY_BOUNDS.max),
      minPrice: Number(params.get("minPrice") ?? PRICE_BOUNDS.min),
      maxPrice: Number(params.get("maxPrice") ?? PRICE_BOUNDS.max),
      occasions: (params.get("occasion") ?? "").split(",").filter(Boolean),
      verified: Number(params.get("minRating") ?? 0) >= VERIFIED_RATING,
    }),
    [params],
  );

  const [draft, setDraft] = useState(initial);

  useEffect(() => {
    if (open) setDraft(initial);
  }, [open, initial]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFilter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeFilter]);

  const apply = () => {
    const next = new URLSearchParams(params.toString());
    const matched = VENUE_TYPES.find((item) => item.label === draft.type);

    if (matched) {
      next.set("type", matched.label);
      next.set("category", matched.category);
    } else {
      next.delete("type");
      next.delete("category");
    }

    if (draft.minGuests > CAPACITY_BOUNDS.min) next.set("guests", String(draft.minGuests));
    else next.delete("guests");

    if (draft.maxGuests < CAPACITY_BOUNDS.max) next.set("maxGuests", String(draft.maxGuests));
    else next.delete("maxGuests");

    if (draft.minPrice > PRICE_BOUNDS.min) next.set("minPrice", String(draft.minPrice));
    else next.delete("minPrice");

    if (draft.maxPrice < PRICE_BOUNDS.max) next.set("maxPrice", String(draft.maxPrice));
    else next.delete("maxPrice");

    if (draft.occasions.length) next.set("occasion", draft.occasions.join(","));
    else next.delete("occasion");

    if (draft.verified) next.set("minRating", String(VERIFIED_RATING));
    else next.delete("minRating");

    router.push(`${pathname}?${next.toString()}`);
    closeFilter();
  };

  const clearAll = () =>
    setDraft({
      type: "",
      minGuests: CAPACITY_BOUNDS.min,
      maxGuests: CAPACITY_BOUNDS.max,
      minPrice: PRICE_BOUNDS.min,
      maxPrice: PRICE_BOUNDS.max,
      occasions: [],
      verified: false,
    });

  const toggleOccasion = (value: string) =>
    setDraft((current) => ({
      ...current,
      occasions: current.occasions.includes(value)
        ? current.occasions.filter((item) => item !== value)
        : [...current.occasions, value],
    }));

  return (
    <div className={cn("fixed inset-0 z-50", !open && "pointer-events-none")}>
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close filters"
        className={cn(
          "absolute inset-0 bg-overlay transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={closeFilter}
      />
      <aside
        role="complementary"
        aria-label="Filters"
        aria-hidden={!open}
        className={cn(
          "absolute inset-y-0 right-0 flex h-full w-filter flex-col bg-surface shadow-modal transition-transform duration-300 ease-out",
          "rounded-l-lg",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-5 md:px-6">
          <h2 className="text-xl font-semibold text-foreground">Filters</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeFilter}
            className="flex size-8 items-center justify-center text-neutral-500 transition-colors hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 md:px-6">
          <div className="divide-y divide-neutral-200">
            <section className="py-5">
              <h3 className="text-md font-semibold text-foreground">Venue Type</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {VENUE_TYPES.map((item) => (
                  <Chip
                    key={item.label}
                    active={draft.type === item.label}
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        type: current.type === item.label ? "" : item.label,
                      }))
                    }
                  >
                    {item.label}
                  </Chip>
                ))}
              </div>
            </section>

            <section className="py-5">
              <h3 className="text-md font-semibold text-foreground">Capacity</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Showing venues for {draft.minGuests} - {draft.maxGuests} guests
              </p>
              <RangeSlider
                className="mt-4"
                min={CAPACITY_BOUNDS.min}
                max={CAPACITY_BOUNDS.max}
                step={10}
                valueMin={draft.minGuests}
                valueMax={draft.maxGuests}
                labelMin="Minimum guests"
                labelMax="Maximum guests"
                onChange={(minGuests, maxGuests) =>
                  setDraft((current) => ({ ...current, minGuests, maxGuests }))
                }
              />
            </section>

            <section className="py-5">
              <h3 className="text-md font-semibold text-foreground">
                Price per hour ({PRICE_CURRENCY})
              </h3>
              <div className="mt-1 flex items-center justify-between text-sm text-neutral-500">
                <span>{money(draft.minPrice)}</span>
                <span>{money(draft.maxPrice)}</span>
              </div>
              <RangeSlider
                className="mt-4"
                min={PRICE_BOUNDS.min}
                max={PRICE_BOUNDS.max}
                step={10}
                valueMin={draft.minPrice}
                valueMax={draft.maxPrice}
                labelMin="Minimum price"
                labelMax="Maximum price"
                onChange={(minPrice, maxPrice) =>
                  setDraft((current) => ({ ...current, minPrice, maxPrice }))
                }
              />
            </section>

            <section className="py-5">
              <h3 className="text-md font-semibold text-foreground">Event / Occasion</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {OCCASIONS.map((item) => (
                  <Chip
                    key={item}
                    active={draft.occasions.includes(item)}
                    onClick={() => toggleOccasion(item)}
                  >
                    {item}
                  </Chip>
                ))}
              </div>
            </section>

            <section className="flex items-center justify-between gap-4 py-5">
              <div>
                <h3 className="text-md font-semibold text-foreground">Verified Only</h3>
                <p className="mt-0.5 text-sm text-neutral-500">Show only verified venues</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={draft.verified}
                aria-label="Verified only"
                onClick={() => setDraft((current) => ({ ...current, verified: !current.verified }))}
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                  draft.verified ? "bg-brand" : "bg-neutral-200",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-5 rounded-full bg-white shadow-subtle transition-transform",
                    draft.verified ? "translate-x-5.5" : "translate-x-0.5",
                  )}
                />
              </button>
            </section>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-neutral-200 px-5 py-5 md:px-6">
          <Button variant="secondary" size="sm" onClick={clearAll}>
            Clear All
          </Button>
          <Button variant="primary" size="sm" className="px-5 font-semibold" onClick={apply}>
            Apply Filters
          </Button>
        </div>
      </aside>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-pill px-3 py-1.5 text-sm tracking-wider transition-colors",
        active
          ? "bg-brand text-white"
          : "bg-neutral-100 text-foreground hover:bg-neutral-200",
      )}
    >
      {children}
    </button>
  );
}
