import { BannerPanel } from "@/components/ui/banner";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { GROW_CTA } from "@/data/content";

/**
 * Gradient vendor CTA that sits between the cream vendors band and the
 * white path section, matching the Figma banner.
 */
export function GrowCta() {
  return (
    <section className="bg-band-split">
      <Container>
        <BannerPanel className="rounded-lg bg-brand-gradient px-5 py-8 sm:px-8 sm:py-10 md:px-12 lg:px-18 lg:py-7">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-semibold leading-heading tracking-tight text-white md:text-4xl lg:text-5xl lg:leading-section lg:tracking-tighter">
              Grow Your Business with
              <br />
              Venuze
            </h2>
            <p className="mt-2.5 text-md font-medium leading-normal tracking-wide text-white sm:text-md lg:max-w-xl lg:text-xl lg:leading-7.5">
              {GROW_CTA.copy}
            </p>
            <Link
              href="/login"
              className="mt-5 inline-flex h-11 w-fit items-center justify-center rounded-pill bg-neutral-900 px-7 text-base font-medium text-white transition-opacity hover:opacity-90 sm:mt-6 sm:h-12.5 sm:px-8 sm:text-md lg:text-xl lg:font-regular"
            >
              {GROW_CTA.action}
            </Link>
          </div>

          <img
            src="/icons/Vector%20702.svg"
            alt=""
            width={199}
            height={59}
            className="pointer-events-none absolute bottom-18 left-1/2 hidden w-arrow lg:block xl:bottom-19"
          />

          <img
            src="/icons/Group%201707479464.svg"
            alt=""
            width={447}
            height={204}
            className="relative mx-auto mt-8 block h-auto w-full max-w-sm lg:absolute lg:bottom-0 lg:right-8 lg:mx-0 lg:mt-0 lg:h-art lg:w-art xl:right-12"
          />
        </BannerPanel>
      </Container>
    </section>
  );
}
