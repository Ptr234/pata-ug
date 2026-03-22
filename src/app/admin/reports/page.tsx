"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { TrendingUp, ArrowLeft, CreditCard, Building2, Users, Handshake, Calendar } from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const MONTHLY_DATA = [
  { month: "January", listings: "UGX 1.2M", commissions: "UGX 1.8M", total: "UGX 3.0M" },
  { month: "February", listings: "UGX 1.5M", commissions: "UGX 2.1M", total: "UGX 3.6M" },
  { month: "March", listings: "UGX 1.8M", commissions: "UGX 2.4M", total: "UGX 4.2M" },
];

const KEY_METRICS = [
  { label: "Total Revenue (Q1)", value: "UGX 10.8M", icon: TrendingUp, accent: "#1F8A44" },
  { label: "Active Subscriptions", value: "123", icon: CreditCard, accent: "#0A9396" },
  { label: "Properties Listed", value: "342", icon: Building2, accent: "#D4622A" },
  { label: "Registered Users", value: "1,847", icon: Users, accent: "#d4a853" },
  { label: "Deals Closed", value: "89", icon: Handshake, accent: "#1F8A44" },
  { label: "Avg Deal Value", value: "UGX 1.9M", icon: Calendar, accent: "#0A9396" },
];

export default function AdminReportsPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/commercial/commercial_8.jpg" alt="Financial reports" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-white/60" style={{ transition: `color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>
            <p className="section-label text-gold">Financials</p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl">
              Financial <span className="text-gradient-gold">Reports</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
              Revenue breakdowns, subscription analytics, and platform performance
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {KEY_METRICS.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <ScrollReveal key={metric.label} variant="scale" delay={i * 80}>
                  <div className="group flex items-center gap-4 rounded-2xl bg-navy p-5" style={{ transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${metric.accent}15`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${metric.accent}15` }}>
                      <Icon className="h-6 w-6" style={{ color: metric.accent }} />
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold tracking-tighter text-white">{metric.value}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">{metric.label}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Monthly Revenue Table */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-label text-gold">Quarterly Breakdown</p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tighter text-navy">Monthly Revenue</h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-10 overflow-hidden rounded-2xl bg-navy">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left text-sm">
                  <thead>
                    <tr>
                      {["Month", "Listing Fees", "Commissions", "Total"].map((h) => (
                        <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-gold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MONTHLY_DATA.map((row, i) => (
                      <tr key={row.month} className={i % 2 === 0 ? "bg-white/[0.02]" : ""} style={{ transition: `background-color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(212,168,83,0.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"; }}>
                        <td className="px-6 py-4 font-medium text-white">{row.month}</td>
                        <td className="px-6 py-4 text-white/70">{row.listings}</td>
                        <td className="px-6 py-4 text-white/70">{row.commissions}</td>
                        <td className="px-6 py-4 font-display font-bold text-gold">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
