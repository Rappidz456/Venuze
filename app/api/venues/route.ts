import { NextResponse } from "next/server";
import { venues } from "@/data/venues";
import { filterVenues, parseAmenities } from "@/lib/venues";
import type { VenueCategory, VenueFilters } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guests = searchParams.get("guests");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minRating = searchParams.get("minRating");
  const category = searchParams.get("category") as VenueCategory | "all" | null;

  const filters: VenueFilters = {
    q: searchParams.get("q") ?? undefined,
    city: searchParams.get("city") ?? undefined,
    category: category ?? "all",
    guests: guests ? Number(guests) : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    minRating: minRating ? Number(minRating) : undefined,
    amenities: parseAmenities(searchParams.get("amenities") ?? undefined),
    sort: (searchParams.get("sort") as VenueFilters["sort"]) ?? "featured",
  };

  const result = filterVenues(venues, filters);

  return NextResponse.json({ venues: result, total: result.length });
}
