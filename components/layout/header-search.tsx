"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppIcon } from "@/components/icons/app-icon";
import { Dropdown } from "@/components/ui/dropdown";
import { SEARCH_CITIES, SEARCH_GUESTS, SEARCH_WHEN } from "@/data/content";
import { cn } from "@/lib/cn";

const CITY_PLACEHOLDER = "Where";
const WHEN_PLACEHOLDER = "When";
const GUESTS_PLACEHOLDER = "Guests";

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

  const guestLabel = guests
    ? `${SEARCH_GUESTS.find((item) => item.value === guests)?.label ?? guests} Guests`
    : GUESTS_PLACEHOLDER;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = new URLSearchParams(params.toString());
    const cityName = city === CITY_PLACEHOLDER ? "" : city.split(",")[0];
    if (cityName) next.set("city", cityName);
    else next.delete("city");
    if (when && when !== WHEN_PLACEHOLDER && when !== "Anytime") next.set("date", when);
    else next.delete("date");
    if (guests) next.set("guests", guests);
    else next.delete("guests");
    router.push(`/venues?${next.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-12.5 w-full min-w-0 items-center rounded-pill border border-neutral-200 bg-white py-1 pl-4 pr-1 shadow-subtle md:mx-auto md:h-header-search md:max-w-header-search md:pl-4 md:pr-1 md:shadow-none"
    >
      <div className="flex min-w-0 flex-1 items-center">
        <CompactSelect
          value={city}
          options={[...SEARCH_CITIES]}
          onChange={setCity}
          placeholder={CITY_PLACEHOLDER}
        />
        <span className="h-5 w-px shrink-0 bg-neutral-200 md:h-4" aria-hidden />
        <CompactSelect
          value={when}
          options={[...SEARCH_WHEN]}
          onChange={setWhen}
          placeholder={WHEN_PLACEHOLDER}
        />
        <span className="h-5 w-px shrink-0 bg-neutral-200 md:h-4" aria-hidden />
        <CompactSelect
          value={guestLabel}
          options={SEARCH_GUESTS.map((item) => `${item.label} Guests`)}
          onChange={(label) => {
            const match = SEARCH_GUESTS.find((item) => `${item.label} Guests` === label);
            if (match) setGuests(match.value);
          }}
          placeholder={GUESTS_PLACEHOLDER}
        />
      </div>
      <button
        type="submit"
        aria-label="Search venues"
        className="ml-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-orange-mid md:size-header-search"
      >
        <AppIcon name="search" className="size-4" />
      </button>
    </form>
  );
}

function cityFromParams(city: string | null) {
  if (!city) return CITY_PLACEHOLDER;
  return SEARCH_CITIES.find((item) => item.startsWith(city)) ?? `${city}`;
}

function whenFromParams(date: string | null) {
  if (!date) return WHEN_PLACEHOLDER;
  return SEARCH_WHEN.find((item) => item === date) ?? date;
}

function guestsFromParams(guests: string | null) {
  if (!guests) return "";
  return SEARCH_GUESTS.find((item) => item.value === guests)?.value ?? guests;
}

function CompactSelect({
  value,
  options,
  onChange,
  placeholder,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const isPlaceholder = Boolean(placeholder && value === placeholder);

  return (
    <Dropdown
      align="center"
      menuRole="listbox"
      className="min-w-0 flex-1"
      triggerClassName={cn(
        "w-full truncate px-2 text-center text-md font-medium tracking-wide md:px-2 md:text-sm lg:text-base",
        isPlaceholder ? "text-neutral-600 md:text-neutral-500" : "text-foreground",
      )}
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
