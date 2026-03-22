"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Phone,
  CreditCard,
  ShieldCheck,
  Save,
  Mail,
  Camera,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("700100100");
  const [email, setEmail] = useState("john.doe@email.com");
  const [nationalId, setNationalId] = useState("CM9300012345678A");

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
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
        {/* Teal glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(10,147,150,0.08),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <ScrollReveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-white/70"
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
              <span className="font-medium text-white/70">Profile</span>
            </nav>

            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative group">
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white"
                  style={{
                    backgroundColor: "rgba(10,147,150,0.2)",
                    border: "2px solid rgba(10,147,150,0.3)",
                    transition: `transform 500ms ${T}, box-shadow 500ms ${T}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 0 28px rgba(10,147,150,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {initials}
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-white shadow-gold animate-pulse-gold"
                  style={{ transition: `all 500ms ${T}` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.backgroundColor = "#B8903D";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(212,168,83,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.backgroundColor = "#d4a853";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <h1 className="mt-5 font-display text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                {name}
              </h1>
              <p className="section-label mt-2 text-teal">Client Account</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FORM ═══ */}
      <section className="min-h-[50vh] bg-smoke">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
          <ScrollReveal delay={120}>
            <div className="rounded-3xl bg-navy p-6 shadow-elevated sm:p-8">
              <h3 className="font-display text-lg tracking-tighter text-white">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-white/60">
                Keep your details up to date for seamless transactions.
              </p>

              <div className="mt-8 space-y-6">
                {/* Full Name */}
                <ScrollReveal delay={180}>
                <div>
                  <label
                    className="mb-1.5 block"
                    style={{
                      fontSize: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-white/[0.06] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/60 outline-none"
                      style={{
                        transition: `all 500ms ${T}`,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(212,168,83,0.3)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.08)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.06)";
                      }}
                    />
                  </div>
                </div>
                </ScrollReveal>

                {/* Phone */}
                <ScrollReveal delay={260}>
                <div>
                  <label
                    className="mb-1.5 block"
                    style={{
                      fontSize: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    Phone Number
                  </label>
                  <div
                    className="flex items-center overflow-hidden rounded-xl bg-white/[0.06]"
                    style={{ transition: `all 500ms ${T}` }}
                  >
                    <span
                      className="flex items-center gap-1.5 px-3 py-3 text-sm text-white/50"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <Phone className="h-4 w-4 text-white/60" />
                      +256
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none"
                      onFocus={(e) => {
                        const wrapper = e.currentTarget.parentElement;
                        if (wrapper) {
                          wrapper.style.boxShadow =
                            "0 0 0 2px rgba(212,168,83,0.3)";
                          wrapper.style.backgroundColor =
                            "rgba(255,255,255,0.08)";
                        }
                      }}
                      onBlur={(e) => {
                        const wrapper = e.currentTarget.parentElement;
                        if (wrapper) {
                          wrapper.style.boxShadow = "none";
                          wrapper.style.backgroundColor =
                            "rgba(255,255,255,0.06)";
                        }
                      }}
                    />
                  </div>
                </div>
                </ScrollReveal>

                {/* Email */}
                <ScrollReveal delay={340}>
                <div>
                  <label
                    className="mb-1.5 block"
                    style={{
                      fontSize: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-white/[0.06] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/60 outline-none"
                      style={{
                        transition: `all 500ms ${T}`,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(212,168,83,0.3)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.08)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.06)";
                      }}
                    />
                  </div>
                </div>
                </ScrollReveal>

                {/* National ID */}
                <ScrollReveal delay={420}>
                <div>
                  <label
                    className="mb-1.5 block"
                    style={{
                      fontSize: "10px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    National ID
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    <input
                      type="text"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      className="w-full rounded-xl bg-white/[0.06] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/60 outline-none"
                      style={{
                        transition: `all 500ms ${T}`,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(212,168,83,0.3)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.08)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.06)";
                      }}
                    />
                  </div>
                  <div
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      backgroundColor: "rgba(31,138,68,0.15)",
                      color: "#1F8A44",
                      boxShadow: "0 0 12px rgba(31,138,68,0.15)",
                      animation: "verifiedGlow 3s ease-in-out infinite",
                    }}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified
                  </div>
                  {/* Subtle verified-badge glow keyframes */}
                  <style>{`
                    @keyframes verifiedGlow {
                      0%, 100% { box-shadow: 0 0 12px rgba(31,138,68,0.15); }
                      50% { box-shadow: 0 0 20px rgba(31,138,68,0.3); }
                    }
                  `}</style>
                </div>
                </ScrollReveal>

                {/* Save */}
                <ScrollReveal delay={500}>
                <div className="pt-2">
                  <button
                    type="button"
                    className="btn-gold"
                    style={{ transition: `transform 500ms ${T}, box-shadow 500ms ${T}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 30px rgba(212,168,83,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
