import type { VenueCategory } from "@/types";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/venues", label: "Explore" },
  { href: "/#destinations", label: "Destinations" },
  { href: "/#vendors", label: "Vendors" },
] as const;

export const SEARCH_CITIES = ["Dubai, UAE", "New York, USA", "London, UK"] as const;
export const SEARCH_WHEN = ["Anytime", "This weekend", "This month"] as const;
export const SEARCH_GUESTS = [
  { label: "10-20", value: "10" },
  { label: "1-10", value: "1" },
  { label: "20-50", value: "20" },
  { label: "50+", value: "50" },
] as const;

export const SPACE_TYPES = [
  { label: "All Spaces", category: "all" as const, icon: "/icons/spaces/all.svg" },
  { label: "Photo Studio", category: "studio" as const, icon: "/icons/spaces/photo.svg" },
  { label: "Film Studio", category: "studio" as const, icon: "/icons/spaces/film.svg" },
  { label: "Warehouse", category: "celebration" as const, icon: "/icons/spaces/warehouse.svg" },
  { label: "Gallery", category: "studio" as const, icon: "/icons/spaces/gallery.svg" },
  { label: "Restaurant", category: "celebration" as const, icon: "/icons/spaces/restaurant.svg" },
  { label: "Apartment", category: "private-party" as const, icon: "/icons/spaces/apartment.svg" },
  { label: "Office Space", category: "corporate" as const, icon: "/icons/spaces/office.svg" },
  { label: "Venue", category: "celebration" as const, icon: "/icons/spaces/venue.svg" },
  { label: "Private Party", category: "private-party" as const, icon: "/icons/spaces/party.svg" },
  { label: "Meeting", category: "corporate" as const, icon: "/icons/spaces/meeting.svg" },
];

/* ---------------------------------------------------------------------------
 * Find The Best Venue For Any Occasion
 * ------------------------------------------------------------------------- */

export const CATEGORY_SECTION = {
  title: "Find The Best Venue For Any Occasion",
  copy: "Explore venues by category, from timeless ballrooms and rooftops with a view to modern studios and outdoor gardens, discover spaces designed to inspire unforgettable experiences.",
} as const;

export const CATEGORY_TILES: {
  id: VenueCategory;
  title: string;
  count: string;
  image: string;
}[] = [
  {
    id: "celebration",
    title: "Celebration Venues",
    count: "37 Venues",
    image: "/images/categories/celebration.png",
  },
  {
    id: "private-party",
    title: "Private Party Venues",
    count: "37 Venues",
    image: "/images/categories/private-party.png",
  },
  {
    id: "corporate",
    title: "Corporate Meetings",
    count: "37 Venues",
    image: "/images/categories/corporate.png",
  },
  {
    id: "studio",
    title: "Creative Studios",
    count: "37 Venues",
    image: "/images/categories/studio.png",
  },
];

/* ---------------------------------------------------------------------------
 * Featured Venues — dark band with a category rail
 * ------------------------------------------------------------------------- */

export const FEATURED_TABS = [
  "Rooftop",
  "Gallery",
  "Restaurant",
  "Outdoor",
  "Studio",
  "Terrace",
  "Ballroom",
] as const;

/* ---------------------------------------------------------------------------
 * Complete Your Event with our Trusted Vendors
 * ------------------------------------------------------------------------- */

export const VENDOR_SECTION = {
  title: "Complete Your Event with our Trusted Vendors",
  copy: "Venues are just the beginning. Discover caterers, decorators, photographers, entertainment, and more all in one place, ready to bring your event project to life.",
} as const;

export const VENDOR_CATEGORIES = [
  { title: "Caterers", image: "/images/vendors/caterers.png" },
  { title: "Decorators", image: "/images/vendors/decorators.png" },
  { title: "Photographers", image: "/images/vendors/photographers.png" },
  { title: "Entertainment", image: "/images/vendors/entertainment.png" },
] as const;

/* ---------------------------------------------------------------------------
 * Grow Your Business with Venuze
 * ------------------------------------------------------------------------- */

export const GROW_CTA = {
  title: "Grow Your Business with Venuze",
  copy: "Showcase your services to thousands of event organizers and creators searching for talent like yours.",
  action: "Join as a Vendor",
} as const;

/* ---------------------------------------------------------------------------
 * Your Path to the Perfect Venue
 * ------------------------------------------------------------------------- */

