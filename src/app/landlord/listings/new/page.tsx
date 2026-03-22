"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Img";
import {
  Upload, MapPin, ChevronRight, ChevronLeft, Check,
  ImagePlus, Phone, Building2, ArrowLeft, Home, Bed, Bath, Calendar,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { CATEGORIES } from "@/lib/constants";
import LocationPicker from "@/components/LocationPicker";

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
  const [listingLoc, setListingLoc] = useState({
    region: "", district: "", county: "", subcounty: "", parish: "", village: "",
  });

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
                  {step === 2 && (() => {
                    const L = "mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/40";
                    const I = `w-full rounded-2xl bg-white/[0.06] px-4 py-3.5 text-sm font-medium text-white placeholder:text-white/30 outline-none transition-all duration-500 focus:bg-white/[0.12] focus:ring-2 focus:ring-gold/30`;
                    const S = `w-full appearance-none rounded-2xl bg-white/[0.06] px-4 py-3.5 pr-10 text-sm font-medium text-white outline-none transition-all duration-500 focus:bg-white/[0.12] focus:ring-2 focus:ring-gold/30 [&>option]:bg-navy [&>option]:text-white`;
                    const isResidential = ["apartment","standalone","townhouse","duplex","studio","single-room","shared-house","servant-quarters","serviced-apartment","short-stay"].includes(category);
                    const isCommercial = ["office","shop","warehouse"].includes(category);
                    const isLand = category === "land";
                    const showBedrooms = isResidential && category !== "studio";

                    const SectionCard = ({ icon: Icon, accent, title, children }: { icon: React.ElementType; accent: string; title: string; children: React.ReactNode }) => (
                      <div className="rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}15` }}>
                            <Icon size={16} style={{ color: accent }} />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: accent }}>{title}</p>
                        </div>
                        <div className="space-y-5 px-5 py-5">{children}</div>
                      </div>
                    );

                    return (
                    <div className="space-y-5">
                      <h2 className="font-display text-2xl font-bold tracking-tighter text-white">Property Details</h2>

                      {/* Category indicator */}
                      {category && (
                        <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "rgba(212,98,42,0.08)", border: "1px solid rgba(212,98,42,0.15)" }}>
                          <Building2 className="h-4 w-4 text-orange" />
                          <span className="text-sm font-bold text-orange">{CATEGORIES.find((c) => c.id === category)?.label ?? category}</span>
                          <button type="button" onClick={() => setStep(1)} className="ml-auto text-[10px] font-bold uppercase tracking-wider text-white/40 hover:text-white" style={{ transition: `color 500ms ${T}` }}>Change</button>
                        </div>
                      )}

                      {/* ── Card: Basic Info ── */}
                      <SectionCard icon={Home} accent="#d4a853" title="Basic Information">
                        <div><label className={L}>Listing Title</label><input type="text" placeholder={isLand ? "e.g. 50x100 Plot in Wakiso" : isCommercial ? "e.g. Office Space on Nakasero Road" : "e.g. Modern 2-Bedroom Apartment in Bukoto"} className={I} /></div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div><label className={L}>{isLand ? "Asking Price (UGX)" : "Monthly Rent (UGX)"}</label><input type="number" placeholder={isLand ? "50,000,000" : "1,500,000"} className={I} /></div>
                          <div><label className={L}>Available From</label><input type="date" className={I} /></div>
                        </div>
                        <div>
                          <label className={L}>Price Flexibility</label>
                          <div className="flex gap-2">
                            <button type="button" className="flex-1 rounded-2xl px-4 py-3 text-sm font-bold" style={{ background: "rgba(10,147,150,0.1)", border: "1.5px solid rgba(10,147,150,0.3)", color: "#5EEAD4", transition: `all 500ms ${T}` }}>Negotiable</button>
                            <button type="button" className="flex-1 rounded-2xl px-4 py-3 text-sm font-bold" style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", transition: `all 500ms ${T}` }}>Fixed Price</button>
                          </div>
                        </div>
                      </SectionCard>

                      {/* ── Card: Location ── */}
                      <SectionCard icon={MapPin} accent="#0A9396" title="Property Location">
                        <LocationPicker value={listingLoc} onChange={setListingLoc} />
                        <div>
                          <label className={L}>Describe How to Find It</label>
                          <textarea rows={2} placeholder="e.g. Off Bukoto Street, behind Shell petrol station. Blue gate, 3rd floor." className={`${I} resize-none`} />
                          <p className="mt-1 text-[9px] text-white/25">Landmarks, gate colour, floor number — helps tenants locate the property</p>
                        </div>
                      </SectionCard>

                      {/* ── Card: Payment & Security ── */}
                      <SectionCard icon={Calendar} accent="#D4622A" title="Deposit & Security">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className={L}>Security Deposit (UGX)</label>
                            <input type="number" placeholder="e.g. 500000" className={I} />
                            <p className="mt-1 text-[9px] text-white/25">Refundable amount held in tenant&apos;s wallet</p>
                          </div>
                          <div>
                            <label className={L}>Upfront Rent (months)</label>
                            <select className={S}>
                              <option>1 month</option>
                              <option>2 months</option>
                              <option>3 months</option>
                              <option>6 months</option>
                              <option>12 months</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className={L}>Fencing</label>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {[
                              { id: "wall", label: "Wall Fence", icon: "🧱" },
                              { id: "live", label: "Live Fence", icon: "🌿" },
                              { id: "chain-link", label: "Chain Link", icon: "🔗" },
                              { id: "no-gate", label: "No Gate", icon: "🚪" },
                            ].map((f) => (
                              <label
                                key={f.id}
                                className="group flex cursor-pointer items-center gap-2.5 rounded-2xl px-3 py-3 text-sm"
                                style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)", transition: `all 400ms ${T}` }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,168,83,0.06)"; e.currentTarget.style.borderColor = "rgba(212,168,83,0.2)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                              >
                                <input type="checkbox" className="h-4 w-4 rounded accent-gold" />
                                <span className="text-white/50 group-hover:text-white/70">{f.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </SectionCard>

                      {/* ── Card: Property Specs ── */}
                      {(isResidential || isCommercial) && (
                        <SectionCard icon={Bed} accent="#0A9396" title="Property Specifications">
                          <div className="grid gap-5 sm:grid-cols-3">
                            {showBedrooms && (
                              <div><label className={L}>Bedrooms</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></div>
                            )}
                            <div><label className={L}>Bathrooms</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>1</option><option>2</option><option>3+</option></select></div>
                            {isCommercial && (
                              <div><label className={L}>Floor Area (sqm)</label><input type="number" placeholder="e.g. 80" className={I} style={{ transition: `all 500ms ${T}` }} /></div>
                            )}
                            {category === "studio" && (
                              <div><label className={L}>Floor Level</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Ground</option><option>1st</option><option>2nd</option><option>3rd+</option></select></div>
                            )}
                            {(category === "apartment" || category === "townhouse") && (
                              <div><label className={L}>Total Floors in Building</label><input type="number" placeholder="e.g. 4" className={I} style={{ transition: `all 500ms ${T}` }} /></div>
                            )}
                          </div>

                          {category === "apartment" && (
                            <div><label className={L}>Floor Level</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Ground</option><option>1st</option><option>2nd</option><option>3rd</option><option>4th+</option></select></div>
                          )}

                          {category === "standalone" && (
                            <div className="grid gap-5 sm:grid-cols-2">
                              <div><label className={L}>Compound Size</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Small</option><option>Medium</option><option>Large</option></select></div>
                              <div><label className={L}>Parking Bays</label><input type="number" placeholder="e.g. 2" className={I} style={{ transition: `all 500ms ${T}` }} /></div>
                            </div>
                          )}

                          {category === "shared-house" && (
                            <div className="grid gap-5 sm:grid-cols-2">
                              <div><label className={L}>Current Housemates</label><input type="number" placeholder="e.g. 3" className={I} style={{ transition: `all 500ms ${T}` }} /></div>
                              <div><label className={L}>Bathroom Type</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Private</option><option>Shared</option></select></div>
                            </div>
                          )}

                          {category === "single-room" && (
                            <div className="grid gap-5 sm:grid-cols-2">
                              <div><label className={L}>Bathroom Type</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Private</option><option>Shared</option></select></div>
                              <div><label className={L}>Compound Access</label><input type="text" placeholder="e.g. Gated, shared yard" className={I} style={{ transition: `all 500ms ${T}` }} /></div>
                            </div>
                          )}

                          {category === "office" && (
                            <div className="grid gap-5 sm:grid-cols-2">
                              <div><label className={L}>Private Offices</label><input type="number" placeholder="e.g. 3" className={I} style={{ transition: `all 500ms ${T}` }} /></div>
                              <div><label className={L}>Parking Bays</label><input type="number" placeholder="e.g. 4" className={I} style={{ transition: `all 500ms ${T}` }} /></div>
                            </div>
                          )}

                          {category === "shop" && (
                            <div className="grid gap-5 sm:grid-cols-2">
                              <div><label className={L}>Frontage Width (m)</label><input type="number" placeholder="e.g. 6" className={I} style={{ transition: `all 500ms ${T}` }} /></div>
                              <div><label className={L}>Storage Room</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>No</option><option>Yes</option></select></div>
                            </div>
                          )}

                          {category === "warehouse" && (
                            <div className="grid gap-5 sm:grid-cols-2">
                              <div><label className={L}>Loading Bay</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>No</option><option>Yes</option></select></div>
                              <div><label className={L}>Clearance Height (m)</label><input type="number" placeholder="e.g. 5" className={I} style={{ transition: `all 500ms ${T}` }} /></div>
                            </div>
                          )}

                          {category === "short-stay" && (
                            <div className="grid gap-5 sm:grid-cols-2">
                              <div><label className={L}>Minimum Stay</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>1 night</option><option>1 week</option><option>1 month</option></select></div>
                              <div><label className={L}>Housekeeping</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>No</option><option>Yes</option></select></div>
                            </div>
                          )}
                        </SectionCard>
                      )}

                      {/* ── Card: Land Details ── */}
                      {isLand && (
                        <SectionCard icon={MapPin} accent="#1F8A44" title="Land Details">
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div><label className={L}>Plot Size</label><input type="text" placeholder="e.g. 50x100 ft or 0.25 acres" className={I} style={{ transition: `all 500ms ${T}` }} /></div>
                            <div><label className={L}>Zoning Type</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Residential</option><option>Commercial</option><option>Mixed Use</option></select></div>
                          </div>
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div><label className={L}>Title Type</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Freehold</option><option>Leasehold</option><option>Mailo</option><option>Customary</option></select></div>
                            <div><label className={L}>Road Access</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Tarmac</option><option>Murram</option><option>Footpath</option></select></div>
                          </div>
                        </SectionCard>
                      )}

                      {/* ── Card: Amenities ── */}
                      {!isLand && (
                      <SectionCard icon={Home} accent="#D4622A" title="Amenities & Features">
                        <div className="grid gap-5 sm:grid-cols-3">
                          {!isCommercial && <div><label className={L}>Furnished</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Unfurnished</option><option>Partially Furnished</option><option>Fully Furnished</option></select></div>}
                          {category !== "warehouse" && <div><label className={L}>Parking Spaces</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>No Parking</option><option>1 Space</option><option>2 Spaces</option><option>3+ Spaces</option></select></div>}
                          {isResidential && <div><label className={L}>Pet-Friendly</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>No</option><option>Yes</option></select></div>}
                        </div>
                        {isResidential && (
                        <div className="grid gap-5 sm:grid-cols-3">
                          <div><label className={L}>Kitchen Type</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Modern Open</option><option>Modern Closed</option><option>Basic</option><option>Kitchenette</option><option>None</option></select></div>
                          <div><label className={L}>Flooring</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Tiles</option><option>Marble</option><option>Terrazzo</option><option>Cement</option><option>Wood</option><option>Vinyl</option></select></div>
                          <div><label className={L}>Built-in Wardrobes</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>No</option><option>Yes</option></select></div>
                        </div>
                        )}
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div><label className={L}>Water Availability</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>24/7 Supply</option><option>Scheduled</option><option>Unreliable</option></select></div>
                          <div><label className={L}>Power Reliability</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Reliable</option><option>Backup Available (Generator/Inverter)</option><option>Frequent Outages</option></select></div>
                        </div>
                        {isResidential && (
                        <div className="grid gap-5 sm:grid-cols-3">
                          {[
                            { id: "balcony", label: "Balcony" },
                            { id: "ac", label: "Air Conditioning" },
                            { id: "bq", label: "Servant Quarters (BQ)" },
                            { id: "pool", label: "Swimming Pool" },
                            { id: "gym", label: "Gym" },
                            { id: "laundry", label: "Laundry Area" },
                          ].map((a) => (
                            <label key={a.id} className="group flex cursor-pointer items-center gap-2.5 rounded-2xl px-3 py-3 text-sm" style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)", transition: `all 400ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,98,42,0.06)"; e.currentTarget.style.borderColor = "rgba(212,98,42,0.2)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                              <input type="checkbox" className="h-4 w-4 rounded accent-orange" />
                              <span className="text-white/50 group-hover:text-white/70">{a.label}</span>
                            </label>
                          ))}
                        </div>
                        )}
                      </SectionCard>
                      )}

                      {/* ── Card: Utilities ── */}
                      {!isLand && (
                      <SectionCard icon={MapPin} accent="#d4a853" title="Utilities & Services">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div><label className={L}>Electricity Type</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>Prepaid (Yaka)</option><option>Postpaid</option><option>Solar</option><option>Generator Backup</option></select></div>
                          <div><label className={L}>Water Source</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>NWSC Mains</option><option>Borehole</option><option>Rainwater</option><option>Tank</option><option>Well</option></select></div>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div><label className={L}>Internet Available</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>No</option><option>Yes</option></select></div>
                          <div><label className={L}>Garbage Collection</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>No</option><option>Yes</option></select></div>
                        </div>
                      </SectionCard>
                      )}

                      {/* ── Card: Security ── */}
                      {!isLand && (
                      <SectionCard icon={Home} accent="#1F8A44" title="Security Features">
                        <div className="grid gap-4 sm:grid-cols-3">
                          {[
                            { id: "guards", label: "Security Guards" },
                            { id: "cctv", label: "CCTV Cameras" },
                            { id: "gated", label: "Gated Community" },
                            { id: "wall", label: "Perimeter Wall" },
                            { id: "alarm", label: "Alarm System" },
                          ].map((s) => (
                            <label key={s.id} className="group flex cursor-pointer items-center gap-2.5 rounded-2xl px-3 py-3 text-sm" style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)", transition: `all 400ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(31,138,68,0.06)"; e.currentTarget.style.borderColor = "rgba(31,138,68,0.2)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                              <input type="checkbox" className="h-4 w-4 rounded accent-green" />
                              <span className="text-white/50 group-hover:text-white/70">{s.label}</span>
                            </label>
                          ))}
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div><label className={L}>Gate Type</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>None</option><option>Manual</option><option>Automatic</option><option>Sliding</option></select></div>
                          <div><label className={L}>Compound</label><select className={S} style={{ transition: `all 500ms ${T}` }}><option>No</option><option>Yes, with Garden</option><option>Yes, Paved</option></select></div>
                        </div>
                      </SectionCard>
                      )}

                      {/* ── Card: Lifestyle Tags ── */}
                      {isResidential && (
                      <SectionCard icon={Home} accent="#0A9396" title="Lifestyle Tags">
                        <p className="text-xs text-white/40">Select tags that describe who this property is best suited for. This helps tenants find your listing faster.</p>
                        <div className="grid gap-4 sm:grid-cols-3">
                          {[
                            { id: "family-friendly", label: "Family-Friendly" },
                            { id: "bachelor-pad", label: "Bachelor Pad" },
                            { id: "student-friendly", label: "Student-Friendly" },
                            { id: "luxury", label: "Luxury" },
                            { id: "budget", label: "Budget" },
                            { id: "gated-community", label: "Gated Community" },
                          ].map((tag) => (
                            <label key={tag.id} className="group flex cursor-pointer items-center gap-2.5 rounded-2xl px-3 py-3 text-sm" style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)", transition: `all 400ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(10,147,150,0.06)"; e.currentTarget.style.borderColor = "rgba(10,147,150,0.2)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                              <input type="checkbox" className="h-4 w-4 rounded accent-teal" />
                              <span className="text-white/50 group-hover:text-white/70">{tag.label}</span>
                            </label>
                          ))}
                        </div>
                      </SectionCard>
                      )}

                      {/* ── Card: Land Site Features ── */}
                      {isLand && (
                      <SectionCard icon={MapPin} accent="#d4a853" title="Site Features">
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div><label className={L}>Electricity Access</label><select className={S}><option>No</option><option>Nearby</option><option>On-site</option></select></div>
                          <div><label className={L}>Water Access</label><select className={S}><option>No</option><option>Borehole</option><option>NWSC Nearby</option></select></div>
                          <div><label className={L}>Fenced</label><select className={S}><option>No</option><option>Partially</option><option>Fully Fenced</option></select></div>
                        </div>
                      </SectionCard>
                      )}

                      {/* ── Card: Description & Contact ── */}
                      <SectionCard icon={Phone} accent="#d4a853" title="Description & Contact">
                        <div><label className={L}>Property Description</label><textarea rows={4} placeholder="Describe your property in detail — what makes it special, condition, surroundings..." className={`${I} resize-none`} /><p className="mt-1 text-[9px] text-white/25">250 – 1,500 characters</p></div>
                        <div><label className={L}>Contact Phone</label><div className="relative"><Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" /><input type="tel" placeholder="+256 700 000 000" className={`${I} pl-11`} /></div></div>
                      </SectionCard>
                    </div>
                    );
                  })()}

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
