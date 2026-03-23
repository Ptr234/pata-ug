"use client";

import Link from "next/link";
import Image from "@/components/Img";
import ScrollReveal from "@/components/ScrollReveal";
import { Handshake, ArrowLeft, MapPin, Calendar, Building2, MessageCircle } from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const DEALS = [
  { id: "1", property: "2-Bed Apartment in Bukoto", estate: "Bukoto", tenant: "John Doe", landlord: "James Mukasa", rent: "UGX 1.7M", agencyFee: "UGX 85K", date: "18 Mar", status: "payment_confirmed" as const },
  { id: "2", property: "3-Bed Townhouse in Muyenga", estate: "Muyenga", tenant: "Mary Akello", landlord: "Richard Ssentamu", rent: "UGX 3.4M", agencyFee: "UGX 170K", date: "20 Mar", status: "agreed" as const },
  { id: "3", property: "Studio in Naguru", estate: "Naguru", tenant: "Peter Ouma", landlord: "Peter Ochieng", rent: "UGX 800K", agencyFee: "UGX 40K", date: "21 Mar", status: "negotiating" as const },
  { id: "4", property: "2-Bed in Entebbe", estate: "Entebbe", tenant: "Alice Nambi", landlord: "Annet Birungi", rent: "UGX 2.2M", agencyFee: "UGX 110K", date: "10 Mar", status: "closed" as const },
  { id: "5", property: "4-Bed Duplex in Kyanja", estate: "Kyanja", tenant: "David Ssali", landlord: "Herbert Kiggundu", rent: "UGX 2.5M", agencyFee: "UGX 125K", date: "15 Mar", status: "pending" as const },
];

function dealStyle(s: string) {
  if (s === "closed") return { bg: "rgba(10,147,150,0.15)", color: "#0A9396", label: "Closed" };
  if (s === "payment_confirmed") return { bg: "rgba(31,138,68,0.15)", color: "#1F8A44", label: "Paid — Awaiting Close" };
  if (s === "agreed") return { bg: "rgba(224,140,16,0.15)", color: "#E08C10", label: "Agreed — Payment Sent" };
  if (s === "negotiating") return { bg: "rgba(212,168,83,0.15)", color: "#d4a853", label: "Negotiating" };
  if (s === "pending") return { bg: "rgba(78,63,168,0.15)", color: "#9B8FD8", label: "Requested" };
  return { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", label: s };
}

export default function AdminDealsPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/houses/house_3.jpg" alt="Deal management" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-white/60" style={{ transition: `color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>
            <p className="section-label text-gold">Oversight</p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl">
              Deal <span className="text-gradient-gold">Management</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
              Monitor all active deals and agency fee payments
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <ScrollReveal>
            {/* Mobile card view */}
            <div className="space-y-3 md:hidden">
              {DEALS.map((deal) => {
                const st = dealStyle(deal.status);
                return (
                  <div key={deal.id} className="rounded-2xl border border-gold/20 bg-navy p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-white">{deal.property}</p>
                      <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-white/50"><MapPin className="h-3 w-3 text-gold" />{deal.estate}</p>
                    <dl className="mt-3 space-y-1.5 border-t border-white/[0.06] pt-3 text-sm">
                      <div className="flex justify-between"><dt className="text-white/50">Tenant</dt><dd className="text-white">{deal.tenant}</dd></div>
                      <div className="flex justify-between"><dt className="text-white/50">Landlord</dt><dd className="text-white">{deal.landlord}</dd></div>
                      <div className="flex justify-between"><dt className="text-white/50">Rent/mo</dt><dd className="font-bold text-white">{deal.rent}</dd></div>
                      <div className="flex justify-between"><dt className="text-white/50">5% Fee</dt><dd className="font-bold text-gold">{deal.agencyFee}</dd></div>
                    </dl>
                    <div className="mt-3">
                      <Link href={`/admin/deals/deal-00${deal.id}/chat`} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold" style={{ background: "rgba(212,168,83,0.1)" }}>
                        <MessageCircle size={12} /> Chat
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-2xl bg-navy md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left text-sm">
                  <thead>
                    <tr>
                      {["Property", "Tenant", "Landlord", "Rent/mo", "5% (1mo)", "Status", ""].map((h) => (
                        <th key={h} className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-gold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DEALS.map((deal, i) => {
                      const st = dealStyle(deal.status);
                      return (
                        <tr key={deal.id} className={i % 2 === 0 ? "bg-white/[0.02]" : ""} style={{ transition: `background-color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(212,168,83,0.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"; }}>
                          <td className="px-5 py-4">
                            <p className="font-medium text-white">{deal.property}</p>
                            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/50"><MapPin className="h-3 w-3 text-gold" />{deal.estate} <span className="text-white/60">/ <Calendar className="inline h-3 w-3" /> {deal.date}</span></p>
                          </td>
                          <td className="px-5 py-4 text-white/70">{deal.tenant}</td>
                          <td className="px-5 py-4 text-white/70">{deal.landlord}</td>
                          <td className="px-5 py-4 font-display font-bold text-white">{deal.rent}</td>
                          <td className="px-5 py-4 font-bold text-gold">{deal.agencyFee}</td>
                          <td className="px-5 py-4"><span className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: st.bg, color: st.color }}>{st.label}</span></td>
                          <td className="px-5 py-4">
                            <Link
                              href={`/admin/deals/deal-00${deal.id}/chat`}
                              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold"
                              style={{ background: "rgba(212,168,83,0.1)", transition: `all 500ms ${T}` }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,168,83,0.2)"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,168,83,0.1)"; }}
                            >
                              <MessageCircle size={12} /> Chat
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
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
