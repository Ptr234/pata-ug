"use client";

import Link from "next/link";
import Image from "@/components/Img";
import {
  Shield,
  ShieldCheck,
  Camera,
  MapPin,
  User,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowRight,
  FileText,
  Phone,
  UserCheck,
  Eye,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

/* ─── Data ─── */

const CHECKS = [
  { icon: MapPin, title: "Property Exists", desc: "We confirm the property is real and at the listed GPS location", number: "01" },
  { icon: Camera, title: "Photos Match", desc: "Geotagged photos are taken on-site and compared to listing images", number: "02" },
  { icon: User, title: "Landlord Identity", desc: "National ID is verified and matched to property ownership records", number: "03" },
  { icon: CheckCircle2, title: "Accurate Details", desc: "Bedrooms, bathrooms, amenities, and condition are physically confirmed", number: "04" },
];

const VERIFICATION_STEPS = [
  { icon: FileText, title: "Post Your Listing", desc: "Submit your property through the listing wizard and pay the listing fee" },
  { icon: Phone, title: "Accept the Invite", desc: "You\u2019ll receive an SMS inviting you to schedule a verification visit. Reply YES." },
  { icon: UserCheck, title: "Agent Visit", desc: "A pata.ug field agent visits your property at the scheduled time" },
  { icon: Camera, title: "Photo & Report", desc: "The agent takes geotagged photos and submits a detailed report" },
  { icon: Eye, title: "Admin Review", desc: "Our team reviews the report within 48 hours" },
  { icon: ShieldCheck, title: "Badge Applied", desc: "If approved, your listing receives the gold Verified badge" },
];

const BADGE_STATES = [
  { state: "Unverified", label: "Default", icon: XCircle, color: "#8896A4", bg: "rgba(136,150,164,0.08)", desc: "No badge shown. Default state for all new listings." },
  { state: "Verified", label: "12 months", icon: ShieldCheck, color: "#d4a853", bg: "rgba(212,168,83,0.1)", desc: "Gold badge visible to all users. Valid for 12 months." },
  { state: "Expiring", label: "30 days left", icon: Clock, color: "#E08C10", bg: "rgba(224,140,16,0.1)", desc: "Amber badge. Informational reminder — no action needed yet." },
  { state: "Warning", label: "7 days left", icon: AlertTriangle, color: "#E08C10", bg: "rgba(224,140,16,0.1)", desc: "Amber badge + SMS. Request re-verification to keep your badge." },
  { state: "Expired", label: "Renewal needed", icon: XCircle, color: "#C0303A", bg: "rgba(192,48,58,0.08)", desc: "No badge. Reply YES to any SMS to restart the verification process." },
];

const FAQS = [
  { q: "Is verification mandatory?", a: "No, it\u2019s completely optional and free. But verified listings get significantly more tenant attention." },
  { q: "How long does verification take?", a: "Typically 3\u20135 business days from the moment you accept the SMS invite." },
  { q: "Does verification cost anything?", a: "Zero. The entire verification process is free for all landlords." },
  { q: "What happens when my badge expires?", a: "You\u2019ll receive SMS reminders starting 30 days before expiry. Simply reply YES to restart." },
];

/* ─── Page ─── */

export default function VerifiedPage() {
  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/houses/house_11.jpg"
          alt="Verified property in Kampala"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,83,0.08),transparent_60%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-3xl" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-28">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center">
              {/* Animated shield icon */}
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl sm:h-24 sm:w-24 sm:rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(212,168,83,0.15), rgba(212,168,83,0.05))",
                  boxShadow: "0 8px 32px rgba(212,168,83,0.1)",
                }}
              >
                <Shield className="h-12 w-12 text-gold" />
              </div>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-gold">
                <Shield className="h-3.5 w-3.5" />
                Verification Programme
              </div>

              <h1 className="mx-auto mt-8 max-w-4xl font-display text-2xl font-bold uppercase tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl">
                The{" "}
                <span className="text-gradient-gold">Verified</span>{" "}
                Badge
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/70 sm:text-lg">
                Our on-ground verification programme builds trust between tenants
                and landlords through physical property inspection.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ WHAT WE CHECK — Dark cards on white ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
          <ScrollReveal>
            <header className="text-center">
              <p className="section-label text-teal">What We Verify</p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tighter text-navy sm:text-4xl md:text-5xl">
                What Our Agents{" "}
                <span className="text-gradient-teal">Check</span>
              </h2>
            </header>
          </ScrollReveal>

          <ScrollReveal stagger className="mx-auto mt-8 grid max-w-5xl gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {CHECKS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="reveal group relative overflow-hidden rounded-xl bg-navy p-4 sm:rounded-2xl sm:p-6 lg:p-7"
                  style={{ transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 24px 48px rgba(11,25,41,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative">
                    {/* Ghost number */}
                    <span className="absolute -right-1 -top-2 font-display text-6xl font-bold text-white/[0.04]">
                      {item.number}
                    </span>

                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                      <Icon className="h-7 w-7 text-gold" />
                    </span>

                    <h3 className="mt-4 font-display text-base font-bold tracking-tight text-white sm:mt-5 sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom gold line on hover */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "linear-gradient(90deg, transparent, #d4a853, transparent)" }}
                  />
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ HOW TO GET VERIFIED — Dark split-screen ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-orange/[0.05] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
          <div className="grid gap-8 sm:gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left: heading + image */}
            <ScrollReveal variant="left">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-orange">
                  <FileText className="h-3.5 w-3.5" />
                  6 Steps
                </span>
                <h2 className="mt-6 font-display text-3xl font-bold uppercase tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  How to Get{" "}
                  <span className="text-gradient-gold">Verified</span>
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
                  The process is free, optional, and takes 3–5 business days from
                  accepting the SMS invite.
                </p>

                <div className="img-zoom relative mt-10 aspect-[16/10] overflow-hidden rounded-xl sm:rounded-3xl">
                  <Image
                    src="/property_images/houses/house_6.jpg"
                    alt="Property verification in progress"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  {/* Floating badge */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-xl">
                    <ShieldCheck className="h-6 w-6 text-gold" />
                    <div>
                      <p className="text-sm font-bold text-white">100% Free</p>
                      <p className="text-[10px] text-white/50">No charges for verification</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: steps timeline */}
            <ScrollReveal variant="right">
              <ol className="space-y-0">
                {VERIFICATION_STEPS.map((step, i) => (
                  <li key={step.title} className="relative flex gap-5 pb-9 last:pb-0">
                    {i < VERIFICATION_STEPS.length - 1 && (
                      <div className="absolute left-[23px] top-[56px] h-[calc(100%-56px)] w-[2px] bg-gradient-to-b from-gold/30 to-gold/5" />
                    )}

                    <div className="relative z-10 flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gold/8" />
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                        style={{
                          background: "linear-gradient(135deg, #d4a853, #B8903D)",
                          boxShadow: "0 4px 16px rgba(212,168,83,0.3)",
                        }}
                      >
                        <step.icon size={18} />
                      </div>
                    </div>

                    <div className="pt-1">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-xl font-bold tracking-tight text-white">{step.title}</span>
                        <span className="text-[10px] font-bold text-gold/30">0{i + 1}</span>
                      </div>
                      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/70">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ BADGE LIFECYCLE — Dark immersive visual timeline ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.05),transparent_50%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
          <ScrollReveal>
            <header className="text-center">
              <p className="section-label text-gold">Lifecycle</p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Badge{" "}
                <span className="text-gradient-gold">Lifecycle</span>
              </h2>
              <p className="mx-auto mt-5 max-w-md leading-relaxed text-white/70">
                Your badge evolves through five distinct stages
              </p>
            </header>
          </ScrollReveal>

          {/* ── Desktop: Horizontal connected cards ── */}
          <div className="mx-auto mt-20 hidden max-w-6xl lg:block">
            {/* Connecting line behind */}
            <div className="relative">
              <div
                className="absolute left-[10%] right-[10%] top-[40px] h-[3px] rounded-full"
                style={{
                  background: "linear-gradient(90deg, #8896A4, #d4a853, #d4a853, #E08C10, #C0303A)",
                  opacity: 0.2,
                }}
              />

              <ScrollReveal stagger className="relative grid grid-cols-5 gap-4">
                {BADGE_STATES.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.state}
                      className="reveal group flex flex-col items-center text-center"
                    >
                      {/* Circle node */}
                      <div
                        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl"
                        style={{
                          background: `${badge.color}12`,
                          boxShadow: `0 0 0 4px #0B1929, 0 0 0 5px ${badge.color}25`,
                          transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.15)";
                          e.currentTarget.style.boxShadow = `0 0 0 4px #0B1929, 0 0 0 6px ${badge.color}40, 0 8px 32px ${badge.color}20`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = `0 0 0 4px #0B1929, 0 0 0 5px ${badge.color}25`;
                        }}
                      >
                        <Icon size={28} style={{ color: badge.color }} />
                      </div>

                      {/* Label badge */}
                      <span
                        className="mt-4 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider"
                        style={{ color: badge.color, background: `${badge.color}10` }}
                      >
                        {badge.label}
                      </span>

                      {/* State name */}
                      <h3 className="mt-3 font-display text-base font-bold tracking-tight text-white">
                        {badge.state}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs leading-relaxed text-white/60">
                        {badge.desc}
                      </p>
                    </div>
                  );
                })}
              </ScrollReveal>
            </div>
          </div>

          {/* ── Mobile/Tablet: Vertical timeline ── */}
          <div className="mx-auto mt-8 max-w-lg sm:mt-16 lg:hidden">
            {BADGE_STATES.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <ScrollReveal key={badge.state} delay={i * 80}>
                  <div className="relative flex gap-5 pb-8 last:pb-0">
                    {/* Connecting line */}
                    {i < BADGE_STATES.length - 1 && (
                      <div
                        className="absolute left-[23px] top-[56px] h-[calc(100%-56px)] w-[2px]"
                        style={{
                          background: `linear-gradient(180deg, ${badge.color}30, ${BADGE_STATES[Math.min(i + 1, BADGE_STATES.length - 1)].color}15)`,
                        }}
                      />
                    )}

                    {/* Icon node */}
                    <div className="relative z-10 flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{ background: `${badge.color}08` }}
                      />
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full"
                        style={{
                          background: `${badge.color}18`,
                          boxShadow: `0 2px 12px ${badge.color}20`,
                        }}
                      >
                        <Icon size={18} style={{ color: badge.color }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-0.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-display text-lg font-bold tracking-tight text-white">
                          {badge.state}
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                          style={{ color: badge.color, background: `${badge.color}12` }}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                        {badge.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FAQ — Dark section ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(10,147,150,0.05),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
          <ScrollReveal>
            <header className="text-center">
              <p className="section-label text-teal">FAQ</p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-tighter text-white sm:text-4xl md:text-5xl">
                Common{" "}
                <span className="text-gradient-teal">Questions</span>
              </h2>
            </header>
          </ScrollReveal>

          <div className="mx-auto mt-8 max-w-3xl space-y-3 sm:mt-16 sm:space-y-4">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 80}>
                <div
                  className="group rounded-xl bg-white/[0.04] p-4 backdrop-blur-sm sm:rounded-2xl sm:p-6"
                  style={{ transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10">
                      <HelpCircle className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold tracking-tight text-white">
                        {faq.q}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/houses/house_13.jpg"
          alt="Trusted property listing"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,168,83,0.08),transparent_60%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-28">
          <ScrollReveal>
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl sm:h-20 sm:w-20 sm:rounded-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(212,168,83,0.15), rgba(212,168,83,0.05))",
                boxShadow: "0 8px 32px rgba(212,168,83,0.1)",
              }}
            >
              <ShieldCheck className="h-10 w-10 text-gold" />
            </div>

            <h2 className="mt-8 font-display text-3xl font-bold uppercase tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Build{" "}
              <span className="text-gradient-gold">Trust</span>{" "}
              with Tenants
            </h2>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-white/70">
              List your property and get verified today — it&apos;s free, optional,
              and makes your listing stand out.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/landlord/listings/new" className="btn-gold-lg">
                <ArrowRight size={16} />
                List Your Property
              </Link>
              <Link href="/search" className="btn-outline-white px-8 py-4 text-base">
                Browse Properties
                <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