export const PATH_SECTION = {
  title: "Your Path to the Perfect Venue",
  copy: "Planning an event, production, or gathering shouldn’t feel complicated. Our streamlined process connects you with the right venues and trusted professionals, taking the stress out of logistics so you can focus on what matters most making it a success.",
} as const;

export const PATH_STEPS = [
  {
    title: "Search & filter",
    copy: "Browse our curated collection of venues and event professionals. Use smart filters, high-quality visuals, and authentic reviews to find options that fit your needs, style, and budget.",
  },
  {
    title: "Compare & message",
    copy: "Communicate directly with venue hosts and service providers. Request tailored quotes, discuss requirements, and design every detail of your event or project with confidence.",
  },
  {
    title: "Book & add services",
    copy: "Secure your choices with ease through our protected booking system. With clear agreements, secure payments, and ongoing support, you can move forward knowing everything is handled.",
  },
] as const;

export const PATH_COLLAGE = [
  "/images/path/toast.png",
  "/images/path/party.png",
  "/images/path/couple.png",
  "/images/path/hands.png",
] as const;

/* ---------------------------------------------------------------------------
 * Trusted by Event Creators Who Demand Excellence
 * ------------------------------------------------------------------------- */

export const TRUST_SECTION = {
  title: "Trusted by Event Creators Who Demand Excellence",
  copy: "Join thousands of planners and hosts who love our seamless discovery and booking experience.",
} as const;

export const STATS = [
  { value: "1,500+", label: "Venues Vetted & Approved", tone: "coral" },
  { value: "7,500+", label: "Events Successfully Hosted", tone: "brand" },
  { value: "35+", label: "Cities Across the Region", tone: "amber" },
  { value: "4.9★", label: "Average Host Rating", tone: "gold" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Michael Carter",
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: img("photo-1500648767791-00dcc994a43e", 600),
  },
  {
    name: "by Ayesha M.",
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: img("photo-1494790108377-be9c29b29330", 600),
  },
] as const;

/* ---------------------------------------------------------------------------
 * Discover Exceptional Destinations Across the Region
 * ------------------------------------------------------------------------- */

export const DESTINATION_SECTION = {
  title: "Discover Exceptional Destinations Across the Region",
  copy: "From cosmopolitan cityscapes to cultural treasures, explore where celebrations come alive with local flavor.",
} as const;

export const DESTINATIONS = [
  {
    city: "New York, USA",
    query: "New York",
    count: "24 Venues",
    tagline: "Coastal energy, modern Venue",
    popular: "Popular: Rooftop",
    price: "From $50 per hour",
    image: img("photo-1496442226666-8d4d0e62e6e9", 1400),
  },
  {
    city: "London, UK",
    query: "London",
    count: "108 Venues",
    tagline: "Coastal energy, modern Venue",
    popular: "Popular: Rooftop",
    price: "From $25 per hour",
    image: img("photo-1513635269975-59663e0ac1ad", 1400),
  },
  {
    city: "Dubai, UAE",
    query: "Dubai",
    count: "17 Venues",
    tagline: "Coastal energy, modern Venue",
    popular: "Popular: Rooftop",
    price: "From $50 per hour",
    image: img("photo-1512453979798-5ea266f8880c", 1400),
  },
] as const;

/* ---------------------------------------------------------------------------
 * Turn Your Venue into a Destination
 * ------------------------------------------------------------------------- */

export const BOTTOM_CTA = {
  title: "Turn Your Venue into a Destination",
  copy: "List your space on Venuze and unlock new revenue opportunities. Reach clients looking for venues just like yours.",
  action: "List Your Venue",
} as const;

/* ---------------------------------------------------------------------------
 * Footer
 * ------------------------------------------------------------------------- */

export const FOOTER_TAGLINE =
  "Make it memorable—book the perfect venue and the pros who make it shine.";

export const FOOTER_COLUMNS = [
  {
    title: "Venuze",
    links: [
      { label: "About", href: "/" },
      { label: "News", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Investors", href: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Listings your venue", href: "/login" },
      { label: "Listing your service", href: "/login" },
      { label: "Help center", href: "/#footer" },
      { label: "FAQ", href: "/#footer" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Venue types", href: "/venues" },
      { label: "Venue features", href: "/venues" },
      { label: "Service options", href: "/#vendors" },
      { label: "Locations", href: "/#destinations" },
    ],
  },
  {
    title: "Legal & Privacy",
    links: [
      { label: "Terms of service", href: "/" },
      { label: "Payment & refund policy", href: "/" },
      { label: "Host agreement", href: "/" },
      { label: "Vendor agreement", href: "/" },
    ],
  },
] as const;
