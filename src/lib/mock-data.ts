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
  | "office"
  | "shop"
  | "warehouse"
  | "shared-house"
  | "servant-quarters"
  | "short-stay"
  | "land";

export type PropertyStatus = "available" | "occupied" | "reserved";

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  district: string;
  estate: string; // area within the district
  price: number; // monthly rent in UGX
  bedrooms: number;
  bathrooms: number;
  photos: string[];
  description: string;
  isVerified: boolean;
  negotiable: boolean;
  upfrontMonths: number; // months rent required upfront (e.g. 3 = 3 months deposit)
  status: PropertyStatus;
  availableFrom: string; // ISO date
  furnished: boolean;
  parking: boolean;
  petFriendly: boolean;
  contactPhone: string;
  landlordName: string;
  createdAt: string; // ISO date‑time
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
  agreedRent: number; // UGX
  status: DealStatus;
  date: string; // ISO date
}

// ---- Helper ---------------------------------------------------------------

/* Category-to-folder mapping for local property images */
const CATEGORY_IMAGE_MAP: Record<string, { folder: string; prefix: string }> = {
  apartment: { folder: "apartments", prefix: "apartment" },
  standalone: { folder: "houses", prefix: "house" },
  townhouse: { folder: "houses", prefix: "house" },
  studio: { folder: "studios", prefix: "studio" },
  "single-room": { folder: "rooms", prefix: "room" },
  "shared-house": { folder: "rooms", prefix: "room" },
  "servant-quarters": { folder: "rooms", prefix: "room" },
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
    district: "Kampala",
    estate: "Bukoto",
    price: 1_800_000,
    bedrooms: 2,
    bathrooms: 1,
    photos: categoryPhotos("apartment", [1, 2, 3]),
    description:
      "Spacious 2‑bedroom apartment on a quiet street in Bukoto. Tiled floors, modern kitchen with granite countertops, and a private balcony overlooking the neighbourhood. 24‑hour security and ample water supply.",
    isVerified: true,
    negotiable: true,
    upfrontMonths: 3,
    status: "available",
    availableFrom: "2026-04-01",
    furnished: false,
    parking: true,
    petFriendly: false,
    contactPhone: "+256700100100",
    landlordName: "James Mukasa",
    createdAt: "2026-03-10T08:30:00Z",
    location: { lat: 0.3476, lng: 32.5953 },
  },
  {
    id: "prop-002",
    title: "Luxury 3‑Bedroom Standalone in Kololo",
    category: "standalone",
    district: "Kampala",
    estate: "Kololo",
    price: 5_000_000,
    bedrooms: 3,
    bathrooms: 2,
    photos: categoryPhotos("standalone", [1, 2, 3, 4]),
    description:
      "Executive standalone house in the prestigious Kololo hill area. Master en‑suite, large living room, mature garden with fruit trees, boys' quarters, and a double garage. Walking distance to international schools and embassies.",
    isVerified: true,
    negotiable: false,
    upfrontMonths: 2,
    status: "available",
    availableFrom: "2026-04-15",
    furnished: true,
    parking: true,
    petFriendly: true,
    contactPhone: "+256772200200",
    landlordName: "Grace Namutebi",
    createdAt: "2026-03-05T14:00:00Z",
    location: { lat: 0.3301, lng: 32.5849 },
  },
  {
    id: "prop-003",
    title: "Cosy Studio in Naguru",
    category: "studio",
    district: "Kampala",
    estate: "Naguru",
    price: 800_000,
    bedrooms: 0,
    bathrooms: 1,
    photos: categoryPhotos("studio", [1, 2]),
    description:
      "Bright studio apartment ideal for a young professional. Open‑plan living and sleeping area, kitchenette with gas cooker, tiled bathroom, and shared compound parking. Close to Naguru Go‑Down arts centre.",
    isVerified: true,
    negotiable: true,
    upfrontMonths: 1,
    status: "available",
    availableFrom: "2026-03-25",
    furnished: true,
    parking: false,
    petFriendly: false,
    contactPhone: "+256701300300",
    landlordName: "Peter Ochieng",
    createdAt: "2026-03-15T09:45:00Z",
    location: { lat: 0.3342, lng: 32.6025 },
  },
  {
    id: "prop-004",
    title: "Affordable Single Room in Ntinda",
    category: "single-room",
    district: "Kampala",
    estate: "Ntinda",
    price: 350_000,
    bedrooms: 1,
    bathrooms: 1,
    photos: categoryPhotos("single-room", [1, 2]),
    description:
      "Self‑contained single room in a well‑maintained rental block in Ntinda Trading Centre. Shared compound, reliable water, and prepaid electricity meter. Perfect for students and young workers.",
    isVerified: false,
    negotiable: true,
    upfrontMonths: 2,
    status: "available",
    availableFrom: "2026-04-01",
    furnished: false,
    parking: false,
    petFriendly: false,
    contactPhone: "+256753400400",
    landlordName: "Fatuma Nabirye",
    createdAt: "2026-03-12T17:20:00Z",
    location: { lat: 0.3541, lng: 32.6137 },
  },
  {
    id: "prop-005",
    title: "Hillside 3‑Bedroom Townhouse in Muyenga",
    category: "townhouse",
    district: "Kampala",
    estate: "Muyenga",
    price: 3_500_000,
    bedrooms: 3,
    bathrooms: 2,
    photos: categoryPhotos("townhouse", [5, 6, 7, 8]),
    description:
      "Semi‑detached townhouse perched on Muyenga hill with sweeping views of Lake Victoria. All bedrooms en‑suite, modern finishes, private garden, covered parking for two cars, and 24‑hour security gate.",
    isVerified: true,
    negotiable: false,
    upfrontMonths: 3,
    status: "reserved",
    availableFrom: "2026-05-01",
    furnished: false,
    parking: true,
    petFriendly: true,
    contactPhone: "+256700500500",
    landlordName: "Richard Ssentamu",
    createdAt: "2026-02-28T11:00:00Z",
    location: { lat: 0.3012, lng: 32.6001 },
  },
  {
    id: "prop-006",
    title: "Executive Office Space in Nakasero",
    category: "office",
    district: "Kampala",
    estate: "Nakasero",
    price: 4_500_000,
    bedrooms: 0,
    bathrooms: 2,
    photos: categoryPhotos("office", [1, 2, 3]),
    description:
      "Prime ground‑floor office space on Nakasero Road. 80 sqm open plan with a partitioned manager's office, reception area, staff kitchen, and two washrooms. Fibre internet ready, backup generator, and dedicated parking.",
    isVerified: true,
    negotiable: true,
    upfrontMonths: 6,
    status: "available",
    availableFrom: "2026-04-01",
    furnished: false,
    parking: true,
    petFriendly: false,
    contactPhone: "+256782600600",
    landlordName: "Kampala Commercial Properties Ltd",
    createdAt: "2026-03-01T10:15:00Z",
    location: { lat: 0.3163, lng: 32.5822 },
  },
  {
    id: "prop-007",
    title: "2‑Bedroom Apartment in Bugolobi",
    category: "apartment",
    district: "Kampala",
    estate: "Bugolobi",
    price: 2_000_000,
    bedrooms: 2,
    bathrooms: 2,
    photos: categoryPhotos("apartment", [4, 5, 6]),
    description:
      "Well‑finished apartment in a gated compound in Bugolobi flats area. Master en‑suite, spacious lounge, fitted kitchen, water heater in both bathrooms, and a large balcony. Walking distance to Game and Bugolobi Market.",
    isVerified: true,
    negotiable: false,
    upfrontMonths: 3,
    status: "available",
    availableFrom: "2026-04-10",
    furnished: false,
    parking: true,
    petFriendly: false,
    contactPhone: "+256774700700",
    landlordName: "Dorothy Akello",
    createdAt: "2026-03-08T13:30:00Z",
    location: { lat: 0.3158, lng: 32.6105 },
  },
  {
    id: "prop-008",
    title: "Budget Single Room in Kisaasi",
    category: "single-room",
    district: "Kampala",
    estate: "Kisaasi",
    price: 300_000,
    bedrooms: 1,
    bathrooms: 1,
    photos: categoryPhotos("single-room", [3, 4]),
    description:
      "Clean self‑contained single room off Kisaasi‑Bahai Road. Inside toilet and bathroom, cemented floor, security lights in the compound, and nearby boda‑boda stage for easy transport to the city centre.",
    isVerified: false,
    negotiable: true,
    upfrontMonths: 2,
    status: "available",
    availableFrom: "2026-03-28",
    furnished: false,
    parking: false,
    petFriendly: false,
    contactPhone: "+256709800800",
    landlordName: "Moses Ssempijja",
    createdAt: "2026-03-18T07:00:00Z",
    location: { lat: 0.3697, lng: 32.5984 },
  },
  {
    id: "prop-009",
    title: "New 4‑Bedroom Duplex in Kyanja",
    category: "standalone",
    district: "Wakiso",
    estate: "Kyanja",
    price: 2_500_000,
    bedrooms: 4,
    bathrooms: 3,
    photos: categoryPhotos("standalone", [5, 6, 7, 8]),
    description:
      "Brand new duplex in a developing estate in Kyanja. Ground floor features living room, dining area, guest bedroom and washroom; upper floor has three bedrooms (master en‑suite), store room, and balcony. Tarmac access road.",
    isVerified: true,
    negotiable: false,
    upfrontMonths: 3,
    status: "available",
    availableFrom: "2026-04-15",
    furnished: false,
    parking: true,
    petFriendly: true,
    contactPhone: "+256700900900",
    landlordName: "Herbert Kiggundu",
    createdAt: "2026-03-02T16:45:00Z",
    location: { lat: 0.3724, lng: 32.6098 },
  },
  {
    id: "prop-010",
    title: "Furnished 1‑Bedroom in Kira",
    category: "apartment",
    district: "Wakiso",
    estate: "Kira",
    price: 1_200_000,
    bedrooms: 1,
    bathrooms: 1,
    photos: categoryPhotos("apartment", [7, 8, 9]),
    description:
      "Fully furnished one‑bedroom apartment in Kira near Kampala. Comes with a queen bed, wardrobe, sofa set, TV, gas cooker, and utensils. Ideal for expats or short‑stay tenants. Water tank and prepaid meter.",
    isVerified: true,
    negotiable: true,
    upfrontMonths: 1,
    status: "occupied",
    availableFrom: "2026-06-01",
    furnished: true,
    parking: true,
    petFriendly: false,
    contactPhone: "+256771010101",
    landlordName: "Sylvia Namubiru",
    createdAt: "2026-02-20T12:00:00Z",
    location: { lat: 0.3795, lng: 32.6302 },
  },
  {
    id: "prop-011",
    title: "3‑Bedroom Bungalow in Naalya",
    category: "standalone",
    district: "Wakiso",
    estate: "Naalya",
    price: 1_500_000,
    bedrooms: 3,
    bathrooms: 2,
    photos: categoryPhotos("standalone", [9, 10, 11]),
    description:
      "Neat bungalow in a gated estate in Naalya. Three bedrooms (master en‑suite), sit‑in kitchen, servants' quarters, small garden, and shared borehole water. Close to Naalya Housing Estate market and schools.",
    isVerified: false,
    negotiable: true,
    upfrontMonths: 2,
    status: "available",
    availableFrom: "2026-04-05",
    furnished: false,
    parking: true,
    petFriendly: true,
    contactPhone: "+256752111111",
    landlordName: "Charles Lwanga",
    createdAt: "2026-03-14T10:30:00Z",
    location: { lat: 0.3688, lng: 32.6445 },
  },
  {
    id: "prop-012",
    title: "Lakeside 2‑Bedroom Apartment in Entebbe",
    category: "apartment",
    district: "Wakiso",
    estate: "Entebbe",
    price: 2_200_000,
    bedrooms: 2,
    bathrooms: 1,
    photos: categoryPhotos("apartment", [10, 11, 12, 13]),
    description:
      "Charming apartment minutes from the Entebbe lakefront. Tiled floors, spacious rooms, reliable UMEME power with inverter backup, and a compound with lush tropical landscaping. Great for airport and NGO workers.",
    isVerified: true,
    negotiable: false,
    upfrontMonths: 3,
    status: "available",
    availableFrom: "2026-04-01",
    furnished: true,
    parking: true,
    petFriendly: true,
    contactPhone: "+256703121212",
    landlordName: "Annet Birungi",
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
  { id: "msg-008", dealId: "deal-001", from: "admin", to: "landlord", senderName: "pata.ug", text: "Deal confirmed at UGX 1,700,000/month. Tenant moves in April 1st. We'll share contact details to both parties now. The 5% commission (UGX 85,000) will be invoiced.", timestamp: "2026-03-18T11:00:00Z" },

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
    status: "payment_confirmed",
    date: "2026-03-18",
  },
  {
    id: "deal-002",
    propertyTitle: "Hillside 3‑Bedroom Townhouse in Muyenga",
    estate: "Muyenga",
    agreedRent: 3_400_000,
    status: "agreed",
    date: "2026-03-20",
  },
  {
    id: "deal-003",
    propertyTitle: "Cosy Studio in Naguru",
    estate: "Naguru",
    agreedRent: 800_000,
    status: "negotiating",
    date: "2026-03-21",
  },
  {
    id: "deal-004",
    propertyTitle: "Lakeside 2‑Bedroom Apartment in Entebbe",
    estate: "Entebbe",
    agreedRent: 2_200_000,
    status: "closed",
    date: "2026-03-10",
  },
];
