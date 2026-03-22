// ---------------------------------------------------------------------------
// pata.ug – Mock data for the Uganda rental‑property marketplace
// ---------------------------------------------------------------------------

// ---- Types ----------------------------------------------------------------

export type PropertyCategory =
  | "apartment"
  | "standalone"
  | "studio"
  | "single-room"
  | "townhouse"
  | "duplex"
  | "serviced-apartment"
  | "office"
  | "shop"
  | "warehouse"
  | "shared-house"
  | "servant-quarters"
  | "short-stay"
  | "land";

export type PropertyStatus = "available" | "occupied" | "reserved";

export type ListingType = "for-rent" | "short-stay";

export type PaymentTerm = "monthly" | "quarterly" | "6-months" | "annual";

export type LifestyleTag =
  | "family-friendly"
  | "bachelor-pad"
  | "student-friendly"
  | "luxury"
  | "budget"
  | "pet-friendly"
  | "gated-community";

export interface PropertyLocation {
  region: string;
  district: string;
  county: string;
  subcounty: string;
  parish: string;
  village: string;
}

export type FenceType = "wall" | "live" | "chain-link" | "no-gate" | "none";

export type KitchenType = "modern-open" | "modern-closed" | "basic" | "kitchenette" | "none";
export type FlooringType = "tiles" | "marble" | "terrazzo" | "cement" | "wood" | "vinyl";
export type ElectricityType = "prepaid-yaka" | "postpaid" | "solar" | "generator-backup";
export type WaterSource = "nwsc" | "borehole" | "rainwater" | "tank" | "well";
export type GateType = "automatic" | "manual" | "sliding" | "none";

export interface InteriorFeatures {
  builtInWardrobes: boolean;
  kitchenType: KitchenType;
  flooringType: FlooringType;
  waterAvailability: "24/7" | "scheduled" | "unreliable";
  powerReliability: "reliable" | "frequent-outages" | "backup-available";
}

export interface ExteriorFeatures {
  parkingSpaces: number;
  garden: boolean;
  compound: boolean;
  gateType: GateType;
}

export interface Utilities {
  electricityType: ElectricityType;
  waterSource: WaterSource;
  internetAvailable: boolean;
  garbageCollection: boolean;
}

export interface SecurityFeatures {
  securityGuards: boolean;
  cctv: boolean;
  gatedCommunity: boolean;
  perimeterWall: boolean;
  alarmSystem: boolean;
}

export interface AdditionalAmenities {
  swimmingPool: boolean;
  gym: boolean;
  balcony: boolean;
  airConditioning: boolean;
  servantQuarters: boolean;
  laundryArea: boolean;
}

export interface NearbyPlace {
  name: string;
  type: "school" | "hospital" | "supermarket" | "road" | "mall" | "restaurant" | "bank" | "church" | "mosque";
  distance: string; // e.g. "500m", "1.2km"
}

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  listingType: ListingType;
  district: string;
  estate: string;
  loc: PropertyLocation;
  locationDesc: string;
  price: number;
  paymentTerms: PaymentTerm[];
  agencyFee: number;
  securityDeposit: number;
  bedrooms: number;
  bathrooms: number;
  floorLevel?: string;
  sizeSqm?: number;
  yearBuilt?: number;
  photos: string[];
  videoUrl?: string;
  description: string;
  isVerified: boolean;
  isFeatured: boolean;
  negotiable: boolean;
  upfrontMonths: number;
  fencing: FenceType[];
  status: PropertyStatus;
  availableFrom: string;
  furnished: boolean;
  parking: boolean;
  petFriendly: boolean;
  lifestyleTags: LifestyleTag[];
  interior: InteriorFeatures;
  exterior: ExteriorFeatures;
  utilities: Utilities;
  security: SecurityFeatures;
  amenities: AdditionalAmenities;
  nearbyPlaces: NearbyPlace[];
  contactPhone: string;
  whatsappPhone: string;
  landlordName: string;
  agencyName?: string;
  viewCount: number;
  createdAt: string;
  location: { lat: number; lng: number };
}

export type NotificationChannel = "sms" | "email" | "in-app" | "whatsapp";

export interface Notification {
  id: string;
  message: string;
  channel: NotificationChannel;
  when: string; // ISO date‑time
  read: boolean;
}

export type DealStatus =
  | "pending"           // tenant requested
  | "negotiating"       // admin mediating via chat
  | "agreed"            // terms agreed — payment links sent
  | "payment_confirmed" // both payments received
  | "closed"            // both clicked Close Deal — contacts shared
  | "awaiting_landlord" // legacy compat
  | "confirmed"         // legacy compat
  | "commission_paid";  // legacy compat

export interface Deal {
  id: string;
  propertyTitle: string;
  estate: string;
  agreedRent: number;       // agreed monthly rent in UGX
  upfrontMonths: number;    // months of rent paid upfront
  securityDeposit: number;  // refundable security deposit in UGX
  status: DealStatus;
  date: string;
}

// ---- Helper ---------------------------------------------------------------

