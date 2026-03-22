"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Shield,
  CreditCard,
  Phone,
  ArrowRight,
  Building2,
  Home,
  Square,
  Users,
  DoorOpen,
  Castle,
  Warehouse,
  Briefcase,
  Store,
  Package,
  CalendarDays,
  Map,
  CheckCircle2,
  Eye,
  ShoppingBag,
  MessageCircle,
  UserCheck,
  ImagePlus,
  Megaphone,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import ScrollReveal from "@/components/ScrollReveal";
import { CATEGORIES } from "@/lib/constants";
import { properties } from "@/lib/mock-data";

/* ─── Icon resolver for category grid ─── */

const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  Home,
  Castle,
  Square,
  DoorOpen,
  Users,
  Warehouse,
  Briefcase,
  Store,
  Package,
  CalendarDays,
  Map,
};

/* ─── Category micro-copy ─── */

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  apartment: "Self-contained flats in apartment blocks across Kampala",
  standalone: "Detached houses with private compounds and gardens",
  townhouse: "Semi-detached multi-level homes in gated estates",
  studio: "Compact open-plan units ideal for single professionals",
  "single-room": "Affordable self-contained rooms in rental blocks",
  "shared-house": "Private rooms in shared living arrangements",
  "servant-quarters": "Separate quarters within larger compounds",
  office: "Professional office spaces for businesses of all sizes",
  shop: "Retail and shop spaces in commercial areas",
  warehouse: "Storage and warehouse facilities for goods",
  "short-stay": "Furnished units for short-term and serviced stays",
  land: "Plots and land available for residential or commercial use",
};

/* ─── Predictive search suggestions ─── */

const SEARCH_SUGGESTIONS = [
  { label: "Apartments in Bukoto", href: "/search?q=Bukoto&category=apartment" },
  { label: "Houses in Kololo", href: "/search?q=Kololo&category=standalone" },
  { label: "Studios in Naguru", href: "/search?q=Naguru&category=studio" },
  { label: "Rooms in Ntinda", href: "/search?q=Ntinda&category=single-room" },
  { label: "Offices in Nakasero", href: "/search?q=Nakasero&category=office" },
  { label: "Houses in Muyenga", href: "/search?q=Muyenga&category=standalone" },
  { label: "Apartments in Bugolobi", href: "/search?q=Bugolobi&category=apartment" },
  { label: "Furnished in Entebbe", href: "/search?q=Entebbe" },
  { label: "Townhouses in Kira", href: "/search?q=Kira&category=townhouse" },
  { label: "Land in Wakiso", href: "/search?q=Wakiso&category=land" },
] as const;

