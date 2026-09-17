import { Banner } from "@/components/ui/banner";
import { HeroSearch } from "@/components/home/hero-search";

export function Hero() {
  return (
    <Banner
      src="/images/header.jpg"
      alt="Guests celebrating inside a venue"
      overlayClassName="bg-black/25"
      imageClassName="object-hero"
      priority
      className="min-h-svh text-white md:min-h-160 lg:h-hero lg:min-h-hero lg:max-h-hero"
    >
      <div className="relative mx-auto flex h-full w-full max-w-frame flex-col items-stretch justify-start px-4 pb-16 pt-18 sm:px-6 md:items-center md:justify-center md:px-8 md:pt-20 lg:justify-start lg:px-10 lg:pt-50">
        <h1 className="text-left text-3xl font-bold tracking-tight text-white md:text-center md:text-5xl md:tracking-tighter lg:text-6xl lg:tracking-tightest">
          <span className="md:hidden">
            Celebrate in venues
            <br />
            big and small
          </span>
          <span className="hidden md:inline">
            Celebrate
            <br />
            in venues big and small
          </span>
        </h1>

        <div className="mt-6 w-full min-w-0 max-w-search md:mt-10 lg:mt-16">
          <HeroSearch />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-1.25 md:bottom-8">
        <span className="size-2 rounded-pill bg-neutral-300 opacity-40" />
        <span className="h-2 w-7 rounded-pill bg-brand-yellow" />
        <span className="size-2 rounded-pill bg-neutral-300 opacity-40" />
        <span className="size-2 rounded-pill bg-neutral-300 opacity-40" />
      </div>
    </Banner>
  );
}
