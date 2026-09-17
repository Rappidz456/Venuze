"use client";

import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppIcon, MaskIcon } from "@/components/icons/app-icon";
import { SPACE_TYPES } from "@/data/content";
import { cn } from "@/lib/cn";
import { countActiveFilters } from "@/lib/venues";
import { useUiStore } from "@/stores/ui-store";

export function SearchToolbar() {
  const openFilter = useUiStore((state) => state.openFilter);
  const params = useSearchParams();
  const router = useRouter();
  const rail = useRef<HTMLDivElement>(null);

  const activeType = params.get("type") ?? "All Spaces";
  const filterCount = countActiveFilters(params);

  const push = (next: URLSearchParams) => router.push(`/venues?${next.toString()}`);

  const setKeyword = (value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set("q", value);
    else next.delete("q");
    push(next);
  };

  const selectType = (item: (typeof SPACE_TYPES)[number]) => {
    const next = new URLSearchParams(params.toString());
    if (item.category === "all" || item.label === activeType) {
      next.delete("category");
      next.delete("type");
    } else {
      next.set("category", item.category);
      next.set("type", item.label);
    }
    push(next);
  };

  const scrollRail = (direction: -1 | 1) => {
    rail.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex h-12.5 items-stretch border-b border-neutral-200">
        <label className="flex min-w-0 flex-1 items-center gap-2.5 px-4 md:px-6 lg:px-8">
          <AppIcon name="search" className="size-4.5 shrink-0 text-neutral-400" />
          <input
            type="search"
            defaultValue={params.get("q") ?? ""}
            onKeyDown={(event) => {
              if (event.key === "Enter") setKeyword(event.currentTarget.value.trim());
            }}
            placeholder="Add keywords..."
            aria-label="Search venues by keyword"
            className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-neutral-400"
          />
        </label>
        <button
          type="button"
          onClick={openFilter}
          className="inline-flex shrink-0 items-center gap-2 border-l border-neutral-200 px-5 text-base font-medium text-foreground transition-colors hover:text-brand md:px-7"
        >
          <MaskIcon src="/icons/spaces/filter.svg" className="size-5" />
          Filters
          {filterCount > 0 ? (
            <span className="flex size-4.5 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
              {filterCount}
            </span>
          ) : null}
        </button>
      </div>

      <div className="flex items-center border-b border-neutral-200 px-2 py-2.5 md:px-3">
        <RailArrow direction="left" onClick={() => scrollRail(-1)} />
        <div ref={rail} className="no-scrollbar flex min-w-0 flex-1 overflow-x-auto scroll-smooth">
          {SPACE_TYPES.map((item) => {
            const active = item.label === activeType;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => selectType(item)}
                aria-pressed={active}
                className={cn(
                  "flex min-w-18 flex-1 flex-col items-center gap-2 px-1 text-center transition-colors",
                  active ? "text-brand" : "text-neutral-500 hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-space-tile items-center justify-center rounded-xs",
                    active && "bg-neutral-100",
                  )}
                >
                  <MaskIcon src={item.icon} className="size-space" />
                </span>
                <span className="whitespace-nowrap text-sm font-medium leading-none">{item.label}</span>
              </button>
            );
          })}
        </div>
        <RailArrow direction="right" onClick={() => scrollRail(1)} />
      </div>
    </div>
  );
}

function RailArrow({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Scroll categories left" : "Scroll categories right"}
      onClick={onClick}
      className="hidden size-6 shrink-0 items-center justify-center text-neutral-400 transition-colors hover:text-foreground md:flex"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
        <path
          d={direction === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
