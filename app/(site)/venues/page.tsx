import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { VenueCardSkeleton } from "@/components/ui/skeleton";
import { VenuesExplorer } from "@/components/venues/venues-explorer";

export const metadata: Metadata = {
  title: "Explore venues",
};

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-surface pt-header-stacked md:pt-header">
      <Suspense
        fallback={
          <Container className="py-10">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <VenueCardSkeleton key={index} />
              ))}
            </div>
          </Container>
        }
      >
        <VenuesExplorer />
      </Suspense>
    </div>
  );
}
