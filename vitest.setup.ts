import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: vi.fn(),
    set: vi.fn(),
  }),
}));

