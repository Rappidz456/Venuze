"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { HeaderSearch } from "@/components/layout/header-search";
import { Navbar } from "@/components/layout/navbar";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { IconButton } from "@/components/ui/icon-button";
import { useDismiss } from "@/hooks/use-dismiss";
import { useLogoutMutation } from "@/hooks/use-auth";
import { cn } from "@/lib/cn";
import { ROUTES } from "@/lib/constants";
import { useAuthStore } from "@/stores/auth-store";
import { useUiStore } from "@/stores/ui-store";

const LANGUAGES = [
  { id: "EN", label: "English" },
  { id: "AR", label: "العربية" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const closeMobileNav = useUiStore((state) => state.closeMobileNav);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  const inverted = isHome && !scrolled;
  const isVenues = pathname === ROUTES.venues;

  return (
    <Navbar
      inverted={inverted}
      bordered={isVenues}
      logo={<Logo inverted={inverted} className="shrink-0" />}
      center={
        isVenues ? (
          // Tablet: the pill sits in the flow between the logo and the
          // actions so it can shrink instead of overlapping them. Desktop:
          // it is centred on the frame, as drawn in the file.
          <div className="hidden min-w-0 flex-1 items-center justify-center px-2 md:flex xl:pointer-events-none xl:absolute xl:inset-0 xl:flex-none xl:px-0">
            <div className="w-full max-w-header-search xl:pointer-events-auto">
              <Suspense fallback={<div className="h-header-search w-full max-w-header-search" />}>
                <HeaderSearch />
              </Suspense>
            </div>
          </div>
        ) : null
      }
      actions={
        <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-2">
          <div className={cn(isVenues && "md:hidden")}>
            <ListingMenu inverted={inverted} accent={isVenues} />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {isVenues ? null : <LanguageMenu inverted={inverted} />}
            <ProfileMenu inverted={inverted} />
          </div>
          <MobileMenu inverted={inverted} />
        </div>
      }
    />
  );
}

function ListingMenu({ inverted, accent = false }: { inverted: boolean; accent?: boolean }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const items = isAuthenticated
    ? [{ href: ROUTES.home, label: "List your venue" }]
    : [
        { href: ROUTES.login, label: "List your venue" },
        { href: ROUTES.login, label: "Sign in" },
      ];

  return (
    <HeaderMenu inverted={inverted} label="Add your listing" accent={accent} width="w-48">
      {items.map((item) => (
        <DropdownItem key={item.label} href={item.href}>
          {item.label}
        </DropdownItem>
      ))}
    </HeaderMenu>
  );
}

function LanguageMenu({ inverted }: { inverted: boolean }) {
  const locale = useUiStore((state) => state.locale);
  const setLocale = useUiStore((state) => state.setLocale);

  return (
    <HeaderMenu inverted={inverted} label={locale} width="w-40">
      {LANGUAGES.map((language) => (
        <DropdownItem
          key={language.id}
          active={locale === language.id}
          onClick={() => setLocale(language.id)}
        >
          {language.label}
        </DropdownItem>
      ))}
    </HeaderMenu>
  );
}

function ProfileMenu({ inverted }: { inverted: boolean }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useLogoutMutation();

  return (
    <Dropdown
      triggerClassName="rounded-full"
      menuClassName="w-48"
      trigger={
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-full shadow-subtle md:size-10",
            inverted ? "bg-white text-brand" : "bg-white text-neutral-800 ring-1 ring-neutral-200",
          )}
          aria-label="Account"
        >
          <UserGlyph />
        </span>
      }
    >
      {isAuthenticated ? (
        <DropdownItem
          onClick={() =>
            logout.mutate(undefined, {
              onSuccess: () => {
                router.replace(ROUTES.home);
                router.refresh();
              },
            })
          }
        >
          Log out
        </DropdownItem>
      ) : (
        <DropdownItem href={ROUTES.login}>Sign in</DropdownItem>
      )}
    </Dropdown>
  );
}

function MobileMenu({ inverted }: { inverted: boolean }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useLogoutMutation();
  const open = useUiStore((state) => state.isMobileNavOpen);
  const toggle = useUiStore((state) => state.toggleMobileNav);
  const close = useUiStore((state) => state.closeMobileNav);
  const locale = useUiStore((state) => state.locale);
  const setLocale = useUiStore((state) => state.setLocale);
  const rootRef = useDismiss(close, open);

  return (
    <div ref={rootRef} className="relative shrink-0 md:hidden">
      <IconButton
        label="Open menu"
        aria-expanded={open}
        onClick={toggle}
        className={cn(
          "size-9 rounded-full bg-white text-neutral-800 shadow-subtle",
          !inverted && "ring-1 ring-neutral-200",
        )}
      >
        <Menu className="size-5" strokeWidth={2} />
      </IconButton>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-md bg-white py-1 shadow-modal"
        >
          <div onClick={close}>
            {LANGUAGES.map((language) => (
              <DropdownItem
                key={language.id}
                active={locale === language.id}
                onClick={() => setLocale(language.id)}
              >
                {language.label}
              </DropdownItem>
            ))}
            {isAuthenticated ? (
              <DropdownItem
                onClick={() =>
                  logout.mutate(undefined, {
                    onSuccess: () => {
                      router.replace(ROUTES.home);
                      router.refresh();
                    },
                  })
                }
              >
                Log out
              </DropdownItem>
            ) : (
              <DropdownItem href={ROUTES.login}>Sign in</DropdownItem>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HeaderMenu({
  inverted,
  label,
  width,
  children,
  accent = false,
}: {
  inverted: boolean;
  label: string;
  width: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Dropdown
      menuClassName={width}
      trigger={({ open }) => (
        <span
          className={cn(
            "inline-flex h-9 max-w-full items-center gap-1 rounded-pill px-2.5 text-sm font-medium tracking-wide shadow-subtle transition-colors md:h-10 md:gap-1.5 md:px-4 md:text-base",
            inverted
              ? "bg-white text-foreground hover:bg-white/90 md:text-brand"
              : accent
                ? "bg-white text-brand ring-1 ring-neutral-200 hover:bg-neutral-off"
                : "bg-white text-neutral-800 ring-1 ring-neutral-200 hover:bg-neutral-off",
          )}
        >
          <span className="whitespace-nowrap">{label}</span>
          <ChevronDown className={cn("size-3.5 opacity-70 transition-transform", open && "rotate-180")} />
        </span>
      )}
    >
      {children}
    </Dropdown>
  );
}

function UserGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5.5 18.5c.9-2.8 3.1-4.2 6.5-4.2s5.6 1.4 6.5 4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
