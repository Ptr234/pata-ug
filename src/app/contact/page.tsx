"use client";

import Link from "next/link";
import Image from "@/components/Img";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, Phone, MapPin, Clock, ArrowRight, MessageSquare, Building2 } from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/commercial/commercial_10.jpg" alt="Contact pata.ug" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 text-center sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-28">
          <ScrollReveal>
            <p className="section-label text-gold">Get in Touch</p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-2xl font-bold uppercase tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-7xl">
              Contact <span className="text-gradient-gold">Us</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/60 sm:text-lg">
              Have a question about listings, verification, or partnerships? We are here to help.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CONTACT INFO + FORM — Split ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
            {/* Left: Contact details */}
            <ScrollReveal variant="left">
              <div>
                <p className="section-label text-teal">Reach Us</p>
                <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tighter text-navy sm:text-3xl md:text-4xl">
                  Get in <span className="text-gradient-gold">Touch</span>
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-text-muted">
                  Whether you are a tenant looking for your next home or a landlord wanting to list properties, our team is ready to assist.
                </p>

                <div className="mt-10 space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "support@pata.ug", href: "mailto:support@pata.ug", accent: "#0A9396" },
                    { icon: Phone, label: "Phone", value: "+256 700 000 000", href: "tel:+256700000000", accent: "#D4622A" },
                    { icon: MapPin, label: "Location", value: "Kampala, Uganda", href: null, accent: "#d4a853" },
                    { icon: Clock, label: "Hours", value: "Mon-Fri, 8am-6pm EAT", href: null, accent: "#1F8A44" },
                  ].map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <div className="flex items-center gap-4 rounded-xl bg-navy p-4 sm:rounded-2xl sm:p-5" style={{ transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${item.accent}15`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${item.accent}15` }}>
                          <Icon className="h-6 w-6" style={{ color: item.accent }} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">{item.label}</p>
                          <p className="mt-0.5 font-display text-base font-bold tracking-tight text-white">{item.value}</p>
                        </div>
                      </div>
                    );
                    return item.href ? (
                      <a key={item.label} href={item.href} className="block">{content}</a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Contact form */}
            <ScrollReveal variant="right">
              <div className="rounded-xl bg-navy p-4 sm:rounded-2xl sm:p-6 lg:rounded-3xl lg:p-10">
                <h3 className="font-display text-2xl font-bold tracking-tighter text-white">Send a Message</h3>
                <p className="mt-2 text-sm text-white/60">We typically respond within 24 hours</p>

                <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    <div>
                      <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/60">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full rounded-xl bg-white/[0.06] px-4 py-3.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/[0.1] focus:ring-2 focus:ring-gold/30" style={{ transition: `all 500ms ${T}` }} />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/60">Email</label>
                      <input type="email" placeholder="john@email.com" className="w-full rounded-xl bg-white/[0.06] px-4 py-3.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/[0.1] focus:ring-2 focus:ring-gold/30" style={{ transition: `all 500ms ${T}` }} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/60">Subject</label>
                    <select className="w-full appearance-none rounded-xl bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none focus:bg-white/[0.1] focus:ring-2 focus:ring-gold/30" style={{ transition: `all 500ms ${T}` }}>
                      <option value="">Select a topic</option>
                      <option value="tenant">Tenant Enquiry</option>
                      <option value="landlord">Landlord Support</option>
                      <option value="verification">Verification Question</option>
                      <option value="billing">Billing Issue</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/60">Message</label>
                    <textarea rows={5} placeholder="How can we help you?" className="w-full rounded-xl bg-white/[0.06] px-4 py-3.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/[0.1] focus:ring-2 focus:ring-gold/30" style={{ transition: `all 500ms ${T}` }} />
                  </div>

                  <button type="submit" className="btn-gold w-full">
                    <MessageSquare className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/houses/house_4.jpg" alt="Properties in Kampala" fill sizes="100vw" className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tighter text-white sm:text-3xl md:text-4xl">
              Ready to <span className="text-gradient-gold">Start</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/60">
              Browse verified properties or list your own today
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/search" className="btn-gold-lg">Browse Properties <ArrowRight size={18} /></Link>
              <Link href="/login" className="btn-outline-white px-8 py-4 text-base">Get Started <ArrowRight size={18} /></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
