"use client";

import Link from "next/link";
import Image from "@/components/Img";
import {
  ArrowRight,
  Shield,
  Eye,
  Target,
  Heart,
  Users,
  Building2,
  MapPin,
  Handshake,
  CheckCircle2,
  Phone,
  Zap,
  Star,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ─── Data ─── */

const VALUES = [
  {
    icon: Shield,
    title: "Trust First",
    desc: "Every user is verified. Every listing is reviewed. We don't cut corners on safety — it's the foundation everything else is built on.",
    accent: "#0A9396",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    desc: "No hidden fees. No surprise charges. Our pricing, agency fee structure, and verification process are all public and clear.",
    accent: "#d4a853",
  },
  {
    icon: Heart,
    title: "People Over Profit",
    desc: "We exist to solve a real problem for real Ugandans. Every decision we make starts with: does this make finding or renting a home easier?",
    accent: "#D4622A",
  },
  {
    icon: Handshake,
    title: "Fair Deals",
    desc: "We mediate every transaction to ensure both tenants and landlords are treated fairly. No exploitation, no scams, no wasted time.",
    accent: "#0A9396",
  },
];

const STATS = [
  { value: "2,500+", label: "Listings", icon: Building2 },
  { value: "1,200+", label: "Verified Properties", icon: Shield },
  { value: "50+", label: "Areas Covered", icon: MapPin },
  { value: "10", label: "Districts", icon: Star },
];

const TEAM_QUALITIES = [
  "Local Ugandan team based in Kampala",
  "Direct knowledge of every district we serve",
  "Available 7 days a week via phone and WhatsApp",
  "Every team member is background-checked",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* ================================================================
          HERO
      ================================================================ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/houses/house_12.jpg"
          alt="Kampala cityscape"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(212,168,83,0.08),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 sm:gap-8 py-12 sm:gap-12 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
            {/* LEFT — Text */}
            <ScrollReveal variant="left">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-gold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-gold opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                About Us
              </div>

              <h1 className="mt-8 font-display text-3xl font-bold uppercase tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Making Renting{" "}
                <span className="text-gradient-gold">Simple</span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 sm:text-lg">
                pata.ug is Uganda&apos;s trusted property marketplace — connecting
                verified tenants with verified landlords through a transparent,
                mediated process.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/search" className="btn-gold-lg">
                  Browse Properties <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline-white px-6 py-4 text-sm"
                >
                  Get in Touch <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>

            {/* RIGHT — Property image */}
            <ScrollReveal variant="right">
              <div className="img-zoom relative hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
                <Image
                  src="/property_images/houses/house_7.jpg"
                  alt="Property in Kampala"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />
                <div className="absolute bottom-6 left-6 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                    Trusted Platform
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-white">
                    pata.ug
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          OUR STORY
      ================================================================ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT — Image */}
            <ScrollReveal variant="left">
              <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-3xl">
                <Image
                  src="/property_images/apartments/apartment_10.jpg"
                  alt="Property in Kampala"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A9396]/30 via-transparent to-transparent" />
              </div>
            </ScrollReveal>

            {/* RIGHT — Story */}
            <ScrollReveal variant="right">
              <p className="section-label text-teal">Our Story</p>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tighter text-navy sm:text-3xl md:text-4xl lg:text-5xl">
                Born From a{" "}
                <span className="text-gradient-gold">Real Problem</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-text-muted">
                <p>
                  Finding a rental property in Uganda has always been painful.
                  Tenants waste days chasing brokers, visiting properties that
                  don&apos;t match the description, and paying hidden fees. Landlords
                  struggle with unreliable tenants, vacant units, and zero
                  visibility.
                </p>
                <p>
                  pata.ug was built to fix this. We created a platform where every
                  listing is reviewed, every user is verified, and every deal is
                  mediated fairly. No direct contact until the deal is done — which
                  means no scams, no time-wasting, and no exploitation.
                </p>
                <p>
                  We started in Kampala and have expanded across 10 districts in
                  Uganda. Our goal is simple: make renting as easy as it should be.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          MISSION & VISION
      ================================================================ */}
      <section className="relative overflow-hidden bg-navy">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-teal/[0.06] blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
          <div className="grid gap-4 sm:gap-8 md:grid-cols-2">
            {/* Mission */}
            <ScrollReveal variant="left">
              <div
                className="group rounded-xl p-6 sm:rounded-3xl sm:p-8 lg:p-10"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  transition: `all 600ms ${T}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(10,147,150,0.15)" }}
                >
                  <Target size={28} className="text-teal" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tighter text-white sm:text-2xl">
                  Our Mission
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  To eliminate the pain, risk, and inefficiency of renting in
                  Uganda by providing a verified, transparent, and mediated
                  property marketplace that protects both tenants and landlords.
                </p>
              </div>
            </ScrollReveal>

            {/* Vision */}
            <ScrollReveal variant="right">
              <div
                className="group rounded-xl p-6 sm:rounded-3xl sm:p-8 lg:p-10"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  transition: `all 600ms ${T}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(212,168,83,0.15)" }}
                >
                  <Eye size={28} className="text-gold" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tighter text-white sm:text-2xl">
                  Our Vision
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  To become East Africa&apos;s most trusted property platform —
                  where every rental is verified, every deal is fair, and finding
                  a home takes hours, not weeks.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          VALUES
      ================================================================ */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
          <ScrollReveal>
            <div className="text-center">
              <p className="section-label text-gold">What We Stand For</p>
              <h2 className="mx-auto mt-4 max-w-3xl font-display text-xl font-bold uppercase tracking-tighter text-navy sm:text-3xl md:text-4xl lg:text-5xl">
                Our <span className="text-gradient-gold">Values</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-2 sm:mt-14 sm:gap-3 sm:grid-cols-2 lg:gap-6 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.title} variant="scale" delay={i * 100}>
                  <div
                    className="group rounded-xl bg-white p-4 sm:rounded-2xl sm:p-6 lg:rounded-3xl lg:p-8"
                    style={{
                      boxShadow: "0 4px 24px rgba(11,25,41,0.06)",
                      transition: `all 600ms ${T}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = `0 20px 48px ${v.accent}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 24px rgba(11,25,41,0.06)";
                    }}
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${v.accent}15` }}
                    >
                      <Icon size={24} style={{ color: v.accent }} />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold tracking-tight text-navy sm:mt-5 sm:text-lg">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {v.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          STATS
      ================================================================ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/apartments/apartment_5.jpg"
          alt="Properties across Uganda"
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.06),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <ScrollReveal>
            <div className="text-center">
              <p className="section-label text-gold">By the Numbers</p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tighter text-white md:text-4xl">
                pata.ug <span className="text-gradient-gold">Today</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 gap-3 xs:grid-cols-2 sm:mt-14 sm:gap-6 lg:grid-cols-4">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={s.label} variant="scale" delay={i * 100}>
                  <div
                    className="rounded-xl bg-white/[0.04] p-4 text-center backdrop-blur-sm sm:rounded-2xl sm:p-6"
                    style={{ transition: `all 600ms ${T}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon size={24} className="mx-auto text-gold" />
                    <p className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">
                      {s.label}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          HOW WE WORK — THE PATA DIFFERENCE
      ================================================================ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT — Text */}
            <ScrollReveal variant="left">
              <p className="section-label text-orange">How We Work</p>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tighter text-navy sm:text-3xl md:text-4xl lg:text-5xl">
                The Pata{" "}
                <span className="text-gradient-gold">Difference</span>
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-text-muted">
                Unlike traditional brokers, pata.ug sits in the middle of every
                deal. We verify both sides, mediate negotiations, and only reveal
                contact details after a deal is confirmed. This protects everyone.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { text: "Every user verified with National ID before transacting", icon: Shield },
                  { text: "All listings reviewed by our team within 24 hours", icon: CheckCircle2 },
                  { text: "pata.ug mediates all negotiations — no direct contact until deal closes", icon: Handshake },
                  { text: "5% agency fee on 1 month's rent — not the full upfront", icon: Zap },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10">
                        <Icon size={14} className="text-teal" />
                      </div>
                      <p className="text-sm leading-relaxed text-text-muted">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* RIGHT — Image */}
            <ScrollReveal variant="right">
              <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-3xl">
                <Image
                  src="/property_images/houses/house_8.jpg"
                  alt="Verified property"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4622A]/30 via-transparent to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          OUR TEAM
      ================================================================ */}
      <section className="relative overflow-hidden bg-navy">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT — CEO photo */}
            <ScrollReveal variant="left">
              <div className="img-zoom relative aspect-[3/4] overflow-hidden rounded-xl sm:rounded-3xl">
                <Image
                  src="/Isaac_Etyang-Profile_Photograph.jpg"
                  alt="Etty Etiang — CEO, pata.ug"
                  fill
                  sizes="50vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                      Etty Etiang — Founder &amp; CEO
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-white">
                      Built in Uganda, for Uganda
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT — Team text */}
            <ScrollReveal variant="right">
              <p className="section-label text-gold">Our Team</p>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl">
                Built by <span className="text-gradient-gold">Ugandans</span>
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-white/60">
                pata.ug is not a foreign import. We&apos;re a Ugandan team that
                understands the local rental market because we live it. Our field
                agents verify properties in person, our support team speaks your
                language, and our platform is designed for how Ugandans actually
                rent.
              </p>

              <div className="mt-8 space-y-3">
                {TEAM_QUALITIES.map((q) => (
                  <div key={q} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20">
                      <CheckCircle2 size={12} className="text-gold" />
                    </div>
                    <p className="text-sm text-white/60">{q}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/contact" className="btn-gold-lg">
                  Contact Us <Phone size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
      ================================================================ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <ScrollReveal variant="scale">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl"
              style={{ background: "rgba(212,168,83,0.1)" }}
            >
              <Users className="h-8 w-8 text-gold" />
            </div>
            <h2 className="mt-8 font-display text-xl font-bold uppercase tracking-tighter text-navy sm:text-3xl md:text-4xl lg:text-5xl">
              Join <span className="text-gradient-gold">pata.ug</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-text-muted">
              Whether you&apos;re looking for a home or listing a property,
              we&apos;re here to make it simple, safe, and fair.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup" className="btn-gold-lg">
                Create an Account <ArrowRight size={18} />
              </Link>
              <Link href="/how-it-works" className="btn-outline-navy px-8 py-4 text-base">
                How It Works <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
