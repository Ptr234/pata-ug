"use client";

import { useState } from "react";
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
  MessageCircle,
  CreditCard,
  Phone,
  Lock,
  ExternalLink,
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
    label: "Requested",
  },
  negotiating: {
    bg: "rgba(212,168,83,0.15)",
    text: "#d4a853",
    label: "Negotiating",
  },
  agreed: {
    bg: "rgba(224,140,16,0.15)",
    text: "#E08C10",
    label: "Pay to Confirm",
  },
  payment_confirmed: {
    bg: "rgba(31,138,68,0.15)",
    text: "#1F8A44",
    label: "Close Deal",
  },
  closed: {
    bg: "rgba(10,147,150,0.15)",
    text: "#0A9396",
    label: "Closed — Contacts Shared",
  },
  // legacy compat
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

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DealsPage() {
  const [dealList, setDealList] = useState(deals);
  const [payingDealId, setPayingDealId] = useState<string | null>(null);

  const closedCount = dealList.filter((d) => d.status === "closed").length;
  const activeCount = dealList.filter((d) => ["pending", "negotiating", "agreed", "payment_confirmed"].includes(d.status)).length;

  const STATS = [
    { label: "Total Deals", value: dealList.length, accent: "#0A9396" },
    { label: "Active", value: activeCount, accent: "#E08C10" },
    { label: "Closed", value: closedCount, accent: "#1F8A44" },
  ];

  const updateDealStatus = (id: string, status: DealStatus) => {
    setDealList((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

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
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dealList.map((deal, idx) => {
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
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1.5">
                                {/* Chat — always available except closed */}
                                {deal.status !== "closed" && (
                                  <Link
                                    href={`/deals/${deal.id}/chat`}
                                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-teal"
                                    style={{ background: "rgba(10,147,150,0.1)", transition: `all 400ms ${T}` }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(10,147,150,0.2)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(10,147,150,0.1)"; }}
                                  >
                                    <MessageCircle size={11} /> Chat
                                  </Link>
                                )}

                                {/* Pay Deposit — when deal is agreed */}
                                {deal.status === "agreed" && (
                                  <button
                                    type="button"
                                    onClick={() => setPayingDealId(deal.id)}
                                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-white"
                                    style={{ background: "linear-gradient(135deg, #d4a853, #B8903D)", boxShadow: "0 2px 8px rgba(212,168,83,0.25)", transition: `all 400ms ${T}` }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                                  >
                                    <CreditCard size={11} /> Pay Deposit
                                  </button>
                                )}

                                {/* Close Deal — when payment confirmed */}
                                {deal.status === "payment_confirmed" && (
                                  <button
                                    type="button"
                                    onClick={() => updateDealStatus(deal.id, "closed")}
                                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-white"
                                    style={{ background: "linear-gradient(135deg, #1F8A44, #16753A)", boxShadow: "0 2px 8px rgba(31,138,68,0.25)", transition: `all 400ms ${T}` }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                                  >
                                    <Handshake size={11} /> Close Deal
                                  </button>
                                )}

                                {/* Closed — show contact shared */}
                                {deal.status === "closed" && (
                                  <span className="inline-flex items-center gap-1 rounded-lg bg-teal/10 px-2.5 py-1.5 text-[10px] font-bold text-teal">
                                    <Phone size={11} /> Contact Shared
                                  </span>
                                )}
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
      {/* ═══ PAYMENT MODAL ═══ */}
      {payingDealId && (() => {
        const deal = dealList.find((d) => d.id === payingDealId);
        if (!deal) return null;
        const deposit = deal.agreedRent * 3; // default 3 months — would come from property in production
        const commission = Math.round(deal.agreedRent * 0.05);

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 backdrop-blur-xl"
            onClick={() => setPayingDealId(null)}
          >
            <div
              className="mx-4 w-full max-w-md overflow-hidden rounded-3xl bg-navy"
              style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gold/70">
                  Deposit Payment
                </p>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tighter text-white">
                  {deal.propertyTitle}
                </h3>
                <p className="mt-1 text-xs text-white/50">
                  {deal.estate}
                </p>
              </div>

              {/* Breakdown */}
              <div className="mt-5 mx-6 sm:mx-8 rounded-xl bg-white/[0.04] p-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Agreed Monthly Rent</span>
                    <span className="font-bold text-white">{formatUGX(deal.agreedRent)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Deposit (3 months)</span>
                    <span className="font-bold text-white">{formatUGX(deposit)}</span>
                  </div>
                  <div className="h-px bg-white/[0.06]" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gold">Total to Pay</span>
                    <span className="font-display text-2xl font-bold tracking-tight text-gold">{formatUGX(deposit)}</span>
                  </div>
                </div>
              </div>

              {/* Wallet explanation */}
              <div className="mt-4 mx-6 sm:mx-8 flex items-start gap-2.5 rounded-xl bg-teal/5 px-4 py-3">
                <Shield size={14} className="mt-0.5 shrink-0 text-teal" />
                <p className="text-[11px] leading-relaxed text-white/50">
                  Your deposit goes into your <span className="font-bold text-teal">pata.ug wallet</span>.
                  We only transfer to the landlord after the deal is closed and confirmed by both parties.
                  Your money is safe with us.
                </p>
              </div>

              {/* Payment methods */}
              <div className="mt-5 space-y-2.5 px-6 sm:px-8">
                <button
                  type="button"
                  onClick={() => {
                    updateDealStatus(deal.id, "payment_confirmed");
                    setPayingDealId(null);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #d4a853, #B8903D)", boxShadow: "0 4px 20px rgba(212,168,83,0.3)", transition: `all 500ms ${T}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <Phone size={16} /> Pay {formatUGX(deposit)} via MTN MoMo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateDealStatus(deal.id, "payment_confirmed");
                    setPayingDealId(null);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange py-3.5 text-sm font-bold text-white"
                  style={{ boxShadow: "0 4px 16px rgba(212,98,42,0.2)", transition: `all 500ms ${T}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <Phone size={16} /> Pay {formatUGX(deposit)} via Airtel Money
                </button>
              </div>

              {/* Cancel + note */}
              <div className="mt-4 px-6 pb-6 sm:px-8 sm:pb-8 text-center">
                <button
                  type="button"
                  onClick={() => setPayingDealId(null)}
                  className="text-xs font-medium text-white/40"
                  style={{ transition: `color 400ms ${T}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                >
                  Cancel
                </button>
                <p className="mt-3 text-[10px] text-white/30">
                  5% commission ({formatUGX(commission)}) is deducted from the landlord&apos;s payout on deal close.
                </p>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}
