"use client";

import Link from "next/link";
import Image from "@/components/Img";
import ScrollReveal from "@/components/ScrollReveal";
import {
  TrendingUp,
  ArrowLeft,
  CreditCard,
  Building2,
  Users,
  Handshake,
  Calendar,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Home,
  Star,
} from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ─── Data ─── */

const KEY_METRICS = [
  { label: "Total Revenue (Q1)", value: "UGX 10.8M", icon: TrendingUp, accent: "#1F8A44", trend: "+18%", up: true },
  { label: "Active Subscriptions", value: "123", icon: CreditCard, accent: "#0A9396", trend: "+12%", up: true },
  { label: "Properties Listed", value: "342", icon: Building2, accent: "#D4622A", trend: "+24%", up: true },
  { label: "Registered Users", value: "1,847", icon: Users, accent: "#d4a853", trend: "+31%", up: true },
  { label: "Deals Closed (Q1)", value: "89", icon: Handshake, accent: "#1F8A44", trend: "+9%", up: true },
  { label: "Avg Deal Value", value: "UGX 1.9M", icon: Calendar, accent: "#0A9396", trend: "-3%", up: false },
];

const MONTHLY_DATA = [
  { month: "January", listings: "UGX 1.2M", agencyFees: "UGX 1.8M", dayPasses: "UGX 680K", annualSubs: "UGX 960K", total: "UGX 4.6M" },
  { month: "February", listings: "UGX 1.5M", agencyFees: "UGX 2.1M", dayPasses: "UGX 720K", annualSubs: "UGX 1.08M", total: "UGX 5.4M" },
  { month: "March", listings: "UGX 1.8M", agencyFees: "UGX 2.4M", dayPasses: "UGX 840K", annualSubs: "UGX 1.2M", total: "UGX 6.2M" },
];

const SUBSCRIPTION_BREAKDOWN = [
  { type: "Day Pass (Tenant)", count: 342, revenue: "UGX 6.8M", accent: "#0A9396" },
  { type: "Annual (Tenant)", count: 89, revenue: "UGX 10.7M", accent: "#0A9396" },
  { type: "Per-Listing (Landlord)", count: 156, revenue: "UGX 4.7M", accent: "#D4622A" },
  { type: "Annual (Landlord)", count: 34, revenue: "UGX 4.1M", accent: "#D4622A" },
];

const DEAL_PIPELINE = [
  { status: "Pending", count: 14, color: "#d4a853" },
  { status: "Awaiting Landlord", count: 8, color: "#E08C10" },
  { status: "Confirmed", count: 23, color: "#1F8A44" },
  { status: "Agency Fee Paid", count: 44, color: "#0A9396" },
];

const TOP_AREAS = [
  { area: "Bukoto, Kampala", listings: 48, deals: 12 },
  { area: "Kololo, Kampala", listings: 35, deals: 9 },
  { area: "Muyenga, Kampala", listings: 31, deals: 8 },
  { area: "Naguru, Kampala", listings: 28, deals: 7 },
  { area: "Kira, Wakiso", listings: 24, deals: 5 },
];

const TOP_LANDLORDS = [
  { name: "Herbert Kiggundu", listings: 6, revenue: "UGX 750K", verified: true },
  { name: "Sarah Namutebi", listings: 8, revenue: "UGX 640K", verified: true },
  { name: "Dorothy Namubiru", listings: 4, revenue: "UGX 510K", verified: true },
  { name: "Grace Achieng", listings: 3, revenue: "UGX 390K", verified: true },
  { name: "Moses Ssempijja", listings: 1, revenue: "UGX 120K", verified: false },
];

