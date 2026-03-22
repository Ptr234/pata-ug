"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Bed,
  Bath,
  Car,
  Shield,
  Lock,
  ArrowRight,
  Handshake,
  Tag,
} from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  category: string;
  district?: string;
  estate: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  photo: string;
  isVerified: boolean;
  negotiable?: boolean;
  upfrontMonths?: number;
  furnished?: string;
  parking?: number;
  isGuest?: boolean;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-UG", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PropertyCard({
  id,
  title,
  category,
  district,
  estate,
  price,
  bedrooms,
  bathrooms,
  photo,
  isVerified,
  negotiable,
  upfrontMonths,
  furnished,
  parking,
  isGuest = false,
}: PropertyCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/property/${id}`}
      className="group relative block overflow-hidden rounded-2xl bg-navy"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 48px -12px rgba(11, 25, 41, 0.2), 0 8px 16px -4px rgba(11, 25, 41, 0.08)"
          : "0 2px 20px rgba(11, 25, 41, 0.04)",
      }}
    >
      {/* ── Photo section ── */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={photo}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          style={{
            transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), filter 700ms cubic-bezier(0.16, 1, 0.3, 1)",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        />

        {/* Full overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: hovered
              ? "linear-gradient(180deg, rgba(11,25,41,0.15) 0%, rgba(11,25,41,0.7) 100%)"
              : "linear-gradient(180deg, transparent 40%, rgba(11,25,41,0.6) 100%)",
            transition: "background 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Category badge — top left */}
        <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-navy backdrop-blur-sm">
          {category}
        </span>

        {/* Verification badge — top right */}
        <span
          className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white"
          style={{
            background: isVerified
              ? "linear-gradient(135deg, #22C55E, #16A34A)"
              : "rgba(255,255,255,0.15)",
            boxShadow: isVerified
              ? "0 2px 8px rgba(34, 197, 94, 0.3)"
              : "none",
            backdropFilter: isVerified ? "none" : "blur(8px)",
          }}
        >
          <Shield className="h-3 w-3" />
          {isVerified ? "Verified" : "Not Verified"}
        </span>

        {/* Price + negotiable label — overlaid at bottom of photo */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
          <p className="font-display text-2xl font-bold tracking-tight text-white">
            UGX {formatPrice(price)}
            <span className="ml-1 text-xs font-normal text-white/50">
              /mo
            </span>
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span
              className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider"
              style={{
                background: negotiable
                  ? "rgba(10, 147, 150, 0.25)"
                  : "rgba(212, 98, 42, 0.25)",
                color: negotiable ? "#5EEAD4" : "#FB923C",
              }}
            >
              <Tag className="h-2.5 w-2.5" />
              {negotiable ? "Negotiable" : "Fixed Price"}
            </span>
            {upfrontMonths && upfrontMonths > 0 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white/80 backdrop-blur-sm">
                {upfrontMonths}mo deposit
              </span>
            )}
          </div>
        </div>

        {/* Hover: "View" arrow indicator — slides in from right */}
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? "translateX(0) translateY(-50%)"
              : "translateX(16px) translateY(-50%)",
            transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: "0 4px 16px rgba(212, 168, 83, 0.4)",
          }}
        >
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="relative px-4 pb-5 pt-4">
        {/* Title */}
        <p className="truncate font-display text-sm font-bold tracking-tight text-white">
          {title}
        </p>

        {/* Estate */}
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-white/70">
          <MapPin className="h-3 w-3 flex-shrink-0 text-teal" />
          <span className="truncate">{estate}{district ? `, ${district}` : ""}</span>
        </div>

        {/* Feature row */}
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          {bedrooms !== undefined && bedrooms > 0 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-white/[0.06] px-2 py-1 text-[10px] font-medium text-white/60">
              <Bed className="h-3 w-3 text-teal" />
              {bedrooms}
            </span>
          )}
          {bathrooms !== undefined && bathrooms > 0 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-white/[0.06] px-2 py-1 text-[10px] font-medium text-white/60">
              <Bath className="h-3 w-3 text-teal" />
              {bathrooms}
            </span>
          )}
          {parking !== undefined && parking > 0 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-white/[0.06] px-2 py-1 text-[10px] font-medium text-white/60">
              <Car className="h-3 w-3 text-teal" />
              {parking}
            </span>
          )}
          {furnished && (
            <span className="inline-flex items-center rounded-lg bg-teal/10 px-2 py-1 text-[10px] font-bold text-teal">
              {furnished}
            </span>
          )}
        </div>

        {/* CTA section */}
        {isGuest ? (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.04] px-3.5 py-3">
            <div className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-gold" />
              <span className="text-[11px] font-medium text-white/70">
                Contact hidden
              </span>
            </div>
            <span
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white"
              style={{
                background: "linear-gradient(135deg, #d4a853, #B8903D)",
                boxShadow: "0 2px 8px rgba(212, 168, 83, 0.25)",
                transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                transform: hovered ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              <ArrowRight className="h-3 w-3" />
              Unlock
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green py-3 text-[11px] font-black uppercase tracking-wider text-white"
            style={{
              transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 2px 8px rgba(31, 138, 68, 0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(31, 138, 68, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(31, 138, 68, 0.25)";
            }}
          >
            <Handshake className="h-3.5 w-3.5" />
            Agreed a Deal
          </button>
        )}
      </div>

      {/* Bottom gold accent line on hover */}
      <div
        className="absolute inset-x-0 bottom-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, #d4a853, transparent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </Link>
  );
}
