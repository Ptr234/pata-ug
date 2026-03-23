"use client";

import Link from "next/link";
import Image from "@/components/Img";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ArrowLeft,
  Bot,
  Zap,
  DollarSign,
  Clock,
  MessageSquare,
  Hash,
} from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const AI_LOGS = [
  { id: "log-1", dealId: "deal-001", property: "2-Bed Apartment in Bukoto", userMessage: "I would like to offer 1.5M per month", aiResponse: "Thank you for your offer! The minimum acceptable rent is...", tokens: 342, cost: 0.0004, latencyMs: 890, date: "2026-03-22 14:32" },
  { id: "log-2", dealId: "deal-002", property: "3-Bed Townhouse in Muyenga", userMessage: "Is this property still available?", aiResponse: "Yes! The 3-Bed Townhouse in Muyenga is still available...", tokens: 256, cost: 0.0003, latencyMs: 650, date: "2026-03-22 11:15" },
  { id: "log-3", dealId: "deal-003", property: "Studio in Naguru", userMessage: "Can I see the property tomorrow?", aiResponse: "I'd love to help arrange a viewing! However, viewings are...", tokens: 198, cost: 0.0002, latencyMs: 540, date: "2026-03-21 09:45" },
  { id: "log-4", dealId: "deal-001", property: "2-Bed Apartment in Bukoto", userMessage: "OK let me do 1.7M then", aiResponse: "Great news! UGX 1,700,000 is within the acceptable range...", tokens: 289, cost: 0.0003, latencyMs: 720, date: "2026-03-22 14:35" },
];

function truncate(text: string, maxLen: number) {
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}

export default function AdminAILogsPage() {
  const totalTokens = AI_LOGS.reduce((sum, l) => sum + l.tokens, 0);
  const totalCost = AI_LOGS.reduce((sum, l) => sum + l.cost, 0);
  const avgLatency = Math.round(AI_LOGS.reduce((sum, l) => sum + l.latencyMs, 0) / AI_LOGS.length);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/houses/house_3.jpg" alt="AI Logs" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-white/60" style={{ transition: `color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>
            <p className="section-label text-gold">Intelligence</p>
            <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tighter text-white sm:text-3xl md:text-5xl">
              AI Activity <span className="text-gradient-gold">Logs</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
              Monitor all AI-powered conversations and performance metrics
            </p>
          </ScrollReveal>

          {/* Stats strip */}
          <ScrollReveal delay={100}>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { label: "Total Calls", value: AI_LOGS.length.toString(), icon: Zap, accent: "#d4a853" },
                { label: "Total Cost", value: `$${totalCost.toFixed(4)}`, icon: DollarSign, accent: "#0A9396" },
                { label: "Avg Latency", value: `${avgLatency}ms`, icon: Clock, accent: "#E08C10" },
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

      {/* Logs */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <ScrollReveal>
            {/* Mobile card view */}
            <div className="space-y-3 md:hidden">
              {AI_LOGS.map((log) => (
                <div key={log.id} className="rounded-2xl border border-gold/20 bg-navy p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-white">{log.property}</p>
                    <span className="shrink-0 text-[10px] text-white/40">{log.date}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-white/40">Deal {log.dealId}</p>

                  <div className="mt-3 space-y-2.5 border-t border-white/[0.06] pt-3">
                    <div className="rounded-xl bg-white/[0.03] px-3 py-2.5">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-white/30">User Message</p>
                      <p className="mt-1 text-sm text-white/70">{truncate(log.userMessage, 60)}</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.03] px-3 py-2.5">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-gold/50">AI Response</p>
                      <p className="mt-1 text-sm text-white/70">{truncate(log.aiResponse, 60)}</p>
                    </div>
                  </div>

                  <dl className="mt-3 flex flex-wrap gap-4 border-t border-white/[0.06] pt-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Hash size={11} className="text-gold" />
                      <dt className="text-white/40">Tokens</dt>
                      <dd className="font-bold text-white">{log.tokens}</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={11} className="text-teal" />
                      <dt className="text-white/40">Cost</dt>
                      <dd className="font-bold text-white">${log.cost.toFixed(4)}</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={11} className="text-amber" />
                      <dt className="text-white/40">Latency</dt>
                      <dd className="font-bold text-white">{log.latencyMs}ms</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-2xl bg-navy md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead>
                    <tr>
                      {["Property", "User Message", "AI Response", "Tokens", "Cost", "Latency", "Date"].map((h) => (
                        <th key={h} className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-gold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {AI_LOGS.map((log, i) => (
                      <tr
                        key={log.id}
                        className={i % 2 === 0 ? "bg-white/[0.02]" : ""}
                        style={{ transition: `background-color 500ms ${T}` }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(212,168,83,0.05)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"; }}
                      >
                        <td className="px-5 py-4">
                          <p className="font-medium text-white">{log.property}</p>
                          <p className="mt-0.5 text-[11px] text-white/40">Deal {log.dealId}</p>
                        </td>
                        <td className="max-w-[200px] px-5 py-4">
                          <div className="flex items-start gap-1.5">
                            <MessageSquare size={12} className="mt-0.5 shrink-0 text-white/30" />
                            <p className="text-white/70">{truncate(log.userMessage, 40)}</p>
                          </div>
                        </td>
                        <td className="max-w-[200px] px-5 py-4">
                          <div className="flex items-start gap-1.5">
                            <Bot size={12} className="mt-0.5 shrink-0 text-gold/60" />
                            <p className="text-white/70">{truncate(log.aiResponse, 40)}</p>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-display font-bold text-white">{log.tokens}</td>
                        <td className="px-5 py-4 font-bold text-teal">${log.cost.toFixed(4)}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 text-white/60">
                            <Clock size={11} className="text-amber" /> {log.latencyMs}ms
                          </span>
                        </td>
                        <td className="px-5 py-4 text-white/50">{log.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
