export type VenueCategory =
  | "private-party"
  | "corporate"
  | "studio"
  | "celebration";

export type VenueAmenity =
  | "wifi"
  | "parking"
  | "catering"
  | "av"
  | "outdoor"
  | "bar"
  | "accessible"
  | "overnight";

export type Venue = {
  id: string;
  name: string;
  slug: string;
  city: string;
  country: string;
  category: VenueCategory;
  image: string;
  gallery: string[];
  priceFrom: number;
  currency: "USD";
  capacity: number;
  rating: number;
  reviewCount: number;
  amenities: VenueAmenity[];
  featured: boolean;
  description: string;
  host: string;
};

export type VenueFilters = {
  q?: string;
  city?: string;
  date?: string;
  guests?: number;
  category?: VenueCategory | "all";
  minPrice?: number;
  maxPrice?: number;
  amenities?: VenueAmenity[];
  minRating?: number;
  sort?: "featured" | "price-asc" | "price-desc" | "rating";
};

export type AuthUser = {
  email: string;
  name: string;
  avatar?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ApiError = {
  error: string;
  status: number;
};
