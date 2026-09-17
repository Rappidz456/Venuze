import { VenueCardSkeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function VenuesLoading() {
  return (
    <Container className="grid gap-5 py-32 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <VenueCardSkeleton key={index} />
      ))}
    </Container>
  );
}
