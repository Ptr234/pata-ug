"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Receipt,
  TrendingUp,
  CreditCard,
  Calendar,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { AGENCY_FEE_TIERS } from "@/lib/constants";

function formatUGX(amount: number): string {
  return `UGX ${amount.toLocaleString("en-UG")}`;
}

const SMOOTH = "all 500ms cubic-bezier(0.16, 1, 0.3, 1)";

const TRANSACTIONS = [
  {
    date: "2026-03-18",
    desc: "Deal agency fee - Bukoto apartment",
    amount: 90_000,
    method: "MTN MoMo",
    type: "agency-fee" as const,
  },
  {
    date: "2026-03-15",
    desc: "Listing fee - Naguru studio",
    amount: 30_000,
    method: "Airtel Money",
    type: "listing" as const,
  },
  {
    date: "2026-03-10",
    desc: "Deal agency fee - Entebbe apartment",
    amount: 110_000,
    method: "MTN MoMo",
    type: "agency-fee" as const,
  },
  {
    date: "2026-03-05",
    desc: "Listing fee - Kololo standalone",
    amount: 30_000,
    method: "MTN MoMo",
    type: "listing" as const,
  },
  {
    date: "2026-02-28",
    desc: "Listing fee - Muyenga townhouse",
    amount: 30_000,
    method: "Airtel Money",
    type: "listing" as const,
  },
];