/* Category-to-folder mapping for local property images */
const CATEGORY_IMAGE_MAP: Record<string, { folder: string; prefix: string }> = {
  apartment: { folder: "apartments", prefix: "apartment" },
  standalone: { folder: "houses", prefix: "house" },
  townhouse: { folder: "houses", prefix: "house" },
  duplex: { folder: "houses", prefix: "house" },
  studio: { folder: "studios", prefix: "studio" },
  "single-room": { folder: "rooms", prefix: "room" },
  "shared-house": { folder: "rooms", prefix: "room" },
  "servant-quarters": { folder: "rooms", prefix: "room" },
  "serviced-apartment": { folder: "apartments", prefix: "apartment" },
  office: { folder: "commercial", prefix: "commercial" },
  shop: { folder: "commercial", prefix: "commercial" },
  warehouse: { folder: "commercial", prefix: "commercial" },
  "short-stay": { folder: "studios", prefix: "studio" },
  land: { folder: "houses", prefix: "house" },
};

function categoryPhotos(category: string, indices: number[]): string[] {
  const mapping = CATEGORY_IMAGE_MAP[category] ?? { folder: "houses", prefix: "house" };
  return indices.map(
    (i) => `/property_images/${mapping.folder}/${mapping.prefix}_${i}.jpg`
  );
}

// ---- Properties -----------------------------------------------------------

