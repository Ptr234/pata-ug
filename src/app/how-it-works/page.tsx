"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShoppingBag,
  MessageCircle,
  Handshake,
  UserCheck,
  ImagePlus,
  CreditCard,
  Shield,
  Megaphone,
  ClipboardCheck,
  ArrowRight,
  Phone,
  CheckCircle2,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

/* ─── Step data with icons ─── */

const TENANT_STEPS = [
  { icon: Search, title: "Browse", desc: "Search thousands of verified properties across Uganda with smart filters by district, area, category, price, and bedrooms." },
  { icon: ShoppingBag, title: "Subscribe", desc: "Purchase a Day Pass (UGX 20,000) for 24-hour access or an Annual Subscription (UGX 120,000) for unlimited access." },
  { icon: MessageCircle, title: "Connect", desc: "We handle the negotiation on your behalf. Once a deal is agreed, landlord contact details are shared securely." },
  { icon: Handshake, title: "Close", desc: "Once you agree on rent, tap 'I've agreed a deal' to confirm. The property is removed from search results." },
];

const LANDLORD_STEPS = [
  { icon: UserCheck, title: "Register", desc: "Sign up and verify your National ID. This builds trust with potential tenants on the platform." },
  { icon: ClipboardCheck, title: "Categorise", desc: "Choose from 12 property categories. This determines which fields appear in your listing form." },
  { icon: ImagePlus, title: "List", desc: "Add a description, set your monthly rent, and upload at least 3 photos. The first photo becomes the cover." },
  { icon: CreditCard, title: "Pay", desc: "Pay UGX 30,000 per listing via MTN MoMo or Airtel Money. Annual subscribers skip this step entirely." },
  { icon: Shield, title: "Review", desc: "Our team reviews your listing within 24 hours. Once approved, it goes live to all users." },
  { icon: Megaphone, title: "Receive", desc: "Our team manages tenant enquiries and negotiations. Contacts are shared only after a deal is successfully closed." },
];

const DEAL_FLOW = [
  { step: "01", label: "Client taps\n\"Agreed a deal\"", color: "#0A9396" },
  { step: "02", label: "Landlord\nreceives SMS", color: "#0A9396" },
  { step: "03", label: "Client\nconfirms rent", color: "#d4a853" },
  { step: "04", label: "Both sides\nconfirm deal", color: "#d4a853" },
  { step: "05", label: "5% commission\nrequested", color: "#D4622A" },
];

