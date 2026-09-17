"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { EmptyState } from "@/components/ui/empty-state";
import { VenueCardSkeleton } from "@/components/ui/skeleton";
import { FilterDrawer } from "@/components/venues/filter-drawer";
import { MapPanel } from "@/components/venues/map-panel";
import { ResultsBar } from "@/components/venues/results-bar";
import { SearchToolbar } from "@/components/venues/search-toolbar";
import { VenueCard } from "@/components/venues/venue-card";
import { useVenuesQuery } from "@/hooks/use-venues";
import { cn } from "@/lib/cn";
import { parseAmenities } from "@/lib/venues";
import type { VenueCategory, VenueFilters } from "@/types";

/**
 * iPad/mobile: two (or one) columns across the full frame.
 * Desktop xl+: two columns beside the map, three from the 1440 frame.
 */
const CARD_GRID = "grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-2 wide:grid-cols-3";

export function VenuesExplorer() {
  const params = useSearchParams();
  const mapOpen = params.get("view") === "map";

  const filters: VenueFilters = useMemo(
    () => ({
      q: params.get("q") ?? undefined,
      city: params.get("city") ?? undefined,
      date: params.get("date") ?? undefined,
      guests: params.get("guests") ? Number(params.get("guests")) : undefined,
      category: (params.get("category") as VenueCategory | "all") ?? "all",
      minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : undefined,
      maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
      minRating: params.get("minRating") ? Number(params.get("minRating")) : undefined,
      amenities: parseAmenities(params.get("amenities") ?? undefined),
      sort: (params.get("sort") as VenueFilters["sort"]) ?? "featured",
    }),
    [params],
  );

  const { data, isPending, isError, refetch } = useVenuesQuery(filters);
  const venues = data?.venues ?? [];
  const showResults = !isPending && !isError && venues.length > 0;
  const showEmpty = !isPending && !isError && venues.length === 0;

  return (
    <>
      <div className="sticky top-14 z-30 bg-surface sm:top-16 md:top-header">
        <SearchToolbar />
      </div>

      <FilterDrawer />

      {showEmpty ? (
        <div className="flex min-h-empty items-center justify-center">
          <EmptyState />
        </div>
      ) : (
        <>
          {showResults && mapOpen ? (
            <div className="xl:hidden">
              <div className="px-5 pt-5 md:px-6">
                <ResultsBar total={data?.total ?? venues.length} city={filters.city} />
              </div>
              <div className="h-map-toggle md:h-map-toggle-md">
                <MapPanel venues={venues} variant="full" />
              </div>
            </div>
          ) : null}

          <div
            className={cn(
              "px-5 py-6 md:px-6 lg:px-9",
              showResults && "xl:pr-0",
              mapOpen && "hidden xl:block",
            )}
          >
            <div
              className={cn(
                "grid gap-6",
                showResults && "xl:grid-cols-explorer",
              )}
            >
              <div>
                {showResults ? (
                  <ResultsBar total={data?.total ?? venues.length} city={filters.city} />
                ) : null}

                {isPending ? (
                  <div className={CARD_GRID}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <VenueCardSkeleton key={index} />
                    ))}
                  </div>
                ) : null}

                {isError ? (
                  <EmptyState
                    title="Couldn’t load venues"
                    copy="The listing service didn’t respond. Try again in a moment."
                    actionLabel="Retry"
                    onAction={() => void refetch()}
                  />
                ) : null}

                {showResults ? (
                  <div className={CARD_GRID}>
                    {venues.map((venue) => (
                      <VenueCard key={venue.id} venue={venue} />
                    ))}
                  </div>
                ) : null}
              </div>

              {showResults ? (
                <aside className="hidden xl:-mt-6.25 xl:block">
                  <div className="sticky top-results-top h-map">
                    <MapPanel venues={venues} />
                  </div>
                </aside>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}
