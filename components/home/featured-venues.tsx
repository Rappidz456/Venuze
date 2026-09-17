"use client";

import { useMemo, useRef, useState } from "react";
import { Banner } from "@/components/ui/banner";
import { CarouselArrows, Container } from "@/components/ui/container";
import { FEATURED_TABS } from "@/data/content";
import { venues } from "@/data/venues";
import { VenueCard } from "@/components/venues/venue-card";
import { cn } from "@/lib/cn";

const FEATURED_ORDER = ["vx-204", "vx-311", "vx-055", "vx-118", "vx-442", "vx-276"];

export function FeaturedVenues() {
  const scroller = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<string>(FEATURED_TABS[1]);

  const featured = useMemo(() => {
    const list = venues.filter((venue) => venue.featured);
    return [...list].sort(
      (a, b) => FEATURED_ORDER.indexOf(a.id) - FEATURED_ORDER.indexOf(b.id),
    );
  }, []);

  const scrollBy = (direction: -1 | 1) => {
    const node = scroller.current;
    if (!node) return;
    const card = node.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : node.clientWidth * 0.7;
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <Banner
      id="featured"
      src="/images/featured/skyline.png"
      overlayClassName="bg-featured-overlay"
      imageClassName="object-skyline"
      className="bg-neutral-800 py-16 md:py-20 lg:py-25"
    >

      {/* the card row spans the full 1280 container in the file — no side
          gutter from lg up, which is what makes the cards 301px wide */}
      <Container className="relative lg:px-0">
        <h2 className="text-center text-3xl font-semibold leading-heading tracking-tight text-white md:text-4xl lg:text-5xl lg:leading-section lg:tracking-tighter">
          Featured Venues
        </h2>

        <div className="no-scrollbar mt-8 flex items-center justify-start gap-2 overflow-x-auto pb-1 sm:mt-9 sm:gap-2.5 lg:mt-10 lg:justify-center lg:gap-3">
          {FEATURED_TABS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={cn(
                "shrink-0 rounded-pill px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors sm:px-6 sm:py-3 sm:text-sm lg:px-7.5 lg:py-3.75 lg:text-base",
                item === tab
                  ? "bg-brand text-white"
                  : "bg-white/20 text-white hover:bg-white/30",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div
          ref={scroller}
          className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 sm:mt-10 sm:gap-5 lg:mt-12 lg:gap-6"
        >
          {featured.map((venue) => (
            <div
              key={venue.id}
              className="w-featured-mobile shrink-0 snap-start sm:w-80 md:w-85 lg:w-featured-col"
            >
              <VenueCard venue={venue} size="lg" />
            </div>
          ))}
        </div>

        <CarouselArrows
          label="featured venues"
          onPrev={() => scrollBy(-1)}
          onNext={() => scrollBy(1)}
          className="mt-7 justify-end lg:mt-8"
        />
      </Container>
    </Banner>
  );
}
