"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "@/components/Img";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ClipboardCheck,
  Shield,
  Handshake,
  TrendingUp,
  Users,
  CreditCard,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  Calendar,
  Eye,
  Building2,
  MapPin,
  UserCheck,
  Clock,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
const T = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ── Stats ── */
const STATS = [
  { label: "Listings Under Review", value: "14", icon: ClipboardCheck, accent: "#d4a853" },
  { label: "Verification Queue", value: "8", icon: Shield, accent: "#d4a853" },
  { label: "Active Deals", value: "23", icon: Handshake, accent: "#0A9396" },
  { label: "Monthly Revenue", value: "UGX 4.2M", icon: TrendingUp, accent: "#1F8A44" },
  { label: "Active Users", value: "1,847", icon: Users, accent: "#D4622A" },
  { label: "Agency Fees Collected", value: "UGX 890K", icon: CreditCard, accent: "#d4a853" },
] as const;

/* ── Listing Reviews ── */
type ReviewStatus = "under_review" | "approved" | "flagged";
interface ListingReview {
  id: string;
  property: string;
  estate: string;
  landlord: string;
  submitted: string;
  rent: string;
  status: ReviewStatus;
}

const REVIEWS: ListingReview[] = [
  { id: "lr-001", property: "3-Bed Apartment in Bukoto", estate: "Bukoto", landlord: "James Mukasa", submitted: "22 Mar", rent: "UGX 1.8M", status: "under_review" },
  { id: "lr-002", property: "Studio Flat in Naguru", estate: "Naguru", landlord: "Grace Achieng", submitted: "21 Mar", rent: "UGX 800K", status: "under_review" },
  { id: "lr-003", property: "2-Bed Standalone in Kololo", estate: "Kololo", landlord: "Peter Ssemwogerere", submitted: "20 Mar", rent: "UGX 5M", status: "approved" },
  { id: "lr-004", property: "4-Bed Duplex in Kyanja", estate: "Kyanja", landlord: "Dorothy Namubiru", submitted: "19 Mar", rent: "UGX 2.5M", status: "flagged" },
  { id: "lr-005", property: "1-Bed Apartment in Bugolobi", estate: "Bugolobi", landlord: "Hassan Kateregga", submitted: "18 Mar", rent: "UGX 2M", status: "under_review" },
];

function reviewStyles(s: ReviewStatus) {
  if (s === "approved") return { bg: "rgba(31,138,68,0.15)", color: "#1F8A44", label: "Approved" };
  if (s === "flagged") return { bg: "rgba(192,48,58,0.15)", color: "#C0303A", label: "Flagged" };
  return { bg: "rgba(212,168,83,0.15)", color: "#d4a853", label: "Under Review" };
}

/* ── Verification Visits ── */
type VisitStatus = "scheduled" | "completed" | "pending";
interface Visit {
  id: string;
  date: string;
  property: string;
  estate: string;
  landlord: string;
  agent: string;
  status: VisitStatus;
}

const VISITS: Visit[] = [
  { id: "vv-001", date: "24 Mar", property: "2-Bed Apartment in Muyenga", estate: "Muyenga", landlord: "Sarah Nakabugo", agent: "David Ochieng", status: "scheduled" },
  { id: "vv-002", date: "25 Mar", property: "3-Bed Bungalow in Ntinda", estate: "Ntinda", landlord: "Robert Kizza", agent: "Faith Nabukera", status: "scheduled" },
  { id: "vv-003", date: "21 Mar", property: "1-Bed Studio in Kamwokya", estate: "Kamwokya", landlord: "Moses Lubwama", agent: "David Ochieng", status: "completed" },
  { id: "vv-004", date: "26 Mar", property: "4-Bed Mansion in Munyonyo", estate: "Munyonyo", landlord: "Agnes Tusiime", agent: "Faith Nabukera", status: "pending" },
];

function visitStyles(s: VisitStatus) {
  if (s === "completed") return { bg: "rgba(31,138,68,0.15)", color: "#1F8A44", label: "Completed" };
  if (s === "pending") return { bg: "rgba(224,140,16,0.15)", color: "#E08C10", label: "Pending" };
  return { bg: "rgba(212,168,83,0.15)", color: "#d4a853", label: "Scheduled" };
}

