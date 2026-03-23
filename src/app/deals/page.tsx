"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Img";
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
  Clock,
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
    label: "Paid — Processing",
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
    label: "Agency Fee Paid",
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
  const [walletBalance, setWalletBalance] = useState(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem("pata-wallet") || "0");
  });

  const deductFromWallet = (amount: number) => {
    const newBalance = Math.max(0, walletBalance - amount);
    setWalletBalance(newBalance);
    localStorage.setItem("pata-wallet", String(newBalance));
  };

  const addToWallet = (amount: number) => {
    const newBalance = walletBalance + amount;
    setWalletBalance(newBalance);
    localStorage.setItem("pata-wallet", String(newBalance));
  };

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
            <h1 className="mt-3 font-display text-2xl font-bold uppercase tracking-tighter text-white sm:text-4xl md:text-5xl">
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
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-5 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 lg:gap-12">
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
                    className="font-display text-xl font-bold tracking-tighter sm:text-3xl"
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
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          {deals.length > 0 ? (
            <ScrollReveal>
              {/* Mobile card view */}
              <div className="space-y-3 md:hidden">
                {dealList.map((deal) => {
                  const style = STATUS_STYLES[deal.status];
                  return (
                    <div key={deal.id} className="rounded-2xl border border-gold/20 bg-navy p-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-white">{deal.propertyTitle}</p>
                        <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold" style={{ backgroundColor: style.bg, color: style.text }}>
                          {style.label}
                        </span>
                      </div>
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-white/50"><MapPin className="h-3 w-3 text-teal/60" />{deal.estate}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
                        <span className="font-display text-sm font-bold text-white">{formatUGX(deal.agreedRent)}</span>
                        <span className="flex items-center gap-1 text-[10px] text-white/40"><Calendar className="h-3 w-3" />{deal.date}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {deal.status !== "closed" && (
                          <Link href={`/deals/${deal.id}/chat`} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-teal" style={{ background: "rgba(10,147,150,0.1)" }}>
                            <MessageCircle size={11} /> Chat
                          </Link>
                        )}
                        {deal.status === "agreed" && (
                          <button type="button" onClick={() => setPayingDealId(deal.id)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg, #d4a853, #B8903D)" }}>
                            <CreditCard size={11} /> Pay Deposit
                          </button>
                        )}
                        {deal.status === "closed" && (
                          <Link href={`/deals/${deal.id}/chat`} className="inline-flex items-center gap-1 rounded-lg bg-teal/10 px-2.5 py-1.5 text-[10px] font-bold text-teal">
                            <Phone size={11} /> View Contacts
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-xl bg-navy shadow-elevated sm:rounded-2xl md:block">
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
                                {/* Chat — available for active deals */}
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

                                {/* Pending / Negotiating — waiting on pata.ug */}
                                {(deal.status === "pending" || deal.status === "negotiating") && (
                                  <span className="inline-flex items-center gap-1 rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-bold text-white/40">
                                    <Clock size={11} /> Awaiting pata.ug
                                  </span>
                                )}

                                {/* Agreed — admin confirmed, tenant can pay deposit */}
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

                                {/* Payment confirmed — pata.ug is processing */}
                                {deal.status === "payment_confirmed" && (
                                  <span className="inline-flex items-center gap-1 rounded-lg bg-green/10 px-2.5 py-1.5 text-[10px] font-bold text-green">
                                    <Shield size={11} /> Paid — Processing Transfer
                                  </span>
                                )}

                                {/* Closed — contacts shared via chat */}
                                {deal.status === "closed" && (
                                  <Link
                                    href={`/deals/${deal.id}/chat`}
                                    className="inline-flex items-center gap-1 rounded-lg bg-teal/10 px-2.5 py-1.5 text-[10px] font-bold text-teal"
                                    style={{ transition: `all 400ms ${T}` }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(10,147,150,0.2)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(10,147,150,0.1)"; }}
                                  >
                                    <Phone size={11} /> View Contacts
                                  </Link>
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
              <div className="flex flex-col items-center justify-center rounded-xl bg-navy px-4 py-12 text-center shadow-elevated sm:rounded-3xl sm:px-6 sm:py-20">
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
        const upfrontRent = deal.agreedRent * (deal.upfrontMonths || 1);
        const secDep = deal.securityDeposit || 0;
        const totalDeposit = upfrontRent + secDep;
        const agencyFee = Math.round(deal.agreedRent * 0.05); // 5% on 1 month only
        const hasEnough = walletBalance >= totalDeposit;
        const shortfall = totalDeposit - walletBalance;

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 backdrop-blur-xl"
            onClick={() => setPayingDealId(null)}
          >
            <div
              className="mx-4 w-full max-w-md overflow-hidden rounded-xl bg-navy sm:rounded-3xl"
              style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-4 pt-4 sm:px-8 sm:pt-8">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gold/70">Deposit Payment</p>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tighter text-white">{deal.propertyTitle}</h3>
                <p className="mt-1 text-xs text-white/50">{deal.estate}</p>
              </div>

              {/* Wallet balance */}
              <div className="mt-4 mx-4 sm:mx-8 flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3">
                <div className="flex items-center gap-2">
                  <CreditCard size={14} className="text-gold" />
                  <span className="text-xs font-bold text-white/50">Wallet Balance</span>
                </div>
                <span className={`font-display text-lg font-bold tracking-tight ${hasEnough ? "text-teal" : "text-white"}`}>
                  {formatUGX(walletBalance)}
                </span>
              </div>

              {/* Breakdown */}
              <div className="mt-3 mx-4 sm:mx-8 rounded-xl bg-white/[0.04] p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Agreed Monthly Rent</span>
                    <span className="font-bold text-white">{formatUGX(deal.agreedRent)}/mo</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Upfront Rent ({deal.upfrontMonths || 1} month{(deal.upfrontMonths || 1) > 1 ? "s" : ""})</span>
                    <span className="font-bold text-white">{formatUGX(upfrontRent)}</span>
                  </div>
                  {secDep > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">Security Deposit</span>
                      <span className="font-bold text-white">{formatUGX(secDep)}</span>
                    </div>
                  )}
                  <div className="h-px bg-white/[0.06]" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-white">Total to Wallet</span>
                    <span className="font-display text-lg font-bold text-white">{formatUGX(totalDeposit)}</span>
                  </div>

                  {hasEnough && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">From Your Wallet</span>
                      <span className="font-bold text-teal">- {formatUGX(totalDeposit)}</span>
                    </div>
                  )}
                  {!hasEnough && walletBalance > 0 && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/50">From Your Wallet</span>
                        <span className="font-bold text-teal">- {formatUGX(walletBalance)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/50">Still Needed</span>
                        <span className="font-bold text-orange">{formatUGX(shortfall)}</span>
                      </div>
                    </>
                  )}
                  <div className="h-px bg-white/[0.06]" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gold">
                      {hasEnough ? "Pay from Wallet" : "Top Up Amount"}
                    </span>
                    <span className="font-display text-2xl font-bold tracking-tight text-gold">
                      {formatUGX(hasEnough ? totalDeposit : shortfall)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 space-y-2.5 px-4 sm:px-8">
                {hasEnough ? (
                  /* Wallet has enough — pay directly */
                  <button
                    type="button"
                    onClick={() => {
                      deductFromWallet(totalDeposit);
                      updateDealStatus(deal.id, "payment_confirmed");
                      setPayingDealId(null);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #0A9396, #077B7E)", boxShadow: "0 4px 20px rgba(10,147,150,0.3)", transition: `all 500ms ${T}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <CreditCard size={16} /> Pay {formatUGX(totalDeposit)} from Wallet
                  </button>
                ) : (
                  /* Wallet insufficient — top up first */
                  <>
                    <div className="flex items-start gap-2.5 rounded-xl bg-orange/5 px-4 py-3">
                      <Shield size={14} className="mt-0.5 shrink-0 text-orange" />
                      <p className="text-[11px] leading-relaxed text-white/50">
                        {walletBalance > 0
                          ? `Your wallet has ${formatUGX(walletBalance)} but you need ${formatUGX(totalDeposit)}. Top up ${formatUGX(shortfall)} to proceed.`
                          : `Top up ${formatUGX(totalDeposit)} to your wallet to pay the deposit.`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addToWallet(hasEnough ? 0 : shortfall);
                        updateDealStatus(deal.id, "payment_confirmed");
                        setPayingDealId(null);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #d4a853, #B8903D)", boxShadow: "0 4px 20px rgba(212,168,83,0.3)", transition: `all 500ms ${T}` }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <Phone size={16} /> Top Up {formatUGX(shortfall)} via MTN MoMo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        addToWallet(hasEnough ? 0 : shortfall);
                        updateDealStatus(deal.id, "payment_confirmed");
                        setPayingDealId(null);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange py-3.5 text-sm font-bold text-white"
                      style={{ boxShadow: "0 4px 16px rgba(212,98,42,0.2)", transition: `all 500ms ${T}` }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <Phone size={16} /> Top Up {formatUGX(shortfall)} via Airtel Money
                    </button>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="mt-4 px-4 pb-4 sm:px-8 sm:pb-8 text-center">
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
                <p className="mt-2 text-[10px] text-white/30">
                  Funds held securely · 5% agency fee on 1 month rent ({formatUGX(agencyFee)}) deducted from landlord payout
                </p>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}