function HeroSearchForm() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = query.length > 0
    ? SEARCH_SUGGESTIONS.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_SUGGESTIONS.slice(0, 5);

  const showDropdown = focused && (query.length > 0 || focused);

  return (
    <div className="relative w-full max-w-2xl">
      <form action="/search" method="GET">
        <div
          className="flex items-center rounded-full bg-white/95 backdrop-blur-sm"
          style={{
            boxShadow: focused
              ? "0 0 0 3px rgba(212,168,83,0.2), 0 16px 48px rgba(11,25,41,0.15)"
              : "0 8px 32px rgba(11,25,41,0.1)",
            transform: focused ? "scale(1.02)" : "scale(1)",
            transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <input
            type="text"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Search by estate, area, or property type..."
            autoComplete="off"
            className="flex-1 rounded-l-full bg-transparent px-6 py-4 text-sm text-navy outline-none placeholder:text-text-muted md:py-5 md:text-base"
          />
          <button
            type="submit"
            className="mr-1.5 flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-white shadow-lg shadow-gold/30 md:px-8 md:py-3.5 md:text-base"
            style={{
              transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(212,168,83,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(212,168,83,0.3)";
            }}
          >
            <Search className="h-4 w-4 md:h-5 md:w-5" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showDropdown && filtered.length > 0 && (
        <div
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl bg-white py-2"
          style={{
            boxShadow: "0 20px 60px rgba(11,25,41,0.15), 0 0 1px rgba(11,25,41,0.1)",
            animation: "fadeInDown 300ms cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <p className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-text-muted">
            {query.length > 0 ? "Suggestions" : "Popular searches"}
          </p>
          {filtered.map((suggestion) => (
            <Link
              key={suggestion.label}
              href={suggestion.href}
              className="flex items-center gap-3 px-5 py-2.5 text-sm text-navy"
              style={{ transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F7F8FA";
                e.currentTarget.style.paddingLeft = "24px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.paddingLeft = "20px";
              }}
            >
              <Search className="h-3.5 w-3.5 text-text-muted" />
              <span className="flex-1">{suggestion.label}</span>
              <ArrowRight className="h-3.5 w-3.5 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const verifiedProperties = properties.filter((p) => p.isVerified);
  const featuredProperties = verifiedProperties.slice(0, 4);

  const quickFilters = [
    { label: "Apartments", category: "apartment" },
    { label: "Houses", category: "standalone" },
    { label: "Studios", category: "studio" },
    { label: "Rooms", category: "single-room" },
    { label: "Commercial", category: "office" },
  ];

  const differenceCards = [
    {
      image: "/property_images/houses/house_1.jpg",
      title: "VERIFIED PROPERTIES",
    },
    {
      image: "/property_images/houses/house_2.jpg",
      title: "MANAGED DEAL CLOSURE",
    },
    {
      image: "/property_images/apartments/apartment_1.jpg",
      title: "TRANSPARENT PRICING",
    },
    {
      image: "/property_images/studios/studio_1.jpg",
      title: "REAL-TIME AVAILABILITY",
    },
  ];

  return (
    <>
      {/* ═══ SECTION 1: HERO — Full-bleed background image ═══ */}
      <section className="relative min-h-screen overflow-hidden">
        {/* ── Full-bleed background image ── */}
        <Image
          src="/property_images/houses/house_12.jpg"
          alt="Premium property in Kampala"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* ── Dark overlay for text readability ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />

        {/* ── Grid pattern overlay ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-20 pt-28 sm:px-6 lg:max-w-[65%] lg:px-8 lg:py-24">
            {/* Badge */}
            <ScrollReveal delay={0}>
              <div className="animate-fade-up inline-flex w-fit items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-gold">
                <span className="flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-gold opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                Live Properties Available
              </div>
            </ScrollReveal>

            {/* Heading — left-aligned, oversized, R/NESS impact */}
            <ScrollReveal delay={100}>
              <h1 className="animate-fade-up delay-100 mt-8 max-w-2xl font-display text-5xl font-bold uppercase leading-[0.92] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                Discover{" "}
                <br className="hidden sm:block" />
                Your Next{" "}
                <span className="relative">
                  <span className="text-gradient-gold">Home</span>
                  {/* Decorative underline stroke */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 200 12"
                    className="absolute -bottom-2 left-0 w-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8 Q50 2 100 7 Q150 12 198 4"
                      stroke="#d4a853"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      className="animate-fade-right delay-500"
                      style={{ strokeDasharray: 200, strokeDashoffset: 0 }}
                    />
                  </svg>
                </span>
              </h1>
            </ScrollReveal>

            {/* Subtext */}
            <ScrollReveal delay={200}>
              <p className="animate-fade-up delay-200 mt-8 max-w-lg text-lg leading-relaxed text-white/50">
                Browse verified rental properties across Kampala.
                Apartments, houses, rooms, and commercial spaces.
              </p>
            </ScrollReveal>

            {/* Search bar */}
            <ScrollReveal delay={300}>
              <div className="animate-fade-up delay-300 mt-8 max-w-xl">
                <HeroSearchForm />
              </div>
            </ScrollReveal>

            {/* Quick filter chips */}
            <ScrollReveal delay={400}>
              <nav aria-label="Quick filters" className="animate-fade-up delay-400 mt-5 flex flex-wrap gap-2">
                {quickFilters.map((f) => (
                  <Link
                    key={f.category}
                    href={`/search?category=${f.category}`}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-white/60 transition-all duration-400 hover:border-gold/30 hover:bg-gold/10 hover:text-gold"
                  >
                    {f.label}
                  </Link>
                ))}
              </nav>
            </ScrollReveal>

            {/* Stats — horizontal, compact */}
            <ScrollReveal delay={500}>
              <div className="animate-fade-up delay-500 mt-12 flex gap-10 lg:gap-14">
                {[
                  { value: "2,500+", label: "Listings" },
                  { value: "1,200+", label: "Verified" },
                  { value: "50+", label: "Estates" },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                      {stat.label}
                    </span>
                    {i < 2 && (
                      <span className="ml-6 hidden h-8 w-px bg-white/10 lg:block" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
      </section>

      {/* ═══ SCROLLING TEXT TICKER ═══ */}
      <div
        className="overflow-hidden py-5"
        style={{
          background: "linear-gradient(180deg, #0B1929 0%, rgba(11,25,41,0.95) 100%)",
          borderBottom: "1px solid rgba(212, 168, 83, 0.06)",
        }}
      >
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-4 font-display text-sm uppercase tracking-[0.25em] text-white/50 md:text-base lg:text-lg">
              <span>Apartments</span>
              <span className="text-gold">&#x25C6;</span>
              <span>Houses</span>
              <span className="text-gold">&#x25C6;</span>
              <span>Studios</span>
              <span className="text-gold">&#x25C6;</span>
              <span>Offices</span>
              <span className="text-gold">&#x25C6;</span>
              <span>Warehouses</span>
              <span className="text-gold">&#x25C6;</span>
              <span>Land</span>
              <span className="text-gold">&#x25C6;</span>
              <span>Serviced Stays</span>
              <span className="text-gold">&#x25C6;</span>
              <span>Rooms</span>
              <span className="text-gold mr-8">&#x25C6;</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ SECTION 2: FEATURED VERIFIED PROPERTIES — White bg ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <ScrollReveal>
            <header className="flex items-end justify-between">
              <div>
                <p className="section-label text-gold">HAND-PICKED</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
                  Featured Verified Properties
                </h2>
              </div>
              <Link
                href="/search"
                className="hidden items-center gap-2 text-sm font-semibold text-teal transition-colors hover:text-teal-dark sm:inline-flex"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </header>
          </ScrollReveal>

          <ScrollReveal stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProperties.map((p) => (
              <div key={p.id} className="reveal">
                <PropertyCard
                  id={p.id}
                  title={p.title}
                  category={p.category}
                  estate={p.estate}
                  price={p.price}
                  bedrooms={p.bedrooms}
                  bathrooms={p.bathrooms}
                  photo={p.photos[0]}
                  isVerified={p.isVerified}
                  furnished={p.furnished ? "Furnished" : undefined}
                  parking={p.parking ? 1 : undefined}
                  isGuest
                />
              </div>
            ))}
          </ScrollReveal>

          {/* Mobile view-all link */}
          <ScrollReveal>
            <div className="mt-10 text-center sm:hidden">
              <Link href="/search" className="btn-gold">
                View all listings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 3: THE PATA.UG DIFFERENCE — Navy bg, R/NESS style ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/apartments/apartment_4.jpg"
          alt="Kampala apartment interior"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-center font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-6xl xl:text-7xl">
              The Pata.ug Difference
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {differenceCards.map((card) => (
              <div
                key={card.title}
                className="img-zoom img-reveal reveal group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />
                {/* Text overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-lg font-bold uppercase tracking-wide text-white md:text-xl">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 4: EXPLORE OUR CATEGORIES — Split-screen ═══ */}
      <section className="grid min-h-[600px] lg:grid-cols-2">
        {/* Left half */}
        <ScrollReveal
          variant="left"
          className="flex flex-col justify-center bg-navy px-8 py-20 sm:px-12 lg:px-16 xl:px-24"
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-6xl">
            Explore Our Categories
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
            From affordable single rooms to luxury standalone homes and
            commercial spaces — find exactly what you need across 12
            property categories in Kampala.
          </p>
          <div className="mt-10">
            <Link href="/search" className="btn-gold">
              Browse All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Right half */}
        <ScrollReveal variant="right" className="relative min-h-[400px] lg:min-h-0">
          <Image
            src="/property_images/houses/house_4.jpg"
            alt="Kampala property neighbourhood"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </ScrollReveal>
      </section>

      {/* ═══ SECTION 5: HOW IT WORKS — Full-bleed R/NESS ═══ */}
      <section className="relative overflow-hidden">
        {/* Full-bleed background image */}
        <Image src="/property_images/apartments/apartment_14.jpg" alt="Properties in Kampala" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy/95" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label text-center text-gold">Simple process</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-7xl">
              How It{" "}
              <span className="text-gradient-gold">Works</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-center text-base leading-relaxed text-white/60">
              We manage the entire process — from property search to deal
              closure. Contacts shared only after a successful deal.
            </p>
          </ScrollReveal>

          {/* ── Two-column cards ── */}
          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            {/* For Tenants */}
            <ScrollReveal variant="left">
              <div
                className="group relative overflow-hidden rounded-3xl"
                style={{ transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1)` }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(10,147,150,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Card bg image */}
                <Image src="/property_images/apartments/apartment_3.jpg" alt="Tenant properties" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/60" />

                <div className="relative p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2 text-xs font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-teal/25">
                      <Eye className="h-3.5 w-3.5" />
                      For Tenants
                    </span>
                    <span className="font-display text-6xl font-bold text-white/[0.06]">01</span>
                  </div>

                  <ol className="mt-10 space-y-0">
                    {[
                      { icon: Search, title: "Browse", desc: "Search thousands of verified properties across Kampala with smart filters" },
                      { icon: ShoppingBag, title: "Subscribe", desc: "Buy a Day Pass (UGX 20k) or Annual Subscription for full access" },
                      { icon: MessageCircle, title: "Connect", desc: "We negotiate on your behalf and share landlord contacts once the deal closes" },
                    ].map((s, i) => (
                      <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
                        {i < 2 && <div className="absolute left-[23px] top-[56px] h-[calc(100%-56px)] w-[2px] bg-gradient-to-b from-teal/30 to-teal/5" />}
                        <div className="relative z-10 flex h-[46px] w-[46px] shrink-0 items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-teal/10" />
                          <div className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ background: "linear-gradient(135deg, #0A9396, #077B7E)", boxShadow: "0 4px 16px rgba(10,147,150,0.3)" }}>
                            <s.icon size={18} />
                          </div>
                        </div>
                        <div className="pt-1">
                          <div className="flex items-baseline gap-3">
                            <span className="font-display text-2xl font-bold tracking-tight text-white">{s.title}</span>
                            <span className="text-[10px] font-bold text-teal/60">0{i + 1}</span>
                          </div>
                          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">{s.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Bottom accent */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, #0A9396, transparent)" }} />
              </div>
            </ScrollReveal>

            {/* For Landlords */}
            <ScrollReveal variant="right">
              <div
                className="group relative overflow-hidden rounded-3xl"
                style={{ transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1)` }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(212,98,42,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <Image src="/property_images/houses/house_5.jpg" alt="Landlord properties" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/60" />

                <div className="relative p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2 text-xs font-black uppercase tracking-[0.15em] text-white shadow-lg shadow-orange/25">
                      <Building2 className="h-3.5 w-3.5" />
                      For Landlords
                    </span>
                    <span className="font-display text-6xl font-bold text-white/[0.06]">02</span>
                  </div>

                  <ol className="mt-10 space-y-0">
                    {[
                      { icon: UserCheck, title: "Register", desc: "Sign up and verify your National ID to build trust with tenants" },
                      { icon: ImagePlus, title: "Post", desc: "List your property with photos, pricing, and details in minutes" },
                      { icon: Megaphone, title: "Receive", desc: "Tenant enquiries managed by pata.ug — contacts shared after deal closure" },
                    ].map((s, i) => (
                      <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
                        {i < 2 && <div className="absolute left-[23px] top-[56px] h-[calc(100%-56px)] w-[2px] bg-gradient-to-b from-orange/30 to-orange/5" />}
                        <div className="relative z-10 flex h-[46px] w-[46px] shrink-0 items-center justify-center">
                          <div className="absolute inset-0 rounded-full bg-orange/10" />
                          <div className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ background: "linear-gradient(135deg, #D4622A, #B54E1C)", boxShadow: "0 4px 16px rgba(212,98,42,0.25)" }}>
                            <s.icon size={18} />
                          </div>
                        </div>
                        <div className="pt-1">
                          <div className="flex items-baseline gap-3">
                            <span className="font-display text-2xl font-bold tracking-tight text-white">{s.title}</span>
                            <span className="text-[10px] font-bold text-orange/60">0{i + 1}</span>
                          </div>
                          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">{s.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, #D4622A, transparent)" }} />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="mt-14 text-center">
              <Link href="/how-it-works" className="btn-gold-lg">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 6: BROWSE BY CATEGORY — Full image cards ═══ */}
      <section className="relative overflow-hidden">
        <Image src="/property_images/houses/house_4.jpg" alt="Kampala estates" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/92 to-navy/95" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label text-center text-gold">12 categories</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-7xl">
              Find Your <span className="text-gradient-gold">Perfect</span> Space
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-center text-base leading-relaxed text-white/60">
              From affordable single rooms to luxury homes and commercial spaces across Kampala
            </p>
          </ScrollReveal>

          {/* All 12 categories in a uniform grid with property bg images */}
          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat, i) => {
              const Icon = ICON_MAP[cat.icon];
              const images = [
                "/property_images/apartments/apartment_1.jpg", "/property_images/houses/house_1.jpg",
                "/property_images/houses/house_2.jpg", "/property_images/studios/studio_1.jpg",
                "/property_images/rooms/room_1.jpg", "/property_images/rooms/room_2.jpg",
                "/property_images/rooms/room_3.jpg", "/property_images/commercial/commercial_1.jpg",
                "/property_images/commercial/commercial_2.jpg", "/property_images/commercial/commercial_3.jpg",
                "/property_images/studios/studio_2.jpg", "/property_images/houses/house_3.jpg",
              ];
              return (
                <ScrollReveal key={cat.id} variant="scale" delay={i * 60}>
                  <Link
                    href={`/search?category=${cat.id}`}
                    className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl"
                    style={{ transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(11,25,41,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {/* Background image per category */}
                    <Image src={images[i]} alt={cat.label} fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />

                    {/* Ghost number */}
                    <span className="absolute right-3 top-3 font-display text-4xl font-bold text-white/[0.06] transition-all duration-700 group-hover:text-white/[0.12]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Content at bottom */}
                    <div className="relative p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm transition-all duration-500 group-hover:bg-teal group-hover:shadow-lg group-hover:shadow-teal/20">
                        {Icon ? <Icon className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
                      </div>
                      <p className="mt-3 font-display text-base font-bold tracking-tight text-white">{cat.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/60">{CATEGORY_DESCRIPTIONS[cat.id] ?? "Browse properties"}</p>

                      {/* Explore — slides in on hover */}
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-gold opacity-0 transition-all duration-500 group-hover:opacity-100">
                        Explore <ArrowRight className="h-3.5 w-3.5 -translate-x-2 transition-transform duration-500 group-hover:translate-x-0" />
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, #d4a853, transparent)" }} />
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={800}>
            <div className="mt-14 text-center">
              <Link href="/search" className="btn-gold-lg">Browse All Properties <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 7: PRICING — Split layout with image ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Pricing content */}
            <ScrollReveal variant="left">
              <div>
                <p className="section-label text-gold">Pricing</p>
                <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-navy md:text-5xl">
                  Simple <span className="text-gradient-gold">Pricing</span>
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-text-muted">
                  No hidden fees. Pay via MTN MoMo or Airtel Money.
                </p>

                <div className="mt-10 space-y-4">
                  {/* Client plan card */}
                  <div
                    className="group rounded-2xl bg-navy p-6"
                    style={{ transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(10,147,150,0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="section-label text-teal">Tenant</span>
                      <span className="font-display text-3xl font-bold text-white">UGX 20,000</span>
                    </div>
                    <p className="mt-2 text-sm text-white/60">Per Day Pass — 24-hour access to property contacts and GPS</p>
                  </div>

                  {/* Landlord plan card */}
                  <div
                    className="group rounded-2xl bg-navy p-6"
                    style={{ transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(212,98,42,0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="section-label text-orange">Landlord</span>
                      <span className="font-display text-3xl font-bold text-white">UGX 30,000</span>
                    </div>
                    <p className="mt-2 text-sm text-white/60">Per listing — live for 30 days, reviewed within 24 hours</p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/pricing" className="btn-gold-lg">View all plans <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Property image */}
            <ScrollReveal variant="right">
              <div className="img-zoom relative hidden aspect-[3/4] overflow-hidden rounded-3xl lg:block">
                <Image src="/property_images/houses/house_9.jpg" alt="Premium property" fill sizes="50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">Annual savings</p>
                  <p className="mt-1 font-display text-2xl font-bold text-white">Save UGX 40,000+</p>
                  <p className="mt-1 text-xs text-white/60">Switch to annual for unlimited access</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: WHY US + FINAL CTA — Dark immersive ═══ */}
      <section className="relative overflow-hidden">
        <Image src="/property_images/houses/house_8.jpg" alt="Properties in Kampala" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy/95" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label text-center text-gold">Why choose us</p>
            <h2 className="mt-3 text-center font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-6xl">
              Why <span className="text-gradient-gold">Pata.ug</span>?
            </h2>
          </ScrollReveal>

          {/* 3 trust cards */}
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              { icon: Shield, title: "Verified Properties", desc: "Every listing can earn a Verified badge through our on-ground inspection team. Real photos, real properties.", accent: "#0A9396" },
              { icon: CreditCard, title: "Transparent Pricing", desc: "No hidden fees or broker commissions. Pay via MTN MoMo or Airtel Money — instant and secure.", accent: "#d4a853" },
              { icon: Phone, title: "Managed Deals", desc: "We handle tenant-landlord negotiations. Contacts are shared only after a successful deal closure.", accent: "#D4622A" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} variant="scale" delay={i * 100}>
                <div
                  className="group relative overflow-hidden rounded-3xl bg-white/[0.04] p-8 text-center backdrop-blur-sm"
                  style={{ transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = `0 24px 48px ${item.accent}15`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(135deg, ${item.accent}10, transparent)` }} />
                  <div className="relative">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: `${item.accent}15` }}>
                      <item.icon className="h-8 w-8" style={{ color: item.accent }} />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }} />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Trusted estates */}
          <ScrollReveal delay={400}>
            <div className="mt-20 flex flex-col items-center gap-4">
              <p className="text-sm text-white/60">Trusted by landlords across Uganda</p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Kololo", "Bukoto", "Muyenga", "Naguru", "Entebbe", "Ntinda"].map((estate) => (
                  <span key={estate} className="rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-white/70">{estate}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Final CTA */}
          <ScrollReveal delay={500}>
            <div className="mt-20 rounded-3xl bg-white/[0.04] p-10 text-center backdrop-blur-sm md:p-16">
              <h3 className="font-display text-3xl font-bold uppercase tracking-tighter text-white md:text-4xl lg:text-5xl">
                Ready to <span className="text-gradient-gold">Start</span>?
              </h3>
              <p className="mx-auto mt-4 max-w-md text-base text-white/60">
                Join thousands of tenants and landlords already using pata.ug
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/search" className="btn-gold-lg">Browse Properties <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/login" className="btn-outline-white px-8 py-4 text-base">Get Started <ArrowRight className="h-4 w-4" /></Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-white/60">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green" /> No signup required to browse</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green" /> Pay via MoMo or Airtel</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green" /> Cancel anytime</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
