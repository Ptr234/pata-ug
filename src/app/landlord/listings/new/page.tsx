"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Upload,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Check,
  ImagePlus,
  Phone,
  Building2,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { CATEGORIES } from "@/lib/constants";

const STEPS = [
  { number: 1, label: "Category" },
  { number: 2, label: "Details" },
  { number: 3, label: "Photos" },
  { number: 4, label: "Review & Pay" },
];

const TRANSITION = "transition-all duration-[560ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
const SMOOTH = "all 500ms cubic-bezier(0.16, 1, 0.3, 1)";

export default function NewListingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [uploadZoneHover, setUploadZoneHover] = useState(false);
  const [hoveredPayBtn, setHoveredPayBtn] = useState<number | null>(null);
  const [hoveredNavBtn, setHoveredNavBtn] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-smoke">
      {/* == DARK HERO HEADER ============================================= */}
      <ScrollReveal>
        <section className="relative overflow-hidden bg-navy">
          {/* Grid pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          {/* Orange radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-orange/[0.06] blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
              <Link
                href="/landlord"
                className={`hover:text-gold ${TRANSITION}`}
              >
                Dashboard
              </Link>
              <span className="mx-2">/</span>
              <span className="font-medium text-white/50">New Listing</span>
            </nav>

            {/* Section label */}
            <p className="section-label mb-3 text-orange">Listing Wizard</p>

            {/* Heading */}
            <h1 className="font-display text-3xl uppercase tracking-tighter text-white sm:text-4xl">
              List a New Property
            </h1>

            {/* Subtitle */}
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              A 4-step wizard to get your property reviewed, published, and in
              front of verified tenants across Kampala.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* == PROGRESS INDICATOR =========================================== */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between">
              {STEPS.map((step, i) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    {/* Step circle */}
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold cursor-default ${
                        currentStep > step.number
                          ? "bg-gradient-to-br from-gold to-gold-dark text-white shadow-[0_0_18px_rgba(212,168,83,0.4)]"
                          : currentStep === step.number
                            ? "bg-orange text-white shadow-[0_0_18px_rgba(232,119,34,0.35)]"
                            : "bg-white/[0.06] text-white/60"
                      }`}
                      style={{
                        transition: SMOOTH,
                        transform:
                          hoveredStep === step.number
                            ? "scale(1.1)"
                            : "scale(1)",
                      }}
                      onMouseEnter={() => setHoveredStep(step.number)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      {currentStep > step.number ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    {/* Step label */}
                    <span
                      className={`mt-2 text-xs font-medium ${TRANSITION} ${
                        currentStep > step.number
                          ? "text-gold"
                          : currentStep === step.number
                            ? "text-orange"
                            : "text-navy/40"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {/* Connecting bar */}
                  {i < STEPS.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 w-8 rounded-full sm:w-14 lg:w-20 ${TRANSITION} ${
                        currentStep > step.number
                          ? "bg-gradient-to-r from-gold to-gold-dark"
                          : "bg-navy/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* == STEP CONTENT ================================================= */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-3xl px-4 pb-4 sm:px-6 lg:px-8">
          <ScrollReveal key={currentStep}>
            <div className="rounded-3xl bg-navy p-6 sm:p-10">
              {/* -- Step 1: Category ------------------------------------ */}
              {currentStep === 1 && (
                <div>
                  <h2 className="font-display text-xl tracking-tighter text-white sm:text-2xl">
                    Select a Category
                  </h2>
                  <p className="mt-2 text-sm text-white/70">
                    Choose the type of property you are listing. This determines
                    which fields appear in the next step.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`rounded-xl p-4 text-left ${
                          selectedCategory === cat.id
                            ? "border-2 border-orange bg-orange/10 shadow-[0_0_20px_rgba(232,119,34,0.15)]"
                            : "border-2 border-transparent bg-white/[0.04]"
                        }`}
                        style={{
                          transition: SMOOTH,
                          transform:
                            selectedCategory === cat.id
                              ? "scale(1.02)"
                              : hoveredCat === cat.id
                                ? "scale(1.03) translateY(-2px)"
                                : "scale(1) translateY(0)",
                          boxShadow:
                            hoveredCat === cat.id &&
                            selectedCategory !== cat.id
                              ? "0 8px 30px rgba(212, 168, 83, 0.12)"
                              : undefined,
                          backgroundColor:
                            hoveredCat === cat.id &&
                            selectedCategory !== cat.id
                              ? "rgba(255, 255, 255, 0.08)"
                              : undefined,
                        }}
                        onMouseEnter={() => setHoveredCat(cat.id)}
                        onMouseLeave={() => setHoveredCat(null)}
                      >
                        <p
                          className={`text-sm font-bold ${
                            selectedCategory === cat.id
                              ? "text-orange"
                              : "text-white"
                          }`}
                        >
                          {cat.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* -- Step 2: Details ------------------------------------- */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="font-display text-xl tracking-tighter text-white sm:text-2xl">
                    Property Details
                  </h2>

                  {/* Listing Title */}
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                      Listing Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Modern 2-Bedroom Apartment in Bukoto"
                      className={`w-full rounded-xl bg-white/[0.06] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none focus:ring-2 focus:ring-gold/30 ${TRANSITION}`}
                    />
                  </div>

                  {/* Rent + Location */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                        Monthly Rent (UGX)
                      </label>
                      <input
                        type="number"
                        placeholder="1,500,000"
                        className={`w-full rounded-xl bg-white/[0.06] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none focus:ring-2 focus:ring-gold/30 ${TRANSITION}`}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                        Estate / Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                        <input
                          type="text"
                          placeholder="e.g. Bukoto"
                          className={`w-full rounded-xl bg-white/[0.06] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/25 outline-none focus:ring-2 focus:ring-gold/30 ${TRANSITION}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bedrooms / Bathrooms / Available */}
                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                        Bedrooms
                      </label>
                      <select
                        className={`w-full rounded-xl bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-gold/30 ${TRANSITION}`}
                      >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                        Bathrooms
                      </label>
                      <select
                        className={`w-full rounded-xl bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-gold/30 ${TRANSITION}`}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3+</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                        Available From
                      </label>
                      <input
                        type="date"
                        className={`w-full rounded-xl bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-gold/30 ${TRANSITION}`}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your property (250-1,500 characters)"
                      className={`w-full rounded-xl bg-white/[0.06] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none focus:ring-2 focus:ring-gold/30 ${TRANSITION}`}
                    />
                    <p className="mt-1.5 text-xs text-white/70">
                      Min 250, max 1,500 characters
                    </p>
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                      <input
                        type="tel"
                        placeholder="+256 700 000 000"
                        className={`w-full rounded-xl bg-white/[0.06] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/25 outline-none focus:ring-2 focus:ring-gold/30 ${TRANSITION}`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* -- Step 3: Photos -------------------------------------- */}
              {currentStep === 3 && (
                <div>
                  <h2 className="font-display text-xl tracking-tighter text-white sm:text-2xl">
                    Upload Photos
                  </h2>
                  <p className="mt-2 text-sm text-white/70">
                    Minimum 3 photos, maximum 20. First photo becomes the cover.
                    JPEG/PNG, max 5 MB each.
                  </p>

                  <div
                    className="mt-8 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-14"
                    style={{
                      transition: SMOOTH,
                      borderColor: uploadZoneHover
                        ? "rgba(212, 168, 83, 0.6)"
                        : "rgba(212, 168, 83, 0.3)",
                      backgroundColor: uploadZoneHover
                        ? "rgba(212, 168, 83, 0.07)"
                        : "rgba(212, 168, 83, 0.04)",
                      boxShadow: uploadZoneHover
                        ? "inset 0 0 40px rgba(212, 168, 83, 0.06)"
                        : "none",
                    }}
                    onMouseEnter={() => setUploadZoneHover(true)}
                    onMouseLeave={() => setUploadZoneHover(false)}
                  >
                    {/* Gold circle icon */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/10">
                      <ImagePlus className="h-8 w-8 text-gold" />
                    </div>

                    <p className="mt-5 text-sm font-semibold text-white">
                      Drag photos here or click to browse
                    </p>
                    <p className="mt-1.5 text-xs text-white/60">
                      JPEG or PNG, max 5 MB per file
                    </p>

                    <button type="button" className="btn-gold mt-6">
                      <Upload className="h-4 w-4" />
                      Choose Files
                    </button>
                  </div>
                </div>
              )}

              {/* -- Step 4: Review & Pay -------------------------------- */}
              {currentStep === 4 && (
                <div className="text-center">
                  <h2 className="font-display text-xl tracking-tighter text-white sm:text-2xl">
                    Review &amp; Pay
                  </h2>
                  <p className="mt-3 text-sm text-white/70">
                    Review your listing details and pay UGX 30,000 to submit for
                    admin review.
                  </p>

                  {/* Frosted inner card */}
                  <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-white/[0.04] p-8 backdrop-blur-sm">
                    <p className="section-label text-gold">Listing Fee</p>
                    <p className="mt-3 font-display text-4xl tracking-tighter text-white">
                      UGX 30,000
                    </p>
                    <p className="mt-2 text-xs text-white/60">
                      Live for 30 days. Reactivate at same price.
                    </p>

                    <div className="mt-7 space-y-3">
                      {/* MTN MoMo -- Gold gradient */}
                      <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-dark px-6 py-3.5 text-sm font-bold text-white active:scale-[0.98]"
                        style={{
                          transition: SMOOTH,
                          transform:
                            hoveredPayBtn === 0
                              ? "translateY(-2px)"
                              : "translateY(0)",
                          boxShadow:
                            hoveredPayBtn === 0
                              ? "0 8px 32px rgba(212, 168, 83, 0.4)"
                              : "0 4px 20px rgba(212, 168, 83, 0.3)",
                        }}
                        onMouseEnter={() => setHoveredPayBtn(0)}
                        onMouseLeave={() => setHoveredPayBtn(null)}
                      >
                        <Phone className="h-4 w-4" />
                        Pay via MTN MoMo
                      </button>

                      {/* Airtel Money -- Orange */}
                      <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange px-6 py-3.5 text-sm font-bold text-white shadow-lg active:scale-[0.98]"
                        style={{
                          transition: SMOOTH,
                          transform:
                            hoveredPayBtn === 1
                              ? "translateY(-2px)"
                              : "translateY(0)",
                          boxShadow:
                            hoveredPayBtn === 1
                              ? "0 8px 32px rgba(232, 119, 34, 0.35)"
                              : "0 4px 16px rgba(232, 119, 34, 0.2)",
                        }}
                        onMouseEnter={() => setHoveredPayBtn(1)}
                        onMouseLeave={() => setHoveredPayBtn(null)}
                      >
                        <Phone className="h-4 w-4" />
                        Pay via Airtel Money
                      </button>
                    </div>
                  </div>

                  <p className="mt-6 text-xs text-white/60">
                    Annual subscribers skip this step &mdash; listings are
                    included in your plan.
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* == NAVIGATION BAR =============================================== */}
      <ScrollReveal>
        <section className="bg-smoke pb-16">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 pt-4 sm:px-6 lg:px-8">
            {/* Back */}
            <button
              type="button"
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              className="btn-outline-white inline-flex items-center gap-2 rounded-xl border-2 border-navy px-6 py-3 text-sm font-bold text-navy disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
              style={{
                transition: SMOOTH,
                transform:
                  hoveredNavBtn === "back"
                    ? "translateY(-2px)"
                    : "translateY(0)",
                boxShadow:
                  hoveredNavBtn === "back"
                    ? "0 6px 24px rgba(19, 17, 28, 0.15)"
                    : "none",
                backgroundColor:
                  hoveredNavBtn === "back" ? "#13111c" : "transparent",
                color: hoveredNavBtn === "back" ? "#ffffff" : undefined,
              }}
              onMouseEnter={() => setHoveredNavBtn("back")}
              onMouseLeave={() => setHoveredNavBtn(null)}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            {/* Next */}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => Math.min(4, s + 1))}
                disabled={currentStep === 1 && !selectedCategory}
                className="btn-gold disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  transition: SMOOTH,
                  transform:
                    hoveredNavBtn === "next"
                      ? "translateY(-2px)"
                      : "translateY(0)",
                  boxShadow:
                    hoveredNavBtn === "next"
                      ? "0 8px 28px rgba(212, 168, 83, 0.35)"
                      : "none",
                }}
                onMouseEnter={() => setHoveredNavBtn("next")}
                onMouseLeave={() => setHoveredNavBtn(null)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
