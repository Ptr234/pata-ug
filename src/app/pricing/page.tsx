"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ArrowRight,
  Shield,
  Zap,
  Phone,
  CreditCard,
  Building2,
  Users,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PlanCard from "@/components/PlanCard";
import {
  CLIENT_PLANS,
  LANDLORD_PLANS,
  COMMISSION_TIERS,
} from "@/lib/constants";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

function formatUGX(amount: number): string {
  return `UGX ${amount.toLocaleString("en-UG")}`;
}

const DECISION_GUIDE = [
  { scenario: "Browsing 1-5 times a year", audience: "Client", rec: "Day Pass", detail: "UGX 20,000 each", color: "#0A9396", icon: Shield },
  { scenario: "Browsing 6+ times a year", audience: "Client", rec: "Annual", detail: "saves UGX 40,000+", color: "#0A9396", icon: Zap },
  { scenario: "1-3 properties to list", audience: "Landlord", rec: "Pay-Per-Listing", detail: "flexible, no commitment", color: "#D4622A", icon: CreditCard },
  { scenario: "4+ properties to list", audience: "Landlord", rec: "Annual", detail: "no per-listing fees", color: "#D4622A", icon: Zap },
] as const;

export default function PricingPage() {
  return (
    <main className="min-h-screen">

      {/* ================================================================
          SECTION 1 — HERO  |  Split 50/50
          Navy bg + grid pattern + gold radial glow
      ================================================================ */}
      <section className="relative overflow-hidden bg-navy">
        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Gold radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(212,168,83,0.08),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[540px] items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">

            {/* LEFT — Content */}
            <ScrollReveal variant="left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-gold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-gold opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                No Hidden Fees
              </div>

              <h1 className="mt-8 font-display text-5xl font-bold uppercase tracking-tighter text-white md:text-6xl lg:text-7xl">
                Simple{" "}
                <span className="text-gradient-gold">Pricing</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
                Choose the plan that works for you. Pay via MTN MoMo or Airtel
                Money — instant, secure, no card required.
              </p>

              {/* Two frosted glass stat cards */}
              <div className="mt-10 flex flex-wrap gap-4">
                {[
                  { icon: Users, text: "Tenants from UGX 20K", accent: "#0A9396" },
                  { icon: Building2, text: "Landlords from UGX 30K", accent: "#D4622A" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-5 py-3.5 backdrop-blur-sm"
                    style={{ transition: `all 500ms ${T}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ background: `${item.accent}15` }}
                    >
                      <item.icon size={18} style={{ color: item.accent }} />
                    </div>
                    <span className="text-sm font-bold text-white/70">{item.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* RIGHT — Full-bleed property image */}
            <ScrollReveal variant="right">
              <div className="img-zoom relative hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
                <Image
                  src="/property_images/houses/house_7.jpg"
                  alt="Premium property in Kampala"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />
                {/* Floating price tag */}
                <div className="absolute bottom-6 left-6 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                    Starting from
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-white">
                    UGX 20,000
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — CLIENT PLANS  |  Split (plans left, image right)
          White bg
      ================================================================ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

            {/* LEFT — Plans */}
            <div>
              <ScrollReveal variant="left">
                <p className="section-label text-teal">For Tenants</p>
                <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tighter text-navy md:text-4xl lg:text-5xl">
                  Tenant &amp; Home Seeker Plans
                </h2>
                <p className="mt-5 max-w-lg leading-relaxed text-text-muted">
                  Unlock landlord contacts, GPS coordinates, and WhatsApp links
                </p>
              </ScrollReveal>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {CLIENT_PLANS.map((plan, i) => (
                  <ScrollReveal key={plan.name} variant="scale" delay={i * 120}>
                    <PlanCard
                      name={plan.name}
                      price={plan.price}
                      duration={plan.duration}
                      features={plan.features}
                      cta={plan.cta}
                      popular={plan.popular}
                      variant="client"
                    />
                  </ScrollReveal>
                ))}
              </div>

              {/* Trust badges */}
              <ScrollReveal delay={300}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                  {[
                    "24-hour access with Day Pass",
                    "Cancel anytime",
                    "Pay via MoMo or Airtel",
                  ].map((text) => (
                    <span
                      key={text}
                      className="flex items-center gap-2 text-xs text-text-muted"
                    >
                      <Check size={14} className="text-teal" strokeWidth={3} />
                      {text}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT — Property image */}
            <ScrollReveal variant="right">
              <div className="img-zoom relative hidden aspect-[3/4] overflow-hidden rounded-3xl lg:block">
                <Image
                  src="/property_images/apartments/apartment_10.jpg"
                  alt="Modern apartment interior"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                {/* Teal-tinted gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A9396]/40 via-[#0A9396]/10 to-transparent" />

                {/* Floating frosted "24-Hour Access" badge */}
                <div className="absolute right-6 top-6 flex items-center gap-2.5 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-xl">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal/20">
                    <Zap size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-white">24-Hour Access</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — GRADIENT DIVIDER
          Full-width teal-to-orange gradient strip
      ================================================================ */}
      <div
        className="py-6"
        style={{
          background: "linear-gradient(135deg, #0A9396, #077B7E 50%, #D4622A)",
        }}
      >
        <ScrollReveal>
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
            <p className="text-center text-sm font-bold uppercase tracking-wider text-white sm:text-left">
              Tenants start at UGX 20,000 &middot; Landlords start at UGX 30,000
            </p>
            <Link
              href="/login"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wider text-navy"
              style={{ transition: `all 500ms ${T}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get Started <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* ================================================================
          SECTION 4 — LANDLORD PLANS  |  Split REVERSED (image left, plans right)
          Navy bg + grid pattern + orange blur orb
      ================================================================ */}
      <section className="relative overflow-hidden bg-navy">
        {/* Orange blur orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-orange/[0.06] blur-3xl"
        />
        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

            {/* LEFT — Property image */}
            <ScrollReveal variant="left">
              <div className="img-zoom relative hidden aspect-[3/4] overflow-hidden rounded-3xl lg:block">
                <Image
                  src="/property_images/houses/house_8.jpg"
                  alt="Beautiful house in Kampala"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                {/* Orange-tinted gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4622A]/40 via-[#D4622A]/10 to-transparent" />

                {/* Floating frosted "Live in 24h" badge */}
                <div className="absolute left-6 top-6 flex items-center gap-2.5 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-xl">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange/20">
                    <Zap size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-white">Live in 24h</span>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT — Plans */}
            <div>
              <ScrollReveal variant="right">
                <p className="section-label text-orange">For Landlords</p>
                <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tighter text-white md:text-4xl lg:text-5xl">
                  Property <span className="text-gradient-gold">Owner</span> Plans
                </h2>
                <p className="mt-5 max-w-lg leading-relaxed text-white/70">
                  List your properties and connect with verified tenants across Kampala
                </p>
              </ScrollReveal>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {LANDLORD_PLANS.map((plan, i) => (
                  <ScrollReveal key={plan.name} variant="scale" delay={i * 120}>
                    <PlanCard
                      name={plan.name}
                      price={plan.price}
                      duration={plan.duration}
                      features={plan.features}
                      cta={plan.cta}
                      popular={plan.popular}
                      variant="landlord"
                    />
                  </ScrollReveal>
                ))}
              </div>

              {/* Trust badges */}
              <ScrollReveal delay={300}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                  {[
                    "Listings live for 30 days",
                    "Admin review within 24 hours",
                    "5% commission only on deals",
                  ].map((text) => (
                    <span
                      key={text}
                      className="flex items-center gap-2 text-xs text-white/70"
                    >
                      <Check size={14} className="text-orange" strokeWidth={3} />
                      {text}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — COMMISSION TABLE  |  Split (table left, image right)
          Smoke bg
      ================================================================ */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

            {/* LEFT — Table */}
            <div>
              <ScrollReveal variant="left">
                <p className="section-label text-gold">Commission</p>
                <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tighter text-navy md:text-4xl lg:text-5xl">
                  5% Deal <span className="text-gradient-gold">Commission</span>
                </h2>
                <p className="mt-5 max-w-lg leading-relaxed text-text-muted">
                  Charged on the agreed monthly rent when a deal is confirmed — not
                  the listed price.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="scale" delay={150}>
                <div
                  className="mt-10 overflow-hidden rounded-3xl"
                  style={{
                    background: "#0B1929",
                    boxShadow: "0 24px 48px -12px rgba(11,25,41,0.25)",
                  }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[440px] text-left text-sm">
                      <thead>
                        <tr>
                          {["Agreed Monthly Rent", "5% Commission", "You Receive"].map(
                            (h) => (
                              <th
                                key={h}
                                className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.18em] text-gold"
                              >
                                {h}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {COMMISSION_TIERS.map((tier, i) => (
                          <tr
                            key={tier.rent}
                            style={{
                              background:
                                i % 2 === 0
                                  ? "rgba(255,255,255,0.02)"
                                  : "transparent",
                              transition: `background-color 500ms ${T}`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "rgba(212,168,83,0.06)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                i % 2 === 0
                                  ? "rgba(255,255,255,0.02)"
                                  : "transparent";
                            }}
                          >
                            <td className="px-6 py-4 font-display text-base font-bold text-white">
                              {formatUGX(tier.rent)}
                            </td>
                            <td className="px-6 py-4 font-bold text-orange">
                              {formatUGX(tier.commission)}
                            </td>
                            <td className="px-6 py-4 font-bold text-green">
                              {formatUGX(tier.net)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT — Property image */}
            <ScrollReveal variant="right">
              <div className="img-zoom relative hidden aspect-[3/4] overflow-hidden rounded-3xl lg:block">
                <Image
                  src="/property_images/commercial/commercial_3.jpg"
                  alt="Commercial property space"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                {/* Gold-tinted gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4a853]/40 via-[#d4a853]/10 to-transparent" />

                {/* Floating frosted "5% Only On Success" badge */}
                <div className="absolute right-6 top-6 flex items-center gap-2.5 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-xl">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold/20">
                    <Shield size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-white">
                    5% Only On Success
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — DECISION GUIDE  |  Full-width dark section
          Navy bg + bg image at opacity-20 + overlay
      ================================================================ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/apartments/apartment_5.jpg"
          alt="Apartment interior in Kampala"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(10,147,150,0.06),transparent_50%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <ScrollReveal>
            <header className="mb-16 text-center">
              <p className="section-label text-gold">Not sure?</p>
              <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-6xl">
                Which Plan Is{" "}
                <span className="text-gradient-gold">Right</span> for You?
              </h2>
              <p className="mx-auto mt-5 max-w-md leading-relaxed text-white/70">
                Match your usage to the perfect plan
              </p>
            </header>
          </ScrollReveal>

          {/* 2x2 grid of frosted glass decision cards */}
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {DECISION_GUIDE.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.scenario} variant="scale" delay={i * 100}>
                  <div
                    className="group relative overflow-hidden rounded-2xl"
                    style={{ transition: `all 600ms ${T}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = `0 16px 48px ${item.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Hover glow border */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}15, transparent)`,
                      }}
                    />

                    <div className="relative flex items-center gap-5 rounded-2xl bg-white/[0.04] px-6 py-6 backdrop-blur-sm">
                      {/* Numbered icon */}
                      <div
                        className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl"
                        style={{ background: `${item.color}12` }}
                      >
                        <Icon size={20} style={{ color: item.color }} />
                        <span
                          className="mt-1 text-[10px] font-bold"
                          style={{ color: `${item.color}80` }}
                        >
                          0{i + 1}
                        </span>
                      </div>

                      <div className="flex-1">
                        {/* Audience badge */}
                        <span
                          className="inline-block rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white"
                          style={{ background: item.color }}
                        >
                          {item.audience}
                        </span>
                        {/* Scenario text */}
                        <p className="mt-2 text-sm font-medium leading-relaxed text-white/60">
                          {item.scenario}
                        </p>
                        {/* Recommendation pill */}
                        <div className="mt-2 flex items-center gap-2">
                          <Check size={14} className="text-gold" strokeWidth={3} />
                          <span className="font-display text-sm font-bold tracking-tight text-white">
                            {item.rec}
                          </span>
                          <span className="text-xs text-white/60">
                            {item.detail}
                          </span>
                        </div>
                      </div>

                      {/* Arrow reveal */}
                      <ArrowRight
                        size={18}
                        className="shrink-0 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-70"
                        style={{
                          color: item.color,
                          transform: "translateX(-8px)",
                        }}
                      />
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                      }}
                    />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Gold CTA */}
          <ScrollReveal delay={500}>
            <div className="mt-14 text-center">
              <Link href="/login" className="btn-gold-lg">
                Get Started Today <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 — PAYMENT METHODS  |  Centered dark pill on white bg
      ================================================================ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <ScrollReveal variant="scale">
            <div
              className="mx-auto inline-flex max-w-lg flex-col items-center gap-5 rounded-3xl px-10 py-8 sm:flex-row"
              style={{
                background: "#0B1929",
                boxShadow: "0 12px 40px rgba(11,25,41,0.15)",
              }}
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #d4a853, #B8903D)",
                  boxShadow: "0 4px 16px rgba(212,168,83,0.3)",
                }}
              >
                <Phone size={24} className="text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-white/70">
                  Pay securely via{" "}
                  <span className="font-bold text-amber">MTN MoMo</span> and{" "}
                  <span className="font-bold text-red">Airtel Money</span>
                </p>
                <p className="mt-1 text-xs text-white/60">
                  All payments processed instantly — no card required
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 8 — CTA  |  Full-bleed bg image with dark overlay
      ================================================================ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/houses/house_9.jpg"
          alt="Property in Kampala"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,168,83,0.06),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            {/* Shield icon in frosted square */}
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl backdrop-blur-sm"
              style={{ background: "rgba(212,168,83,0.1)" }}
            >
              <Shield className="h-8 w-8 text-gold" />
            </div>
            <h2 className="mt-8 font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl">
              Ready to <span className="text-gradient-gold">Start</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-white/70">
              Browse properties or list your own today — no commitments, cancel
              anytime.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/search" className="btn-gold-lg">
                Browse Properties <ArrowRight size={18} />
              </Link>
              <Link
                href="/login"
                className="btn-outline-white px-8 py-4 text-base"
              >
                List Your Property <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
