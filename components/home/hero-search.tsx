"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AppIcon } from "@/components/icons/app-icon";
import { Dropdown } from "@/components/ui/dropdown";
import { SEARCH_CITIES, SEARCH_GUESTS, SEARCH_WHEN } from "@/data/content";
import { cn } from "@/lib/cn";

const DEFAULT_DATE = "2025-11-03";

export function HeroSearch({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<"venue" | "vendors">("venue");
  const [city, setCity] = useState<string>(SEARCH_CITIES[0]);
  const [when, setWhen] = useState<string>(SEARCH_WHEN[0]);
  const [date, setDate] = useState<string>(DEFAULT_DATE);
  const [guests, setGuests] = useState<string>(SEARCH_GUESTS[0].value);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === "vendors") {
      router.push("/#vendors");
      return;
    }

    const params = new URLSearchParams();
    const cityName = city.split(",")[0];
    if (cityName) params.set("city", cityName);

    const isTablet = window.matchMedia("(min-width: 768px)").matches;
    if (isTablet) {
      if (when !== "Anytime") params.set("date", when);
    } else if (date) {
      params.set("date", date);
    }

    if (guests) params.set("guests", guests);
    router.push(`/venues?${params.toString()}`);
  };

  const guestLabel = SEARCH_GUESTS.find((item) => item.value === guests)?.label ?? guests;
  const cityShort = city.split(",")[0] ?? city;

  const tabletFields = (
    <>
      <SelectField label="Where" value={city} options={[...SEARCH_CITIES]} onChange={setCity} />
      <SelectField label="When" value={when} options={[...SEARCH_WHEN]} onChange={setWhen} />
      <SelectField
        label="Guests"
        value={guestLabel}
        options={SEARCH_GUESTS.map((item) => item.label)}
        onChange={(label) => {
          const match = SEARCH_GUESTS.find((item) => item.label === label);
          if (match) setGuests(match.value);
        }}
      />
    </>
  );

  if (compact) {
    return (
      <form
        onSubmit={onSubmit}
        className="grid gap-2 rounded-sm bg-white p-2 shadow-card sm:grid-cols-2 md:grid-cols-search md:items-center"
      >
        {tabletFields}
        <SearchButton className="sm:col-span-2 md:col-span-1" />
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full min-w-0">
      <div className="w-full min-w-0 overflow-hidden rounded-lg bg-white p-4 shadow-soft sm:p-5 md:hidden">
        <div className="mb-3 grid grid-cols-2 gap-2">
          <ModeTab active={mode === "venue"} onClick={() => setMode("venue")} icon="venue">
            Venue
          </ModeTab>
          <ModeTab active={mode === "vendors"} onClick={() => setMode("vendors")} icon="vendors">
            Vendors
          </ModeTab>
        </div>

        <div className="flex flex-col">
          <SelectField
            label="Where"
            value={city}
            displayValue={cityShort}
            options={[...SEARCH_CITIES]}
            onChange={setCity}
            flush
          />
          <DateField label="When" value={date} onChange={setDate} />
          <SelectField
            label="Guests"
            value={guestLabel}
            displayValue={guests}
            options={SEARCH_GUESTS.map((item) => item.label)}
            onChange={(label) => {
              const match = SEARCH_GUESTS.find((item) => item.label === label);
              if (match) setGuests(match.value);
            }}
            flush
          />
        </div>

        <SearchButton className="mt-4" />
      </div>

      <div className="hidden rounded-md bg-white p-2 shadow-soft md:flex md:items-center md:gap-3 md:px-4 lg:h-search lg:gap-4 lg:rounded-sm lg:px-6 lg:py-0">
        <div className="grid min-w-0 flex-1 grid-cols-3 divide-x divide-neutral-150">
          {tabletFields}
        </div>
        <SearchButton className="shrink-0" />
      </div>
    </form>
  );
}

function SearchButton({ className }: { className?: string }) {
  return (
    <button
      type="submit"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm bg-brand font-semibold tracking-wide text-white transition-colors hover:bg-brand-orange-mid",
        "h-12 w-full px-5 text-md",
        "md:h-13 md:w-search-btn-md md:px-0 md:text-md",
        "lg:h-search-btn lg:w-search-btn lg:gap-2.5 lg:text-xl",
        className,
      )}
    >
      <AppIcon name="search" className="size-5 lg:size-6" />
      Search
    </button>
  );
}

function ModeTab({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: "venue" | "vendors";
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-11 w-full min-w-0 items-center justify-center gap-1.5 rounded-sm px-2 text-base font-semibold tracking-wide transition-colors",
        active ? "bg-brand text-white" : "bg-transparent text-neutral-800 hover:bg-neutral-100",
      )}
    >
      <AppIcon name={icon} className={icon === "vendors" ? "size-4" : "size-3.5"} />
      {children}
    </button>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative min-w-0 cursor-pointer py-2">
      <span className="text-xs font-regular tracking-wide text-neutral-500">{label}</span>
      <span className="mt-1 flex items-center justify-between gap-2">
        <span className="truncate text-base font-medium tracking-wide text-foreground">
          {formatDateDisplay(value)}
        </span>
        <ChevronDown className="size-4 shrink-0 text-neutral-400" />
      </span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label={label}
      />
    </label>
  );
}

function formatDateDisplay(iso: string) {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${day}-${month}-${year}`;
}

function SelectField({
  label,
  value,
  displayValue,
  options,
  onChange,
  flush = false,
}: {
  label: string;
  value: string;
  displayValue?: string;
  options: string[];
  onChange: (value: string) => void;
  flush?: boolean;
}) {
  return (
    <Dropdown
      align="stretch"
      menuRole="listbox"
      className={cn("min-w-0", flush ? "py-2" : "px-3 py-2.5 sm:px-4 lg:px-5")}
      triggerClassName="flex w-full flex-col text-left"
      menuClassName="z-30 mt-1 rounded-sm"
      trigger={({ open }) => (
        <>
          <span className="text-xs font-regular tracking-wide text-neutral-500 md:text-sm">
            {label}
          </span>
          <span className="mt-1 flex items-center justify-between gap-2">
            <span className="truncate text-base font-medium tracking-wide text-foreground md:text-md">
              {displayValue ?? value}
            </span>
            <ChevronDown className={cn("size-4 shrink-0 text-neutral-400 transition-transform", open && "rotate-180")} />
          </span>
        </>
      )}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={cn(
            "w-full px-3 py-2.5 text-left text-base font-medium hover:bg-neutral-100",
            option === value ? "text-brand" : "text-foreground",
          )}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </Dropdown>
  );
}
