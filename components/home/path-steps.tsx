import { CoverImage } from "@/components/ui/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { PATH_COLLAGE, PATH_SECTION, PATH_STEPS } from "@/data/content";

const STEP_TOP = ["top-0", "top-1/3", "top-2/3"] as const;

export function PathSteps() {
  return (
    <section id="path" className="bg-surface py-14 md:py-16 lg:py-17.5">
      <Container>
        <div className="mx-auto max-w-content text-center">
          <h2 className="text-3xl font-semibold leading-heading tracking-tight text-foreground md:text-4xl lg:text-5xl lg:leading-section lg:tracking-tighter">
            {PATH_SECTION.title}
          </h2>
          <p className="mx-auto mt-2.5 text-md font-regular leading-normal tracking-wide text-foreground lg:text-xl lg:leading-7.5">
            {PATH_SECTION.copy}
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-10 md:mt-12 lg:mt-14 lg:grid-cols-path lg:gap-16">
          <PhotoCollage />
          <StepList />
        </div>
      </Container>
    </section>
  );
}

function PhotoCollage() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* the right column sits higher than the left, as in the file */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {[PATH_COLLAGE[0], PATH_COLLAGE[2]].map((src) => (
            <CollagePhoto key={src} src={src} />
          ))}
        </div>
        <div className="-mt-8 flex flex-col gap-4 lg:-mt-11">
          {[PATH_COLLAGE[1], PATH_COLLAGE[3]].map((src) => (
            <CollagePhoto key={src} src={src} />
          ))}
        </div>
      </div>

      <span className="absolute left-1/2 top-1/2 flex size-stage -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-soft">
        <img
          src="/icons/path-stage.svg"
          alt=""
          width={70}
          height={65}
          className="h-14 w-16"
        />
      </span>
    </div>
  );
}

function CollagePhoto({ src }: { src: string }) {
  return (
    <div className="relative aspect-collage overflow-hidden rounded-lg">
      <CoverImage src={src} alt="" sizes="280px" />
    </div>
  );
}

function StepList() {
  return (
    <div className="grid h-full grid-cols-steps gap-x-5">
      <div className="relative h-full">
        <span
          aria-hidden
          className="absolute left-1/2 top-7 h-2/3 -translate-x-1/2 border-l border-dashed border-neutral-300"
        />
        {PATH_STEPS.map((step, index) => (
          <span
            key={step.title}
            className={cn(
              "absolute left-1/2 z-10 flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-step-gradient text-xl font-bold tracking-normal2 text-white",
              STEP_TOP[index],
            )}
          >
            {index + 1}
          </span>
        ))}
      </div>

      <ol className="grid h-full grid-rows-3">
        {PATH_STEPS.map((step) => (
          <li key={step.title} className="flex flex-col gap-1.5">
            <h3 className="text-xl font-semibold leading-snug tracking-snug text-foreground lg:text-2xl lg:leading-7.5">
              {step.title}
            </h3>
            <p className="max-w-lg text-base leading-normal tracking-wide text-neutral-600 lg:text-md lg:leading-6">
              {step.copy}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
