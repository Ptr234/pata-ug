"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Img";
import ScrollReveal from "@/components/ScrollReveal";
import StatusBadge from "@/components/StatusBadge";
import { getUserProfile } from "@/lib/user";
import {
  Building2, Eye, Handshake, TrendingUp, Plus, Edit, RefreshCw,
  Shield, ArrowRight, MoreHorizontal, Check, Circle, CheckCircle2,
  FileText, Camera, BadgeCheck, MessageSquare, Wallet, MapPin, Clock, ChevronRight,
} from "lucide-react";
import { properties, deals } from "@/lib/mock-data";

/* ── Types ── */
type ListingStatus = "live" | "under_review" | "expired" | "rented";
interface LandlordListing { id: string; title: string; estate: string; price: number; photo: string; status: ListingStatus; views: number; }
interface VerificationEntry { propertyTitle: string; badge: "verified" | "expiring" | "unverified"; expiryDate: string | null; }
interface ChecklistItem { label: string; done: boolean; icon: React.ElementType; desc: string; }

/* ── Data ── */
const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const landlordListings: LandlordListing[] = [
  { id: properties[0].id, title: properties[0].title, estate: properties[0].estate, price: properties[0].price, photo: properties[0].photos[0], status: "live", views: 342 },
  { id: properties[1].id, title: properties[1].title, estate: properties[1].estate, price: properties[1].price, photo: properties[1].photos[0], status: "live", views: 518 },
  { id: properties[2].id, title: properties[2].title, estate: properties[2].estate, price: properties[2].price, photo: properties[2].photos[0], status: "under_review", views: 0 },
  { id: properties[3].id, title: properties[3].title, estate: properties[3].estate, price: properties[3].price, photo: properties[3].photos[0], status: "rented", views: 178 },
  { id: properties[4].id, title: properties[4].title, estate: properties[4].estate, price: properties[4].price, photo: properties[4].photos[0], status: "live", views: 204 },
  { id: properties[5].id, title: properties[5].title, estate: properties[5].estate, price: properties[5].price, photo: properties[5].photos[0], status: "expired", views: 86 },
];

const verificationData: VerificationEntry[] = [
  { propertyTitle: "Modern 2\u2011Bedroom in Bukoto", badge: "verified", expiryDate: "2026-09-10" },
  { propertyTitle: "Luxury Standalone in Kololo", badge: "verified", expiryDate: "2026-08-05" },
  { propertyTitle: "2\u2011Bedroom in Bugolobi", badge: "expiring", expiryDate: "2026-04-02" },
  { propertyTitle: "Cosy Studio in Naguru", badge: "unverified", expiryDate: null },
];

const checklist: ChecklistItem[] = [
  { label: "Verify your National ID", done: true, icon: Shield, desc: "Identity confirmed with NIRA" },
  { label: "Post your first listing", done: true, icon: FileText, desc: "Property submitted for review" },
  { label: "Upload property photos", done: true, icon: Camera, desc: "Minimum 3 photos uploaded" },
  { label: "Request a Verified badge", done: false, icon: BadgeCheck, desc: "Schedule an agent visit" },
  { label: "Respond to a deal request", done: false, icon: MessageSquare, desc: "Confirm or reject tenant offers" },
  { label: "Complete agency fee payment", done: false, icon: Wallet, desc: "Pay 5% on confirmed deals" },
];

const STATS = [
  { label: "Active Listings", value: "8", icon: Building2, accent: "#D4622A" },
  { label: "Total Views", value: "1,247", icon: Eye, accent: "#D4622A" },
  { label: "Pending Deals", value: "3", icon: Handshake, accent: "#d4a853" },
  { label: "Revenue", value: "UGX 2.45M", icon: TrendingUp, accent: "#1F8A44" },
] as const;

const LISTING_TABS = ["All", "Active", "Under Review", "Expired", "Rented"] as const;
type ListingTab = (typeof LISTING_TABS)[number];
function tabToStatus(tab: ListingTab): ListingStatus | null {
  if (tab === "All") return null;
  if (tab === "Active") return "live";
  if (tab === "Under Review") return "under_review";
  if (tab === "Expired") return "expired";
  return "rented";
}

function formatUGX(n: number) { return `UGX ${n.toLocaleString("en-UG")}`; }
function dealLabel(s: string) {
  const labels: Record<string, string> = {
    pending: "New Request",
    negotiating: "Negotiating",
    agreed: "Awaiting Payment",
    payment_confirmed: "Awaiting Close",
    closed: "Closed",
    awaiting_landlord: "Awaiting Response",
    confirmed: "Confirmed",
    commission_paid: "Agency Fee Paid",
  };
  return labels[s] || s;
}

