"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Img";
import {
  User,
  Phone,
  CreditCard,
  ShieldCheck,
  Save,
  Mail,
  Camera,
  Clock,
  AlertCircle,
  ArrowLeft,
  MapPin,
  Building2,
  Handshake,
  Eye,
  CalendarDays,
  Shield,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { getUserProfile } from "@/lib/user";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ─── Role config ─── */
const ROLE_CONFIG = {
  tenant: {
    accent: "#0A9396",
    accentLight: "rgba(10,147,150,0.15)",
    accentGlow: "rgba(10,147,150,0.08)",
    gradient: "linear-gradient(135deg, #0A9396, #077B7E)",
    label: "Client Account",
    dashHref: "/dashboard",
    image: "/property_images/apartments/apartment_10.jpg",
  },
  landlord: {
    accent: "#D4622A",
    accentLight: "rgba(212,98,42,0.15)",
    accentGlow: "rgba(212,98,42,0.08)",
    gradient: "linear-gradient(135deg, #D4622A, #B54E1C)",
    label: "Landlord Account",
    dashHref: "/landlord",
    image: "/property_images/houses/house_8.jpg",
  },
  admin: {
    accent: "#d4a853",
    accentLight: "rgba(212,168,83,0.15)",
    accentGlow: "rgba(212,168,83,0.08)",
    gradient: "linear-gradient(135deg, #d4a853, #B8903D)",
    label: "Admin Account",
    dashHref: "/admin",
    image: "/property_images/commercial/commercial_3.jpg",
  },
};

const VERIFICATION_STYLES = {
  verified: { bg: "rgba(31,138,68,0.12)", color: "#1F8A44", icon: ShieldCheck, label: "Verified", desc: "Your identity has been confirmed by our team." },
  pending: { bg: "rgba(224,140,16,0.12)", color: "#E08C10", icon: Clock, label: "Pending Verification", desc: "Our team is reviewing your ID. This usually takes under 24 hours." },
  unverified: { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", icon: AlertCircle, label: "Not Verified", desc: "Submit your National ID to get verified and unlock all features." },
};

export default function ProfilePage() {
  const profile = getUserProfile();
  const rc = ROLE_CONFIG[profile.role];
  const vs = VERIFICATION_STYLES[profile.verificationStatus];
  const VIcon = vs.icon;

  const [name, setName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone.replace("+256", ""));
  const [email, setEmail] = useState(profile.email);
  const [nationalId, setNationalId] = useState(profile.nationalId);
  const [saved, setSaved] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSave = () => {
    const userData = {
      fullName: name,
      phone: `+256${phone.replace(/^0/, "")}`,
      email,
      nationalId,
      role: profile.role,
      verificationStatus: profile.verificationStatus,
    };
    localStorage.setItem("pata-user", JSON.stringify(userData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const labelCls = "mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/40";
  const inputCls = "w-full rounded-xl bg-white/[0.06] py-3.5 pl-12 pr-4 text-sm font-medium text-white placeholder:text-white/40 outline-none transition-all duration-500 focus:bg-white/[0.12] focus:ring-2 focus:ring-gold/30";

  return (
    <main className="min-h-screen">
      {/* ════════════════════════════════════════════════════════════════
          HERO — Split layout: profile card left, image right
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-navy">
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
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, ${rc.accentGlow}, transparent 60%)`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[420px] items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
            {/* LEFT — Profile card */}
            <ScrollReveal variant="left">
              <Link
                href={rc.dashHref}
                className="mb-6 inline-flex items-center gap-2 text-sm text-white/60"
                style={{ transition: `color 500ms ${T}` }}
                onMouseEnter={(e) => { e.currentTarget.style.color = rc.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
              </Link>

              <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold text-white sm:h-24 sm:w-24"
                    style={{
                      background: rc.gradient,
                      boxShadow: `0 8px 32px ${rc.accent}30`,
                    }}
                  >
                    {initials}
                  </div>
                  <button
                    type="button"
                    className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-navy shadow-lg"
                    style={{ transition: `transform 400ms ${T}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Name + role */}
                <div>
                  <h1 className="font-display text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                    {name}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white"
                      style={{ background: rc.accent }}
                    >
                      {rc.label}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider"
                      style={{ background: vs.bg, color: vs.color }}
                    >
                      <VIcon className="h-3 w-3" />
                      {vs.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { icon: Eye, value: profile.role === "landlord" ? "1,247" : "47", label: profile.role === "landlord" ? "Total Views" : "Properties Viewed" },
                  { icon: Handshake, value: profile.role === "admin" ? "23" : "3", label: "Active Deals" },
                  { icon: CalendarDays, value: "Mar 2026", label: "Member Since" },
                ].map((stat) => {
                  const SIcon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-white/[0.04] px-4 py-3 text-center"
                      style={{ transition: `all 500ms ${T}` }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                    >
                      <SIcon size={16} className="mx-auto" style={{ color: rc.accent }} />
                      <p className="mt-2 font-display text-lg font-bold tracking-tight text-white">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-white/40">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* RIGHT — Image */}
            <ScrollReveal variant="right">
              <div className="img-zoom relative hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
                <Image
                  src={rc.image}
                  alt="Profile"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />
                <div className="absolute bottom-6 left-6 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                    Your Account
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

      {/* ════════════════════════════════════════════════════════════════
          CONTENT — Two-column: form left, sidebar right
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* LEFT — Form (2/3) */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div
                  className="rounded-3xl p-6 sm:p-8"
                  style={{
                    background: "#0B1929",
                    boxShadow: "0 8px 40px rgba(11,25,41,0.2)",
                  }}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: rc.accent }}>
                    Personal Information
                  </p>
                  <h2 className="mt-2 font-display text-xl font-bold tracking-tighter text-white">
                    Your Details
                  </h2>
                  <p className="mt-1 text-sm text-white/50">
                    Keep your information accurate for secure transactions.
                  </p>

                  <div
                    className="mt-6 h-px"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />

                  <div className="mt-6 space-y-5">
                    {/* Name */}
                    <div>
                      <label className={labelCls}>Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Phone + Email row */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>Phone Number</label>
                        <div className="flex items-center overflow-hidden rounded-xl bg-white/[0.06] transition-all duration-500 focus-within:bg-white/[0.12] focus-within:ring-2 focus-within:ring-gold/30">
                          <span className="flex items-center gap-1.5 bg-white/[0.04] px-3 py-3.5 text-sm text-white/40">
                            <Phone className="h-4 w-4" />
                            +256
                          </span>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="flex-1 bg-transparent px-3 py-3.5 text-sm font-medium text-white outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputCls}
                          />
                        </div>
                      </div>
                    </div>

                    {/* National ID */}
                    <div>
                      <label className={labelCls}>National ID</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <input
                          type="text"
                          value={nationalId}
                          onChange={(e) => setNationalId(e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-6 h-px"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />

                  {/* Save */}
                  <div className="mt-6 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider text-white"
                      style={{
                        background: saved ? "#0A9396" : rc.gradient,
                        boxShadow: saved ? "0 4px 16px rgba(10,147,150,0.3)" : `0 4px 16px ${rc.accent}30`,
                        transition: `all 500ms ${T}`,
                      }}
                      onMouseEnter={(e) => { if (!saved) e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      {saved ? <ShieldCheck className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                      {saved ? "Saved!" : "Save Changes"}
                    </button>
                    {saved && (
                      <span className="text-xs font-medium text-teal">
                        Profile updated successfully
                      </span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT — Sidebar (1/3) */}
            <div className="space-y-6">
              {/* Verification card */}
              <ScrollReveal variant="right">
                <div
                  className="rounded-3xl p-6"
                  style={{
                    background: "#0B1929",
                    boxShadow: "0 8px 40px rgba(11,25,41,0.2)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: vs.bg }}
                    >
                      <VIcon size={20} style={{ color: vs.color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: vs.color }}>
                        Identity Status
                      </p>
                      <p className="text-sm font-bold text-white">{vs.label}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-white/50">
                    {vs.desc}
                  </p>
                  {profile.verificationStatus !== "verified" && (
                    <Link
                      href="/signup"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[10px] font-black uppercase tracking-wider text-white"
                      style={{
                        background: rc.gradient,
                        boxShadow: `0 4px 16px ${rc.accent}25`,
                        transition: `all 500ms ${T}`,
                      }}
                    >
                      <Shield className="h-3.5 w-3.5" />
                      Complete Verification
                    </Link>
                  )}
                </div>
              </ScrollReveal>

              {/* Account info card */}
              <ScrollReveal variant="right" delay={100}>
                <div
                  className="rounded-3xl p-6"
                  style={{
                    background: "#0B1929",
                    boxShadow: "0 8px 40px rgba(11,25,41,0.2)",
                  }}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gold/70">
                    Account Details
                  </p>
                  <div className="mt-4 space-y-3">
                    {[
                      { icon: User, label: "Role", value: rc.label },
                      { icon: MapPin, label: "Coverage", value: "Uganda-wide" },
                      { icon: Building2, label: "Platform", value: "pata.ug" },
                    ].map((item) => {
                      const IIcon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3"
                        >
                          <IIcon size={14} style={{ color: rc.accent }} />
                          <div className="flex-1">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-white/30">
                              {item.label}
                            </p>
                            <p className="text-sm font-medium text-white/70">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* Quick links */}
              <ScrollReveal variant="right" delay={200}>
                <div
                  className="rounded-3xl p-6"
                  style={{
                    background: "#0B1929",
                    boxShadow: "0 8px 40px rgba(11,25,41,0.2)",
                  }}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gold/70">
                    Quick Links
                  </p>
                  <div className="mt-4 space-y-1.5">
                    {[
                      { label: "Dashboard", href: rc.dashHref },
                      { label: "My Deals", href: "/deals" },
                      { label: "Notifications", href: "/notifications" },
                      { label: "Pricing", href: "/pricing" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-white/60"
                        style={{ transition: `all 300ms ${T}` }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                          e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                          e.currentTarget.style.paddingLeft = "20px";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                          e.currentTarget.style.paddingLeft = "16px";
                        }}
                      >
                        {link.label}
                        <span className="text-white/20">&rsaquo;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
