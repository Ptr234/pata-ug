export const CATEGORIES = [
  { id: "apartment", label: "Apartment / Flat", icon: "Building2", color: "teal" },
  { id: "standalone", label: "Standalone House", icon: "Home", color: "teal" },
  { id: "townhouse", label: "Townhouse / Maisonette", icon: "Castle", color: "orange" },
  { id: "studio", label: "Studio", icon: "Square", color: "orange" },
  { id: "single-room", label: "Single Room / Bedsitter", icon: "DoorOpen", color: "amber" },
  { id: "shared-house", label: "Room in Shared House", icon: "Users", color: "amber" },
  { id: "servant-quarters", label: "Servant Quarters", icon: "Warehouse", color: "gold" },
  { id: "office", label: "Commercial - Office", icon: "Briefcase", color: "purple" },
  { id: "shop", label: "Commercial - Shop / Retail", icon: "Store", color: "purple" },
  { id: "warehouse", label: "Commercial - Warehouse", icon: "Package", color: "purple" },
  { id: "short-stay", label: "Short Stay / Serviced", icon: "CalendarDays", color: "green" },
  { id: "land", label: "Land / Plot", icon: "Map", color: "green" },
] as const;

/* ── District → Area hierarchy (Uganda-wide) ── */

export const DISTRICTS: Record<string, readonly string[]> = {
  "Kampala": [
    "Bukoto", "Kololo", "Naguru", "Ntinda", "Muyenga",
    "Bugolobi", "Nakasero", "Kamwokya", "Kisaasi", "Makindye",
    "Lubaga", "Wandegeya", "Makerere", "Kisenyi", "Mengo",
  ],
  "Wakiso": [
    "Kyanja", "Kira", "Naalya", "Najjera", "Namugongo",
    "Bweyogerere", "Nansana", "Entebbe", "Kajjansi", "Abayita Ababiri",
    "Kasangati", "Matugga", "Buloba", "Kakiri",
  ],
  "Mukono": [
    "Mukono Town", "Seeta", "Namanve", "Kyaliwajjala", "Goma",
    "Nama", "Nakisunga",
  ],
  "Jinja": [
    "Jinja Town", "Bugembe", "Kakira", "Njeru", "Walukuba",
  ],
  "Mbarara": [
    "Mbarara Town", "Kakoba", "Nyamitanga", "Kamukuzi", "Ruti",
  ],
  "Gulu": [
    "Gulu Town", "Laroo", "Layibi", "Pece", "Bardege",
  ],
  "Mbale": [
    "Mbale Town", "Nakaloke", "Malukhu", "Wanale", "Nkoma",
  ],
  "Fort Portal": [
    "Fort Portal Town", "Njara", "Kabarole", "Rwengaju",
  ],
  "Lira": [
    "Lira Town", "Adyel", "Ojwina", "Railway",
  ],
  "Masaka": [
    "Masaka Town", "Nyendo", "Kimanya", "Katwe",
  ],
} as const;

export const DISTRICT_NAMES = Object.keys(DISTRICTS);

/** Flat list of all areas for backwards compat */
export const ESTATES = Object.values(DISTRICTS).flat();

export const LISTING_STATES = {
  under_review: { label: "Under Review", color: "bg-gray-100 text-gray-700" },
  live: { label: "Live", color: "bg-green-light text-green" },
  expiring: { label: "Expiring", color: "bg-amber-light text-amber" },
  expired: { label: "Expired", color: "bg-red-light text-red" },
  rented: { label: "Rented", color: "bg-blue-100 text-blue-700" },
  flagged: { label: "Flagged", color: "bg-purple-light text-purple" },
} as const;

export const CLIENT_PLANS = [
  {
    name: "Day Pass",
    price: "UGX 20,000",
    duration: "24 hours",
    features: [
      "Request any property directly",
      "pata.ug negotiates on your behalf",
      "GPS coordinates + map",
      "24-hour countdown access",
    ],
    cta: "Buy Day Pass",
    popular: false,
  },
  {
    name: "Annual Subscription",
    price: "UGX 120,000 / year",
    duration: "365 days",
    features: [
      "Unlimited property requests",
      "Priority negotiation support",
      "GPS coordinates + map",
      "Best value - save UGX 40,000+",
    ],
    cta: "Subscribe Now",
    popular: true,
  },
] as const;

export const LANDLORD_PLANS = [
  {
    name: "Pay-Per-Listing",
    price: "UGX 30,000 / house",
    duration: "30 days per listing",
    features: [
      "One listing, live for 30 days",
      "Reactivate at same price",
      "Best for 1-3 properties",
      "No annual commitment",
    ],
    cta: "List a Property",
    popular: false,
  },
  {
    name: "Annual Subscription",
    price: "UGX 120,000 / year",
    duration: "Full year",
    features: [
      "Unlimited listings",
      "All listings live for full year",
      "No reactivation fees",
      "Best for 4+ properties",
    ],
    cta: "Subscribe Now",
    popular: true,
  },
] as const;

export const COMMISSION_TIERS = [
  { rent: 500_000, commission: 25_000, net: 475_000 },
  { rent: 800_000, commission: 40_000, net: 760_000 },
  { rent: 1_500_000, commission: 75_000, net: 1_425_000 },
  { rent: 2_500_000, commission: 125_000, net: 2_375_000 },
  { rent: 5_000_000, commission: 250_000, net: 4_750_000 },
] as const;

export const NAV_LINKS = [
  { label: "Browse", href: "/search" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
] as const;

export const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Verified", href: "/verified" },
  { label: "Contact", href: "/contact" },
] as const;
