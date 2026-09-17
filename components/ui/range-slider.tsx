"use client";

import { cn } from "@/lib/cn";

/**
 * Two-handle range slider matching the Figma filter popup: a thin grey rail,
 * a brand-coloured span between the handles, and two white handles ringed in
 * brand. Built from two native range inputs so keyboard support comes free.
 */
export function RangeSlider({
  min,
  max,
  step = 1,
  valueMin,
  valueMax,
  labelMin,
  labelMax,
  onChange,
  className,
}: {
  min: number;
  max: number;
  step?: number;
  valueMin: number;
  valueMax: number;
  labelMin: string;
  labelMax: string;
  onChange: (min: number, max: number) => void;
  className?: string;
}) {
  const span = max - min || 1;
  const leftPct = ((valueMin - min) / span) * 100;
  const rightPct = ((valueMax - min) / span) * 100;

  return (
    <div className={cn("relative h-4.5 w-full", className)}>
      <div className="absolute inset-x-0 top-1/2 h-0.75 -translate-y-1/2 rounded-full bg-neutral-200" />
      <div
        className="absolute top-1/2 h-0.75 -translate-y-1/2 rounded-full bg-brand"
        style={{ left: `${leftPct}%`, width: `${Math.max(rightPct - leftPct, 0)}%` }}
      />

      <input
        type="range"
        aria-label={labelMin}
        min={min}
        max={max}
        step={step}
        value={valueMin}
        onChange={(event) => onChange(Math.min(Number(event.target.value), valueMax), valueMax)}
        className="range-thumb"
      />
      <input
        type="range"
        aria-label={labelMax}
        min={min}
        max={max}
        step={step}
        value={valueMax}
        onChange={(event) => onChange(valueMin, Math.max(Number(event.target.value), valueMin))}
        className="range-thumb"
      />
    </div>
  );
}
