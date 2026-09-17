import { BannerPanel } from "@/components/ui/banner";
import { Container } from "@/components/ui/container";
import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { BOTTOM_CTA } from "@/data/content";

/**
 * The closing banner sits on top of the footer's rounded cap, overlapping it,
 * exactly as the design shows. The negative bottom margin pulls the footer up
 * underneath while `z-10` keeps the card painted above it.
 */
export function BottomCta() {
  return (
    <section
      data-overlaps-footer
      className="relative z-10 -mb-15 md:-mb-20 lg:-mb-22.5"
    >
      <Container>
        <BannerPanel className="rounded-lg bg-brand-gradient px-5 py-8 sm:px-8 sm:py-10 md:px-12 lg:min-h-75 lg:px-20 lg:py-0">
          <div className="relative z-10 flex flex-col justify-center gap-5 lg:min-h-75 lg:max-w-xl">
            <div className="flex flex-col gap-2.5 text-white">
              <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                {BOTTOM_CTA.title}
              </h2>
              <p className="max-w-lg text-md font-medium lg:text-xl">{BOTTOM_CTA.copy}</p>
            </div>

            <Link
              href="/login"
              className="inline-flex h-12.5 w-fit items-center justify-center rounded-sm bg-neutral-900 px-7 text-md font-regular text-white transition-opacity hover:opacity-90 lg:px-9.25 lg:text-xl"
            >
              {BOTTOM_CTA.action}
            </Link>
          </div>

          <Image
            src="/icons/grow-arrow.svg"
            alt=""
            width={199}
            height={59}
            unoptimized
            aria-hidden
            className="pointer-events-none absolute bottom-7.5 left-1/2 hidden w-arrow lg:block xl:bottom-9"
          />

          <Image
            src="/icons/grow-illustration.svg"
            alt=""
            width={328}
            height={222}
            unoptimized
            aria-hidden
            className="relative mx-auto mt-8 block h-auto w-full max-w-xs sm:max-w-sm lg:absolute lg:bottom-0 lg:right-6 lg:mx-0 lg:mt-0 lg:h-cta-art lg:w-cta-art xl:right-20"
          />
        </BannerPanel>
      </Container>
    </section>
  );
}