/* ── Quick Actions ── */
const ACTIONS = [
  { label: "Review Listings", desc: "Approve, reject, or flag new submissions", href: "/admin/listings", icon: ClipboardCheck },
  { label: "Schedule Verification", desc: "Assign field agents to property visits", href: "/admin/verification", icon: Shield },
  { label: "View Deals", desc: "Monitor deal progress and agency fees", href: "/admin/deals", icon: Handshake },
  { label: "Financial Reports", desc: "Revenue breakdowns and payouts", href: "/admin/reports", icon: TrendingUp },
] as const;

/* ------------------------------------------------------------------ */
export default function AdminDashboardPage() {
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-UG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    );
  }, []);

  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/commercial/commercial_5.jpg" alt="Admin overview" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(212,168,83,0.12),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <ScrollReveal>
            <div className="grid items-center gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <p className="section-label text-gold">Internal Dashboard</p>
                <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-white sm:text-5xl lg:text-6xl">
                  Admin <span className="text-gradient-gold">Overview</span>
                </h1>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
                  Manage listings, verifications, deals, and platform revenue across Kampala.
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm text-white/50">
                  <Calendar className="h-4 w-4 text-gold" />
                  {currentDate}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-2 lg:justify-end">
                <Link href="/admin/reports" className="btn-gold">
                  <TrendingUp className="h-4 w-4" />
                  Reports
                </Link>
                <Link
                  href="/admin/users"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur-sm"
                  style={{ transition: `all 500ms ${T}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <Users className="h-4 w-4 text-gold" />
                  User Management
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={stat.label} variant="scale" delay={i * 80}>
                  <div
                    className="group flex items-center gap-4 rounded-2xl bg-navy p-5"
                    style={{ transition: `all 500ms ${T}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${stat.accent}15`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${stat.accent}15` }}>
                      <Icon className="h-6 w-6" style={{ color: stat.accent }} />
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold tracking-tighter text-white">{stat.value}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">{stat.label}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ LISTING REVIEW QUEUE — Split layout ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left: header + image */}
            <div className="lg:col-span-2">
              <ScrollReveal variant="left">
                <p className="section-label text-gold">Moderation</p>
                <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tighter text-navy md:text-4xl">
                  Listing <span className="text-gradient-gold">Review</span>
                </h2>
                <p className="mt-4 leading-relaxed text-text-muted">
                  {REVIEWS.filter((r) => r.status === "under_review").length} listings awaiting review.
                  Target: approve or reject within 24 hours of submission.
                </p>

                {/* Status summary cards */}
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { label: "Pending", count: REVIEWS.filter((r) => r.status === "under_review").length, color: "#d4a853" },
                    { label: "Approved", count: REVIEWS.filter((r) => r.status === "approved").length, color: "#1F8A44" },
                    { label: "Flagged", count: REVIEWS.filter((r) => r.status === "flagged").length, color: "#C0303A" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-smoke p-4 text-center">
                      <p className="font-display text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="img-zoom relative mt-8 hidden aspect-[16/10] overflow-hidden rounded-3xl lg:block">
                  <Image src="/property_images/apartments/apartment_11.jpg" alt="Property review" fill sizes="40vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                </div>
              </ScrollReveal>
            </div>

            {/* Right: table */}
            <div className="lg:col-span-3">
              <ScrollReveal variant="right">
                <div className="overflow-hidden rounded-2xl bg-navy">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left text-sm">
                      <thead>
                        <tr>
                          {["Property", "Landlord", "Rent", "Status", "Action"].map((h) => (
                            <th key={h} className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-gold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {REVIEWS.map((row, i) => {
                          const st = reviewStyles(row.status);
                          return (
                            <tr
                              key={row.id}
                              className={i % 2 === 0 ? "bg-white/[0.02]" : ""}
                              style={{ transition: `background-color 500ms ${T}` }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(212,168,83,0.06)"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"; }}
                            >
                              <td className="px-5 py-4">
                                <p className="font-medium text-white">{row.property}</p>
                                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/50">
                                  <MapPin className="h-3 w-3 text-gold" />{row.estate} <span className="text-white/60">/ {row.submitted}</span>
                                </p>
                              </td>
                              <td className="px-5 py-4 text-white/70">{row.landlord}</td>
                              <td className="px-5 py-4 font-display font-bold text-white">{row.rent}</td>
                              <td className="px-5 py-4">
                                <span className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex gap-1.5">
                                  <button className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold" style={{ background: "rgba(31,138,68,0.15)", color: "#1F8A44", transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(31,138,68,0.3)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(31,138,68,0.15)"; }}>
                                    <Check className="inline h-3.5 w-3.5" /> Approve
                                  </button>
                                  <button className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold" style={{ background: "rgba(192,48,58,0.12)", color: "#C0303A", transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(192,48,58,0.25)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(192,48,58,0.12)"; }}>
                                    <X className="inline h-3.5 w-3.5" /> Reject
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VERIFICATION SCHEDULE ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/houses/house_6.jpg" alt="Field verification" fill sizes="100vw" className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-navy/85" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <p className="section-label text-gold">Field Operations</p>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tighter text-white md:text-4xl">
                Verification <span className="text-gradient-gold">Schedule</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {VISITS.map((visit, i) => {
              const st = visitStyles(visit.status);
              return (
                <ScrollReveal key={visit.id} variant="scale" delay={i * 100}>
                  <div
                    className="group rounded-2xl bg-white/[0.04] p-6 backdrop-blur-sm"
                    style={{ transition: `all 600ms ${T}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${st.color}15` }}>
                          <Calendar className="h-5 w-5" style={{ color: st.color }} />
                        </div>
                        <div>
                          <p className="font-display text-base font-bold tracking-tight text-white">{visit.property}</p>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-gold" />{visit.date}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-teal" />{visit.estate}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
                            <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{visit.landlord}</span>
                            <span className="flex items-center gap-1"><UserCheck className="h-3 w-3 text-gold" />{visit.agent}</span>
                          </div>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ REVENUE — Split layout ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label text-gold">Financials</p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tighter text-navy md:text-4xl">
              Revenue <span className="text-gradient-gold">Overview</span>
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {/* This Month */}
              <div
                className="rounded-3xl bg-navy p-8"
                style={{ transition: `all 500ms ${T}`, animation: `fadeInUp 600ms ${T} 100ms both` }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(11,25,41,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15">
                    <TrendingUp className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">This Month</h3>
                </div>

                <div className="mt-8 space-y-5">
                  {[
                    { label: "Listing Fees", value: "UGX 1.8M", color: "#fff" },
                    { label: "Deal Agency Fees", value: "UGX 2.4M", color: "#fff" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-sm text-white/60">{row.label}</span>
                      <span className="font-display text-lg font-bold tracking-tighter" style={{ color: row.color }}>{row.value}</span>
                    </div>
                  ))}
                  <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.2), transparent)" }} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gold">Total Revenue</span>
                    <span className="font-display text-3xl font-bold tracking-tighter text-gold">UGX 4.2M</span>
                  </div>
                </div>
              </div>

            {/* Subscriptions */}
              <div
                className="rounded-3xl bg-navy p-8"
                style={{ transition: `all 500ms ${T}`, animation: `fadeInUp 600ms ${T} 200ms both` }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(11,25,41,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15">
                    <CreditCard className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">Subscriptions</h3>
                </div>

                <div className="mt-8 space-y-5">
                  {[
                    { label: "Day Passes Sold", value: "342", accent: "#0A9396" },
                    { label: "Tenant Annual", value: "89", accent: "#0A9396" },
                    { label: "Landlord Annual", value: "34", accent: "#D4622A" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-white/60">
                        <span className="h-2 w-2 rounded-full" style={{ background: row.accent }} />
                        {row.label}
                      </span>
                      <span className="font-display text-xl font-bold tracking-tighter text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* ═══ QUICK ACTIONS ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.06),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label text-gold">Navigation</p>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tighter text-white md:text-3xl">
              Quick Actions
            </h2>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACTIONS.map((action, i) => {
              const Icon = action.icon;
              return (
                <ScrollReveal key={action.label} variant="scale" delay={i * 100}>
                  <Link
                    href={action.href}
                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/[0.04] p-6 backdrop-blur-sm"
                    style={{ transition: `all 600ms ${T}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="mt-5 font-display text-base font-bold tracking-tight text-white">{action.label}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{action.desc}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-bold text-gold">
                      Open
                      <ChevronRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, #d4a853, transparent)" }} />
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
