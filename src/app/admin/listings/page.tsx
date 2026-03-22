"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { ClipboardCheck, Check, X, AlertTriangle, Building2, MapPin, ArrowLeft, Eye } from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const LISTINGS = [
  { id: "1", property: "3-Bed Apartment in Bukoto", estate: "Bukoto", landlord: "James Mukasa", date: "22 Mar", rent: "UGX 1.8M", photos: 5, status: "pending" as const },
  { id: "2", property: "Studio Flat in Naguru", estate: "Naguru", landlord: "Grace Achieng", date: "21 Mar", rent: "UGX 800K", photos: 3, status: "pending" as const },
  { id: "3", property: "2-Bed Standalone in Kololo", estate: "Kololo", landlord: "Peter Ssemwogerere", date: "20 Mar", rent: "UGX 5M", photos: 8, status: "approved" as const },
  { id: "4", property: "4-Bed Duplex in Kyanja", estate: "Kyanja", landlord: "Dorothy Namubiru", date: "19 Mar", rent: "UGX 2.5M", photos: 4, status: "flagged" as const },
  { id: "5", property: "1-Bed in Bugolobi", estate: "Bugolobi", landlord: "Hassan Kateregga", date: "18 Mar", rent: "UGX 2M", photos: 3, status: "pending" as const },
  { id: "6", property: "Townhouse in Muyenga", estate: "Muyenga", landlord: "Richard Ssentamu", date: "17 Mar", rent: "UGX 3.5M", photos: 6, status: "approved" as const },
  { id: "7", property: "Single Room in Ntinda", estate: "Ntinda", landlord: "Fatuma Nabirye", date: "16 Mar", rent: "UGX 350K", photos: 2, status: "pending" as const },
];

function statusStyle(s: string) {
  if (s === "approved") return { bg: "rgba(31,138,68,0.15)", color: "#1F8A44", label: "Approved" };
  if (s === "flagged") return { bg: "rgba(192,48,58,0.15)", color: "#C0303A", label: "Flagged" };
  return { bg: "rgba(212,168,83,0.15)", color: "#d4a853", label: "Pending" };
}

export default function AdminListingsPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/apartments/apartment_12.jpg" alt="Listing review" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-white/60" style={{ transition: `color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>
            <p className="section-label text-gold">Moderation</p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl">
              Listing <span className="text-gradient-gold">Review</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
              {LISTINGS.filter((l) => l.status === "pending").length} listings awaiting your review
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl bg-navy">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead>
                    <tr>
                      {["Property", "Landlord", "Rent", "Photos", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-gold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LISTINGS.map((row, i) => {
                      const st = statusStyle(row.status);
                      return (
                        <tr key={row.id} className={i % 2 === 0 ? "bg-white/[0.02]" : ""} style={{ transition: `background-color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(212,168,83,0.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"; }}>
                          <td className="px-5 py-4">
                            <p className="font-medium text-white">{row.property}</p>
                            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/50"><MapPin className="h-3 w-3 text-gold" />{row.estate} / {row.date}</p>
                          </td>
                          <td className="px-5 py-4 text-white/70">{row.landlord}</td>
                          <td className="px-5 py-4 font-display font-bold text-white">{row.rent}</td>
                          <td className="px-5 py-4"><span className="flex items-center gap-1 text-white/60"><Eye className="h-3.5 w-3.5" />{row.photos}</span></td>
                          <td className="px-5 py-4"><span className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: st.bg, color: st.color }}>{st.label}</span></td>
                          <td className="px-5 py-4">
                            <div className="flex gap-1.5">
                              <button className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold" style={{ background: "rgba(31,138,68,0.15)", color: "#1F8A44", transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(31,138,68,0.3)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(31,138,68,0.15)"; }}><Check className="inline h-3.5 w-3.5" /> Approve</button>
                              <button className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold" style={{ background: "rgba(192,48,58,0.12)", color: "#C0303A", transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(192,48,58,0.25)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(192,48,58,0.12)"; }}><X className="inline h-3.5 w-3.5" /> Reject</button>
                              <button className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold" style={{ background: "rgba(224,140,16,0.12)", color: "#E08C10", transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(224,140,16,0.25)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(224,140,16,0.12)"; }}><AlertTriangle className="inline h-3.5 w-3.5" /> Flag</button>
                            </div>
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
