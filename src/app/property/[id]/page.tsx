"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Car,
  Dog,
  Sofa,
  Shield,
  Phone,
  MessageCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Lock,
  ArrowRight,
  Handshake,
  ExternalLink,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import StatusBadge from "@/components/StatusBadge";
import { properties } from "@/lib/mock-data";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-UG", {
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-UG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function capitalizeCategory(cat: string): string {
  return cat
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === params.id);

  // UI state
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isGuest, setIsGuest] = useState(true);

  // ------ 404 ------
  if (!property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-smoke px-4 text-center">
        <ScrollReveal variant="scale">
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-light">
              <span className="font-display text-3xl text-gold-dark">404</span>
            </div>
            <div>
              <h1 className="font-display text-3xl tracking-tighter text-navy">
                Property Not Found
              </h1>
              <p className="mt-2 max-w-md leading-relaxed text-text-secondary">
                This property may have been removed or the link is incorrect.
              </p>
            </div>
            <Link href="/search" className="btn-gold inline-flex items-center gap-2">
              Browse Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  const {
    title,
    category,
    estate,
    price,
    bedrooms,
    bathrooms,
    photos,
    description,
    isVerified,
    status,
    availableFrom,
    furnished,
    parking,
    petFriendly,
    contactPhone,
    landlordName,
  } = property;

  // Quick-facts data
  const quickFacts = [
    {
      icon: <Bed className="h-5 w-5 text-teal" />,
      label: "Bedrooms",
      value: bedrooms === 0 ? "Studio" : bedrooms.toString(),
    },
    {
      icon: <Bath className="h-5 w-5 text-teal" />,
      label: "Bathrooms",
      value: bathrooms.toString(),
    },
    {
      icon: <Sofa className="h-5 w-5 text-teal" />,
      label: "Furnished",
      value: furnished ? "Yes" : "No",
    },
    {
      icon: <Car className="h-5 w-5 text-teal" />,
      label: "Parking",
      value: parking ? "Yes" : "No",
    },
    {
      icon: <Dog className="h-5 w-5 text-teal" />,
      label: "Pet-friendly",
      value: petFriendly ? "Yes" : "No",
    },
    {
      icon: <Shield className="h-5 w-5 text-teal" />,
      label: "Category",
      value: capitalizeCategory(category),
    },
  ];

  // Navigate photos
  const prevPhoto = () =>
    setActivePhoto((i) => (i === 0 ? photos.length - 1 : i - 1));
  const nextPhoto = () =>
    setActivePhoto((i) => (i === photos.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* ================================================================== */}
      {/* Lightbox overlay                                                    */}
      {/* ================================================================== */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 backdrop-blur-xl"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2.5 text-white backdrop-blur transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white/20 hover:scale-110"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-navy shadow-soft backdrop-blur transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white hover:shadow-card hover:scale-105"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl shadow-elevated animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[activePhoto]}
              alt={`${title} photo ${activePhoto + 1}`}
              width={1200}
              height={800}
              className="h-auto max-h-[85vh] w-auto rounded-2xl object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-navy shadow-soft backdrop-blur transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white hover:shadow-card hover:scale-105"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Counter */}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            {activePhoto + 1} / {photos.length}
          </span>
        </div>
      )}

      {/* ================================================================== */}
      {/* Page content                                                        */}
      {/* ================================================================== */}
      <div className="min-h-screen bg-smoke">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {/* ── Breadcrumb ── */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-text-muted">
            <Link
              href="/"
              className="inline-flex items-center gap-1 transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-teal"
            >
              <MapPin className="h-3.5 w-3.5" />
              Home
            </Link>
            <span>/</span>
            <Link
              href="/search"
              className="transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-teal"
            >
              Browse
            </Link>
            <span>/</span>
            <span className="truncate font-medium text-text-secondary">
              {title}
            </span>
          </nav>

          {/* ── Photo Gallery ── */}
          <ScrollReveal variant="up">
            <section className="mb-8">
              {/* Main photo */}
              <div
                className="img-zoom relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl shadow-elevated"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={photos[activePhoto]}
                  alt={`${title} - main photo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 1152px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  priority
                />

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />

                {/* Photo counter badge */}
                <span className="absolute bottom-4 right-4 rounded-full bg-navy/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {activePhoto + 1} / {photos.length}
                </span>

                {/* Prev / Next arrows on the main image */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevPhoto();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 text-navy shadow-soft backdrop-blur transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white hover:shadow-card hover:scale-105"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextPhoto();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 text-navy shadow-soft backdrop-blur transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white hover:shadow-card hover:scale-105"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail row */}
              {photos.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {photos.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhoto(idx)}
                      className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        idx === activePhoto
                          ? "ring-2 ring-gold ring-offset-2 shadow-gold"
                          : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${title} thumbnail ${idx + 1}`}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>
          </ScrollReveal>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* ============================================================ */}
            {/* Left column (2/3)                                             */}
            {/* ============================================================ */}
            <div className="lg:w-2/3">
              {/* Badges */}
              <ScrollReveal variant="up">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-navy shadow-soft backdrop-blur-sm">
                    {capitalizeCategory(category)}
                  </span>
                  {isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-soft">
                      <Shield className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>
              </ScrollReveal>

              {/* Title */}
              <ScrollReveal variant="up" delay={50}>
                <h1 className="font-display text-3xl tracking-tighter text-navy md:text-4xl">
                  {title}
                </h1>
              </ScrollReveal>

              {/* Estate / location */}
              <ScrollReveal variant="up" delay={100}>
                <div className="mt-2 flex items-center gap-1.5 text-text-secondary">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-teal" />
                  <span>{estate}</span>
                </div>
              </ScrollReveal>

              {/* Price */}
              <ScrollReveal variant="up" delay={150}>
                <p className="mt-4 font-display text-3xl tracking-tight text-teal">
                  UGX {formatPrice(price)}
                  <span className="ml-2 font-sans text-base font-normal tracking-normal text-text-muted">
                    / month
                  </span>
                </p>
              </ScrollReveal>

              {/* Available from */}
              <ScrollReveal variant="up" delay={200}>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-text-secondary">
                  <Calendar className="h-4 w-4 flex-shrink-0 text-text-muted" />
                  Available from {formatDate(availableFrom)}
                </div>
              </ScrollReveal>

              {/* ── Quick Facts Grid ── */}
              <ScrollReveal variant="up" delay={250}>
                <section className="mt-8">
                  <p className="section-label mb-3 text-teal">Details</p>
                  <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                    Quick Facts
                  </h2>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {quickFacts.map((fact, i) => (
                    <div
                      key={fact.label}
                      className="card-surface flex items-center gap-3 p-4"
                      style={{ animation: `fadeInUp 600ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms both` }}
                    >
                      {fact.icon}
                      <div>
                        <p className="text-xs text-text-muted">{fact.label}</p>
                        <p className="text-sm font-semibold text-navy">
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* ── Description ── */}
              <ScrollReveal variant="up" delay={100}>
                <section className="mt-8">
                  <p className="section-label mb-3 text-teal">About</p>
                  <h2 className="font-display text-xl tracking-tighter text-navy mb-4">
                    Description
                  </h2>
                  <p className="leading-relaxed text-text-secondary">
                    {description}
                  </p>
                </section>
              </ScrollReveal>

              {/* ── Status ── */}
              <ScrollReveal variant="up" delay={150}>
                <div className="mt-6">
                  <StatusBadge status={status} />
                </div>
              </ScrollReveal>
            </div>

            {/* ============================================================ */}
            {/* Right column (1/3) - Sticky sidebar                           */}
            {/* ============================================================ */}
            <aside className="lg:w-1/3">
              <ScrollReveal variant="right">
                <div className="sticky top-6 space-y-6">
                  {/* ---- Contact Card ---- */}
                  <div className="card-surface shadow-card p-6">
                    {isGuest ? (
                      /* ---- Guest mode ---- */
                      <div className="space-y-4 text-center">
                        {/* Lock icon */}
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-light">
                          <Lock className="h-6 w-6 text-gold-dark" />
                        </div>

                        <h3 className="font-display text-xl tracking-tighter text-navy">
                          Unlock Contacts
                        </h3>
                        <p className="text-sm leading-relaxed text-text-muted">
                          Get instant access to landlord phone &amp; WhatsApp for
                          this property.
                        </p>

                        <button
                          type="button"
                          onClick={() => setIsGuest(false)}
                          className="btn-gold mt-2 w-full"
                        >
                          Get Day Pass &middot; UGX 20,000
                        </button>

                        <div className="flex items-center gap-3">
                          <span className="h-px flex-1 bg-smoke" />
                          <span className="text-xs text-text-muted">or</span>
                          <span className="h-px flex-1 bg-smoke" />
                        </div>

                        <Link
                          href="/pricing"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-teal transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-teal-dark"
                        >
                          Annual Pass &middot; UGX 120,000/year
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    ) : (
                      /* ---- Authenticated mode ---- */
                      <div className="space-y-4">
                        {/* Landlord name */}
                        <div>
                          <p className="section-label mb-1 text-text-muted">
                            Landlord
                          </p>
                          <p className="text-base font-semibold text-navy">
                            {landlordName}
                          </p>
                        </div>

                        {/* Phone */}
                        <div className="card-surface flex items-center gap-3 px-4 py-3">
                          <Phone className="h-4 w-4 text-teal" />
                          <a
                            href={`tel:${contactPhone}`}
                            className="text-sm font-semibold text-navy transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-teal"
                          >
                            {contactPhone}
                          </a>
                        </div>

                        {/* WhatsApp */}
                        <a
                          href={`https://wa.me/${contactPhone.replace(/\+/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-green py-3 text-sm font-bold text-white shadow-soft transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-green/90 hover:shadow-card"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>

                        {/* Deal agreed */}
                        <button
                          type="button"
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-light py-3 text-sm font-bold text-green shadow-soft transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-green hover:text-white hover:shadow-card"
                        >
                          <Handshake className="h-4 w-4" />
                          I&apos;ve agreed a deal
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ---- Location placeholder ---- */}
                  <div className="card-surface flex h-48 items-center justify-center text-center">
                    <div>
                      <MapPin className="mx-auto h-6 w-6 text-text-muted" />
                      <p className="mt-2 text-sm text-text-muted">
                        Map &middot; GPS coordinates hidden for guests
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
