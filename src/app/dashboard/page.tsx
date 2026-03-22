"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { getUserProfile, getFirstName } from "@/lib/user";
import {
  Eye,
  Phone,
  Handshake,
  Bookmark,
  Clock,
  ArrowRight,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Circle,
  MapPin,
  Shield,
  Search,
  ChevronRight,
  Calendar,
  Wallet,
} from "lucide-react";
import { properties, deals } from "@/lib/mock-data";
import type { DealStatus } from "@/lib/mock-data";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatUGX(amount: number): string {
  return new Intl.NumberFormat("en-UG", { maximumFractionDigits: 0 }).format(amount);
}

function getDealStatusStyle(status: DealStatus) {
  switch (status) {
    case "pending":
      return { bg: "rgba(78,63,168,0.15)", text: "#9B8FD8" };
    case "negotiating":
      return { bg: "rgba(212,168,83,0.15)", text: "#d4a853" };
    case "agreed":
      return { bg: "rgba(224,140,16,0.15)", text: "#E08C10" };
    case "payment_confirmed":
    case "confirmed":
      return { bg: "rgba(31,138,68,0.15)", text: "#1F8A44" };
    case "closed":
    case "commission_paid":
      return { bg: "rgba(10,147,150,0.15)", text: "#0A9396" };
    case "awaiting_landlord":
      return { bg: "rgba(224,140,16,0.15)", text: "#E08C10" };
    default:
      return { bg: "rgba(255,255,255,0.06)", text: "rgba(255,255,255,0.5)" };
  }
}

const DEAL_STATUS_LABELS: Record<string, string> = {
  pending: "Requested",
  negotiating: "Negotiating",
  agreed: "Pay to Confirm",
  payment_confirmed: "Close Deal",
  closed: "Closed",
  awaiting_landlord: "Awaiting Landlord",
  confirmed: "Confirmed",
  commission_paid: "Agency Fee Paid",
};