/* ── Page ── */
export default function LandlordDashboardPage() {
  const [activeTab, setActiveTab] = useState<ListingTab>("All");
  const selectedStatus = tabToStatus(activeTab);
  const filtered = selectedStatus ? landlordListings.filter((l) => l.status === selectedStatus) : landlordListings;
  const incoming = deals.filter((d) => d.status !== "closed" && d.status !== "commission_paid"); // commission_paid kept for legacy compat
  const doneCount = checklist.filter((c) => c.done).length;

  return (
    <main className="min-h-screen">
      {/* ═══ HERO — Full-bleed split ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/houses/house_14.jpg" alt="Landlord property" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(212,98,42,0.1),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <ScrollReveal>
            <div className="grid items-center gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <p className="section-label text-orange">Landlord Dashboard</p>
                <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-white sm:text-5xl lg:text-6xl">
                  Welcome <span style={{ color: "#D4622A" }}>back</span>,
                  <br className="hidden sm:block" />{getUserProfile().fullName}
                </h1>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
                  Manage your properties, track tenant interest, and close deals across Kampala.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/landlord/listings/new" className="btn-gold">
                    <Plus className="h-4 w-4" /> List New Property
                  </Link>
                  <Link href="/landlord/billing" className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm" style={{ transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <Wallet className="h-4 w-4 text-orange" /> Billing
                  </Link>
                </div>
              </div>
              {/* Right: Quick stats as frosted cards */}
              <div className="grid grid-cols-2 gap-3 lg:col-span-2">
                {STATS.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="rounded-2xl bg-white/[0.04] p-5 backdrop-blur-sm" style={{ transition: `all 500ms ${T}`, animation: `fadeInUp 600ms ${T} ${i * 80}ms both` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(-4px)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${stat.accent}15` }}>
                        <Icon className="h-5 w-5" style={{ color: stat.accent }} />
                      </div>
                      <p className="mt-3 font-display text-2xl font-bold tracking-tighter text-white">{stat.value}</p>
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PROPERTY PORTFOLIO — Visual card grid ═══ */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label text-orange">Property Portfolio</p>
                <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tighter text-navy md:text-4xl">My Listings</h2>
              </div>
              {/* Filter tabs */}
              <nav className="flex flex-wrap gap-2" aria-label="Listing filters">
                {LISTING_TABS.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${activeTab === tab ? "bg-orange text-white" : "bg-navy/10 text-navy/60 hover:bg-navy/20"}`} style={{ transition: `all 500ms ${T}` }}>
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </ScrollReveal>

          {/* Listing cards — image-based grid instead of table */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing, i) => (
              <ScrollReveal key={listing.id} variant="scale" delay={i * 80}>
                <div className="group relative overflow-hidden rounded-2xl bg-navy" style={{ transition: `all 600ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(11,25,41,0.25)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  {/* Photo */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={listing.photo} alt={listing.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                    {/* Status badge */}
                    <div className="absolute right-3 top-3"><StatusBadge status={listing.status} /></div>
                    {/* Views */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                      <Eye className="h-3 w-3" />{listing.views}
                    </div>
                    {/* Price overlay */}
                    <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                      <p className="font-display text-xl font-bold tracking-tighter text-white">{formatUGX(listing.price)}<span className="ml-1 text-xs font-normal text-white/60">/mo</span></p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <p className="truncate font-display text-sm font-bold tracking-tight text-white">{listing.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-white/60"><MapPin className="h-3 w-3 text-orange" />{listing.estate}</p>
                    {/* Actions */}
                    <div className="mt-3 flex gap-2">
                      <Link href={`/property/${listing.id}`} className="inline-flex items-center gap-1 rounded-lg bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold text-white/70" style={{ transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,98,42,0.15)"; e.currentTarget.style.color = "#D4622A"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}>
                        <Edit className="h-3 w-3" /> Edit
                      </Link>
                      {listing.status === "expired" && (
                        <button className="inline-flex items-center gap-1 rounded-lg bg-orange/15 px-3 py-1.5 text-[11px] font-bold text-orange" style={{ transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,98,42,0.3)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,98,42,0.15)"; }}>
                          <RefreshCw className="h-3 w-3" /> Reactivate
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Bottom accent */}
                  <div className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, #D4622A, transparent)" }} />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-navy py-16 text-center">
              <Building2 className="h-10 w-10 text-white/60" />
              <p className="mt-4 text-sm font-medium text-white/60">No listings match this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ CHECKLIST + DEALS — Split layout ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left: Checklist (3/5) */}
            <div className="lg:col-span-3">
              <ScrollReveal variant="left">
                <div className="rounded-3xl bg-navy p-6 sm:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="section-label text-orange">Getting Started</p>
                      <h2 className="mt-2 font-display text-2xl font-bold tracking-tighter text-white">Landlord Checklist</h2>
                    </div>
                    <div className="relative flex h-14 w-14 items-center justify-center">
                      <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56"><circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" /><circle cx="28" cy="28" r="24" fill="none" stroke="#D4622A" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${(doneCount / checklist.length) * 150.8} 150.8`} /></svg>
                      <span className="absolute text-xs font-bold text-orange">{doneCount}/{checklist.length}</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {checklist.map((item) => (
                      <li key={item.label} className="flex items-center gap-4 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.03)", transition: `background 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                        {item.done ? <CheckCircle2 className="h-5 w-5 shrink-0 text-green" /> : <Circle className="h-5 w-5 shrink-0 text-gold" />}
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm ${item.done ? "text-white/60 line-through" : "font-medium text-white"}`}>{item.label}</p>
                          <p className="mt-0.5 truncate text-[11px] text-white/70">{item.desc}</p>
                        </div>
                        {item.done ? (
                          <span className="shrink-0 rounded-full bg-green/12 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-green">Done</span>
                        ) : (
                          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-gold/12 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold"><span className="h-1.5 w-1.5 rounded-full bg-gold" />Pending</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Deals (2/5) */}
            <div className="lg:col-span-2">
              <ScrollReveal variant="right">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="section-label text-orange">Incoming</p>
                    <h2 className="mt-2 font-display text-xl font-bold tracking-tighter text-navy">Deal Requests</h2>
                  </div>
                  <Link href="/deals" className="inline-flex items-center gap-1 text-xs font-bold text-orange" style={{ transition: `all 500ms ${T}` }}>View all <ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
                <div className="space-y-3">
                  {incoming.map((deal, i) => (
                    <div key={deal.id} className="group rounded-2xl bg-navy p-5" style={{ transition: `all 500ms ${T}`, animation: `fadeInUp 600ms ${T} ${i * 80}ms both` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(11,25,41,0.2)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-display text-sm font-bold tracking-tight text-white">{deal.propertyTitle}</p>
                        <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ background: deal.status === "pending" ? "rgba(212,168,83,0.15)" : "rgba(212,98,42,0.15)", color: deal.status === "pending" ? "#d4a853" : "#D4622A" }}>{dealLabel(deal.status)}</span>
                      </div>
                      <p className="mt-1.5 flex items-center gap-2 text-xs text-white/60"><MapPin className="h-3 w-3 text-orange" />{deal.estate} <span className="text-white/70">/ {deal.date}</span></p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="font-display text-lg font-bold tracking-tighter text-white">{formatUGX(deal.agreedRent)}<span className="text-xs font-normal text-white/60">/mo</span></p>
                        <ChevronRight className="h-4 w-4 text-white/60 transition-all duration-500 group-hover:translate-x-1 group-hover:text-orange" />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VERIFICATION STATUS ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/houses/house_2.jpg" alt="Verified properties" fill sizes="100vw" className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-navy/85" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label text-gold">Trust and Safety</p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tighter text-white md:text-4xl">
              Verification <span className="text-gradient-gold">Status</span>
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {verificationData.map((entry, i) => {
              const colors = entry.badge === "verified" ? { bg: "rgba(212,168,83,0.12)", icon: "#d4a853" } : entry.badge === "expiring" ? { bg: "rgba(224,140,16,0.12)", icon: "#E08C10" } : { bg: "rgba(255,255,255,0.04)", icon: "rgba(255,255,255,0.5)" };
              return (
                <ScrollReveal key={entry.propertyTitle} variant="scale" delay={i * 80}>
                  <div className="group flex items-center gap-4 rounded-2xl bg-white/[0.04] p-5 backdrop-blur-sm" style={{ transition: `all 600ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: colors.bg }}>
                      <Shield className="h-5 w-5" style={{ color: colors.icon }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-bold tracking-tight text-white">{entry.propertyTitle}</p>
                      {entry.expiryDate && <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/60"><Clock className="h-3 w-3" />Expires: {entry.expiryDate}</p>}
                    </div>
                    {entry.badge === "verified" && <span className="shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(212,168,83,0.15)", color: "#d4a853" }}>Verified</span>}
                    {entry.badge === "expiring" && <span className="shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(224,140,16,0.15)", color: "#E08C10" }}>Expiring</span>}
                    {entry.badge === "unverified" && <Link href="/verified" className="btn-gold shrink-0 !px-4 !py-1.5 !text-[10px]">Verify</Link>}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ BILLING SUMMARY ═══ */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="section-label text-orange">Financials</p>
                <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tighter text-navy md:text-3xl">Billing Summary</h2>
              </div>
              <Link href="/landlord/billing" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Total Listing Fees", value: "UGX 240,000", sub: "8 listings x UGX 30,000", accent: "#D4622A" },
              { label: "Total Agency Fees", value: "UGX 340,000", sub: "5% of confirmed deals", accent: "#d4a853" },
              { label: "Current Plan", value: "Pay-Per-Listing", sub: "UGX 30,000 per listing", accent: "#0A9396" },
            ].map((card, i) => (
              <ScrollReveal key={card.label} variant="scale" delay={i * 100}>
                <div className="rounded-2xl bg-navy p-6" style={{ transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${card.accent}15`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">{card.label}</p>
                  <p className="mt-3 font-display text-2xl font-bold tracking-tighter text-white">{card.value}</p>
                  <p className="mt-1 text-xs text-white/60">{card.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