export default function AdminReportsPage() {
  const totalPipeline = DEAL_PIPELINE.reduce((a, d) => a + d.count, 0);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/commercial/commercial_3.jpg" alt="Financial reports" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-white/60" style={{ transition: `color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>
            <p className="section-label text-gold">Financials &amp; Analytics</p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl">
              Platform <span className="text-gradient-gold">Reports</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
              Revenue, subscriptions, deal pipeline, and performance analytics for Q1 2026
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {KEY_METRICS.map((m, i) => {
              const Icon = m.icon;
              return (
                <ScrollReveal key={m.label} variant="scale" delay={i * 80}>
                  <div className="group flex items-center gap-4 rounded-2xl bg-navy p-5" style={{ transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${m.accent}15`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${m.accent}15` }}>
                      <Icon className="h-6 w-6" style={{ color: m.accent }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-2xl font-bold tracking-tighter text-white">{m.value}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">{m.label}</p>
                    </div>
                    <span className="flex items-center gap-0.5 text-xs font-bold" style={{ color: m.up ? "#1F8A44" : "#C0303A" }}>
                      {m.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {m.trend}
                    </span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Revenue Table — expanded */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label text-gold">Revenue Breakdown</p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tighter text-navy">Monthly Revenue</h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="mt-8 overflow-hidden rounded-2xl bg-navy">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead>
                    <tr>
                      {["Month", "Listing Fees", "Agency Fees", "Day Passes", "Annual Subs", "Total"].map((h) => (
                        <th key={h} className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-gold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MONTHLY_DATA.map((row, i) => (
                      <tr key={row.month} className={i % 2 === 0 ? "bg-white/[0.02]" : ""} style={{ transition: `background-color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(212,168,83,0.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"; }}>
                        <td className="px-5 py-4 font-medium text-white">{row.month}</td>
                        <td className="px-5 py-4 text-white/70">{row.listings}</td>
                        <td className="px-5 py-4 text-white/70">{row.agencyFees}</td>
                        <td className="px-5 py-4 text-white/70">{row.dayPasses}</td>
                        <td className="px-5 py-4 text-white/70">{row.annualSubs}</td>
                        <td className="px-5 py-4 font-display font-bold text-gold">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Subscription + Deal Pipeline — two columns */}
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Subscriptions */}
            <ScrollReveal variant="left">
              <div className="rounded-3xl bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15">
                    <CreditCard className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">Subscriptions</h3>
                </div>

                <div className="mt-6 space-y-4">
                  {SUBSCRIPTION_BREAKDOWN.map((s) => (
                    <div key={s.type} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.accent }} />
                        <div>
                          <p className="text-sm font-medium text-white/80">{s.type}</p>
                          <p className="text-[10px] text-white/40">{s.count} active</p>
                        </div>
                      </div>
                      <p className="font-display font-bold tracking-tight text-white">{s.revenue}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Deal Pipeline */}
            <ScrollReveal variant="right">
              <div className="rounded-3xl bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15">
                    <Handshake className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">Deal Pipeline</h3>
                  <span className="ml-auto font-display text-2xl font-bold text-gold">{totalPipeline}</span>
                </div>

                <div className="mt-6 space-y-4">
                  {DEAL_PIPELINE.map((d) => {
                    const pct = Math.round((d.count / totalPipeline) * 100);
                    return (
                      <div key={d.status}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-white/70">{d.status}</p>
                          <p className="text-sm font-bold text-white">{d.count}</p>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              background: `linear-gradient(90deg, ${d.color}, ${d.color}CC)`,
                              transition: `width 800ms ${T}`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Top Areas + Top Landlords */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Top Areas */}
            <ScrollReveal variant="left">
              <div className="rounded-3xl bg-navy p-6 sm:p-8" style={{ boxShadow: "0 8px 40px rgba(11,25,41,0.2)" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/15">
                    <MapPin className="h-5 w-5 text-teal" />
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">Top Areas</h3>
                </div>

                <div className="mt-6 space-y-3">
                  {TOP_AREAS.map((a, i) => (
                    <div key={a.area} className="flex items-center gap-4 rounded-xl bg-white/[0.03] px-4 py-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: i === 0 ? "linear-gradient(135deg, #d4a853, #B8903D)" : "rgba(255,255,255,0.06)", color: i === 0 ? "#fff" : "rgba(255,255,255,0.5)" }}>
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white/80">{a.area}</p>
                        <p className="text-[10px] text-white/40">{a.listings} listings · {a.deals} deals</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Top Landlords */}
            <ScrollReveal variant="right">
              <div className="rounded-3xl bg-navy p-6 sm:p-8" style={{ boxShadow: "0 8px 40px rgba(11,25,41,0.2)" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange/15">
                    <Star className="h-5 w-5 text-orange" />
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">Top Landlords</h3>
                </div>

                <div className="mt-6 space-y-3">
                  {TOP_LANDLORDS.map((l, i) => (
                    <div key={l.name} className="flex items-center gap-4 rounded-xl bg-white/[0.03] px-4 py-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: i === 0 ? "linear-gradient(135deg, #D4622A, #B54E1C)" : "rgba(255,255,255,0.06)", color: i === 0 ? "#fff" : "rgba(255,255,255,0.5)" }}>
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white/80">{l.name}</p>
                          {l.verified && <Shield size={12} className="text-green" />}
                        </div>
                        <p className="text-[10px] text-white/40">{l.listings} listings · {l.revenue} revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
