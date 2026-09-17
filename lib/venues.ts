import { PRICE_BOUNDS } from "@/lib/constants";
import type { Venue, VenueAmenity, VenueFilters } from "@/types";

export function filterVenues(venues: Venue[], filters: VenueFilters): Venue[] {
  const query = filters.q?.trim().toLowerCase();
  const amenities = filters.amenities ?? [];

  const next = venues.filter((venue) => {
    if (query) {
      const haystack = `${venue.name} ${venue.city} ${venue.country} ${venue.description}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (filters.city && venue.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }

    if (filters.guests && venue.capacity < filters.guests) {
      return false;
    }

    if (filters.category && filters.category !== "all" && venue.category !== filters.category) {
      return false;
    }

    const minPrice = filters.minPrice ?? PRICE_BOUNDS.min;
    const maxPrice = filters.maxPrice ?? PRICE_BOUNDS.max;
    if (venue.priceFrom < minPrice || venue.priceFrom > maxPrice) {
      return false;
    }

    if (filters.minRating && venue.rating < filters.minRating) {
      return false;
    }

    if (amenities.length > 0 && !amenities.every((item) => venue.amenities.includes(item))) {
      return false;
    }

    return true;
  });

  return sortVenues(next, filters.sort);
}

export function sortVenues(venues: Venue[], sort: VenueFilters["sort"] = "featured") {
  const copy = [...venues];

  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.priceFrom - b.priceFrom);
    case "price-desc":
      return copy.sort((a, b) => b.priceFrom - a.priceFrom);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "featured":
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
  }
}

export function parseAmenities(value: string | string[] | undefined): VenueAmenity[] {
  if (!value) return [];
  const raw = Array.isArray(value) ? value : value.split(",");
  return raw.filter((item): item is VenueAmenity =>
    [
      "wifi",
      "parking",
      "catering",
      "av",
      "outdoor",
      "bar",
      "accessible",
      "overnight",
    ].includes(item),
  );
}

export function formatPrice(value: number, currency: "USD" = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function countActiveFilters(params: { get: (name: string) => string | null }): number {
  let count = 0;
  if (params.get("minPrice") || params.get("maxPrice")) count += 1;
  if (params.get("minRating")) count += 1;
  if (params.get("maxGuests")) count += 1;
  count += (params.get("amenities") ?? "").split(",").filter(Boolean).length;
  count += (params.get("occasion") ?? "").split(",").filter(Boolean).length;
  return count;
}
