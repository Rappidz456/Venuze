import { api } from "@/lib/api/client";
import type { Venue, VenueFilters } from "@/types";

export async function fetchVenues(filters: VenueFilters) {
  const { data } = await api.get<{ venues: Venue[]; total: number }>("/venues", {
    params: {
      q: filters.q,
      city: filters.city,
      guests: filters.guests,
      category: filters.category === "all" ? undefined : filters.category,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      amenities: filters.amenities?.join(","),
      minRating: filters.minRating,
      sort: filters.sort,
    },
  });

  return data;
}

export async function fetchVenue(id: string) {
  const { data } = await api.get<{ venue: Venue }>(`/venues/${id}`);
  return data.venue;
}