const VERIFIED_FLOW = [
  { step: "01", label: "Listing approved", icon: CheckCircle2 },
  { step: "02", label: "SMS invite sent", icon: Phone },
  { step: "03", label: "Agent visit scheduled", icon: UserCheck },
  { step: "04", label: "Geotagged photos taken", icon: ImagePlus },
  { step: "05", label: "Admin reviews report", icon: ClipboardCheck },
  { step: "06", label: "Gold badge applied", icon: Shield },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/houses/house_10.jpg"
          alt="Kampala residential property"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,83,0.07),transparent_60%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-teal/[0.04] blur-3xl" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 text-center sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
          <ScrollReveal>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-gold">
              <ArrowRight className="h-3.5 w-3.5" />
              Step by Step
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="mx-auto mt-8 max-w-5xl font-display text-5xl font-bold uppercase tracking-tighter text-white md:text-6xl lg:text-7xl xl:text-8xl">
              How{" "}
              <span className="text-gradient-gold">Pata.ug</span>{" "}
              Works
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              Everything you need to know about finding a home or listing
              your property — in simple steps.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FOR TENANTS — Full-bleed bg image + card grid ═══ */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <Image
          src="/property_images/apartments/apartment_3.jpg"
          alt="Apartments in Kampala"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy/95" />

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-teal">
                <Search className="h-3.5 w-3.5" />
                For Tenants
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-6xl">
                Find Your Next{" "}
                <span className="text-gradient-teal">Home</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                Four simple steps from browsing to moving in. We handle all
                negotiations and share contacts only after a successful deal.
              </p>
            </div>
          </ScrollReveal>

          {/* Step cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TENANT_STEPS.map((step, i) => (
              <ScrollReveal key={step.title} variant="scale" delay={i * 100}>
                <div
                  className="group relative overflow-hidden rounded-3xl bg-white/[0.05] p-7 backdrop-blur-sm"
                  style={{
                    transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "0 20px 48px rgba(10,147,150,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative">
                    {/* Number + icon row */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                        style={{
                          background: "linear-gradient(135deg, #0A9396, #077B7E)",
                          boxShadow: "0 4px 16px rgba(10,147,150,0.3)",
                        }}
                      >
                        <step.icon size={24} />
                      </div>
                      <span className="font-display text-5xl font-bold text-white/[0.06]">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom accent on hover */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "linear-gradient(90deg, transparent, #0A9396, transparent)" }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOR LANDLORDS — White bg + dark card grid ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-16 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-orange">
                <Megaphone className="h-3.5 w-3.5" />
                For Landlords
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold uppercase tracking-tighter text-navy md:text-5xl lg:text-6xl">
                List Your{" "}
                <span style={{ color: "#D4622A" }}>Property</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
                Six steps from registration to receiving tenant calls. Your
                property could be live within 24 hours.
              </p>
            </div>
          </ScrollReveal>

          {/* Step cards — 3x2 grid of dark navy cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LANDLORD_STEPS.map((step, i) => (
              <ScrollReveal key={step.title} variant="scale" delay={i * 80}>
                <div
                  className="group relative overflow-hidden rounded-3xl bg-navy p-7"
                  style={{
                    transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 24px 48px rgba(11,25,41,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                        style={{
                          background: "linear-gradient(135deg, #D4622A, #B54E1C)",
                          boxShadow: "0 4px 16px rgba(212,98,42,0.25)",
                        }}
                      >
                        <step.icon size={24} />
                      </div>
                      <span className="font-display text-5xl font-bold text-white/[0.06]">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {step.desc}
                    </p>
                  </div>

                  <div
                    className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "linear-gradient(90deg, transparent, #D4622A, transparent)" }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Image strip below */}
          <ScrollReveal delay={600}>
            <div className="img-zoom relative mt-14 aspect-[21/6] overflow-hidden rounded-3xl">
              <Image
                src="/property_images/houses/house_5.jpg"
                alt="Properties across Kampala"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-navy/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-2xl font-bold uppercase tracking-tighter text-white md:text-3xl lg:text-4xl">
                  Your property, live in 24 hours
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ DEAL FLOW — Dark immersive ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.05),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <ScrollReveal>
            <header className="text-center">
              <p className="section-label text-gold">Deal Flow</p>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-6xl">
                How Deals{" "}
                <span className="text-gradient-gold">Close</span>
              </h2>
              <p className="mx-auto mt-5 max-w-md leading-relaxed text-white/70">
                From agreement to confirmation — a transparent 5-step process
              </p>
            </header>
          </ScrollReveal>

          {/* Horizontal flow — desktop */}
          <ScrollReveal delay={200}>
            <div className="mx-auto mt-16 hidden max-w-5xl sm:block">
              <div className="flex items-start">
                {DEAL_FLOW.map((item, i) => (
                  <div key={item.step} className="flex flex-1 flex-col items-center">
                    {/* Circle */}
                    <div
                      className="relative flex h-20 w-20 items-center justify-center rounded-3xl"
                      style={{
                        background: `${item.color}15`,
                        transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                        e.currentTarget.style.background = `${item.color}25`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.background = `${item.color}15`;
                      }}
                    >
                      <span
                        className="font-display text-2xl font-bold"
                        style={{ color: item.color }}
                      >
                        {item.step}
                      </span>
                    </div>

                    {/* Label */}
                    <p className="mt-4 max-w-[130px] text-center text-sm leading-snug text-white/50 whitespace-pre-line">
                      {item.label}
                    </p>

                    {/* Connector */}
                    {i < DEAL_FLOW.length - 1 && (
                      <div className="absolute" style={{ display: "none" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Connecting line behind */}
              <div className="mx-auto -mt-[4.5rem] flex items-center px-[2.5rem]" aria-hidden="true">
                {DEAL_FLOW.slice(0, -1).map((item, i) => (
                  <div
                    key={i}
                    className="h-[2px] flex-1"
                    style={{
                      background: `linear-gradient(90deg, ${item.color}40, ${DEAL_FLOW[i + 1].color}40)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Vertical — mobile */}
            <ol className="mt-12 flex flex-col gap-4 sm:hidden">
              {DEAL_FLOW.map((item) => (
                <li
                  key={item.step}
                  className="flex items-center gap-5 rounded-2xl bg-white/[0.04] px-5 py-4 backdrop-blur-sm"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    {item.step}
                  </span>
                  <p className="text-sm text-white/60">{item.label.replace("\n", " ")}</p>
                </li>
              ))}
            </ol>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="mx-auto mt-14 max-w-md text-center text-sm text-white/60">
              Commission is based on the agreed rent — not the listed price.
              5% flat rate on all confirmed deals.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ VERIFIED BADGE — White editorial ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <ScrollReveal>
            <header className="text-center">
              <p className="section-label text-gold">Trust &amp; Safety</p>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase tracking-tighter text-navy md:text-5xl">
                The{" "}
                <span className="text-gradient-gold">Verified</span>{" "}
                Badge
              </h2>
              <p className="mx-auto mt-5 max-w-lg leading-relaxed text-text-muted">
                How properties earn our gold Verified badge through on-ground
                inspection by our field agents
              </p>
            </header>
          </ScrollReveal>

          <ScrollReveal stagger className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VERIFIED_FLOW.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="reveal group relative overflow-hidden rounded-2xl bg-navy p-6"
                  style={{
                    transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 20px 48px rgba(11, 25, 41, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(212, 168, 83, 0.15), rgba(212, 168, 83, 0.05))",
                        }}
                      >
                        <Icon size={20} className="text-gold" />
                      </span>
                      <span className="font-display text-4xl font-bold text-white/[0.06]">
                        {item.step}
                      </span>
                    </div>
                    <p className="mt-4 font-display text-base font-bold tracking-tight text-white">
                      {item.label}
                    </p>

                    {/* Bottom accent */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[2px]"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(212, 168, 83, 0), transparent)",
                        transition: "background 600ms",
                      }}
                    />
                  </div>

                  {/* Hover bottom line */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(90deg, transparent, #d4a853, transparent)",
                    }}
                  />
                </div>
              );
            })}
          </ScrollReveal>

          <ScrollReveal>
            <p className="mx-auto mt-12 max-w-md text-center text-sm text-text-muted">
              Verification is optional and free. Badge turns amber 30 days before
              expiry. Reply YES to any SMS to restart.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/apartments/apartment_6.jpg"
          alt="Modern apartment in Kampala"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,168,83,0.06),transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gold/10">
              <Shield className="h-8 w-8 text-gold" />
            </div>

            <h2 className="mt-8 font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl">
              Ready to{" "}
              <span className="text-gradient-gold">Start</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-white/70">
              Browse properties or list your own today — no commitments
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/search" className="btn-gold-lg">
                Browse Properties
                <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="btn-outline-white px-8 py-4 text-base">
                List Your Property
                <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
