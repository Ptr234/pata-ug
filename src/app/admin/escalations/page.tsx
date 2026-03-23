"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Img";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ArrowLeft,
  AlertTriangle,
  MessageCircle,
  CheckCircle2,
  Clock,
  User,
  Building2,
} from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const INITIAL_ESCALATIONS = [
  { id: "esc-1", dealId: "deal-001", property: "2-Bed Apartment in Bukoto", tenant: "John Doe", landlord: "James Mukasa", reason: "Below Minimum", detail: "Tenant insisting on UGX 800,000 after 3 counter-offers", status: "Open" as const, date: "2026-03-22" },
  { id: "esc-2", dealId: "deal-003", property: "Studio in Naguru", tenant: "Peter Ouma", landlord: "Peter Ochieng", reason: "Deal Stalled", detail: "No response from tenant for 72 hours", status: "Open" as const, date: "2026-03-20" },
  { id: "esc-3", dealId: "deal-002", property: "3-Bed Townhouse in Muyenga", tenant: "Mary Akello", landlord: "Richard Ssentamu", reason: "Aggressive Tenant", detail: "Tenant used threatening language in chat", status: "Resolved" as const, date: "2026-03-18" },
];

function reasonStyle(reason: string) {
  if (reason === "Below Minimum") return { bg: "rgba(224,140,16,0.15)", color: "#E08C10" };
  if (reason === "Deal Stalled") return { bg: "rgba(78,63,168,0.15)", color: "#9B8FD8" };
  if (reason === "Aggressive Tenant") return { bg: "rgba(192,48,58,0.15)", color: "#C0303A" };
  return { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" };
}

function statusStyle(status: string) {
  if (status === "Open") return { bg: "rgba(224,140,16,0.15)", color: "#E08C10", Icon: Clock };
  return { bg: "rgba(31,138,68,0.15)", color: "#1F8A44", Icon: CheckCircle2 };
}

export default function AdminEscalationsPage() {
  const [escalations, setEscalations] = useState(INITIAL_ESCALATIONS);

  const handleResolve = (id: string) => {
    setEscalations((prev) =>
      prev.map((esc) => (esc.id === id ? { ...esc, status: "Resolved" as const } : esc))
    );
  };

  const openCount = escalations.filter((e) => e.status === "Open").length;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/houses/house_3.jpg" alt="Escalations" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-white/60" style={{ transition: `color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>
            <p className="section-label text-gold">Disputes & Issues</p>
            <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tighter text-white sm:text-3xl md:text-5xl">
              <span className="text-gradient-gold">Escalations</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
              {escalations.length} total escalations &middot; {openCount} open
            </p>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={100}>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { label: "Total", value: escalations.length, icon: AlertTriangle, accent: "#d4a853" },
                { label: "Open", value: openCount, icon: Clock, accent: "#E08C10" },
                { label: "Resolved", value: escalations.length - openCount, icon: CheckCircle2, accent: "#1F8A44" },
              ].map((s) => {
                const SIcon = s.icon;
                return (
                  <div key={s.label} className="rounded-xl bg-white/[0.04] px-4 py-3 backdrop-blur-sm" style={{ transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                    <SIcon size={16} style={{ color: s.accent }} />
                    <p className="mt-2 font-display text-2xl font-bold tracking-tight text-white">{s.value}</p>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-white/40">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Escalation Cards */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="space-y-4">
              {escalations.map((esc) => {
                const rs = reasonStyle(esc.reason);
                const ss = statusStyle(esc.status);
                const SIcon = ss.Icon;

                return (
                  <div
                    key={esc.id}
                    className="overflow-hidden rounded-2xl bg-navy"
                    style={{
                      boxShadow: "0 2px 12px rgba(11,25,41,0.1)",
                      transition: `box-shadow 500ms ${T}`,
                    }}
                  >
                    <div
                      className="p-5"
                      style={{ transition: `background-color 500ms ${T}` }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(212,168,83,0.03)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      {/* Top row: property + badges */}
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-display text-base font-bold text-white sm:text-lg">{esc.property}</p>
                          <p className="mt-1 text-[11px] text-white/40">Deal {esc.dealId} &middot; {esc.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: rs.bg, color: rs.color }}>
                            {esc.reason}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: ss.bg, color: ss.color }}>
                            <SIcon className="h-3 w-3" /> {esc.status}
                          </span>
                        </div>
                      </div>

                      {/* Parties */}
                      <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <span className="inline-flex items-center gap-1.5 text-white/60">
                          <User size={13} className="text-teal" /> <span className="text-[9px] font-bold uppercase tracking-wider text-white/30">Tenant</span> <span className="text-white/80">{esc.tenant}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-white/60">
                          <Building2 size={13} className="text-amber" /> <span className="text-[9px] font-bold uppercase tracking-wider text-white/30">Landlord</span> <span className="text-white/80">{esc.landlord}</span>
                        </span>
                      </div>

                      {/* Detail */}
                      <div className="mt-4 rounded-xl bg-white/[0.03] px-4 py-3">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-white/30">Details</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/60">{esc.detail}</p>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-3">
                        <Link
                          href={`/admin/deals/${esc.dealId}/chat`}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold"
                          style={{ background: "rgba(212,168,83,0.1)", transition: `all 500ms ${T}` }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,168,83,0.2)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,168,83,0.1)"; }}
                        >
                          <MessageCircle size={12} /> View Chat
                        </Link>
                        {esc.status === "Open" && (
                          <button
                            type="button"
                            onClick={() => handleResolve(esc.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
                            style={{ background: "rgba(31,138,68,0.15)", color: "#1F8A44", transition: `all 500ms ${T}` }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(31,138,68,0.3)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(31,138,68,0.15)"; }}
                          >
                            <CheckCircle2 size={12} /> Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