export default function BillingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredTxRow, setHoveredTxRow] = useState<number | null>(null);
  const [hoveredCommRow, setHoveredCommRow] = useState<number | null>(null);

  return (
    <>
      {/* -- Dark hero header ------------------------------------------- */}
      <ScrollReveal>
        <header className="relative bg-navy overflow-hidden">
          {/* Grid pattern texture */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-3 text-sm text-white/70">
              <Link
                href="/landlord"
                className="text-gold hover:text-gold-dark"
                style={{
                  transition: SMOOTH,
                }}
              >
                Dashboard
              </Link>
              <span className="mx-2 text-white/60">/</span>
              <span className="font-medium text-white">
                Billing &amp; Agency Fees
              </span>
            </nav>

            <p className="section-label mb-2 text-orange">Financials</p>

            <h1 className="font-display text-xl tracking-tighter text-white sm:text-2xl md:text-3xl">
              Billing &amp; Agency Fees
            </h1>
            <p className="mt-1 text-sm text-white/70">
              Full payment history and agency fee details
            </p>
          </div>
        </header>
      </ScrollReveal>

      {/* -- Summary stats ---------------------------------------------- */}
      <ScrollReveal>
        <section className="bg-smoke">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Total Listing Fees */}
              <ScrollReveal variant="scale" delay={0}>
                <article
                  className="rounded-2xl bg-navy p-6 cursor-default"
                  style={{
                    transition: SMOOTH,
                    transform:
                      hoveredCard === 0 ? "scale(1.02)" : "scale(1)",
                    boxShadow:
                      hoveredCard === 0
                        ? "0 12px 40px rgba(212, 168, 83, 0.18)"
                        : "none",
                  }}
                  onMouseEnter={() => setHoveredCard(0)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-light">
                      <Receipt className="h-5 w-5 text-gold" />
                    </div>
                    <p className="text-sm font-medium text-white/70">
                      Total Listing Fees
                    </p>
                  </div>
                  <p className="font-display mt-3 text-2xl tracking-tighter text-white">
                    UGX 240,000
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    8 listings &times; UGX 30,000
                  </p>
                </article>
              </ScrollReveal>

              {/* Total Agency Fees */}
              <ScrollReveal variant="scale" delay={100}>
                <article
                  className="rounded-2xl bg-navy p-6 cursor-default"
                  style={{
                    transition: SMOOTH,
                    transform:
                      hoveredCard === 1 ? "scale(1.02)" : "scale(1)",
                    boxShadow:
                      hoveredCard === 1
                        ? "0 12px 40px rgba(0, 166, 153, 0.18)"
                        : "none",
                  }}
                  onMouseEnter={() => setHoveredCard(1)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-light">
                      <TrendingUp className="h-5 w-5 text-teal" />
                    </div>
                    <p className="text-sm font-medium text-white/70">
                      Total Agency Fees
                    </p>
                  </div>
                  <p className="font-display mt-3 text-2xl tracking-tighter text-white">
                    UGX 340,000
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    5% on 1 month&apos;s rent per deal
                  </p>
                </article>
              </ScrollReveal>

              {/* Current Plan */}
              <ScrollReveal variant="scale" delay={200}>
                <article
                  className="rounded-2xl bg-navy p-6 cursor-default"
                  style={{
                    transition: SMOOTH,
                    transform:
                      hoveredCard === 2 ? "scale(1.02)" : "scale(1)",
                    boxShadow:
                      hoveredCard === 2
                        ? "0 12px 40px rgba(232, 119, 34, 0.18)"
                        : "none",
                  }}
                  onMouseEnter={() => setHoveredCard(2)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-light">
                      <CreditCard className="h-5 w-5 text-orange" />
                    </div>
                    <p className="text-sm font-medium text-white/70">
                      Current Plan
                    </p>
                  </div>
                  <p className="font-display mt-3 text-2xl tracking-tighter text-white">
                    Pay-Per-Listing
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-dark hover:underline"
                    style={{
                      transition: SMOOTH,
                    }}
                  >
                    Upgrade to Annual
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </article>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* -- Transaction history ---------------------------------------- */}
      <ScrollReveal>
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-navy">
              <div className="px-6 py-5">
                <h2 className="font-display text-lg tracking-tighter text-white">
                  Transaction History
                </h2>
              </div>
              {/* Mobile card view */}
              <div className="space-y-3 px-4 pb-4 sm:hidden">
                {TRANSACTIONS.map((tx, i) => (
                  <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-white/80">{tx.desc}</p>
                      <span className="shrink-0 font-display text-sm font-bold text-orange">{formatUGX(tx.amount)}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-[10px] text-white/40">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{tx.date}</span>
                      <span>{tx.method}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full min-w-[540px] text-left text-sm">
                  <thead>
                    <tr className="bg-white/[0.04]">
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gold">
                        Date
                      </th>
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gold">
                        Description
                      </th>
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gold">
                        Amount
                      </th>
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gold">
                        Method
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRANSACTIONS.map((tx, i) => (
                      <tr
                        key={i}
                        style={{
                          transition: SMOOTH,
                          backgroundColor:
                            hoveredTxRow === i
                              ? "rgba(212, 168, 83, 0.05)"
                              : i % 2 === 1
                                ? "rgba(255, 255, 255, 0.02)"
                                : "transparent",
                        }}
                        onMouseEnter={() => setHoveredTxRow(i)}
                        onMouseLeave={() => setHoveredTxRow(null)}
                      >
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 text-white/70">
                            <Calendar className="h-3.5 w-3.5" />
                            {tx.date}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-white">
                          {tx.desc}
                        </td>
                        <td className="px-6 py-4 font-bold text-white">
                          {formatUGX(tx.amount)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              tx.method === "MTN MoMo"
                                ? "bg-amber-light text-amber"
                                : "bg-red-light text-red"
                            }`}
                          >
                            {tx.method}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* -- Agency fee reference --------------------------------------- */}
      <ScrollReveal>
        <section className="bg-smoke">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-navy">
              <div className="px-6 py-5">
                <h2 className="font-display text-lg tracking-tighter text-white">
                  Agency Fee Reference
                </h2>
                <p className="mt-0.5 text-sm text-white/70">
                  5% on 1 month&apos;s agreed rent — not the full upfront
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead>
                    <tr className="bg-white/[0.04]">
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gold">
                        Agreed Rent
                      </th>
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gold">
                        5% Agency Fee
                      </th>
                      <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gold">
                        You Receive
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {AGENCY_FEE_TIERS.map((tier, i) => (
                      <tr
                        key={tier.rent}
                        style={{
                          transition: SMOOTH,
                          backgroundColor:
                            hoveredCommRow === i
                              ? "rgba(212, 168, 83, 0.05)"
                              : i % 2 === 1
                                ? "rgba(255, 255, 255, 0.02)"
                                : "transparent",
                        }}
                        onMouseEnter={() => setHoveredCommRow(i)}
                        onMouseLeave={() => setHoveredCommRow(null)}
                      >
                        <td className="px-6 py-3.5 font-display font-semibold text-white">
                          {formatUGX(tier.rent)}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="font-semibold text-red">
                            {formatUGX(tier.agencyFee)}
                          </span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="font-bold text-green">
                            {formatUGX(tier.net)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
