"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Home,
  Building2,
  Shield,
  ArrowRight,
  Users,
} from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const ROLES = [
  {
    id: "tenant",
    label: "Tenant",
    desc: "Browse properties, manage deals, and find your next home in Kampala",
    icon: Home,
    href: "/dashboard",
    accent: "#0A9396",
    accentLight: "rgba(10,147,150,0.12)",
  },
  {
    id: "landlord",
    label: "Landlord",
    desc: "List properties, manage tenants, and track your rental income",
    icon: Building2,
    href: "/landlord",
    accent: "#D4622A",
    accentLight: "rgba(212,98,42,0.12)",
  },
  {
    id: "admin",
    label: "Admin",
    desc: "Review listings, manage verifications, and oversee platform operations",
    icon: Shield,
    href: "/admin",
    accent: "#4E3FA8",
    accentLight: "rgba(78,63,168,0.12)",
  },
] as const;

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="/property_images/houses/house_12.jpg"
        alt="Property in Kampala"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/90 to-navy/85" />

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

      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 py-20 sm:px-6">
        <ScrollReveal variant="scale">
          {/* Logo */}
          <div className="mb-12 text-center">
            <Link href="/" className="inline-block font-display text-3xl tracking-tight">
              <span className="text-white">pata</span>
              <span className="text-gradient-gold font-extrabold">.ug</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Select how you want to access the platform
            </p>
          </div>

          {/* Role cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {ROLES.map((role, i) => {
              const Icon = role.icon;
              return (
                <ScrollReveal key={role.id} variant="scale" delay={i * 100}>
                  <Link
                    href={role.href}
                    className="group relative flex flex-col items-center overflow-hidden rounded-3xl bg-white/[0.04] p-8 text-center backdrop-blur-sm sm:p-10"
                    style={{
                      transition: `all 600ms ${T}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.boxShadow = `0 24px 48px ${role.accent}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${role.accent}15, transparent)`,
                      }}
                    />

                    <div className="relative">
                      {/* Icon */}
                      <div
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl transition-all duration-500 group-hover:scale-110"
                        style={{
                          background: role.accentLight,
                          boxShadow: `0 4px 20px ${role.accent}15`,
                        }}
                      >
                        <Icon size={32} style={{ color: role.accent }} />
                      </div>

                      {/* Label */}
                      <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">
                        {role.label}
                      </h2>

                      {/* Description */}
                      <p className="mt-3 text-sm leading-relaxed text-white/60">
                        {role.desc}
                      </p>

                      {/* Enter button */}
                      <div
                        className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(135deg, ${role.accent}, ${role.accent}CC)`,
                          boxShadow: `0 4px 16px ${role.accent}30`,
                          opacity: 0.7,
                          transform: "translateY(4px)",
                        }}
                      >
                        Enter as {role.label}
                        <ArrowRight size={14} />
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${role.accent}, transparent)`,
                      }}
                    />
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-xs text-white/50">
              <Users size={12} className="mr-1.5 inline text-white/60" />
              UI Preview Mode — no authentication required
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold transition-colors duration-500 hover:text-gold-dark"
            >
              Back to Home
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