function formatDealStatus(status: DealStatus): string {
  return DEAL_STATUS_LABELS[status] || status.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STATS = [
  { label: "Properties Viewed", value: "47", icon: Eye, accent: "#0A9396" },
  { label: "Contacts Unlocked", value: "12", icon: Phone, accent: "#0A9396" },
  { label: "Deals Initiated", value: "3", icon: Handshake, accent: "#d4a853" },
  { label: "Saved Searches", value: "5", icon: Bookmark, accent: "#0A9396" },
] as const;

const CHECKLIST = [
  { id: "profile", label: "Complete your profile", desc: "Add your name, phone, and National ID", done: true },
  { id: "browse", label: "Browse verified listings", desc: "Search properties across Kampala estates", done: true },
  { id: "pass", label: "Purchase a Day Pass or Annual", desc: "Unlock landlord contacts and GPS coordinates", done: true },
  { id: "save", label: "Save properties to your shortlist", desc: "Bookmark listings to compare later", done: false },
  { id: "contact", label: "Request a property through pata.ug", desc: "We negotiate and manage the deal for you", done: false },
  { id: "deal", label: "Confirm a deal on a property", desc: "Agree on rent and close the deal", done: false },
] as const;

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const [seconds, setSeconds] = useState(23 * 3600 + 14 * 60);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const pct = (seconds / (24 * 3600)) * 100;
  const doneCount = CHECKLIST.filter((c) => c.done).length;
  const recent = properties.slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* ═══ HERO — Full-bleed dark with split layout ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/apartments/apartment_8.jpg"
          alt="Tenant dashboard property view"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/80" />
        {/* Atmosphere */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(10,147,150,0.1),transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
            {/* Left col (3/5) */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <p className="section-label text-teal">Tenant Dashboard</p>
                <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-white sm:text-5xl lg:text-6xl">
                  Welcome{" "}
                  <span className="text-gradient-teal">back</span>,{" "}
                  <br className="hidden sm:block" />
                  {getFirstName(getUserProfile())}
                </h1>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
                  Track your property search progress, manage deals, and stay on
                  top of your rental journey across Kampala.
                </p>

                {/* Quick action links */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/[0.05] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/60"
                    style={{ transition: `all 500ms ${T}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(10,147,150,0.12)";
                      e.currentTarget.style.color = "#0A9396";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    }}
                  >
                    <Search className="h-3.5 w-3.5" />
                    Browse
                  </Link>
                  <Link
                    href="/deals"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/[0.05] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/60"
                    style={{ transition: `all 500ms ${T}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(10,147,150,0.12)";
                      e.currentTarget.style.color = "#0A9396";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    }}
                  >
                    <Handshake className="h-3.5 w-3.5" />
                    My Deals
                  </Link>
                  <Link
                    href="/account/profile"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/[0.05] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/60"
                    style={{ transition: `all 500ms ${T}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(10,147,150,0.12)";
                      e.currentTarget.style.color = "#0A9396";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    }}
                  >
                    <Shield className="h-3.5 w-3.5" />
                    Profile
                  </Link>
                </div>

                {/* Wallet — compact inline card */}
                <div
                  className="mt-6 flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3"
                  style={{ transition: `all 500ms ${T}`, maxWidth: "320px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/15">
                    <Wallet size={16} className="text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-wider text-white/30">Wallet Balance</p>
                    <p className="font-display text-lg font-bold tracking-tight text-white">UGX {Number(typeof window !== "undefined" ? localStorage.getItem("pata-wallet") || "0" : "0").toLocaleString("en-UG")}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTopUpOpen(true)}
                    className="rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white"
                    style={{ background: "#C0303A", transition: `all 400ms ${T}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#A52830"; e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#C0303A"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    Top Up
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Right col (2/5) — Pass status card */}
            <div className="lg:col-span-2">
              <ScrollReveal variant="right">
                <div
                  className="overflow-hidden rounded-3xl p-[1px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(10,147,150,0.3), rgba(212,168,83,0.15), rgba(10,147,150,0.1))",
                  }}
                >
                  <div className="rounded-[calc(1.5rem-1px)] bg-navy p-6 sm:p-8">
                    {/* Status header */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green/10">
                        <div className="relative">
                          <Shield className="h-7 w-7 text-green" />
                          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-green" />
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-display text-lg font-bold tracking-tight text-white">
                          Day Pass Active
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/70">
                          <Clock className="h-3.5 w-3.5" />
                          {hrs}h {String(mins).padStart(2, "0")}m remaining
                        </p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em]">
                        <span className="text-teal">Time remaining</span>
                        <span className="text-white/60">{Math.round(pct)}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: "linear-gradient(90deg, #0A9396, #077B7E)",
                            boxShadow: "0 0 12px rgba(10,147,150,0.3)",
                            transition: `width 1000ms ${T}`,
                          }}
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 flex gap-3">
                      <Link href="/pricing" className="btn-gold flex-1 !py-3 !text-xs">
                        <CreditCard className="h-4 w-4" />
                        Renew Pass
                      </Link>
                      <Link
                        href="/pricing"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/[0.05] py-3 text-xs font-bold text-white/60"
                        style={{ transition: `all 500ms ${T}` }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                          e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                        }}
                      >
                        <TrendingUp className="h-4 w-4" />
                        Go Annual
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS — Inline on dark strip ═══ */}
      <section className="bg-navy" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={stat.label} variant="scale" delay={i * 80}>
                  <div
                    className="group flex items-center gap-4 rounded-2xl bg-white/[0.03] px-5 py-4"
                    style={{ transition: `all 500ms ${T}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${stat.accent}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: stat.accent }} />
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold tracking-tighter text-white">
                        {stat.value}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CHECKLIST + RECENTLY VIEWED — Split layout ═══ */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left: Checklist (3/5) */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div className="rounded-3xl bg-navy p-6 sm:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="section-label text-teal">Getting Started</p>
                      <h2 className="mt-2 font-display text-2xl font-bold tracking-tighter text-white">
                        Property Search Checklist
                      </h2>
                    </div>
                    {/* Circular progress */}
                    <div className="relative flex h-14 w-14 items-center justify-center">
                      <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                        <circle
                          cx="28" cy="28" r="24" fill="none" stroke="#0A9396" strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={`${(doneCount / CHECKLIST.length) * 150.8} 150.8`}
                          style={{ transition: `stroke-dasharray 800ms ${T}` }}
                        />
                      </svg>
                      <span className="absolute text-xs font-bold text-teal">
                        {doneCount}/{CHECKLIST.length}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1.5">
                    {CHECKLIST.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-4 rounded-xl px-4 py-3"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          transition: `background 500ms ${T}`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                        }}
                      >
                        {item.done ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-green" />
                        ) : (
                          <Circle className="h-5 w-5 shrink-0 text-gold" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm ${item.done ? "text-white/60 line-through" : "font-medium text-white"}`}>
                            {item.label}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-white/70">
                            {item.desc}
                          </p>
                        </div>
                        {item.done ? (
                          <span className="shrink-0 rounded-full bg-green/12 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-green">
                            Done
                          </span>
                        ) : (
                          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-gold/12 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                            Pending
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Recently Viewed (2/5) — vertical stack */}
            <div className="lg:col-span-2">
              <ScrollReveal variant="right">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="section-label text-teal">Recent Activity</p>
                    <h2 className="mt-2 font-display text-xl font-bold tracking-tighter text-navy">
                      Recently Viewed
                    </h2>
                  </div>
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal"
                    style={{ transition: `all 500ms ${T}` }}
                  >
                    View all
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {recent.map((p, i) => (
                    <Link
                      key={p.id}
                      href={`/property/${p.id}`}
                      className="group flex gap-4 overflow-hidden rounded-2xl bg-navy"
                      style={{
                        transition: `all 500ms ${T}`,
                        animation: `fadeInUp 600ms ${T} ${i * 80}ms both`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateX(4px)";
                        e.currentTarget.style.boxShadow = "0 8px 32px rgba(11,25,41,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Mini photo */}
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden sm:w-28">
                        <Image
                          src={p.photos[0]}
                          alt={p.title}
                          fill
                          sizes="112px"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/40" />
                        {p.isVerified && (
                          <span className="absolute left-2 top-2 rounded px-1.5 py-0.5 text-[8px] font-black uppercase text-white" style={{ background: "linear-gradient(135deg,#d4a853,#B8903D)" }}>
                            V
                          </span>
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-center py-3 pr-4">
                        <p className="truncate text-sm font-bold text-white">
                          {p.title}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-white/60">
                          <MapPin className="h-3 w-3 text-teal" />
                          {p.estate}
                        </p>
                        <p className="mt-1.5 font-display text-base font-bold tracking-tight text-white">
                          UGX {formatUGX(p.price)}
                          <span className="text-[10px] font-normal text-white/70">/mo</span>
                        </p>
                      </div>
                      {/* Arrow */}
                      <div className="flex items-center pr-4">
                        <ChevronRight
                          className="h-4 w-4 text-white/15 transition-all duration-500 group-hover:text-teal group-hover:translate-x-1"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DEALS TABLE ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="section-label text-teal">Transactions</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tighter text-navy sm:text-3xl">
                  My Deals
                </h2>
              </div>
              <Link
                href="/deals"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl bg-navy">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr>
                      {["Property", "Estate", "Agreed Rent", "Status", "Date"].map((h) => (
                        <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-gold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {deals.map((deal, i) => {
                      const st = getDealStatusStyle(deal.status);
                      return (
                        <tr
                          key={deal.id}
                          className={i % 2 === 0 ? "bg-white/[0.02]" : ""}
                          style={{ transition: `background-color 500ms ${T}` }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(10,147,150,0.06)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent";
                          }}
                        >
                          <td className="px-6 py-4 font-medium text-white">{deal.propertyTitle}</td>
                          <td className="px-6 py-4 text-white/50">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-teal/50" />
                              {deal.estate}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-display font-bold tracking-tighter text-white">
                            UGX {formatUGX(deal.agreedRent)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                              style={{ background: st.bg, color: st.text }}
                            >
                              {formatDealStatus(deal.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 text-white/60">
                              <Calendar className="h-3 w-3" />
                              {deal.date}
                            </span>
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
      </section>

      {/* ═══ UPGRADE BANNER ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(212,168,83,0.06),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <ScrollReveal variant="left">
            <div className="grid items-center gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10">
                    <TrendingUp className="h-6 w-6 text-gold" />
                  </div>
                  <p className="section-label text-gold">Save More</p>
                </div>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                  Save UGX 40,000 with Annual
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
                  You have used 4 Day Passes this year. Switch to an Annual
                  Subscription for unlimited access to all verified listings,
                  landlord contacts, and GPS coordinates.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 lg:col-span-2 lg:items-end">
                <div className="rounded-2xl bg-white/[0.04] px-6 py-4 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
                    Annual price
                  </p>
                  <p className="mt-1 font-display text-3xl font-bold tracking-tighter text-white">
                    UGX 120,000
                    <span className="text-sm font-normal text-white/70">/yr</span>
                  </p>
                </div>
                <Link href="/pricing" className="btn-gold animate-pulse-gold">
                  Upgrade Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      {/* ═══ TOP-UP POPUP ═══ */}
      {topUpOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 backdrop-blur-md"
          onClick={() => setTopUpOpen(false)}
        >
          <div
            className="mx-4 w-full max-w-sm overflow-hidden rounded-3xl bg-navy"
            style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15">
                  <Wallet size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-wider text-gold/70">Top Up</p>
                  <p className="text-sm font-bold text-white">Add Funds to Wallet</p>
                </div>
              </div>

              {/* Quick amounts */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {["500000", "1000000", "2000000", "3000000", "5000000", "10000000"].map((amt) => {
                  const label = Number(amt) >= 1000000
                    ? `${Number(amt) / 1000000}M`
                    : `${Number(amt) / 1000}K`;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className="rounded-xl py-2.5 text-center text-xs font-bold"
                      style={{
                        background: topUpAmount === amt ? "rgba(212,168,83,0.15)" : "rgba(255,255,255,0.04)",
                        color: topUpAmount === amt ? "#d4a853" : "rgba(255,255,255,0.5)",
                        border: topUpAmount === amt ? "1px solid rgba(212,168,83,0.3)" : "1px solid transparent",
                        transition: `all 400ms ${T}`,
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Custom amount */}
              <div className="mt-4">
                <p className="mb-1.5 text-[9px] font-black uppercase tracking-wider text-white/30">Or enter amount</p>
                <div className="flex items-center overflow-hidden rounded-xl bg-white/[0.06]">
                  <span className="bg-white/[0.04] px-3 py-3 text-xs font-bold text-white/40">UGX</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    className="flex-1 bg-transparent px-3 py-3 text-sm font-bold text-white outline-none placeholder:text-white/20"
                  />
                </div>
              </div>
            </div>

            {/* Payment buttons */}
            <div className="mt-5 space-y-2 px-6">
              <button
                type="button"
                disabled={!topUpAmount}
                onClick={() => {
                  const current = Number(localStorage.getItem("pata-wallet") || "0");
                  localStorage.setItem("pata-wallet", String(current + Number(topUpAmount)));
                  setTopUpAmount("");
                  setTopUpOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white disabled:opacity-30"
                style={{ background: "linear-gradient(135deg, #d4a853, #B8903D)", boxShadow: "0 4px 16px rgba(212,168,83,0.25)", transition: `all 500ms ${T}` }}
              >
                <Phone size={15} /> MTN MoMo
              </button>
              <button
                type="button"
                disabled={!topUpAmount}
                onClick={() => {
                  const current = Number(localStorage.getItem("pata-wallet") || "0");
                  localStorage.setItem("pata-wallet", String(current + Number(topUpAmount)));
                  setTopUpAmount("");
                  setTopUpOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange py-3 text-sm font-bold text-white disabled:opacity-30"
                style={{ boxShadow: "0 4px 16px rgba(212,98,42,0.2)", transition: `all 500ms ${T}` }}
              >
                <Phone size={15} /> Airtel Money
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 px-6 pb-6 text-center">
              <button
                type="button"
                onClick={() => setTopUpOpen(false)}
                className="text-xs text-white/30"
                style={{ transition: `color 400ms ${T}` }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
              >
                Cancel
              </button>
              <p className="mt-2 text-[9px] text-white/20">
                Funds are held securely in your pata.ug wallet
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