export const properties: Property[] = [
  {
    id: "prop-001",
    title: "Modern 2‑Bedroom Apartment in Bukoto",
    category: "apartment",
    listingType: "for-rent",
    district: "Kampala",
    estate: "Bukoto",
    loc: { region: "Central", district: "Kampala", county: "Kampala Central Division", subcounty: "Nakasero", parish: "Bukoto", village: "Bukoto I" },
    locationDesc: "Off Bukoto Street, behind Shell petrol station. Blue gate, 3rd floor.",
    price: 1_800_000,
    paymentTerms: ["monthly", "quarterly"],
    agencyFee: 0,
    bedrooms: 2,
    bathrooms: 1,
    floorLevel: "3rd",
    sizeSqm: 85,
    photos: categoryPhotos("apartment", [1, 2, 3]),
    description:
      "Spacious 2‑bedroom apartment on a quiet street in Bukoto. Tiled floors, modern kitchen with granite countertops, and a private balcony overlooking the neighbourhood. 24‑hour security and ample water supply.",
    isVerified: true,
    isFeatured: true,
    negotiable: true,
    upfrontMonths: 3,
    securityDeposit: 500000,
    fencing: ["wall"],
    status: "available",
    availableFrom: "2026-04-01",
    furnished: false,
    parking: true,
    petFriendly: false,
    lifestyleTags: ["family-friendly"],
    interior: { builtInWardrobes: true, kitchenType: "modern-open", flooringType: "tiles", waterAvailability: "24/7", powerReliability: "reliable" },
    exterior: { parkingSpaces: 1, garden: false, compound: true, gateType: "manual" },
    utilities: { electricityType: "prepaid-yaka", waterSource: "nwsc", internetAvailable: true, garbageCollection: true },
    security: { securityGuards: true, cctv: false, gatedCommunity: false, perimeterWall: true, alarmSystem: false },
    amenities: { swimmingPool: false, gym: false, balcony: true, airConditioning: false, servantQuarters: false, laundryArea: false },
    nearbyPlaces: [
      { name: "Bukoto Market", type: "supermarket", distance: "300m" },
      { name: "Kampala Parents School", type: "school", distance: "800m" },
      { name: "Shell Bukoto", type: "supermarket", distance: "100m" },
    ],
    contactPhone: "+256700100100",
    whatsappPhone: "+256700100100",
    landlordName: "James Mukasa",
    viewCount: 234,
    createdAt: "2026-03-10T08:30:00Z",
    location: { lat: 0.3476, lng: 32.5953 },
  },
  {
    id: "prop-002",
    title: "Luxury 3‑Bedroom Standalone in Kololo",
    category: "standalone",
    listingType: "for-rent",
    district: "Kampala",
    estate: "Kololo",
    loc: { region: "Central", district: "Kampala", county: "Kampala Central Division", subcounty: "Kololo", parish: "Kololo I", village: "Kololo Hill" },
    locationDesc: "Kololo Hill Drive, past the Italian Embassy. White perimeter wall, security booth at entrance.",
    price: 5_000_000,
    paymentTerms: ["monthly", "quarterly", "6-months", "annual"],
    agencyFee: 0,
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 220,
    yearBuilt: 2020,
    photos: categoryPhotos("standalone", [1, 2, 3, 4]),
    description:
      "Executive standalone house in the prestigious Kololo hill area. Master en‑suite, large living room, mature garden with fruit trees, boys' quarters, and a double garage. Walking distance to international schools and embassies.",
    isVerified: true,
    isFeatured: true,
    negotiable: false,
    upfrontMonths: 2,
    securityDeposit: 2000000,
    fencing: ["wall"],
    status: "available",
    availableFrom: "2026-04-15",
    furnished: true,
    parking: true,
    petFriendly: true,
    lifestyleTags: ["luxury", "family-friendly", "gated-community"],
    interior: { builtInWardrobes: true, kitchenType: "modern-open", flooringType: "marble", waterAvailability: "24/7", powerReliability: "backup-available" },
    exterior: { parkingSpaces: 3, garden: true, compound: true, gateType: "automatic" },
    utilities: { electricityType: "prepaid-yaka", waterSource: "nwsc", internetAvailable: true, garbageCollection: true },
    security: { securityGuards: true, cctv: true, gatedCommunity: true, perimeterWall: true, alarmSystem: true },
    amenities: { swimmingPool: true, gym: false, balcony: true, airConditioning: true, servantQuarters: true, laundryArea: true },
    nearbyPlaces: [
      { name: "Kampala International School", type: "school", distance: "500m" },
      { name: "Italian Embassy", type: "mall", distance: "200m" },
      { name: "Acacia Mall", type: "mall", distance: "1.5km" },
      { name: "Kololo Hospital", type: "hospital", distance: "800m" },
    ],
    contactPhone: "+256772200200",
    whatsappPhone: "+256772200200",
    landlordName: "Grace Namutebi",
    agencyName: "Kololo Premium Estates",
    viewCount: 567,
    createdAt: "2026-03-05T14:00:00Z",
    location: { lat: 0.3301, lng: 32.5849 },
  },
  {
    id: "prop-003",
    title: "Cosy Studio in Naguru",
    category: "studio",
    listingType: "for-rent",
    district: "Kampala",
    estate: "Naguru",
    loc: { region: "Central", district: "Kampala", county: "Nakawa Division", subcounty: "Naguru I", parish: "Naguru", village: "Naguru Go Down" },
    locationDesc: "Near Naguru Go-Down, off Old Port Bell Road. Green gate on the left.",
    price: 800_000,
    paymentTerms: ["monthly"],
    agencyFee: 0,
    bedrooms: 0,
    bathrooms: 1,
    floorLevel: "Ground",
    sizeSqm: 30,
    photos: categoryPhotos("studio", [1, 2]),
    description:
      "Bright studio apartment ideal for a young professional. Open‑plan living and sleeping area, kitchenette with gas cooker, tiled bathroom, and shared compound parking. Close to Naguru Go‑Down arts centre.",
    isVerified: true,
    isFeatured: false,
    negotiable: true,
    upfrontMonths: 1,
    securityDeposit: 300000,
    fencing: ["chain-link"],
    status: "available",
    availableFrom: "2026-03-25",
    furnished: true,
    parking: false,
    petFriendly: false,
    lifestyleTags: ["bachelor-pad", "budget"],
    interior: { builtInWardrobes: false, kitchenType: "kitchenette", flooringType: "tiles", waterAvailability: "24/7", powerReliability: "reliable" },
    exterior: { parkingSpaces: 0, garden: false, compound: true, gateType: "manual" },
    utilities: { electricityType: "prepaid-yaka", waterSource: "nwsc", internetAvailable: false, garbageCollection: true },
    security: { securityGuards: false, cctv: false, gatedCommunity: false, perimeterWall: false, alarmSystem: false },
    amenities: { swimmingPool: false, gym: false, balcony: false, airConditioning: false, servantQuarters: false, laundryArea: false },
    nearbyPlaces: [
      { name: "Naguru Go-Down Arts Centre", type: "mall", distance: "200m" },
      { name: "Old Port Bell Road", type: "road", distance: "100m" },
    ],
    contactPhone: "+256701300300",
    whatsappPhone: "+256701300300",
    landlordName: "Peter Ochieng",
    viewCount: 189,
    createdAt: "2026-03-15T09:45:00Z",
    location: { lat: 0.3342, lng: 32.6025 },
  },
  {
    id: "prop-004",
    title: "Affordable Single Room in Ntinda",
    category: "single-room",
    listingType: "for-rent",
    district: "Kampala",
    estate: "Ntinda",
    loc: { region: "Central", district: "Kampala", county: "Nakawa Division", subcounty: "Ntinda", parish: "Ntinda Trading Centre", village: "Ntinda" },
    locationDesc: "Ntinda Trading Centre, behind Total petrol station. Rental block with yellow signboard.",
    price: 350_000,
    paymentTerms: ["monthly"],
    agencyFee: 0,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: 18,
    photos: categoryPhotos("single-room", [1, 2]),
    description:
      "Self‑contained single room in a well‑maintained rental block in Ntinda Trading Centre. Shared compound, reliable water, and prepaid electricity meter. Perfect for students and young workers.",
    isVerified: false,
    isFeatured: false,
    negotiable: true,
    upfrontMonths: 2,
    securityDeposit: 200000,
    fencing: ["none"],
    status: "available",
    availableFrom: "2026-04-01",
    furnished: false,
    parking: false,
    petFriendly: false,
    lifestyleTags: ["student-friendly", "budget"],
    interior: { builtInWardrobes: false, kitchenType: "none", flooringType: "cement", waterAvailability: "scheduled", powerReliability: "frequent-outages" },
    exterior: { parkingSpaces: 0, garden: false, compound: true, gateType: "none" },
    utilities: { electricityType: "prepaid-yaka", waterSource: "nwsc", internetAvailable: false, garbageCollection: false },
    security: { securityGuards: false, cctv: false, gatedCommunity: false, perimeterWall: false, alarmSystem: false },
    amenities: { swimmingPool: false, gym: false, balcony: false, airConditioning: false, servantQuarters: false, laundryArea: false },
    nearbyPlaces: [
      { name: "Ntinda Trading Centre", type: "supermarket", distance: "50m" },
      { name: "Total Petrol Station", type: "supermarket", distance: "100m" },
    ],
    contactPhone: "+256753400400",
    whatsappPhone: "+256753400400",
    landlordName: "Fatuma Nabirye",
    viewCount: 78,
    createdAt: "2026-03-12T17:20:00Z",
    location: { lat: 0.3541, lng: 32.6137 },
  },
  {
    id: "prop-005",
    title: "Hillside 3‑Bedroom Townhouse in Muyenga",
    category: "townhouse",
    listingType: "for-rent",
    district: "Kampala",
    estate: "Muyenga",
    loc: { region: "Central", district: "Kampala", county: "Makindye Division", subcounty: "Muyenga", parish: "Muyenga I", village: "Tank Hill" },
    locationDesc: "Tank Hill Road, Muyenga. Gated estate with Lake Victoria views. Ask for gate 3.",
    price: 3_500_000,
    paymentTerms: ["monthly", "quarterly", "6-months"],
    agencyFee: 0,
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 180,
    yearBuilt: 2022,
    photos: categoryPhotos("townhouse", [5, 6, 7, 8]),
    description:
      "Semi‑detached townhouse perched on Muyenga hill with sweeping views of Lake Victoria. All bedrooms en‑suite, modern finishes, private garden, covered parking for two cars, and 24‑hour security gate.",
    isVerified: true,
    isFeatured: true,
    negotiable: false,
    upfrontMonths: 3,
    securityDeposit: 1500000,
    fencing: ["wall", "live"],
    status: "reserved",
    availableFrom: "2026-05-01",
    furnished: false,
    parking: true,
    petFriendly: true,
    lifestyleTags: ["luxury", "family-friendly", "gated-community", "pet-friendly"],
    interior: { builtInWardrobes: true, kitchenType: "modern-open", flooringType: "tiles", waterAvailability: "24/7", powerReliability: "backup-available" },
    exterior: { parkingSpaces: 2, garden: true, compound: true, gateType: "automatic" },
    utilities: { electricityType: "prepaid-yaka", waterSource: "nwsc", internetAvailable: true, garbageCollection: true },
    security: { securityGuards: true, cctv: true, gatedCommunity: true, perimeterWall: true, alarmSystem: false },
    amenities: { swimmingPool: false, gym: false, balcony: true, airConditioning: false, servantQuarters: false, laundryArea: true },
    nearbyPlaces: [
      { name: "International School of Uganda", type: "school", distance: "1km" },
      { name: "Muyenga Supermarket", type: "supermarket", distance: "400m" },
      { name: "Tank Hill Road", type: "road", distance: "50m" },
      { name: "IHK Hospital", type: "hospital", distance: "2km" },
    ],
    contactPhone: "+256700500500",
    whatsappPhone: "+256700500500",
    landlordName: "Richard Ssentamu",
    agencyName: "Muyenga Hill Properties",
    viewCount: 412,
    createdAt: "2026-02-28T11:00:00Z",
    location: { lat: 0.3012, lng: 32.6001 },
  },
  {
    id: "prop-006",
    title: "Executive Office Space in Nakasero",
    category: "office",
    listingType: "for-rent",
    district: "Kampala",
    estate: "Nakasero",
    loc: { region: "Central", district: "Kampala", county: "Kampala Central Division", subcounty: "Nakasero", parish: "Nakasero", village: "Nakasero Road" },
    locationDesc: "Nakasero Road, opposite Acacia Mall. Ground floor, glass entrance.",
    price: 4_500_000,
    paymentTerms: ["monthly", "quarterly", "annual"],
    agencyFee: 0,
    bedrooms: 0,
    bathrooms: 2,
    floorLevel: "Ground",
    sizeSqm: 80,
    photos: categoryPhotos("office", [1, 2, 3]),
    description:
      "Prime ground‑floor office space on Nakasero Road. 80 sqm open plan with a partitioned manager's office, reception area, staff kitchen, and two washrooms. Fibre internet ready, backup generator, and dedicated parking.",
    isVerified: true,
    isFeatured: false,
    negotiable: true,
    upfrontMonths: 6,
    securityDeposit: 2000000,
    fencing: ["wall"],
    status: "available",
    availableFrom: "2026-04-01",
    furnished: false,
    parking: true,
    petFriendly: false,
    lifestyleTags: [],
    interior: { builtInWardrobes: false, kitchenType: "basic", flooringType: "tiles", waterAvailability: "24/7", powerReliability: "backup-available" },
    exterior: { parkingSpaces: 4, garden: false, compound: false, gateType: "automatic" },
    utilities: { electricityType: "postpaid", waterSource: "nwsc", internetAvailable: true, garbageCollection: true },
    security: { securityGuards: true, cctv: true, gatedCommunity: false, perimeterWall: true, alarmSystem: true },
    amenities: { swimmingPool: false, gym: false, balcony: false, airConditioning: true, servantQuarters: false, laundryArea: false },
    nearbyPlaces: [
      { name: "Acacia Mall", type: "mall", distance: "100m" },
      { name: "Stanbic Bank HQ", type: "bank", distance: "300m" },
      { name: "Nakasero Hospital", type: "hospital", distance: "500m" },
    ],
    contactPhone: "+256782600600",
    whatsappPhone: "+256782600600",
    landlordName: "Kampala Commercial Properties Ltd",
    agencyName: "Kampala Commercial Properties Ltd",
    viewCount: 345,
    createdAt: "2026-03-01T10:15:00Z",
    location: { lat: 0.3163, lng: 32.5822 },
  },
  {
    id: "prop-007",
    title: "2‑Bedroom Apartment in Bugolobi",
    category: "apartment",
    listingType: "for-rent",
    district: "Kampala",
    estate: "Bugolobi",
    loc: { region: "Central", district: "Kampala", county: "Nakawa Division", subcounty: "Bugolobi", parish: "Bugolobi", village: "Bugolobi Flats" },
    locationDesc: "Bugolobi Flats area, near Game supermarket. Gated compound, blue roof houses.",
    price: 2_000_000,
    paymentTerms: ["monthly", "quarterly"],
    agencyFee: 0,
    bedrooms: 2,
    bathrooms: 2,
    floorLevel: "2nd",
    sizeSqm: 95,
    yearBuilt: 2019,
    photos: categoryPhotos("apartment", [4, 5, 6]),
    description:
      "Well‑finished apartment in a gated compound in Bugolobi flats area. Master en‑suite, spacious lounge, fitted kitchen, water heater in both bathrooms, and a large balcony. Walking distance to Game and Bugolobi Market.",
    isVerified: true,
    isFeatured: false,
    negotiable: false,
    upfrontMonths: 3,
    securityDeposit: 800000,
    fencing: ["wall"],
    status: "available",
    availableFrom: "2026-04-10",
    furnished: false,
    parking: true,
    petFriendly: false,
    lifestyleTags: ["family-friendly"],
    interior: { builtInWardrobes: true, kitchenType: "modern-closed", flooringType: "tiles", waterAvailability: "24/7", powerReliability: "reliable" },
    exterior: { parkingSpaces: 1, garden: false, compound: true, gateType: "manual" },
    utilities: { electricityType: "prepaid-yaka", waterSource: "nwsc", internetAvailable: true, garbageCollection: true },
    security: { securityGuards: true, cctv: false, gatedCommunity: true, perimeterWall: true, alarmSystem: false },
    amenities: { swimmingPool: false, gym: false, balcony: true, airConditioning: false, servantQuarters: false, laundryArea: false },
    nearbyPlaces: [
      { name: "Game Stores Bugolobi", type: "supermarket", distance: "400m" },
      { name: "Bugolobi Market", type: "supermarket", distance: "600m" },
      { name: "Luzira Road", type: "road", distance: "200m" },
    ],
    contactPhone: "+256774700700",
    whatsappPhone: "+256774700700",
    landlordName: "Dorothy Akello",
    viewCount: 198,
    createdAt: "2026-03-08T13:30:00Z",
    location: { lat: 0.3158, lng: 32.6105 },
  },
  {
    id: "prop-008",
    title: "Budget Single Room in Kisaasi",
    category: "single-room",
    listingType: "for-rent",
    district: "Kampala",
    estate: "Kisaasi",
    loc: { region: "Central", district: "Kampala", county: "Kawempe Division", subcounty: "Kisaasi", parish: "Kisaasi", village: "Kisaasi-Bahai" },
    locationDesc: "Off Kisaasi-Bahai Road, near the mosque. Brown rental block, ask for Room 4.",
    price: 300_000,
    paymentTerms: ["monthly"],
    agencyFee: 0,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: 15,
    photos: categoryPhotos("single-room", [3, 4]),
    description:
      "Clean self‑contained single room off Kisaasi‑Bahai Road. Inside toilet and bathroom, cemented floor, security lights in the compound, and nearby boda‑boda stage for easy transport to the city centre.",
    isVerified: false,
    isFeatured: false,
    negotiable: true,
    upfrontMonths: 2,
    securityDeposit: 150000,
    fencing: ["no-gate"],
    status: "available",
    availableFrom: "2026-03-28",
    furnished: false,
    parking: false,
    petFriendly: false,
    lifestyleTags: ["student-friendly", "budget"],
    interior: { builtInWardrobes: false, kitchenType: "none", flooringType: "cement", waterAvailability: "scheduled", powerReliability: "frequent-outages" },
    exterior: { parkingSpaces: 0, garden: false, compound: true, gateType: "none" },
    utilities: { electricityType: "prepaid-yaka", waterSource: "nwsc", internetAvailable: false, garbageCollection: false },
    security: { securityGuards: false, cctv: false, gatedCommunity: false, perimeterWall: false, alarmSystem: false },
    amenities: { swimmingPool: false, gym: false, balcony: false, airConditioning: false, servantQuarters: false, laundryArea: false },
    nearbyPlaces: [
      { name: "Kisaasi Mosque", type: "mosque", distance: "100m" },
      { name: "Boda Stage", type: "road", distance: "50m" },
    ],
    contactPhone: "+256709800800",
    whatsappPhone: "+256709800800",
    landlordName: "Moses Ssempijja",
    viewCount: 45,
    createdAt: "2026-03-18T07:00:00Z",
    location: { lat: 0.3697, lng: 32.5984 },
  },
  {
    id: "prop-009",
    title: "New 4‑Bedroom Duplex in Kyanja",
    category: "duplex",
    listingType: "for-rent",
    district: "Wakiso",
    estate: "Kyanja",
    loc: { region: "Central", district: "Wakiso", county: "Kyadondo County", subcounty: "Nakwero", parish: "Kyanja", village: "Kyanja Estate" },
    locationDesc: "Kyanja Ring Road estate, turn right after Kyanja Market. New buildings on tarmac road.",
    price: 2_500_000,
    paymentTerms: ["monthly", "quarterly", "6-months"],
    agencyFee: 0,
    bedrooms: 4,
    bathrooms: 3,
    sizeSqm: 200,
    yearBuilt: 2025,
    photos: categoryPhotos("standalone", [5, 6, 7, 8]),
    description:
      "Brand new duplex in a developing estate in Kyanja. Ground floor features living room, dining area, guest bedroom and washroom; upper floor has three bedrooms (master en‑suite), store room, and balcony. Tarmac access road.",
    isVerified: true,
    isFeatured: false,
    negotiable: false,
    upfrontMonths: 3,
    securityDeposit: 1000000,
    fencing: ["wall", "chain-link"],
    status: "available",
    availableFrom: "2026-04-15",
    furnished: false,
    parking: true,
    petFriendly: true,
    lifestyleTags: ["family-friendly", "pet-friendly"],
    interior: { builtInWardrobes: true, kitchenType: "modern-closed", flooringType: "tiles", waterAvailability: "24/7", powerReliability: "reliable" },
    exterior: { parkingSpaces: 2, garden: true, compound: true, gateType: "manual" },
    utilities: { electricityType: "prepaid-yaka", waterSource: "borehole", internetAvailable: true, garbageCollection: true },
    security: { securityGuards: false, cctv: false, gatedCommunity: false, perimeterWall: true, alarmSystem: false },
    amenities: { swimmingPool: false, gym: false, balcony: true, airConditioning: false, servantQuarters: true, laundryArea: true },
    nearbyPlaces: [
      { name: "Kyanja Market", type: "supermarket", distance: "300m" },
      { name: "Kyanja Primary School", type: "school", distance: "500m" },
      { name: "Northern Bypass", type: "road", distance: "1km" },
    ],
    contactPhone: "+256700900900",
    whatsappPhone: "+256700900900",
    landlordName: "Herbert Kiggundu",
    viewCount: 312,
    createdAt: "2026-03-02T16:45:00Z",
    location: { lat: 0.3724, lng: 32.6098 },
  },
  {
    id: "prop-010",
    title: "Furnished 1‑Bedroom in Kira",
    category: "serviced-apartment",
    listingType: "short-stay",
    district: "Wakiso",
    estate: "Kira",
    loc: { region: "Central", district: "Wakiso", county: "Kyadondo County", subcounty: "Kira Town Council", parish: "Kira", village: "Kira Road" },
    locationDesc: "Kira Road near Kampala boundary. Apartment block with MTN mast nearby.",
    price: 1_200_000,
    paymentTerms: ["monthly", "quarterly"],
    agencyFee: 0,
    bedrooms: 1,
    bathrooms: 1,
    floorLevel: "1st",
    sizeSqm: 45,
    photos: categoryPhotos("apartment", [7, 8, 9]),
    description:
      "Fully furnished one‑bedroom apartment in Kira near Kampala. Comes with a queen bed, wardrobe, sofa set, TV, gas cooker, and utensils. Ideal for expats or short‑stay tenants. Water tank and prepaid meter.",
    isVerified: true,
    isFeatured: false,
    negotiable: true,
    upfrontMonths: 1,
    securityDeposit: 500000,
    fencing: ["live"],
    status: "occupied",
    availableFrom: "2026-06-01",
    furnished: true,
    parking: true,
    petFriendly: false,
    lifestyleTags: ["bachelor-pad"],
    interior: { builtInWardrobes: true, kitchenType: "modern-closed", flooringType: "tiles", waterAvailability: "24/7", powerReliability: "reliable" },
    exterior: { parkingSpaces: 1, garden: false, compound: true, gateType: "manual" },
    utilities: { electricityType: "prepaid-yaka", waterSource: "tank", internetAvailable: true, garbageCollection: true },
    security: { securityGuards: true, cctv: false, gatedCommunity: false, perimeterWall: false, alarmSystem: false },
    amenities: { swimmingPool: false, gym: false, balcony: false, airConditioning: false, servantQuarters: false, laundryArea: false },
    nearbyPlaces: [
      { name: "Kira Road Junction", type: "road", distance: "200m" },
      { name: "MTN Mast", type: "road", distance: "50m" },
    ],
    contactPhone: "+256771010101",
    whatsappPhone: "+256771010101",
    landlordName: "Sylvia Namubiru",
    viewCount: 156,
    createdAt: "2026-02-20T12:00:00Z",
    location: { lat: 0.3795, lng: 32.6302 },
  },
  {
    id: "prop-011",
    title: "3‑Bedroom Bungalow in Naalya",
    category: "standalone",
    listingType: "for-rent",
    district: "Wakiso",
    estate: "Naalya",
    loc: { region: "Central", district: "Wakiso", county: "Kyadondo County", subcounty: "Kira Town Council", parish: "Naalya", village: "Naalya Estate" },
    locationDesc: "Naalya Housing Estate, off Northern Bypass. Gate with Naalya signboard.",
    price: 1_500_000,
    paymentTerms: ["monthly", "quarterly"],
    agencyFee: 0,
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 140,
    photos: categoryPhotos("standalone", [9, 10, 11]),
    description:
      "Neat bungalow in a gated estate in Naalya. Three bedrooms (master en‑suite), sit‑in kitchen, servants' quarters, small garden, and shared borehole water. Close to Naalya Housing Estate market and schools.",
    isVerified: false,
    isFeatured: false,
    negotiable: true,
    upfrontMonths: 2,
    securityDeposit: 600000,
    fencing: ["chain-link"],
    status: "available",
    availableFrom: "2026-04-05",
    furnished: false,
    parking: true,
    petFriendly: true,
    lifestyleTags: ["family-friendly", "pet-friendly", "gated-community"],
    interior: { builtInWardrobes: true, kitchenType: "modern-closed", flooringType: "tiles", waterAvailability: "24/7", powerReliability: "reliable" },
    exterior: { parkingSpaces: 2, garden: true, compound: true, gateType: "manual" },
    utilities: { electricityType: "prepaid-yaka", waterSource: "borehole", internetAvailable: false, garbageCollection: true },
    security: { securityGuards: true, cctv: false, gatedCommunity: true, perimeterWall: false, alarmSystem: false },
    amenities: { swimmingPool: false, gym: false, balcony: false, airConditioning: false, servantQuarters: true, laundryArea: true },
    nearbyPlaces: [
      { name: "Naalya Estate Market", type: "supermarket", distance: "200m" },
      { name: "Naalya Primary School", type: "school", distance: "300m" },
      { name: "Northern Bypass", type: "road", distance: "800m" },
      { name: "Ntinda Hospital", type: "hospital", distance: "3km" },
    ],
    contactPhone: "+256752111111",
    whatsappPhone: "+256752111111",
    landlordName: "Charles Lwanga",
    viewCount: 89,
    createdAt: "2026-03-14T10:30:00Z",
    location: { lat: 0.3688, lng: 32.6445 },
  },
  {
    id: "prop-012",
    title: "Lakeside 2‑Bedroom Apartment in Entebbe",
    category: "apartment",
    listingType: "for-rent",
    district: "Wakiso",
    estate: "Entebbe",
    loc: { region: "Central", district: "Wakiso", county: "Busiro County", subcounty: "Entebbe Municipality", parish: "Entebbe", village: "Entebbe Lakefront" },
    locationDesc: "Near Entebbe Lakefront, off Airport Road. Tropical compound with palm trees.",
    price: 2_200_000,
    paymentTerms: ["monthly", "quarterly", "6-months"],
    agencyFee: 0,
    bedrooms: 2,
    bathrooms: 1,
    floorLevel: "1st",
    sizeSqm: 90,
    yearBuilt: 2021,
    photos: categoryPhotos("apartment", [10, 11, 12, 13]),
    description:
      "Charming apartment minutes from the Entebbe lakefront. Tiled floors, spacious rooms, reliable UMEME power with inverter backup, and a compound with lush tropical landscaping. Great for airport and NGO workers.",
    isVerified: true,
    isFeatured: true,
    negotiable: false,
    upfrontMonths: 3,
    securityDeposit: 1000000,
    fencing: ["wall", "live"],
    status: "available",
    availableFrom: "2026-04-01",
    furnished: true,
    parking: true,
    petFriendly: true,
    lifestyleTags: ["family-friendly", "pet-friendly", "luxury"],
    interior: { builtInWardrobes: true, kitchenType: "modern-open", flooringType: "tiles", waterAvailability: "24/7", powerReliability: "backup-available" },
    exterior: { parkingSpaces: 2, garden: true, compound: true, gateType: "automatic" },
    utilities: { electricityType: "prepaid-yaka", waterSource: "nwsc", internetAvailable: true, garbageCollection: true },
    security: { securityGuards: true, cctv: true, gatedCommunity: true, perimeterWall: true, alarmSystem: false },
    amenities: { swimmingPool: false, gym: false, balcony: true, airConditioning: true, servantQuarters: false, laundryArea: true },
    nearbyPlaces: [
      { name: "Entebbe Lakefront", type: "mall", distance: "300m" },
      { name: "Entebbe International Airport", type: "road", distance: "3km" },
      { name: "Victoria Mall", type: "mall", distance: "2km" },
      { name: "Entebbe Hospital", type: "hospital", distance: "1km" },
      { name: "Kampala-Entebbe Expressway", type: "road", distance: "500m" },
    ],
    contactPhone: "+256703121212",
    whatsappPhone: "+256703121212",
    landlordName: "Annet Birungi",
    agencyName: "Entebbe Lakeside Realty",
    viewCount: 423,
    createdAt: "2026-03-07T15:10:00Z",
    location: { lat: 0.0512, lng: 32.4637 },
  },
];

