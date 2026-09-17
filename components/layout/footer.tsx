import { Link } from "@/components/ui/link";
import { Container } from "@/components/ui/container";
import { FOOTER_COLUMNS, FOOTER_TAGLINE } from "@/data/content";

export function Footer() {
  return (
    <footer id="footer" className="bg-surface">
      <div className="rounded-t-32 bg-neutral-900 text-white lg:rounded-t-3xl">
        {/* On pages whose closing banner overlaps this cap, globals.css adds
            the extra top padding that clears it. */}
        <Container className="py-12 lg:py-17.5" data-footer-inner>
          <div className="grid gap-12 lg:grid-cols-footer lg:gap-14">
            <div>
              <div className="flex items-start gap-6">
                <Link href="/" aria-label="Venuze home" className="shrink-0">
                  <svg viewBox="0 0 28 26" className="h-10 w-14 lg:h-11 lg:w-16" aria-hidden>
                    <path
                      d="M2.2 3.2 12.4 23.4c.28.54.98.76 1.52.48.22-.11.4-.3.5-.52L16.2 18 8.05 3.2H2.2Z"
                      className="fill-brand-gold"
                    />
                    <path
                      d="M25.8 3.2 14.2 23.6c-.3.54-1 .76-1.54.46-.2-.12-.36-.3-.46-.52L10.4 18 19.95 3.2h5.85Z"
                      className="fill-brand"
                    />
                  </svg>
                </Link>
                <p className="max-w-xl text-lg font-semibold leading-7.5 text-white lg:text-2xl lg:leading-10">
                  {FOOTER_TAGLINE}
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:mt-14">
                {FOOTER_COLUMNS.map((column) => (
                  <div key={column.title} className="flex flex-col gap-2.5">
                    <p className="text-md font-medium leading-tight text-white lg:text-lg">
                      {column.title}
                    </p>
                    <ul className="text-sm leading-loose text-neutral-350">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="transition-colors hover:text-white"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-10">
              <h2 className="text-xl font-semibold leading-7.5 text-white lg:text-2xl">
                Get in Touch
              </h2>

              <form className="mt-5 flex flex-col gap-4">
                <label className="sr-only" htmlFor="footer-email">
                  Email Address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email Address"
                  className="h-11 w-full rounded-md border border-neutral-600 bg-neutral-900 px-5 text-md text-white outline-none transition-colors placeholder:text-white focus:border-brand"
                />

                <label className="sr-only" htmlFor="footer-message">
                  Message
                </label>
                <textarea
                  id="footer-message"
                  rows={5}
                  placeholder="Message"
                  className="h-37 w-full resize-none rounded-sm border border-neutral-600 bg-neutral-900 px-5 py-4 text-md text-white outline-none transition-colors placeholder:text-white focus:border-brand"
                />

                <button
                  type="submit"
                  className="ml-auto inline-flex h-12.5 items-center justify-center rounded-sm bg-brand px-8 text-lg font-semibold tracking-normal2 text-white transition-colors hover:bg-brand-orange-mid lg:px-9.25 lg:text-xl"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          <hr className="mt-12 border-white/15 lg:mt-14" />

          <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-6">
              <Social href="https://x.com" label="X">
                <svg viewBox="0 0 24 24" className="size-5.5 fill-current" aria-hidden>
                  <path d="M17.6 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.6L4.3 21H1l7.7-8.8L1.6 3h6.8l4.7 6.1L17.6 3Zm-1.2 16h1.8L7.7 4.8H5.8L16.4 19Z" />
                </svg>
              </Social>
              <Social href="https://facebook.com" label="Facebook">
                <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden>
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
                </svg>
              </Social>
              <Social href="https://instagram.com" label="Instagram">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.9" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.9" />
                  <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                </svg>
              </Social>
            </div>

            <p className="text-base leading-7.5 text-neutral-400">
              © {new Date().getFullYear()} Venuze. All rights reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="text-white transition-colors hover:text-brand"
    >
      {children}
    </a>
  );
}
