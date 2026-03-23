export const CATEGORIES = [
  { id: "apartment", label: "Apartment / Flat", icon: "Building2", color: "teal", group: "residential" },
  { id: "standalone", label: "Standalone House", icon: "Home", color: "teal", group: "residential" },
  { id: "townhouse", label: "Townhouse / Maisonette", icon: "Castle", color: "orange", group: "residential" },
  { id: "duplex", label: "Duplex", icon: "Layers", color: "orange", group: "residential" },
  { id: "studio", label: "Studio", icon: "Square", color: "orange", group: "residential" },
  { id: "serviced-apartment", label: "Serviced Apartment", icon: "Star", color: "teal", group: "residential" },
  { id: "single-room", label: "Single Room / Bedsitter", icon: "DoorOpen", color: "amber", group: "residential" },
  { id: "shared-house", label: "Room in Shared House", icon: "Users", color: "amber", group: "residential" },
  { id: "servant-quarters", label: "Servant Quarters", icon: "Warehouse", color: "gold", group: "residential" },
  { id: "office", label: "Office Space", icon: "Briefcase", color: "purple", group: "commercial" },
  { id: "shop", label: "Shop / Retail", icon: "Store", color: "purple", group: "commercial" },
  { id: "warehouse", label: "Warehouse / Storage", icon: "Package", color: "purple", group: "commercial" },
  { id: "short-stay", label: "Short Stay / Serviced", icon: "CalendarDays", color: "green", group: "residential" },
  { id: "land", label: "Land / Plot", icon: "Map", color: "green", group: "commercial" },
] as const;

export const CATEGORY_GROUPS = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
] as const;

export const LIFESTYLE_TAGS = [
  { id: "family-friendly", label: "Family-Friendly", icon: "Users", color: "teal" },
  { id: "bachelor-pad", label: "Bachelor Pad", icon: "User", color: "orange" },
  { id: "student-friendly", label: "Student-Friendly", icon: "GraduationCap", color: "amber" },
  { id: "luxury", label: "Luxury", icon: "Crown", color: "gold" },
  { id: "budget", label: "Budget", icon: "Wallet", color: "green" },
  { id: "pet-friendly", label: "Pet-Friendly", icon: "Dog", color: "teal" },
  { id: "gated-community", label: "Gated Community", icon: "Shield", color: "navy" },
] as const;

export const PAYMENT_TERMS = [
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "6-months", label: "6 Months" },
  { id: "annual", label: "Annual" },
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
      "Full contact details on deal closure",
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
      "Full contact details on deal closure",
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

export const AGENCY_FEE_TIERS = [
  { rent: 500_000, agencyFee: 25_000, net: 475_000 },
  { rent: 800_000, agencyFee: 40_000, net: 760_000 },
  { rent: 1_500_000, agencyFee: 75_000, net: 1_425_000 },
  { rent: 2_500_000, agencyFee: 125_000, net: 2_375_000 },
  { rent: 5_000_000, agencyFee: 250_000, net: 4_750_000 },
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
