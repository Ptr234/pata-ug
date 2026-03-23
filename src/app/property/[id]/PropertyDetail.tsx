"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Img";
import { useParams } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Car,
  Dog,
  Sofa,
  Shield,
  MessageCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Lock,
  ArrowRight,
  Handshake,
  ExternalLink,
  Heart,
  Eye,
  Clock,
  Zap,
  Droplets,
  Wifi,
  Trash2,
  Fence,
  TreePine,
  DoorOpen,
  Waves,
  Dumbbell,
  Wind,
  Home,
  WashingMachine,
  Video,
  Star,
  Crown,
  GraduationCap,
  Users,
  Wallet,
  School,
  Building,
  ShoppingCart,
  Route,
  Church,
  Landmark,
  Maximize,
  Layers,
  CalendarClock,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import StatusBadge from "@/components/StatusBadge";
import { properties } from "@/lib/mock-data";
import type { NearbyPlace } from "@/lib/mock-data";
import { LIFESTYLE_TAGS, PAYMENT_TERMS } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-UG", {
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-UG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function capitalizeCategory(cat: string): string {
  return cat
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

const NEARBY_ICONS: Record<NearbyPlace["type"], React.ReactNode> = {
  school: <School className="h-3.5 w-3.5 text-teal" />,
  hospital: <Building className="h-3.5 w-3.5 text-red" />,
  supermarket: <ShoppingCart className="h-3.5 w-3.5 text-green" />,
  road: <Route className="h-3.5 w-3.5 text-amber" />,
  mall: <ShoppingCart className="h-3.5 w-3.5 text-purple" />,
  restaurant: <ShoppingCart className="h-3.5 w-3.5 text-orange" />,
  bank: <Landmark className="h-3.5 w-3.5 text-gold" />,
  church: <Church className="h-3.5 w-3.5 text-teal" />,
  mosque: <Church className="h-3.5 w-3.5 text-teal" />,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === params.id);

  // UI state
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const [proposing, setProposing] = useState(false);
  const [proposedPrice, setProposedPrice] = useState("");
  const [saved, setSaved] = useState(false);
  const [isGuest, setIsGuest] = useState(() => {
    if (typeof window === "undefined") return true;
    return !localStorage.getItem("pata-role");
  });

  // ------ 404 ------
  if (!property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-smoke px-4 text-center">
        <ScrollReveal variant="scale">
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-light">
              <span className="font-display text-3xl text-gold-dark">404</span>
            </div>
            <div>
              <h1 className="font-display text-3xl tracking-tighter text-navy">
                Property Not Found
              </h1>
              <p className="mt-2 max-w-md leading-relaxed text-text-secondary">
                This property may have been removed or the link is incorrect.
              </p>
            </div>
            <Link href="/search" className="btn-gold inline-flex items-center gap-2">
              Browse Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  const {
    title,
    category,
    listingType,
    district,
    estate,
    price,
    paymentTerms,
    bedrooms,
    bathrooms,
    floorLevel,
    sizeSqm,
    condition,
    photos,
    videoUrl,
    description,
    isVerified,
    isFeatured,
    negotiable,
    upfrontMonths,
    securityDeposit,
    fencing,
    locationDesc,
    status,
    availableFrom,
    furnished,
    parking,
    petFriendly,
    lifestyleTags,
    interior,
    exterior,
    utilities,
    security,
    amenities,
    nearbyPlaces,
    landlordName,
    viewCount,
    createdAt,
  } = property;

  // Quick-facts data
  const quickFacts = [
    {
      icon: <Bed className="h-5 w-5 text-teal" />,
      label: "Bedrooms",
      value: bedrooms === 0 ? "Studio" : bedrooms.toString(),
    },
    {
      icon: <Bath className="h-5 w-5 text-teal" />,
      label: "Bathrooms",
      value: bathrooms.toString(),
    },
    {
      icon: <Sofa className="h-5 w-5 text-teal" />,
      label: "Furnished",
      value: furnished ? "Yes" : "No",
    },
    {
      icon: <Car className="h-5 w-5 text-teal" />,
      label: "Parking",
      value: exterior.parkingSpaces > 0 ? `${exterior.parkingSpaces} space${exterior.parkingSpaces > 1 ? "s" : ""}` : "No",
    },
    {
      icon: <Dog className="h-5 w-5 text-teal" />,
      label: "Pet-friendly",
      value: petFriendly ? "Yes" : "No",
    },
    {
      icon: <Shield className="h-5 w-5 text-teal" />,
      label: "Category",
      value: capitalizeCategory(category),
    },
  ];

  if (sizeSqm) {
    quickFacts.push({
      icon: <Maximize className="h-5 w-5 text-teal" />,
      label: "Size",
      value: `${sizeSqm} sqm`,
    });
  }
  if (floorLevel) {
    quickFacts.push({
      icon: <Layers className="h-5 w-5 text-teal" />,
      label: "Floor Level",
      value: floorLevel,
    });
  }
  quickFacts.push({
    icon: <Star className="h-5 w-5 text-teal" />,
    label: "Condition",
    value: condition === "brand-new" ? "Brand New" : condition === "renovated" ? "Renovated" : "Good",
  });

  quickFacts.push(
    {
      icon: <Fence className="h-5 w-5 text-gold" />,
      label: "Fencing",
      value: fencing.length > 0 && fencing[0] !== "none"
        ? fencing.map(f => f === "wall" ? "Wall Fence" : f === "live" ? "Live Fence" : f === "chain-link" ? "Chain Link" : f === "no-gate" ? "No Gate" : "None").join(", ")
        : "No Fencing",
    },
    {
      icon: <Lock className="h-5 w-5 text-gold" />,
      label: "Security Deposit",
      value: securityDeposit > 0 ? `UGX ${formatPrice(securityDeposit)}` : "None",
    },
  );

  // Interior features list
  const interiorItems = [
    interior.builtInWardrobes && "Built-in Wardrobes",
    interior.kitchenType !== "none" && `Kitchen: ${interior.kitchenType === "modern-open" ? "Modern Open" : interior.kitchenType === "modern-closed" ? "Modern Closed" : interior.kitchenType === "kitchenette" ? "Kitchenette" : "Basic"}`,
    `Flooring: ${interior.flooringType === "tiles" ? "Tiles" : interior.flooringType === "marble" ? "Marble" : interior.flooringType === "terrazzo" ? "Terrazzo" : interior.flooringType === "cement" ? "Cement" : interior.flooringType === "wood" ? "Wood" : "Vinyl"}`,
    `Water: ${interior.waterAvailability === "24/7" ? "24/7 Supply" : interior.waterAvailability === "scheduled" ? "Scheduled" : "Unreliable"}`,
    `Power: ${interior.powerReliability === "reliable" ? "Reliable" : interior.powerReliability === "backup-available" ? "Backup Available" : "Frequent Outages"}`,
  ].filter(Boolean) as string[];

  // Exterior features list
  const exteriorItems = [
    exterior.parkingSpaces > 0 && `Parking: ${exterior.parkingSpaces} space${exterior.parkingSpaces > 1 ? "s" : ""}`,
    exterior.garden && "Garden / Compound",
    exterior.compound && "Enclosed Compound",
    exterior.gateType !== "none" && `Gate: ${exterior.gateType === "automatic" ? "Automatic" : exterior.gateType === "sliding" ? "Sliding" : "Manual"}`,
  ].filter(Boolean) as string[];

  // Utility features list
  const utilityItems = [
    `Electricity: ${utilities.electricityType === "prepaid-yaka" ? "Prepaid (Yaka)" : utilities.electricityType === "postpaid" ? "Postpaid" : utilities.electricityType === "solar" ? "Solar" : "Generator Backup"}`,
    `Water: ${utilities.waterSource === "nwsc" ? "NWSC Mains" : utilities.waterSource === "borehole" ? "Borehole" : utilities.waterSource === "rainwater" ? "Rainwater" : utilities.waterSource === "tank" ? "Water Tank" : "Well"}`,
    utilities.internetAvailable && "Internet Available",
    utilities.garbageCollection && "Garbage Collection",
  ].filter(Boolean) as string[];

  // Security features list
  const securityItems = [
    security.securityGuards && "Security Guards",
    security.cctv && "CCTV Cameras",
    security.gatedCommunity && "Gated Community",
    security.perimeterWall && "Perimeter Wall",
    security.alarmSystem && "Alarm System",
  ].filter(Boolean) as string[];

  // Additional amenities list
  const amenityItems = [
    amenities.swimmingPool && "Swimming Pool",
    amenities.gym && "Gym / Fitness",
    amenities.balcony && "Balcony",
    amenities.airConditioning && "Air Conditioning",
    amenities.servantQuarters && "Servant Quarters (BQ)",
    amenities.laundryArea && "Laundry Area",
  ].filter(Boolean) as string[];

  // Navigate photos
  const prevPhoto = () =>
    setActivePhoto((i) => (i === 0 ? photos.length - 1 : i - 1));
  const nextPhoto = () =>
    setActivePhoto((i) => (i === photos.length - 1 ? 0 : i + 1));

  const handleSave = () => {
    const savedIds = JSON.parse(localStorage.getItem("pata-saved") || "[]");
    if (saved) {
      localStorage.setItem("pata-saved", JSON.stringify(savedIds.filter((id: string) => id !== property.id)));
    } else {
      savedIds.push(property.id);
      localStorage.setItem("pata-saved", JSON.stringify(savedIds));
    }
    setSaved(!saved);
  };

  return (
    <>
      {/* ================================================================== */}
      {/* Lightbox overlay                                                    */}
      {/* ================================================================== */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 backdrop-blur-xl"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2.5 text-white backdrop-blur transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white/20 hover:scale-110"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-navy shadow-soft backdrop-blur transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white hover:shadow-card hover:scale-105"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl shadow-elevated animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[activePhoto]}
              alt={`${title} photo ${activePhoto + 1}`}
              width={1200}
              height={800}
              className="h-auto max-h-[85vh] w-auto rounded-2xl object-contain"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-navy shadow-soft backdrop-blur transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white hover:shadow-card hover:scale-105"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            {activePhoto + 1} / {photos.length}
          </span>
        </div>
      )}

      {/* ================================================================== */}
      {/* Page content                                                        */}
      {/* ================================================================== */}
      <div className="min-h-screen bg-smoke">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {/* ── Breadcrumb ── */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-text-muted">
            <Link
              href="/"
              className="inline-flex items-center gap-1 transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-teal"
            >
              <MapPin className="h-3.5 w-3.5" />
              Home
            </Link>
            <span>/</span>
            <Link
              href="/search"
              className="transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-teal"
            >
              Browse
            </Link>
            <span>/</span>
            <span className="truncate font-medium text-text-secondary">
              {title}
            </span>
          </nav>

          {/* ── Photo Gallery ── */}
          <ScrollReveal variant="up">
            <section className="mb-8">
              <div
                className="img-zoom relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl shadow-elevated"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={photos[activePhoto]}
                  alt={`${title} - main photo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 1152px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  priority
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 right-4 rounded-full bg-navy/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {activePhoto + 1} / {photos.length}
                </span>

                {/* Featured badge */}
                {isFeatured && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white" style={{ background: "linear-gradient(135deg, #d4a853, #B8903D)", boxShadow: "0 2px 8px rgba(212,168,83,0.4)" }}>
                    <Star className="h-3 w-3" />
                    Featured
                  </span>
                )}

                {photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 text-navy shadow-soft backdrop-blur transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white hover:shadow-card hover:scale-105"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 text-navy shadow-soft backdrop-blur transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white hover:shadow-card hover:scale-105"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail row */}
              {photos.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {photos.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhoto(idx)}
                      className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        idx === activePhoto
                          ? "ring-2 ring-gold ring-offset-2 shadow-gold"
                          : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${title} thumbnail ${idx + 1}`}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Video walkthrough */}
              {videoUrl && (
                <div className="mt-4">
                  {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-elevated">
                      <iframe
                        src={videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                        title={`${title} - Video Walkthrough`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-elevated bg-navy/5">
                      <video
                        src={videoUrl}
                        controls
                        preload="metadata"
                        className="h-full w-full object-cover"
                        poster={photos[0]}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-text-muted">
                    <Video className="h-3.5 w-3.5" />
                    Video Walkthrough
                  </p>
                </div>
              )}
            </section>
          </ScrollReveal>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* ============================================================ */}
            {/* Left column (2/3)                                             */}
            {/* ============================================================ */}
            <div className="lg:w-2/3">
              {/* Badges */}
              <ScrollReveal variant="up">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-navy shadow-soft backdrop-blur-sm">
                    {capitalizeCategory(category)}
                  </span>
                  {listingType === "short-stay" && (
                    <span className="rounded-full bg-orange/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-orange shadow-soft">
                      Short Stay
                    </span>
                  )}
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-soft"
                    style={{
                      background: isVerified ? "#22C55E" : "#64748B",
                      color: "#fff",
                    }}
                  >
                    <Shield className="h-3 w-3" />
                    {isVerified ? "Verified" : "Not Yet Verified"}
                  </span>
                  {/* Save button */}
                  <button
                    type="button"
                    onClick={handleSave}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      background: saved ? "rgba(239,68,68,0.1)" : "rgba(11,25,41,0.05)",
                      color: saved ? "#EF4444" : "#64748B",
                    }}
                  >
                    <Heart className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
                    {saved ? "Saved" : "Save"}
                  </button>
                </div>
              </ScrollReveal>

              {/* Lifestyle tags */}
              {lifestyleTags.length > 0 && (
                <ScrollReveal variant="up" delay={30}>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {lifestyleTags.map((tag) => {
                      const tagInfo = LIFESTYLE_TAGS.find(t => t.id === tag);
                      return (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full bg-navy/5 px-2.5 py-1 text-[10px] font-bold text-navy/70"
                        >
                          {tag === "family-friendly" && <Users className="h-3 w-3" />}
                          {tag === "bachelor-pad" && <Home className="h-3 w-3" />}
                          {tag === "student-friendly" && <GraduationCap className="h-3 w-3" />}
                          {tag === "luxury" && <Crown className="h-3 w-3" />}
                          {tag === "budget" && <Wallet className="h-3 w-3" />}
                          {tag === "pet-friendly" && <Dog className="h-3 w-3" />}
                          {tag === "gated-community" && <Shield className="h-3 w-3" />}
                          {tagInfo?.label || capitalizeCategory(tag)}
                        </span>
                      );
                    })}
                  </div>
                </ScrollReveal>
              )}

              {/* Title */}
              <ScrollReveal variant="up" delay={50}>
                <h1 className="font-display text-3xl tracking-tighter text-navy md:text-4xl">
                  {title}
                </h1>
              </ScrollReveal>

              {/* Meta: posted date, views */}
              <ScrollReveal variant="up" delay={70}>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Posted {timeAgo(createdAt)}
                    <span className="text-text-muted/60">({formatDate(createdAt)})</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {viewCount.toLocaleString()} views
                  </span>
                </div>
              </ScrollReveal>

              {/* Location — show estate + district only (exact location locked until deal close) */}
              <ScrollReveal variant="up" delay={100}>
                <div className="mt-3 flex items-start gap-1.5 text-text-secondary">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" />
                  <div>
                    <span className="font-medium">{estate}, {district}</span>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-text-muted">
                      <Lock className="h-3 w-3 text-gold/60" />
                      Exact location shared after deal closes
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Location description — locked until deal closed */}
              {locationDesc && (
                <ScrollReveal variant="up" delay={120}>
                  <div className="mt-2 rounded-xl bg-smoke px-4 py-2.5">
                    <p className="text-[9px] font-black uppercase tracking-wider text-text-muted">How to Find It</p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-navy/50">
                      <Lock className="h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>Directions shared after deal is closed</span>
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Price + negotiable + payment terms */}
              <ScrollReveal variant="up" delay={150}>
                <p className="mt-4 font-display text-3xl tracking-tight text-teal">
                  UGX {formatPrice(price)}
                  <span className="ml-2 font-sans text-base font-normal tracking-normal text-text-muted">
                    / month
                  </span>
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-wider"
                    style={{
                      background: negotiable ? "rgba(10,147,150,0.1)" : "rgba(212,98,42,0.1)",
                      color: negotiable ? "#0A9396" : "#D4622A",
                    }}
                  >
                    {negotiable ? "Price Negotiable" : "Fixed Price"}
                  </span>
                  {upfrontMonths > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-gold/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-gold">
                      {upfrontMonths} month{upfrontMonths > 1 ? "s" : ""} deposit required
                    </span>
                  )}
                </div>

                {/* Payment terms */}
                {paymentTerms.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Payment:</span>
                    {paymentTerms.map((term) => {
                      const termInfo = PAYMENT_TERMS.find(t => t.id === term);
                      return (
                        <span key={term} className="rounded-lg bg-navy/5 px-2.5 py-1 text-[10px] font-bold text-navy/60">
                          {termInfo?.label || term}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Deposit breakdown */}
                {upfrontMonths > 0 && (
                  <div className="mt-3 rounded-xl bg-smoke px-4 py-3">
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-text-muted">
                      Upfront Payment Breakdown
                    </p>
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Monthly Rent</span>
                        <span className="font-bold text-navy">UGX {formatPrice(price)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Rent Deposit ({upfrontMonths} month{upfrontMonths > 1 ? "s" : ""})</span>
                        <span className="font-bold text-navy">UGX {formatPrice(price * upfrontMonths)}</span>
                      </div>
                      {securityDeposit > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-text-muted">Security Deposit</span>
                          <span className="font-bold text-navy">UGX {formatPrice(securityDeposit)}</span>
                        </div>
                      )}
                      <div className="h-px bg-navy/10" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-navy">Total to Wallet</span>
                        <span className="font-display text-lg font-bold text-teal">UGX {formatPrice(price * upfrontMonths + securityDeposit)}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-[10px] leading-relaxed text-text-muted">
                      Deposit is paid into your pata.ug wallet. We transfer to the landlord only after the deal is closed and confirmed by both parties.
                    </p>
                  </div>
                )}
              </ScrollReveal>

              {/* Available from */}
              <ScrollReveal variant="up" delay={200}>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-text-secondary">
                  <Calendar className="h-4 w-4 flex-shrink-0 text-text-muted" />
                  Available from {formatDate(availableFrom)}
                </div>
              </ScrollReveal>

              {/* ── Quick Facts Grid ── */}
              <ScrollReveal variant="up" delay={250}>
                <section className="mt-8">
                  <p className="section-label mb-3 text-teal">Details</p>
                  <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                    Quick Facts
                  </h2>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {quickFacts.map((fact, i) => (
                    <div
                      key={fact.label}
                      className="card-surface flex items-center gap-3 p-4"
                      style={{ animation: `fadeInUp 600ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms both` }}
                    >
                      {fact.icon}
                      <div>
                        <p className="text-xs text-text-muted">{fact.label}</p>
                        <p className="text-sm font-semibold text-navy">
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* ── Description ── */}
              <ScrollReveal variant="up" delay={100}>
                <section className="mt-8">
                  <p className="section-label mb-3 text-teal">About</p>
                  <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                    Description
                  </h2>
                  <p className="leading-relaxed text-text-secondary">
                    {description}
                  </p>
                </section>
              </ScrollReveal>

              {/* ── Interior Features ── */}
              <ScrollReveal variant="up" delay={120}>
                <section className="mt-8">
                  <p className="section-label mb-3 text-teal">Interior</p>
                  <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                    Interior Features
                  </h2>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {interiorItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-soft">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal/10">
                          <Home className="h-3.5 w-3.5 text-teal" />
                        </div>
                        <span className="text-sm text-navy/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollReveal>

              {/* ── Exterior Features ── */}
              {exteriorItems.length > 0 && (
                <ScrollReveal variant="up" delay={140}>
                  <section className="mt-8">
                    <p className="section-label mb-3 text-orange">Exterior</p>
                    <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                      Exterior Features
                    </h2>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {exteriorItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-soft">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange/10">
                            <TreePine className="h-3.5 w-3.5 text-orange" />
                          </div>
                          <span className="text-sm text-navy/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </ScrollReveal>
              )}

              {/* ── Utilities ── */}
              <ScrollReveal variant="up" delay={160}>
                <section className="mt-8">
                  <p className="section-label mb-3 text-gold">Utilities</p>
                  <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                    Utilities &amp; Services
                  </h2>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {utilityItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-soft">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/10">
                          {String(item).startsWith("Electricity") ? <Zap className="h-3.5 w-3.5 text-gold" /> :
                           String(item).startsWith("Water") ? <Droplets className="h-3.5 w-3.5 text-gold" /> :
                           String(item).startsWith("Internet") ? <Wifi className="h-3.5 w-3.5 text-gold" /> :
                           <Trash2 className="h-3.5 w-3.5 text-gold" />}
                        </div>
                        <span className="text-sm text-navy/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollReveal>

              {/* ── Security Features ── */}
              {securityItems.length > 0 && (
                <ScrollReveal variant="up" delay={180}>
                  <section className="mt-8">
                    <p className="section-label mb-3 text-green">Security</p>
                    <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                      Security Features
                    </h2>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {securityItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-soft">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green/10">
                            <Shield className="h-3.5 w-3.5 text-green" />
                          </div>
                          <span className="text-sm text-navy/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </ScrollReveal>
              )}

              {/* ── Additional Amenities ── */}
              {amenityItems.length > 0 && (
                <ScrollReveal variant="up" delay={200}>
                  <section className="mt-8">
                    <p className="section-label mb-3 text-purple">Amenities</p>
                    <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                      Additional Amenities
                    </h2>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {amenityItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-soft">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple/10">
                            {item === "Swimming Pool" ? <Waves className="h-3.5 w-3.5 text-purple" /> :
                             item === "Gym / Fitness" ? <Dumbbell className="h-3.5 w-3.5 text-purple" /> :
                             item === "Balcony" ? <DoorOpen className="h-3.5 w-3.5 text-purple" /> :
                             item === "Air Conditioning" ? <Wind className="h-3.5 w-3.5 text-purple" /> :
                             item === "Servant Quarters (BQ)" ? <Home className="h-3.5 w-3.5 text-purple" /> :
                             <WashingMachine className="h-3.5 w-3.5 text-purple" />}
                          </div>
                          <span className="text-sm text-navy/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </ScrollReveal>
              )}

              {/* ── Nearby Places ── */}
              {nearbyPlaces.length > 0 && (
                <ScrollReveal variant="up" delay={220}>
                  <section className="mt-8">
                    <p className="section-label mb-3 text-teal">Location</p>
                    <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                      Nearby Places
                    </h2>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {nearbyPlaces.map((place, i) => (
                        <div key={i} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-soft">
                          <div className="flex items-center gap-2.5">
                            {NEARBY_ICONS[place.type] || <MapPin className="h-3.5 w-3.5 text-text-muted" />}
                            <span className="text-sm text-navy/80">{place.name}</span>
                          </div>
                          <span className="text-xs font-bold text-text-muted">{place.distance}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </ScrollReveal>
              )}

              {/* ── Landlord Rating ── */}
              <ScrollReveal variant="up" delay={240}>
                <section className="mt-8">
                  <p className="section-label mb-3 text-gold">Trust</p>
                  <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                    Landlord Rating
                  </h2>
                  <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-soft">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-5 w-5 ${s <= Math.round(property.landlordRating) ? "fill-gold text-gold" : "text-navy/15"}`}
                        />
                      ))}
                    </div>
                    <span className="font-display text-lg font-bold text-navy">{property.landlordRating.toFixed(1)}</span>
                    <span className="text-xs text-text-muted">
                      ({property.reviews.length} review{property.reviews.length !== 1 ? "s" : ""})
                    </span>
                  </div>
                </section>
              </ScrollReveal>

              {/* ── Tenant Reviews ── */}
              {property.reviews.length > 0 && (
                <ScrollReveal variant="up" delay={260}>
                  <section className="mt-8">
                    <p className="section-label mb-3 text-gold">Feedback</p>
                    <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                      Tenant Reviews
                    </h2>
                    <div className="space-y-3">
                      {property.reviews.map((review) => (
                        <div key={review.id} className="rounded-xl bg-white px-5 py-4 shadow-soft">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/5 text-xs font-bold text-navy">
                                {review.author.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-navy">{review.author}</p>
                                <p className="text-[10px] text-text-muted">{formatDate(review.date)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-gold text-gold" : "text-navy/10"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </ScrollReveal>
              )}

              {/* ── Status ── */}
              <ScrollReveal variant="up" delay={280}>
                <div className="mt-6">
                  <StatusBadge status={status} />
                </div>
              </ScrollReveal>
            </div>

            {/* ============================================================ */}
            {/* Right column (1/3) - Sticky sidebar                           */}
            {/* ============================================================ */}
            <aside className="lg:w-1/3">
              <ScrollReveal variant="right">
                <div className="sticky top-6 space-y-6">
                  {/* ---- Contact Card ---- */}
                  <div className="card-surface shadow-card p-6">
                    {isGuest ? (
                      /* ──── Guest mode ──── */
                      <div className="space-y-4 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-light">
                          <Lock className="h-6 w-6 text-gold-dark" />
                        </div>

                        <h3 className="font-display text-xl tracking-tighter text-navy">
                          Interested?
                        </h3>
                        <p className="text-sm leading-relaxed text-text-muted">
                          Sign up or log in to request this property. We handle
                          all negotiations on your behalf.
                        </p>

                        <Link href="/signup" className="btn-gold mt-2 block w-full text-center">
                          Create Account
                        </Link>

                        <div className="flex items-center gap-3">
                          <span className="h-px flex-1 bg-smoke" />
                          <span className="text-xs text-text-muted">or</span>
                          <span className="h-px flex-1 bg-smoke" />
                        </div>

                        <Link
                          href="/login"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-teal transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-teal-dark"
                        >
                          Already have an account? Log in
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    ) : requested ? (
                      /* ──── Request sent ──── */
                      <div className="space-y-4 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
                          <Shield className="h-6 w-6 text-teal" />
                        </div>

                        <h3 className="font-display text-xl tracking-tighter text-navy">
                          Request Sent
                        </h3>
                        <p className="text-sm leading-relaxed text-text-muted">
                          Our team will contact the landlord and get back to you
                          within 24 hours. You can track this in your deals.
                        </p>

                        <Link
                          href="/deals"
                          className="btn-gold mt-2 block w-full text-center"
                        >
                          <span className="inline-flex items-center gap-2">
                            View in My Deals <ArrowRight size={14} />
                          </span>
                        </Link>
                      </div>
                    ) : proposing ? (
                      /* ──── Price proposal form ──── */
                      <div className="space-y-4">
                        <h3 className="font-display text-lg tracking-tighter text-navy">
                          Propose Your Price
                        </h3>
                        <p className="text-xs text-text-muted">
                          Listed at UGX {formatPrice(price)}/mo. Enter your offer below.
                        </p>

                        <div className="flex items-center overflow-hidden rounded-xl bg-smoke">
                          <span className="bg-smoke/80 px-3 py-3 text-sm font-bold text-text-muted">UGX</span>
                          <input
                            type="number"
                            placeholder="e.g. 1500000"
                            value={proposedPrice}
                            onChange={(e) => setProposedPrice(e.target.value)}
                            className="flex-1 bg-transparent px-3 py-3 text-sm font-bold text-navy outline-none"
                          />
                        </div>

                        <button
                          type="button"
                          disabled={!proposedPrice}
                          className="btn-gold mt-1 w-full disabled:cursor-not-allowed disabled:opacity-40"
                          onClick={() => {
                            if (!property) return;
                            const newDeal = {
                              id: `deal-req-${Date.now()}`,
                              propertyId: property.id,
                              propertyTitle: property.title,
                              estate: property.estate,
                              district: property.district,
                              agreedRent: Number(proposedPrice) || property.price,
                              upfrontMonths: property.upfrontMonths,
                              securityDeposit: property.securityDeposit,
                              status: "pending",
                              date: new Date().toISOString().split("T")[0],
                              landlordName: property.landlordName,
                            };
                            const existing = JSON.parse(localStorage.getItem("pata-requests") || "[]");
                            existing.push(newDeal);
                            localStorage.setItem("pata-requests", JSON.stringify(existing));
                            setRequested(true);
                            setProposing(false);
                          }}
                        >
                          <Handshake className="mr-2 inline h-4 w-4" />
                          Submit Offer
                        </button>

                        <button
                          type="button"
                          onClick={() => setProposing(false)}
                          className="w-full text-center text-xs font-medium text-text-muted"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      /* ──── Authenticated — request or negotiate ──── */
                      <div className="space-y-4">
                        {/* Mediation notice */}
                        <div className="flex items-start gap-3 rounded-xl bg-teal/5 px-4 py-3">
                          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                          <p className="text-xs leading-relaxed text-text-muted">
                            pata.ug handles all communication with the landlord.
                            Contact details are shared after a deal is closed.
                          </p>
                        </div>

                        {/* Request at listed price */}
                        <button
                          type="button"
                          className="btn-gold mt-2 w-full"
                          onClick={() => {
                            if (!property) return;
                            const newDeal = {
                              id: `deal-req-${Date.now()}`,
                              propertyId: property.id,
                              propertyTitle: property.title,
                              estate: property.estate,
                              district: property.district,
                              agreedRent: property.price,
                              upfrontMonths: property.upfrontMonths,
                              securityDeposit: property.securityDeposit,
                              status: "pending",
                              date: new Date().toISOString().split("T")[0],
                              landlordName: property.landlordName,
                            };
                            const existing = JSON.parse(localStorage.getItem("pata-requests") || "[]");
                            existing.push(newDeal);
                            localStorage.setItem("pata-requests", JSON.stringify(existing));
                            setRequested(true);
                          }}
                        >
                          <MessageCircle className="mr-2 inline h-4 w-4" />
                          Request at UGX {formatPrice(price)}/mo
                        </button>

                        <p className="text-center text-[11px] text-text-muted">
                          Our team contacts the landlord and gets back to you within 24h
                        </p>

                        {/* Schedule Viewing */}
                        <button
                          type="button"
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy/5 py-3 text-sm font-bold text-navy transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-navy hover:text-white hover:shadow-card"
                        >
                          <CalendarClock className="h-4 w-4" />
                          Schedule Viewing
                        </button>

                        {/* Negotiate — only if negotiable */}
                        {negotiable && (
                          <>
                            <div className="flex items-center gap-3">
                              <span className="h-px flex-1 bg-smoke" />
                              <span className="text-xs text-text-muted">or</span>
                              <span className="h-px flex-1 bg-smoke" />
                            </div>

                            <button
                              type="button"
                              onClick={() => setProposing(true)}
                              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal/10 py-3 text-sm font-bold text-teal shadow-soft transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-teal hover:text-white hover:shadow-card"
                            >
                              <Handshake className="h-4 w-4" />
                              Propose a Different Price
                            </button>
                          </>
                        )}

                        {/* Fixed price notice */}
                        {!negotiable && (
                          <>
                            <div className="flex items-center gap-3">
                              <span className="h-px flex-1 bg-smoke" />
                              <span className="text-[10px] text-text-muted">price info</span>
                              <span className="h-px flex-1 bg-smoke" />
                            </div>
                            <div className="flex items-center justify-center gap-2 rounded-xl bg-orange/5 py-3 text-sm font-medium text-orange">
                              <Lock className="h-3.5 w-3.5" />
                              Fixed price — not negotiable
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ---- Listed By Card (identity hidden until deal closed) ---- */}
                  <div className="card-surface p-5">
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-text-muted mb-3">Listed Via</p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-lg font-display font-bold text-gold">
                        P
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy">pata.ug</p>
                        <p className="text-xs text-text-muted">Verified & mediated listing</p>
                        {isVerified && (
                          <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-bold text-green">
                            <Shield className="h-3 w-3" />
                            Verified Landlord
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-start gap-3 rounded-xl bg-gold/5 px-4 py-3">
                      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <p className="text-xs leading-relaxed text-text-muted">
                        Landlord identity and contact details are shared only after the deal is closed and confirmed by both parties.
                      </p>
                    </div>
                  </div>

                  {/* ---- Location Map (hidden until deal closed) ---- */}
                  <div className="card-surface overflow-hidden">
                    <p className="px-5 pt-4 text-[9px] font-black uppercase tracking-[0.15em] text-text-muted mb-2">Location</p>
                    <div className="flex h-48 items-center justify-center text-center px-5 pb-4">
                      <div>
                        <Lock className="mx-auto h-6 w-6 text-text-muted" />
                        <p className="mt-2 text-sm text-text-muted">
                          Exact location and map are shared after the deal is closed
                        </p>
                        <p className="mt-1 text-[10px] text-text-muted/60">
                          General area: {estate}, {district}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
