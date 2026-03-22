"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Handshake,
  ArrowRight,
  Calendar,
  SearchX,
  Check,
  Shield,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { deals } from "@/lib/mock-data";
import type { DealStatus } from "@/lib/mock-data";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const STATUS_STYLES: Record<
  DealStatus,
  { bg: string; text: string; label: string }
> = {
  pending: {
    bg: "rgba(78,63,168,0.15)",
    text: "#9B8FD8",
    label: "Pending",
  },
  awaiting_landlord: {
    bg: "rgba(224,140,16,0.15)",
    text: "#E08C10",
    label: "Awaiting Landlord",
  },
  confirmed: {
    bg: "rgba(31,138,68,0.15)",
    text: "#1F8A44",
    label: "Confirmed",
  },
  commission_paid: {
    bg: "rgba(10,147,150,0.15)",
    text: "#0A9396",
    label: "Commission Paid",
  },
};

function formatUGX(amount: number): string {
  return `UGX ${amount.toLocaleString("en-UG")}`;
}

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */

const confirmedCount = deals.filter((d) => d.status === "confirmed").length;
const pendingCount = deals.filter(
  (d) => d.status === "pending" || d.status === "awaiting_landlord"
).length;

const STATS = [
  { label: "Total Deals", value: deals.length, accent: "#0A9396" },
  { label: "Confirmed", value: confirmedCount, accent: "#1F8A44" },
  { label: "Pending", value: pendingCount, accent: "#E08C10" },
] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DealsPage() {
  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/apartments/apartment_9.jpg"
          alt="Deals and transactions"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/80" />
        {/* Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(10,147,150,0.1),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <ScrollReveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-4 text-sm text-white/70"
            >
              <Link
                href="/"
                className="text-white/50 hover:text-teal"
                style={{ transition: `color 500ms ${T}` }}
              >
                Home
              </Link>
              <span className="mx-2 text-white/60">/</span>
              <Link
                href="/dashboard"
                className="text-white/50 hover:text-teal"
                style={{ transition: `color 500ms ${T}` }}
              >
                Dashboard
              </Link>
              <span className="mx-2 text-white/60">/</span>
              <span className="font-medium text-white/70">My Deals</span>
            </nav>

            <p className="section-label text-teal">Transactions</p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-white sm:text-5xl">
              MY DEALS
            </h1>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-white/70">
              Track all your deal confirmations, pending agreements, and
              transaction history in one place.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className="bg-navy" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-8 sm:gap-12">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline gap-3"
                  style={{
                    transition: `transform 500ms ${T}, box-shadow 500ms ${T}`,
                    borderRadius: "0.75rem",
                    padding: "0.5rem 1rem",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <span
                    className="font-display text-3xl font-bold tracking-tighter"
                    style={{ color: stat.accent }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/70">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ TABLE ═══ */}
      <section className="min-h-[50vh] bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {deals.length > 0 ? (
            <ScrollReveal>
              <div className="overflow-hidden rounded-2xl bg-navy shadow-elevated">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead>
                      <tr>
                        <th
                          className="px-6 py-4"
                          style={{
                            fontSize: "10px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            color: "#d4a853",
                          }}
                        >
                          Property
                        </th>
                        <th
                          className="px-6 py-4"
                          style={{
                            fontSize: "10px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            color: "#d4a853",
                          }}
                        >
                          Estate
                        </th>
                        <th
                          className="px-6 py-4"
                          style={{
                            fontSize: "10px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            color: "#d4a853",
                          }}
                        >
                          Agreed Rent
                        </th>
                        <th
                          className="px-6 py-4"
                          style={{
                            fontSize: "10px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            color: "#d4a853",
                          }}
                        >
                          Status
                        </th>
                        <th
                          className="px-6 py-4"
                          style={{
                            fontSize: "10px",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            color: "#d4a853",
                          }}
                        >
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {deals.map((deal, idx) => {
                        const style = STATUS_STYLES[deal.status];
                        return (
                          <tr
                            key={deal.id}
                            className="group"
                            style={{
                              backgroundColor:
                                idx % 2 === 1
                                  ? "rgba(255,255,255,0.02)"
                                  : "transparent",
                              transition: `background-color 500ms ${T}`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "rgba(10,147,150,0.06)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                idx % 2 === 1
                                  ? "rgba(255,255,255,0.02)"
                                  : "transparent";
                            }}
                          >
                            <td className="px-6 py-4 font-semibold text-white">
                              {deal.propertyTitle}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 text-white/50">
                                <MapPin className="h-3.5 w-3.5 text-teal/60" />
                                {deal.estate}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-display text-lg font-bold tracking-tighter text-white">
                              {formatUGX(deal.agreedRent)}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                                style={{
                                  backgroundColor: style.bg,
                                  color: style.text,
                                  transition: `box-shadow 500ms ${T}, transform 500ms ${T}`,
                                  cursor: "default",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.boxShadow = `0 2px 12px ${style.bg}`;
                                  e.currentTarget.style.transform = "scale(1.05)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.boxShadow = "none";
                                  e.currentTarget.style.transform = "scale(1)";
                                }}
                              >
                                {deal.status === "confirmed" && (
                                  <Check className="h-3 w-3" />
                                )}
                                {deal.status === "commission_paid" && (
                                  <Shield className="h-3 w-3" />
                                )}
                                {style.label}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 text-white/70">
                                <Calendar className="h-3.5 w-3.5" />
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
          ) : (
            <ScrollReveal variant="scale">
              <div className="flex flex-col items-center justify-center rounded-3xl bg-navy px-6 py-20 text-center shadow-elevated">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/15">
                  <SearchX className="h-8 w-8 text-teal" />
                </div>
                <h2 className="mt-5 font-display text-xl tracking-tighter text-white">
                  No deals yet
                </h2>
                <p className="mt-2 max-w-sm text-sm text-white/70">
                  When you agree a deal on a property, it will appear here.
                  Start browsing to find your next home.
                </p>
                <Link
                  href="/search"
                  className="btn-gold mt-6"
                  style={{
                    transition: `transform 500ms ${T}, background-color 500ms ${T}, box-shadow 500ms ${T}, color 500ms ${T}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Browse Properties
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  );
}
