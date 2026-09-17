import { CoverImage } from "@/components/ui/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { StarRating } from "@/components/ui/star-rating";
import { InquiryForm } from "@/components/venues/inquiry-form";
import { AMENITY_LABELS, CATEGORY_LABELS, getVenueById } from "@/data/venues";
import { formatPrice } from "@/lib/venues";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const venue = getVenueById(id);
  return { title: venue?.name ?? "Venue" };
}

export default async function VenueDetailPage({ params }: Props) {
  const { id } = await params;
  const venue = getVenueById(id);

  if (!venue) notFound();

  return (
    <div className="bg-neutral-off pt-header-stacked pb-20 md:pt-28">
      <Container>
        <div className="grid gap-4 lg:grid-cols-gallery">
          <div className="relative h-gallery-sm overflow-hidden rounded-xl md:h-gallery">
            <CoverImage
              src={venue.image}
              alt={venue.name}
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
          <div className="hidden grid-rows-2 gap-4 lg:grid">
            {venue.gallery.slice(1, 3).map((src) => (
              <div key={src} className="relative overflow-hidden rounded-xl">
                <CoverImage src={src} alt="" sizes="33vw" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-detail">
          <div>
            <Badge>{CATEGORY_LABELS[venue.category]}</Badge>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">{venue.name}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-3 text-md text-neutral-500">
              {venue.city}, {venue.country}
              <StarRating value={venue.rating} />
              <span>{venue.reviewCount} reviews</span>
              <span>Up to {venue.capacity} guests</span>
            </p>
            <p className="mt-6 max-w-2xl text-lg text-neutral-600">{venue.description}</p>
            <h2 className="mt-10 text-2xl font-semibold">Included</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {venue.amenities.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-surface px-4 py-3 text-md shadow-tight"
                >
                  {AMENITY_LABELS[item]}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-md text-neutral-500">
              Hosted by <span className="font-semibold text-foreground">{venue.host}</span>
            </p>
          </div>
          <div>
            <p className="mb-3 text-md">
              From <span className="text-3xl font-bold text-brand">{formatPrice(venue.priceFrom)}</span>
            </p>
            <InquiryForm venueId={venue.id} capacity={venue.capacity} />
          </div>
        </div>
      </Container>
    </div>
  );
}
