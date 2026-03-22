"use client";

import Link from "next/link";
import Image from "@/components/Img";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, Calendar, MapPin, UserCheck, Clock, Building2, ArrowLeft, Phone } from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const VISITS = [
  { id: "1", date: "24 Mar 2026", property: "2-Bed Apartment in Muyenga", estate: "Muyenga", landlord: "Sarah Nakabugo", phone: "+256 700 100 100", agent: "David Ochieng", status: "scheduled" as const },
  { id: "2", date: "25 Mar 2026", property: "3-Bed Bungalow in Ntinda", estate: "Ntinda", landlord: "Robert Kizza", phone: "+256 772 200 200", agent: "Faith Nabukera", status: "scheduled" as const },
  { id: "3", date: "21 Mar 2026", property: "1-Bed Studio in Kamwokya", estate: "Kamwokya", landlord: "Moses Lubwama", phone: "+256 701 300 300", agent: "David Ochieng", status: "completed" as const },
  { id: "4", date: "26 Mar 2026", property: "4-Bed Mansion in Munyonyo", estate: "Munyonyo", landlord: "Agnes Tusiime", phone: "+256 753 400 400", agent: "Faith Nabukera", status: "pending" as const },
  { id: "5", date: "27 Mar 2026", property: "Office Space in Nakasero", estate: "Nakasero", landlord: "Kampala Properties Ltd", phone: "+256 782 500 500", agent: "David Ochieng", status: "scheduled" as const },
];

function visitStyle(s: string) {
  if (s === "completed") return { bg: "rgba(31,138,68,0.15)", color: "#1F8A44", label: "Completed" };
  if (s === "pending") return { bg: "rgba(224,140,16,0.15)", color: "#E08C10", label: "Pending Agent" };
  return { bg: "rgba(212,168,83,0.15)", color: "#d4a853", label: "Scheduled" };
}

export default function AdminVerificationPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/houses/house_6.jpg" alt="Verification" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-white/60" style={{ transition: `color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>
            <p className="section-label text-gold">Field Operations</p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl">
              Verification <span className="text-gradient-gold">Schedule</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
              {VISITS.filter((v) => v.status === "scheduled").length} visits scheduled this week
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VISITS.map((visit, i) => {
              const st = visitStyle(visit.status);
              return (
                <ScrollReveal key={visit.id} variant="scale" delay={i * 80}>
                  <div className="group rounded-2xl bg-navy p-6" style={{ transition: `all 600ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(11,25,41,0.25)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                      <span className="flex items-center gap-1.5 text-xs text-white/60"><Calendar className="h-3.5 w-3.5 text-gold" />{visit.date}</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-white">{visit.property}</h3>
                    <div className="mt-3 space-y-2 text-xs text-white/60">
                      <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-teal" />{visit.estate}</p>
                      <p className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5" />{visit.landlord}</p>
                      <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{visit.phone}</p>
                      <p className="flex items-center gap-2"><UserCheck className="h-3.5 w-3.5 text-gold" />Agent: {visit.agent}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
