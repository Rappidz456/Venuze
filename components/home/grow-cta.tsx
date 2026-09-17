import { BannerPanel } from "@/components/ui/banner";
import { Container } from "@/components/ui/container";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { GROW_CTA } from "@/data/content";

/**
 * Gradient vendor CTA. Mobile stacks the art under the copy; iPad (md)
 * and desktop sit the illustration on the right, as in the file.
 */
export function GrowCta() {
  return (
    <section className="bg-band-split">
      <Container>
        <BannerPanel className="rounded-lg bg-brand-gradient px-5 py-8 sm:px-8 sm:py-10 md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-end md:gap-4 md:px-8 md:py-8 lg:block lg:px-18 lg:py-7">
          <div className="relative z-10 max-w-xl md:self-center md:pb-2 lg:pb-0">
            <h2 className="text-3xl font-semibold leading-heading tracking-tight text-white md:text-4xl lg:text-5xl lg:leading-section lg:tracking-tighter">
              Grow Your Business
              <br />
              with Venuze
            </h2>
            <p className="mt-2.5 max-w-md text-md font-medium leading-normal tracking-wide text-white lg:max-w-xl lg:text-xl lg:leading-7.5">
              {GROW_CTA.copy}
            </p>
            <Link
              href="/login"
              className="mt-5 inline-flex h-11 w-fit items-center justify-center rounded-pill bg-neutral-900 px-7 text-base font-medium text-white transition-opacity hover:opacity-90 sm:mt-6 sm:h-12.5 sm:px-8 sm:text-md lg:text-xl lg:font-regular"
            >
              {GROW_CTA.action}
            </Link>
          </div>

          <Image
            src="/icons/Vector%20702.svg"
            alt=""
            width={199}
            height={59}
            unoptimized
            aria-hidden
            className="pointer-events-none absolute top-12 left-1/2 hidden w-32 -translate-x-1/4 md:block lg:top-auto lg:bottom-18 lg:w-arrow lg:translate-x-0 xl:bottom-19"
          />

          <Image
            src="/icons/Group%201707479464.svg"
            alt=""
            width={447}
            height={204}
            unoptimized
            aria-hidden
            className="relative mx-auto mt-8 block h-auto w-full max-w-sm md:mx-0 md:mt-0 md:max-w-none md:self-end md:justify-self-end lg:absolute lg:bottom-0 lg:right-8 lg:h-art lg:w-art xl:right-12"
          />
        </BannerPanel>
      </Container>
    </section>
  );
}
