import { describe, expect, it } from "vitest";
import { loginSchema } from "@/lib/validations";
import { filterVenues, countActiveFilters, parseAmenities, formatPrice } from "@/lib/venues";
import { venues } from "@/data/venues";
import { isProtectedPath, safeReturnPath } from "@/lib/auth-redirect";
import { ROUTES } from "@/lib/constants";

describe("loginSchema", () => {
  it("rejects an empty email", () => {
    const result = loginSchema.safeParse({ email: "", password: "cityslicka" });
    expect(result.success).toBe(false);
  });

  it("rejects a short password", () => {
    const result = loginSchema.safeParse({
      email: "eve.holt@reqres.in",
      password: "123",
    });
    expect(result.success).toBe(false);
  });

  it("accepts the ReqRes demo credentials", () => {
    const result = loginSchema.safeParse({
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });
    expect(result.success).toBe(true);
  });
});

describe("filterVenues", () => {
  it("filters by city", () => {
    const result = filterVenues(venues, { city: "Dubai" });
    expect(result.every((venue) => venue.city === "Dubai")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("filters by guest capacity", () => {
    const result = filterVenues(venues, { guests: 200 });
    expect(result.every((venue) => venue.capacity >= 200)).toBe(true);
  });

  it("returns an empty list when nothing matches", () => {
    const result = filterVenues(venues, { city: "Oslo", guests: 500 });
    expect(result).toHaveLength(0);
  });

  it("sorts by price ascending", () => {
    const result = filterVenues(venues, { sort: "price-asc" });
    const prices = result.map((venue) => venue.priceFrom);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});

describe("countActiveFilters", () => {
  it("counts drawer filters and ignores search fields", () => {
    const params = new URLSearchParams(
      "city=London&guests=10&minRating=4.8&amenities=wifi,parking&occasion=Wedding",
    );
    expect(countActiveFilters(params)).toBe(4);
  });
});

describe("parseAmenities", () => {
  it("keeps known amenity ids and drops junk", () => {
    expect(parseAmenities("wifi,parking,laser-tag")).toEqual(["wifi", "parking"]);
    expect(parseAmenities(undefined)).toEqual([]);
  });
});

describe("formatPrice", () => {
  it("formats a whole-dollar price", () => {
    expect(formatPrice(2400)).toMatch(/2,400/);
  });
});

describe("safeReturnPath", () => {
  it("defaults to home when from is missing", () => {
    expect(safeReturnPath(null)).toBe(ROUTES.home);
    expect(safeReturnPath(undefined)).toBe(ROUTES.home);
  });

  it("rejects off-site and login bounce paths", () => {
    expect(safeReturnPath("https://evil.example")).toBe(ROUTES.home);
    expect(safeReturnPath("//evil.example")).toBe(ROUTES.home);
    expect(safeReturnPath(ROUTES.login)).toBe(ROUTES.home);
  });

  it("keeps in-app return paths", () => {
    expect(safeReturnPath("/venues/vx-311")).toBe("/venues/vx-311");
    expect(safeReturnPath("/venues")).toBe("/venues");
  });
});

describe("isProtectedPath", () => {
  it("locks home and the venues tree", () => {
    expect(isProtectedPath("/")).toBe(true);
    expect(isProtectedPath("/venues")).toBe(true);
    expect(isProtectedPath("/venues/vx-311")).toBe(true);
  });

  it("leaves login public", () => {
    expect(isProtectedPath("/login")).toBe(false);
  });
});
