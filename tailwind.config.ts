import type { Config } from "tailwindcss";

/**
 * Design tokens extracted from the Figma file:
 * "Venuze" — Hashed System NEXTJS/TYPESCRIPT Assignment
 * https://www.figma.com/design/j5ur5876o2HSaBCuiV6Bkc/
 *
 * Source of truth for the whole app. Do not hardcode px / hex in components —
 * add a token here and use the generated utility instead.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // NOTE: the extra `wide` (1400px) breakpoint lives in globals.css as
      // `--breakpoint-wide`. Tailwind v4 emits screens declared here *before*
      // its own scale, so `lg:` would win over `wide:` on the same property.
      colors: {
        brand: {
          DEFAULT: "#ff5037",
          coral: "#ff786a",
          orangeMid: "#ff4f37",
          "orange-mid": "#ff4f37",
          gold: "#ffc331",
          amber: "#fe8b16",
          yellow: "#fec432",
        },
        neutral: {
          900: "var(--neutral-900)",
          800: "var(--neutral-800)",
          600: "var(--neutral-600)",
          500: "var(--neutral-500)",
          400: "var(--neutral-400)",
          350: "var(--neutral-350)",
          300: "var(--neutral-300)",
          200: "var(--neutral-200)",
          150: "var(--neutral-150)",
          100: "var(--neutral-100)",
          50: "var(--neutral-50)",
          off: "var(--neutral-off)",
        },
        slate: {
          DEFAULT: "var(--slate)",
        },
        map: {
          DEFAULT: "var(--map)",
          line: "var(--map-line)",
          block: "var(--map-block)",
          park: "var(--map-park)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        border: "var(--border)",
        overlay: "var(--overlay)",
        success: "var(--success)",
        danger: "var(--danger)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontSize: {
        xs: "10px",
        sm: "12px",
        base: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "34px",
        "5xl": "44px",
        "6xl": "70px",
      },
      letterSpacing: {
        tightest: "-2.1px",
        tighter: "-1.02px",
        tight: "-0.9px",
        snug: "-0.72px",
        normal2: "-0.6px",
        wide: "-0.48px",
        loose: "0.6px",
        wider: "0.06em",
        widest: "0.16em",
      },
      lineHeight: {
        heading: "1.15",
        section: "50px",
      },
      borderRadius: {
        xs: "8px",
        sm: "10px",
        md: "12px",
        lg: "20px",
        xl: "24px",
        "2xl": "48px",
        "3xl": "50px",
        "32": "32px",
        pill: "100px",
        full2: "999px",
      },
      spacing: {
        "0.75": "3px",
        "1.25": "5px",
        "1.5": "5px",
        "2": "8px",
        "2.5": "10px",
        "2.75": "11px",
        "3.75": "15px",
        "4.5": "18px",
        "5": "20px",
        "5.5": "22px",
        "6": "24px",
        "6.25": "25px",
        "7.5": "30px",
        "9.25": "37px",
        "10.5": "42px",
        "12.5": "50px",
        "13": "52px",
        "13.75": "55px",
        "15": "60px",
        "17.5": "70px",
        "18": "72px",
        "18.75": "75px",
        "19": "76px",
        "21.5": "86px",
        "22.5": "90px",
        "25": "100px",
        "27": "108px",
        "32.5": "130px",
        "37": "148px",
        "38.75": "155px",
        "43.5": "174px",
        "45": "180px",
        "50": "200px",
        "55": "220px",
        "57": "228px",
        "70": "280px",
        "75": "300px",
        "85": "340px",
        "90": "360px",
        "100": "400px",
        "105": "420px",
        "115": "460px",
        "125": "500px",
        "160": "640px",
        "186": "744px",
        header: "72px",
        // Header (72) + keyword bar (51) + category rail (70): where the
        // results area starts, and what the map is pinned to. Keep in sync
        // with height.map below.
        "results-top": "192px",
        "footer-overlap": "108px",
        "footer-overlap-lg": "155px",
        popup: "18%",
      },
      maxWidth: {
        frame: "1440px",
        page: "1280px",
        content: "1200px",
        search: "1100px",
        dialog: "654px",
        "search-tab": "264px",
        "header-search": "420px",
      },
      width: {
        "search-btn": "147px",
        "search-btn-md": "136px",
        "search-tab": "264px",
        "header-search": "420px",
        filter: "min(100vw - 2rem, 420px)",
        map: "min(36vw, 421px)",
        "card-mobile": "min(78vw, 268px)",
        "card-tablet": "min(46vw, 301px)",
        "featured-mobile": "min(85vw, 300px)",
        "featured-col": "calc((100% - 72px) / 4)",
        arrow: "190px",
        art: "447px",
        "cta-art": "328px",
      },
      height: {
        header: "72px",
        "header-search": "42px",
        hero: "744px",
        search: "100px",
        "search-btn": "61px",
        "search-tab": "55px",
        card: "400px",
        "card-md": "360px",
        "card-sm": "300px",
        destination: "500px",
        "destination-sm": "420px",
        art: "204px",
        "cta-art": "222px",
        gallery: "460px",
        "gallery-sm": "280px",
        // The map fills the window from under the search toolbar to the
        // bottom edge, so it is attached on three sides.
        map: "calc(100vh - 192px)",
        "map-toggle": "calc(100svh - 220px)",
        "map-toggle-md": "calc(100svh - 244px)",
        "step-line": "calc(100% + 2rem)",
        "step-line-lg": "calc(100% + 2.5rem)",
      },
      minHeight: {
        hero: "744px",
        map: "420px",
        empty: "calc(100vh - 280px)",
      },
      maxHeight: {
        hero: "744px",
        dialog: "92vh",
        filter: "calc(100vh - 2rem)",
      },
      size: {
        mark: "131px",
        stage: "160px",
        space: "30px",
        "space-tile": "48px",
        "header-search": "36px",
      },
      aspectRatio: {
        collage: "43 / 30",
      },
      gridTemplateColumns: {
        search: "1fr 1fr 1fr auto",
        footer: "1.4fr 1fr",
        path: "minmax(0, 1fr) minmax(0, 1.15fr)",
        steps: "56px 1fr",
        gallery: "2fr 1fr",
        detail: "1.4fr 0.8fr",
        /**
         * Search results: listings grow; the map scales with the viewport
         * and caps at 421px on the 1440 frame.
         */
        explorer: "minmax(0, 1fr) min(36vw, 421px)",
      },
      objectPosition: {
        hero: "center 28%",
        skyline: "center 40%",
      },
      boxShadow: {
        card: "0px 4px 4px 0px rgba(0,0,0,0.1)",
        soft: "0px 1px 4px 0px rgba(0,0,0,0.25)",
        subtle: "0px 1px 2px rgba(0,0,0,0.25)",
        tight: "0px 3px 1.5px rgba(0,0,0,0.05)",
        header:
          "0px 4px 4px 0px rgba(0,0,0,0.25), 0px 4px 4px 0px rgba(0,0,0,0.25)",
        modal: "0px 24px 48px rgba(29, 29, 29, 0.18)",
        tab: "0px 0px 34px 0px rgba(0,0,0,0.18)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(90deg, #ff786a 0%, #ff4f37 50%, #ffc331 100%)",
        "stats-gradient":
          "linear-gradient(270deg, rgb(255,219,216) 0%, rgb(255,240,205) 100%)",
        "tile-fade":
          "linear-gradient(180deg, rgba(0,0,0,0) 32%, rgba(0,0,0,0.78) 100%)",
        "destination-fade":
          "linear-gradient(180deg, rgba(0,0,0,0) 30.28%, rgba(0,0,0,1) 100%)",
        "featured-overlay":
          "linear-gradient(180deg, rgba(20,12,10,0.55) 0%, rgba(20,12,10,0.42) 40%, rgba(20,12,10,0.62) 100%)",
        "band-split":
          "linear-gradient(to bottom, var(--neutral-50) 0, var(--neutral-50) 50%, var(--surface) 50%, var(--surface) 100%)",
        "step-gradient":
          "linear-gradient(180deg, #ffc331 0%, #ff4f37 55%, #ff5037 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