// ---- Notifications --------------------------------------------------------

export const notifications: Notification[] = [
  {
    id: "notif-001",
    message:
      "Your listing 'Modern 2‑Bedroom Apartment in Bukoto' has been verified and is now live.",
    channel: "in-app",
    when: "2026-03-20T09:00:00Z",
    read: false,
  },
  {
    id: "notif-002",
    message:
      "A new tenant enquiry was received for your Kololo standalone house. Tap to view details.",
    channel: "sms",
    when: "2026-03-19T14:25:00Z",
    read: true,
  },
  {
    id: "notif-003",
    message:
      "Rent payment of UGX 1,800,000 for Bukoto apartment has been confirmed by the landlord.",
    channel: "email",
    when: "2026-03-18T11:40:00Z",
    read: true,
  },
  {
    id: "notif-004",
    message:
      "Reminder: Your Muyenga townhouse reservation expires in 3 days. Please complete the deal.",
    channel: "whatsapp",
    when: "2026-03-21T07:00:00Z",
    read: false,
  },
  {
    id: "notif-005",
    message:
      "Welcome to Pata! Complete your profile to start browsing verified rental properties in Kampala.",
    channel: "in-app",
    when: "2026-03-15T08:00:00Z",
    read: true,
  },
];

// ---- Chat Messages --------------------------------------------------------

