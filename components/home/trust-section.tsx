"use client";

import { useRef } from "react";
import { CoverImage } from "@/components/ui/image";
import { CarouselArrows, Container, SectionHeading } from "@/components/ui/container";
import { STATS, TESTIMONIALS, TRUST_SECTION } from "@/data/content";
import { cn } from "@/lib/cn";

const TONES: Record<(typeof STATS)[number]["tone"], string> = {
  coral: "bg-brand-coral text-white",
  brand: "bg-brand text-white",
  amber: "bg-brand-amber text-white",
  gold: "bg-brand-gold text-neutral-900",
};

export function TrustSection() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * (node.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <section className="bg-stats-gradient py-14 md:py-16 lg:py-17.5">
      <Container>
        <SectionHeading title={TRUST_SECTION.title} copy={TRUST_SECTION.copy} />

        <div className="mt-10 grid grid-cols-2 gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col items-center gap-2.5 rounded-lg px-5 py-6 text-center lg:py-7.5",
                TONES[stat.tone],
              )}
            >
              <p className="text-3xl font-bold leading-7.5 tracking-tighter lg:text-4xl">
                {stat.value}
              </p>
              <p className="text-base leading-5 tracking-wide lg:text-md lg:leading-6">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={scroller}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:mt-14 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible"
        >
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.name}
              className="flex w-75 shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-card sm:w-105 lg:w-auto"
            >
              <div className="relative w-28 shrink-0 sm:w-40 lg:w-60">
                <CoverImage
                  src={item.image}
                  alt={item.name}
                  sizes="237px"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center gap-5 p-5 lg:gap-6.25 lg:p-8">
                <blockquote className="text-md leading-normal tracking-loose text-neutral-900 lg:text-xl lg:leading-7.5">
                  {item.quote}
                </blockquote>
                <figcaption className="flex flex-col gap-1.5">
                  <p className="text-md font-bold leading-6 tracking-loose text-neutral-900 lg:text-lg">
                    {item.name}
                  </p>
                  <Stars />
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <CarouselArrows
          label="testimonials"
          onPrev={() => scrollBy(-1)}
          onNext={() => scrollBy(1)}
          className="mt-6 justify-end"
        />
      </Container>
    </section>
  );
}

function Stars() {
  return (
    <span className="flex items-center gap-1" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 16 16" className="size-4 fill-brand-gold" aria-hidden>
          <path d="M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.6Z" />
        </svg>
      ))}
    </span>
  );
}
