import { describe, expect, it } from "vitest";
import { isHeaderCompact } from "@/lib/header-state";
import { ROUTES } from "@/lib/constants";

describe("isHeaderCompact", () => {
  it("stays inverted at the top of home", () => {
    expect(isHeaderCompact(ROUTES.home, false)).toBe(false);
  });

  it("switches to the compact bar after home scrolls", () => {
    expect(isHeaderCompact(ROUTES.home, true)).toBe(true);
  });

  it("is always compact on venues", () => {
    expect(isHeaderCompact(ROUTES.venues, false)).toBe(true);
    expect(isHeaderCompact("/venues/vx-311", false)).toBe(true);
  });
});