export type ChatSide = "tenant" | "landlord" | "admin";

export interface ChatMessage {
  id: string;
  dealId: string;
  from: ChatSide;       // who sent it
  to: ChatSide;         // who it's addressed to
  senderName: string;
  text: string;
  timestamp: string;    // ISO date-time
}

export const chatMessages: ChatMessage[] = [
  // Deal 1 — tenant wants Bukoto apartment
  { id: "msg-001", dealId: "deal-001", from: "tenant", to: "admin", senderName: "John Doe", text: "Hi, I'm interested in the 2-bedroom apartment in Bukoto. Is it still available?", timestamp: "2026-03-18T09:00:00Z" },
  { id: "msg-002", dealId: "deal-001", from: "admin", to: "tenant", senderName: "pata.ug", text: "Hi John! Yes, the property is still available. The listed rent is UGX 1,800,000/month. Would you like us to proceed with this price or would you like to propose a different amount?", timestamp: "2026-03-18T09:15:00Z" },
  { id: "msg-003", dealId: "deal-001", from: "tenant", to: "admin", senderName: "John Doe", text: "Can we try UGX 1,600,000? I can move in by April 1st.", timestamp: "2026-03-18T09:30:00Z" },
  { id: "msg-004", dealId: "deal-001", from: "admin", to: "landlord", senderName: "pata.ug", text: "Hi James, we have a verified tenant interested in your Bukoto apartment. They're offering UGX 1,600,000/month with an April 1st move-in. Would you consider this?", timestamp: "2026-03-18T09:45:00Z" },
  { id: "msg-005", dealId: "deal-001", from: "landlord", to: "admin", senderName: "James Mukasa", text: "Lowest I can go is 1,700,000. April 1st works.", timestamp: "2026-03-18T10:20:00Z" },
  { id: "msg-006", dealId: "deal-001", from: "admin", to: "tenant", senderName: "pata.ug", text: "Good news! The landlord is willing to negotiate. The best price available is UGX 1,700,000/month with April 1st move-in. Shall we confirm this deal?", timestamp: "2026-03-18T10:30:00Z" },
  { id: "msg-007", dealId: "deal-001", from: "tenant", to: "admin", senderName: "John Doe", text: "That works for me. Let's confirm!", timestamp: "2026-03-18T10:45:00Z" },
  { id: "msg-008", dealId: "deal-001", from: "admin", to: "landlord", senderName: "pata.ug", text: "Deal confirmed at UGX 1,700,000/month. Tenant moves in April 1st. We'll share contact details to both parties now. 5% agency fee on 1 month's rent (UGX 85,000) will be deducted from your payout — not from the full upfront.", timestamp: "2026-03-18T11:00:00Z" },

  // Deal 3 — tenant asking about Naguru studio
  { id: "msg-009", dealId: "deal-003", from: "tenant", to: "admin", senderName: "Peter Ouma", text: "I'd like to request the studio in Naguru. Is UGX 800K the final price?", timestamp: "2026-03-21T08:00:00Z" },
  { id: "msg-010", dealId: "deal-003", from: "admin", to: "tenant", senderName: "pata.ug", text: "Hi Peter! The studio is listed at UGX 800,000/month. The landlord has marked this as negotiable. Would you like to propose a different price?", timestamp: "2026-03-21T08:20:00Z" },
  { id: "msg-011", dealId: "deal-003", from: "tenant", to: "admin", senderName: "Peter Ouma", text: "Could you ask if UGX 700,000 would work?", timestamp: "2026-03-21T08:35:00Z" },
  { id: "msg-012", dealId: "deal-003", from: "admin", to: "landlord", senderName: "pata.ug", text: "Hi Peter (landlord), a verified tenant is interested in your Naguru studio. They're proposing UGX 700,000/month. Are you open to this?", timestamp: "2026-03-21T08:50:00Z" },
];

