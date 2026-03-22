"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Upload, MapPin, ChevronRight, ChevronLeft, Check,
  ImagePlus, Phone, Building2, ArrowLeft, Home, Bed, Bath, Calendar,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { CATEGORIES } from "@/lib/constants";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";
const STEPS = [
  { number: 1, label: "Category", desc: "Choose property type" },
  { number: 2, label: "Details", desc: "Add property info" },
  { number: 3, label: "Photos", desc: "Upload images" },
  { number: 4, label: "Pay", desc: "Review and submit" },
];

export default function NewListingPage() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");

  return (
    <main className="min-h-screen">
      {/* ═══ HERO — Full-bleed with property bg ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/houses/house_8.jpg" alt="List your property" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(212,98,42,0.1),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <ScrollReveal>
            <Link href="/landlord" className="mb-8 inline-flex items-center gap-2 text-sm text-white/60" style={{ transition: `color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>

            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="section-label text-orange">Listing Wizard</p>
                <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-6xl">
                  List a New <span style={{ color: "#D4622A" }}>Property</span>
                </h1>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
                  Four steps to get your property reviewed, published, and in front of verified tenants across Kampala.
                </p>
              </div>

              {/* Progress cards */}
              <div className="hidden grid-cols-4 gap-3 lg:grid">
                {STEPS.map((s, i) => (
                  <div
                    key={s.number}
                    className="rounded-2xl p-4 text-center"
                    style={{
                      background: step > s.number ? "rgba(212,168,83,0.12)" : step === s.number ? "rgba(212,98,42,0.12)" : "rgba(255,255,255,0.04)",
                      transition: `all 500ms ${T}`,
                    }}
                  >
                    <div
                      className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        background: step > s.number ? "linear-gradient(135deg, #d4a853, #B8903D)" : step === s.number ? "#D4622A" : "rgba(255,255,255,0.08)",
                        color: step >= s.number ? "#fff" : "rgba(255,255,255,0.5)",
                        boxShadow: step > s.number ? "0 4px 16px rgba(212,168,83,0.3)" : step === s.number ? "0 4px 16px rgba(212,98,42,0.3)" : "none",
                      }}
                    >
                      {step > s.number ? <Check className="h-5 w-5" /> : s.number}
                    </div>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: step > s.number ? "#d4a853" : step === s.number ? "#D4622A" : "rgba(255,255,255,0.5)" }}>{s.label}</p>
                    <p className="mt-0.5 text-[9px] text-white/60">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mobile progress bar */}
      <div className="bg-navy lg:hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 sm:px-6">
          {STEPS.map((s, i) => (
            <div key={s.number} className="flex flex-1 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: step > s.number ? "linear-gradient(135deg, #d4a853, #B8903D)" : step === s.number ? "#D4622A" : "rgba(255,255,255,0.08)", color: step >= s.number ? "#fff" : "rgba(255,255,255,0.5)" }}>
                {step > s.number ? <Check className="h-4 w-4" /> : s.number}
              </div>
              {i < STEPS.length - 1 && <div className="h-0.5 flex-1 rounded-full" style={{ background: step > s.number ? "linear-gradient(90deg, #d4a853, #B8903D)" : "rgba(255,255,255,0.08)" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ STEP CONTENT — Split layout ═══ */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left: Step info + image (2/5) */}
            <div className="hidden lg:col-span-2 lg:block">
              <div className="sticky top-24">
                <ScrollReveal variant="left">
                  <p className="section-label text-orange">Step {step} of 4</p>
                  <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tighter text-navy">
                    {STEPS[step - 1].label}
                  </h2>
                  <p className="mt-3 leading-relaxed text-text-muted">
                    {step === 1 && "Choose from 12 property categories. This determines which fields appear in the next step."}
                    {step === 2 && "Fill in your property details — title, rent, location, bedrooms, and a description."}
                    {step === 3 && "Upload at least 3 high-quality photos. The first photo becomes your listing cover."}
                    {step === 4 && "Review your listing and pay UGX 30,000 to submit for admin review."}
                  </p>

                  <div className="img-zoom relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl">
                    <Image
                      src={step === 1 ? "/property_images/houses/house_1.jpg" : step === 2 ? "/property_images/apartments/apartment_1.jpg" : step === 3 ? "/property_images/studios/studio_1.jpg" : "/property_images/commercial/commercial_1.jpg"}
                      alt="Property listing step"
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Right: Form content (3/5) */}
            <div className="lg:col-span-3">
              <ScrollReveal key={step}>
                <div className="rounded-3xl bg-navy p-6 sm:p-10">
                  {/* ── Step 1: Category ── */}
                  {step === 1 && (
                    <div>
                      <h2 className="font-display text-2xl font-bold tracking-tighter text-white">Select a Category</h2>
                      <p className="mt-2 text-sm text-white/60">Choose the type of property you are listing.</p>
                      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCategory(cat.id)}
                            className="group rounded-xl p-5 text-left"
                            style={{
                              background: category === cat.id ? "rgba(212,98,42,0.12)" : "rgba(255,255,255,0.04)",
                              border: category === cat.id ? "2px solid #D4622A" : "2px solid transparent",
                              transform: category === cat.id ? "scale(1.02)" : "scale(1)",
                              boxShadow: category === cat.id ? "0 8px 24px rgba(212,98,42,0.15)" : "none",
                              transition: `all 500ms ${T}`,
                            }}
                            onMouseEnter={(e) => { if (category !== cat.id) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                            onMouseLeave={(e) => { if (category !== cat.id) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "scale(1)"; } }}
                          >
                            <p className={`text-sm font-bold ${category === cat.id ? "text-orange" : "text-white"}`}>{cat.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Step 2: Details ── */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="font-display text-2xl font-bold tracking-tighter text-white">Property Details</h2>

                      <div>
                        <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">Listing Title</label>
                        <input type="text" placeholder="e.g. Modern 2-Bedroom Apartment in Bukoto" className="w-full rounded-xl bg-white/[0.08] px-4 py-3.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/[0.14] focus:ring-2 focus:ring-gold/30" style={{ transition: `all 500ms ${T}` }} />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">Monthly Rent (UGX)</label>
                          <input type="number" placeholder="1,500,000" className="w-full rounded-xl bg-white/[0.08] px-4 py-3.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/[0.14] focus:ring-2 focus:ring-gold/30" style={{ transition: `all 500ms ${T}` }} />
                        </div>
                        <div>
                          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">Estate / Location</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                            <input type="text" placeholder="e.g. Bukoto" className="w-full rounded-xl bg-white/[0.08] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/[0.14] focus:ring-2 focus:ring-gold/30" style={{ transition: `all 500ms ${T}` }} />
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-3">
                        <div>
                          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">Bedrooms</label>
                          <select className="w-full rounded-xl bg-white/[0.12] px-4 py-3.5 text-sm text-white outline-none focus:bg-white/[0.18] focus:ring-2 focus:ring-gold/30 [&>option]:bg-navy [&>option]:text-white" style={{ transition: `all 500ms ${T}` }}>
                            <option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">Bathrooms</label>
                          <select className="w-full rounded-xl bg-white/[0.12] px-4 py-3.5 text-sm text-white outline-none focus:bg-white/[0.18] focus:ring-2 focus:ring-gold/30 [&>option]:bg-navy [&>option]:text-white" style={{ transition: `all 500ms ${T}` }}>
                            <option>1</option><option>2</option><option>3+</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">Available From</label>
                          <input type="date" className="w-full rounded-xl bg-white/[0.12] px-4 py-3.5 text-sm text-white outline-none focus:bg-white/[0.18] focus:ring-2 focus:ring-gold/30" style={{ transition: `all 500ms ${T}` }} />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">Description</label>
                        <textarea rows={4} placeholder="Describe your property (250-1,500 characters)" className="w-full rounded-xl bg-white/[0.08] px-4 py-3.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/[0.14] focus:ring-2 focus:ring-gold/30" style={{ transition: `all 500ms ${T}` }} />
                        <p className="mt-1.5 text-xs text-white/60">Min 250, max 1,500 characters</p>
                      </div>

                      <div>
                        <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">Contact Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                          <input type="tel" placeholder="+256 700 000 000" className="w-full rounded-xl bg-white/[0.08] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/[0.14] focus:ring-2 focus:ring-gold/30" style={{ transition: `all 500ms ${T}` }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 3: Photos ── */}
                  {step === 3 && (
                    <div>
                      <h2 className="font-display text-2xl font-bold tracking-tighter text-white">Upload Photos</h2>
                      <p className="mt-2 text-sm text-white/60">Minimum 3 photos, maximum 20. First photo becomes the cover.</p>

                      <div
                        className="mt-8 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-16"
                        style={{
                          borderColor: "rgba(212,168,83,0.3)",
                          background: "rgba(212,168,83,0.04)",
                          transition: `all 500ms ${T}`,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.6)"; e.currentTarget.style.background = "rgba(212,168,83,0.07)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.3)"; e.currentTarget.style.background = "rgba(212,168,83,0.04)"; }}
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, rgba(212,168,83,0.2), rgba(212,168,83,0.1))" }}>
                          <ImagePlus className="h-8 w-8 text-gold" />
                        </div>
                        <p className="mt-5 text-sm font-bold text-white">Drag photos here or click to browse</p>
                        <p className="mt-1.5 text-xs text-white/60">JPEG or PNG, max 5 MB per file</p>
                        <button type="button" className="btn-gold mt-6"><Upload className="h-4 w-4" /> Choose Files</button>
                      </div>
                    </div>
                  )}

                  {/* ── Step 4: Pay ── */}
                  {step === 4 && (
                    <div className="text-center">
                      <h2 className="font-display text-2xl font-bold tracking-tighter text-white">Review and Pay</h2>
                      <p className="mt-3 text-sm text-white/60">Pay UGX 30,000 to submit your listing for admin review.</p>

                      <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-white/[0.04] p-8 backdrop-blur-sm">
                        <p className="section-label text-gold">Listing Fee</p>
                        <p className="mt-3 font-display text-5xl font-bold tracking-tighter text-white">UGX 30,000</p>
                        <p className="mt-2 text-xs text-white/60">Live for 30 days. Reactivate at same price.</p>

                        <div className="mt-8 space-y-3">
                          <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #d4a853, #B8903D)", boxShadow: "0 4px 20px rgba(212,168,83,0.3)", transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(212,168,83,0.4)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,168,83,0.3)"; }}>
                            <Phone className="h-4 w-4" /> Pay via MTN MoMo
                          </button>
                          <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange py-4 text-sm font-bold text-white" style={{ boxShadow: "0 4px 16px rgba(212,98,42,0.2)", transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(212,98,42,0.3)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(212,98,42,0.2)"; }}>
                            <Phone className="h-4 w-4" /> Pay via Airtel Money
                          </button>
                        </div>
                      </div>

                      <p className="mt-6 text-xs text-white/60">Annual subscribers skip this step — listings are included in your plan.</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-navy px-6 py-3 text-sm font-bold text-navy disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ transition: `all 500ms ${T}` }}
                  onMouseEnter={(e) => { if (step > 1) { e.currentTarget.style.background = "#0B1929"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0B1929"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                {step < 4 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.min(4, s + 1))}
                    disabled={step === 1 && !category}
                    className="btn-gold disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ transition: `all 500ms ${T}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
