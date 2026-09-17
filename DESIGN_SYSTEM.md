# Venuze design system

Source of truth: [`tailwind.config.ts`](./tailwind.config.ts) at the project root. Tailwind v4 loads it with `@config` in `app/globals.css`.

Do not hardcode pixels, hex colours, or one-off shadows in components. If Figma shows a value that is not on the scale, add a named token to the config and use the utility.

## Principles

- **One typeface:** Poppins 400 / 500 / 600 / 700 (`font-poppins`, `font-regular` / `font-medium` / `font-semibold` / `font-bold`).
- **One accent:** coral-red `#ff5037` (`bg-brand` / `text-brand`) for CTAs, prices, and active states. Gold `#ffc331` (`brand-gold`) is support, not a second primary.
- **Pill actions, soft cards.** Buttons are `rounded-pill`. Cards are `rounded-lg` + `shadow-card`.
- **Type is sized for the file, not Tailwind defaults.** `text-base` is 14px. Body copy uses `text-md` (16px). The hero is `text-6xl` (70px) with `tracking-tightest`.

## Color

| Token | Value | Use |
| --- | --- | --- |
| `brand` | `#ff5037` | Primary button, price, active nav |
| `brand-coral` | `#ff786a` | Gradient start |
| `brand-orange-mid` | `#ff4f37` | Gradient mid / button hover |
| `brand-gold` | `#ffc331` | Gradient end, highlights |
| `brand-amber` | `#fe8b16` | Stat numbers |
| `brand-yellow` | `#fec432` | Active carousel dot |
| `neutral-800` | `#372321` | Hero overlay / dark bands |
| `neutral-500` | `#808080` | Field labels (Where / When / Guests) |
| `neutral-100` | `#f4f4f4` | Circular icon buttons |
| `neutral-50` | `#fdf1d2` | Host CTA wash |
| `slate` | `#364153` | Chip text |
| `map` | `#eef0ec` | Search-results map surface |

Gradients: `bg-brand-gradient`, `bg-stats-gradient`, `bg-tile-fade`, `bg-destination-fade`, `bg-featured-overlay`, `bg-band-split`.

Dark mode remaps neutrals and surfaces in `app/globals.css`. Brand hues stay put.

## Type

| Class | Size | Tracking | Typical use |
| --- | --- | --- | --- |
| `text-6xl` | 70px | `tracking-tightest` (−2.1px) | Home H1 |
| `text-5xl` | 44px | `tracking-tighter` (−1.02px) | Page titles |
| `text-4xl` | 34px | `tracking-tighter` | Stat numbers, section titles |
| `text-3xl` | 30px | `tracking-tight` (−0.9px) | Category tile titles |
| `text-2xl` | 24px | `tracking-snug` (−0.72px) | Step headings, card titles |
| `text-md` | 16px | `tracking-wide` (−0.48px) | Body, buttons |
| `text-sm` | 12px | — | Labels, helper text |
| `text-xs` | 10px | — | Fine print |

Eyebrow labels use `tracking-widest` (0.16em). Filter chips use `tracking-wider` (0.06em).

Snap in-between Figma sizes onto this scale (15px → `text-md`, 13px → `text-sm`, 26/28px → `text-3xl`).

## Radius, space, shadow, layout

- Radius: `xs` 8 / `sm` 10 / `md` 12 / `lg` 20 / `xl` 24 / `32` 32 / `2xl` 48 / `3xl` 50 / `pill` 100
- Extra space: `1.25` / `1.5` 5px, `2.75` 11px, `6.25` 25px, `12.5` 50px, `18` 72px, `17.5` 70px
- Shadows: `card`, `soft`, `subtle`, `tight`, `header`, `modal`, `tab`
- Named layout: `max-w-frame` 1440, `max-w-page` 1280, `h-hero` 744, `h-header` 72, `h-search` 100, `h-card` 400

If Figma shows a pill, use `rounded-pill`. If it shows a 30px title, use `text-3xl`.