// ---- Deals ----------------------------------------------------------------

export const deals: Deal[] = [
  {
    id: "deal-001",
    propertyTitle: "Modern 2‑Bedroom Apartment in Bukoto",
    estate: "Bukoto",
    agreedRent: 1_700_000,
    upfrontMonths: 3,
    securityDeposit: 500_000,
    status: "payment_confirmed",
    date: "2026-03-18",
  },
  {
    id: "deal-002",
    propertyTitle: "Hillside 3‑Bedroom Townhouse in Muyenga",
    estate: "Muyenga",
    agreedRent: 3_400_000,
    upfrontMonths: 3,
    securityDeposit: 1_500_000,
    status: "agreed",
    date: "2026-03-20",
  },
  {
    id: "deal-003",
    propertyTitle: "Cosy Studio in Naguru",
    estate: "Naguru",
    agreedRent: 800_000,
    upfrontMonths: 1,
    securityDeposit: 300_000,
    status: "negotiating",
    date: "2026-03-21",
  },
  {
    id: "deal-004",
    propertyTitle: "Lakeside 2‑Bedroom Apartment in Entebbe",
    estate: "Entebbe",
    agreedRent: 2_200_000,
    upfrontMonths: 3,
    securityDeposit: 1_000_000,
    status: "closed",
    date: "2026-03-10",
  },
];
