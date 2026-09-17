"use client";

import { useRef } from "react";
import { MediaTile } from "@/components/ui/card";
import { CarouselArrows, Container, SectionHeading } from "@/components/ui/container";
import { VENDOR_CATEGORIES, VENDOR_SECTION } from "@/data/content";

export function Vendors() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    const node = scroller.current;
    if (!node) return;
    const amount = node.clientWidth >= 1024 ? node.clientWidth : Math.min(node.clientWidth * 0.85, 340);
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section id="vendors" className="bg-neutral-50 py-12 sm:py-14 md:py-16 lg:py-18.75">
      <Container>
        <SectionHeading title={VENDOR_SECTION.title} copy={VENDOR_SECTION.copy} />

        <div
          ref={scroller}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-1 pb-1 sm:mt-10 sm:gap-5 md:mt-11 lg:mt-12 lg:grid lg:grid-cols-4 lg:gap-5.5 lg:overflow-visible"
        >
          {VENDOR_CATEGORIES.map((vendor) => (
            <MediaTile
              key={vendor.title}
              href="/venues"
              src={vendor.image}
              alt={vendor.title}
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 301px, 25vw"
              className="h-card-sm w-card-mobile shrink-0 snap-start sm:h-card-md sm:w-70 md:h-card md:w-card-tablet lg:h-card lg:w-auto"
            >
              <h3 className="absolute inset-x-4 bottom-6 text-2xl font-semibold leading-7 tracking-snug text-white sm:inset-x-5 sm:bottom-6.25 sm:text-3xl sm:leading-8 md:text-3xl md:leading-9 md:tracking-tight">
                {vendor.title}
              </h3>
            </MediaTile>
          ))}
        </div>

        <CarouselArrows
          label="vendor categories"
          onPrev={() => scrollBy(-1)}
          onNext={() => scrollBy(1)}
          className="mt-5 justify-end sm:mt-6 lg:mt-7"
        />
      </Container>
    </section>
  );
}
