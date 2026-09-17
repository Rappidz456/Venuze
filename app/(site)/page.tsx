import { BottomCta } from "@/components/home/bottom-cta";
import { Categories } from "@/components/home/categories";
import { Destinations } from "@/components/home/destinations";
import { FeaturedVenues } from "@/components/home/featured-venues";
import { GrowCta } from "@/components/home/grow-cta";
import { Hero } from "@/components/home/hero";
import { PathSteps } from "@/components/home/path-steps";
import { TrustSection } from "@/components/home/trust-section";
import { Vendors } from "@/components/home/vendors";

/** Section order follows the Figma home page, top to bottom. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedVenues />
      <Vendors />
      <GrowCta />
      <PathSteps />
      <TrustSection />
      <Destinations />
      <BottomCta />
    </>
  );
}
