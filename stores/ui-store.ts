"use client";

import { create } from "zustand";

type Locale = "EN" | "AR";

type UiState = {
  isFilterOpen: boolean;
  isMobileNavOpen: boolean;
  savedVenueIds: string[];
  locale: Locale;
  openFilter: () => void;
  closeFilter: () => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  setLocale: (locale: Locale) => void;
  toggleSaved: (id: string) => void;
};

export const useUiStore = create<UiState>((set, get) => ({
  isFilterOpen: false,
  isMobileNavOpen: false,
  savedVenueIds: [],
  locale: "EN",
  openFilter: () => set({ isFilterOpen: true }),
  closeFilter: () => set({ isFilterOpen: false }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  setLocale: (locale) => set({ locale }),
  toggleSaved: (id) => {
    const current = get().savedVenueIds;
    set({
      savedVenueIds: current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    });
  },
}));
