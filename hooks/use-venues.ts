"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchVenue, fetchVenues } from "@/lib/api/venues";
import type { VenueFilters } from "@/types";

export const venueKeys = {
  all: ["venues"] as const,
  list: (filters: VenueFilters) => [...venueKeys.all, "list", filters] as const,
  detail: (id: string) => [...venueKeys.all, "detail", id] as const,
};

export function useVenuesQuery(filters: VenueFilters) {
  return useQuery({
    queryKey: venueKeys.list(filters),
    queryFn: () => fetchVenues(filters),
  });
}

export function useVenueQuery(id: string) {
  return useQuery({
    queryKey: venueKeys.detail(id),
    queryFn: () => fetchVenue(id),
    enabled: Boolean(id),
  });
}
