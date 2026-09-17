import { MediaTile } from "@/components/ui/card";
import { Container, SectionHeading } from "@/components/ui/container";
import { DESTINATIONS, DESTINATION_SECTION } from "@/data/content";

export function Destinations() {
  return (
    <section id="destinations" className="bg-surface py-14 md:py-16 lg:py-17.5">
      <Container>
        <SectionHeading title={DESTINATION_SECTION.title} copy={DESTINATION_SECTION.copy} />

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-3">
          {DESTINATIONS.map((item) => (
            <MediaTile
              key={item.city}
              href={`/venues?city=${encodeURIComponent(item.query)}`}
              src={item.image}
              alt={item.city}
              overlayClassName="bg-destination-fade"
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="h-destination-sm bg-neutral-300 lg:h-destination"
            >
              <span className="absolute left-5 top-4.5 rounded-pill bg-black/30 px-3.75 py-2 text-sm font-semibold leading-5 text-white">
                {item.count}
              </span>
              <div className="absolute inset-x-5 bottom-7 flex flex-col gap-2.5 text-white">
                <h3 className="text-3xl font-semibold leading-7.5 text-white lg:text-3xl">
                  {item.city}
                </h3>
                <div className="flex flex-col gap-1.5 text-base leading-5.5 lg:text-md lg:leading-6">
                  <p>{item.tagline}</p>
                  <div className="flex items-center justify-between gap-3">
                    <p>{item.popular}</p>
                    <p className="text-right font-bold">{item.price}</p>
                  </div>
                </div>
              </div>
            </MediaTile>
          ))}
        </div>
      </Container>
    </section>
  );
}
