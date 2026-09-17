"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppIcon } from "@/components/icons/app-icon";
import { Dropdown } from "@/components/ui/dropdown";
import { SEARCH_CITIES, SEARCH_GUESTS, SEARCH_WHEN } from "@/data/content";
import { cn } from "@/lib/cn";

export function HeaderSearch() {
  const params = useSearchParams();
  const router = useRouter();

  const [city, setCity] = useState(cityFromParams(params.get("city")));
  const [when, setWhen] = useState(whenFromParams(params.get("date")));
  const [guests, setGuests] = useState(guestsFromParams(params.get("guests")));

  useEffect(() => {
    setCity(cityFromParams(params.get("city")));
    setWhen(whenFromParams(params.get("date")));
    setGuests(guestsFromParams(params.get("guests")));
  }, [params]);

  const guestLabel = SEARCH_GUESTS.find((item) => item.value === guests)?.label ?? guests;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = new URLSearchParams(params.toString());
    const cityName = city.split(",")[0];
    if (cityName) next.set("city", cityName);
    else next.delete("city");
    if (when !== "Anytime") next.set("date", when);
    else next.delete("date");
    if (guests) next.set("guests", guests);
    else next.delete("guests");
    router.push(`/venues?${next.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex h-header-search w-full max-w-header-search items-center rounded-pill border border-neutral-200 bg-white py-1 pl-4 pr-1"
    >
      <div className="flex min-w-0 flex-1 items-center">
        <CompactSelect value={city} options={[...SEARCH_CITIES]} onChange={setCity} />
        <span className="h-4 w-px shrink-0 bg-neutral-200" aria-hidden />
        <CompactSelect value={when} options={[...SEARCH_WHEN]} onChange={setWhen} />
        <span className="h-4 w-px shrink-0 bg-neutral-200" aria-hidden />
        <CompactSelect
          value={`${guestLabel} Guests`}
          options={SEARCH_GUESTS.map((item) => `${item.label} Guests`)}
          onChange={(label) => {
            const match = SEARCH_GUESTS.find((item) => `${item.label} Guests` === label);
            if (match) setGuests(match.value);
          }}
        />
      </div>
      <button
        type="submit"
        aria-label="Search venues"
        className="ml-1 flex size-header-search shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-orange-mid"
      >
        <AppIcon name="search" className="size-4" />
      </button>
    </form>
  );
}

function cityFromParams(city: string | null) {
  if (!city) return SEARCH_CITIES[0];
  return SEARCH_CITIES.find((item) => item.startsWith(city)) ?? `${city}`;
}

function whenFromParams(date: string | null) {
  if (!date) return SEARCH_WHEN[0];
  return SEARCH_WHEN.find((item) => item === date) ?? date;
}

function guestsFromParams(guests: string | null) {
  if (!guests) return SEARCH_GUESTS[0].value;
  return SEARCH_GUESTS.find((item) => item.value === guests)?.value ?? guests;
}

function CompactSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <Dropdown
      align="center"
      menuRole="listbox"
      className="min-w-0 flex-1"
      triggerClassName="w-full truncate px-2 text-center text-sm font-medium tracking-wide text-foreground lg:text-base"
      menuClassName="top-full z-30 mt-2 w-40 rounded-sm"
      trigger={value}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={cn(
            "w-full px-3 py-2.5 text-left text-sm font-medium hover:bg-neutral-100",
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
