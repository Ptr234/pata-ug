"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "@/components/Img";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ClipboardCheck,
  Check,
  X,
  AlertTriangle,
  Building2,
  MapPin,
  ArrowLeft,
  Eye,
  ChevronDown,
  ImageIcon,
  FileText,
  Undo2,
} from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

type ListingStatus = "pending" | "approved" | "flagged" | "rejected";

interface Listing {
  id: string;
  property: string;
  estate: string;
  district: string;
  landlord: string;
  date: string;
  rent: string;
  status: ListingStatus;
  description: string;
  photos: string[];
}

const INITIAL_LISTINGS: Listing[] = [
  {
    id: "1",
    property: "3-Bed Apartment in Bukoto",
    estate: "Bukoto",
    district: "Kampala",
    landlord: "James Mukasa",
    date: "22 Mar",
    rent: "UGX 1.8M",
    status: "pending",
    description: "Spacious 3‑bedroom apartment on a quiet street in Bukoto. Tiled floors, modern kitchen with granite countertops, and a private balcony overlooking the neighbourhood. 24‑hour security and ample water supply. Master bedroom is en‑suite with hot water. Prepaid UMEME meter included.",
    photos: [
      "/property_images/apartments/apartment_1.jpg",
      "/property_images/apartments/apartment_2.jpg",
      "/property_images/apartments/apartment_3.jpg",
      "/property_images/apartments/apartment_4.jpg",
      "/property_images/apartments/apartment_5.jpg",
    ],
  },
  {
    id: "2",
    property: "Studio Flat in Naguru",
    estate: "Naguru",
    district: "Kampala",
    landlord: "Peter Ochieng",
    date: "21 Mar",
    rent: "UGX 800K",
    status: "pending",
    description: "Bright studio apartment ideal for a young professional. Open‑plan living and sleeping area, kitchenette with gas cooker, tiled bathroom, and shared compound parking. Close to Naguru Go‑Down arts centre. Water tank on premises.",
    photos: [
      "/property_images/studios/studio_1.jpg",
      "/property_images/studios/studio_2.jpg",
      "/property_images/studios/studio_3.jpg",
    ],
  },
  {
    id: "3",
    property: "2-Bed Standalone in Kololo",
    estate: "Kololo",
    district: "Kampala",
    landlord: "Peter Ssemwogerere",
    date: "20 Mar",
    rent: "UGX 5M",
    status: "approved",
    description: "Executive standalone house in the prestigious Kololo hill area. Master en‑suite, large living room, mature garden with fruit trees, boys' quarters, and a double garage. Walking distance to international schools and embassies. Full perimeter wall with electric fence.",
    photos: [
      "/property_images/houses/house_1.jpg",
      "/property_images/houses/house_2.jpg",
      "/property_images/houses/house_3.jpg",
      "/property_images/houses/house_4.jpg",
      "/property_images/houses/house_5.jpg",
      "/property_images/houses/house_6.jpg",
      "/property_images/houses/house_7.jpg",
      "/property_images/houses/house_8.jpg",
    ],
  },
  {
    id: "4",
    property: "4-Bed Duplex in Kyanja",
    estate: "Kyanja",
    district: "Wakiso",
    landlord: "Dorothy Namubiru",
    date: "19 Mar",
    rent: "UGX 2.5M",
    status: "flagged",
    description: "Brand new duplex in a developing estate in Kyanja. Ground floor features living room, dining area, guest bedroom and washroom; upper floor has three bedrooms (master en‑suite), store room, and balcony. Tarmac access road. NOTE: Photos appear to show a different property from the description.",
    photos: [
      "/property_images/houses/house_5.jpg",
      "/property_images/houses/house_6.jpg",
      "/property_images/houses/house_7.jpg",
      "/property_images/houses/house_8.jpg",
    ],
  },
  {
    id: "5",
    property: "1-Bed in Bugolobi",
    estate: "Bugolobi",
    district: "Kampala",
    landlord: "Hassan Kateregga",
    date: "18 Mar",
    rent: "UGX 2M",
    status: "pending",
    description: "Well‑finished one‑bedroom apartment in a gated compound in Bugolobi flats area. Fitted kitchen, water heater in bathroom, and a large balcony. Walking distance to Game supermarket and Bugolobi Market. Guard on duty 24/7.",
    photos: [
      "/property_images/apartments/apartment_7.jpg",
      "/property_images/apartments/apartment_8.jpg",
      "/property_images/apartments/apartment_9.jpg",
    ],
  },
  {
    id: "6",
    property: "Townhouse in Muyenga",
    estate: "Muyenga",
    district: "Kampala",
    landlord: "Richard Ssentamu",
    date: "17 Mar",
    rent: "UGX 3.5M",
    status: "approved",
    description: "Semi‑detached townhouse perched on Muyenga hill with sweeping views of Lake Victoria. All bedrooms en‑suite, modern finishes, private garden, covered parking for two cars, and 24‑hour security gate. Fibre internet available in compound.",
    photos: [
      "/property_images/houses/house_9.jpg",
      "/property_images/houses/house_10.jpg",
      "/property_images/houses/house_11.jpg",
      "/property_images/houses/house_12.jpg",
      "/property_images/houses/house_1.jpg",
      "/property_images/houses/house_2.jpg",
    ],
  },
  {
    id: "7",
    property: "Single Room in Ntinda",
    estate: "Ntinda",
    district: "Kampala",
    landlord: "Fatuma Nabirye",
    date: "16 Mar",
    rent: "UGX 350K",
    status: "pending",
    description: "Self‑contained single room in a well‑maintained rental block in Ntinda Trading Centre. Shared compound, reliable water, and prepaid electricity meter. Perfect for students and young workers. Near boda stage and main road.",
    photos: [
      "/property_images/rooms/room_1.jpg",
      "/property_images/rooms/room_2.jpg",
    ],
  },
];

function statusStyle(s: ListingStatus) {
  if (s === "approved")
    return { bg: "rgba(31,138,68,0.15)", color: "#1F8A44", label: "Approved" };
  if (s === "flagged")
    return { bg: "rgba(224,140,16,0.15)", color: "#E08C10", label: "Flagged" };
  if (s === "rejected")
    return { bg: "rgba(192,48,58,0.15)", color: "#C0303A", label: "Rejected" };
  return { bg: "rgba(212,168,83,0.15)", color: "#d4a853", label: "Pending Review" };
}

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{
    photos: string[];
    index: number;
  } | null>(null);

  const updateStatus = (id: string, status: ListingStatus) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const pendingCount = listings.filter((l) => l.status === "pending").length;
  const flaggedCount = listings.filter((l) => l.status === "flagged").length;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/apartments/apartment_12.jpg"
          alt="Listing review"
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/admin"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/60"
              style={{ transition: `color 500ms ${T}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#d4a853";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>
            <p className="section-label text-gold">Moderation</p>
            <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tighter text-white sm:text-3xl md:text-5xl">
              Listing <span className="text-gradient-gold">Review</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
              {pendingCount} pending{flaggedCount > 0 ? ` · ${flaggedCount} flagged` : ""} — awaiting your review
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Listings */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="space-y-3">
              {listings.map((row) => {
                const st = statusStyle(row.status);
                const isExpanded = expandedId === row.id;

                return (
                  <div
                    key={row.id}
                    className="overflow-hidden rounded-2xl bg-navy"
                    style={{
                      boxShadow: isExpanded
                        ? "0 8px 32px rgba(11,25,41,0.3)"
                        : "0 2px 12px rgba(11,25,41,0.1)",
                      transition: `box-shadow 500ms ${T}`,
                    }}
                  >
                    {/* Row header */}
                    <div
                      className="flex flex-wrap items-center gap-4 px-5 py-4"
                      style={{
                        transition: `background-color 500ms ${T}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(212,168,83,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {/* Property info */}
                      <div className="min-w-[200px] flex-1">
                        <p className="font-medium text-white">{row.property}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/50">
                          <MapPin className="h-3 w-3 text-gold" />
                          {row.estate}, {row.district} / {row.date}
                        </p>
                      </div>

                      {/* Landlord */}
                      <div className="w-32">
                        <p className="text-[9px] font-black uppercase tracking-wider text-white/30">
                          Landlord
                        </p>
                        <p className="text-sm text-white/70">{row.landlord}</p>
                      </div>

                      {/* Rent */}
                      <div className="w-24">
                        <p className="font-display font-bold text-white">
                          {row.rent}
                        </p>
                      </div>

                      {/* Photos button */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : row.id)
                        }
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold"
                        style={{
                          background: isExpanded
                            ? "rgba(212,168,83,0.2)"
                            : "rgba(212,168,83,0.08)",
                          color: "#d4a853",
                          transition: `all 500ms ${T}`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(212,168,83,0.25)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isExpanded
                            ? "rgba(212,168,83,0.2)"
                            : "rgba(212,168,83,0.08)";
                        }}
                      >
                        <ImageIcon className="h-3.5 w-3.5" />
                        {row.photos.length} Photos
                        <ChevronDown
                          className="h-3 w-3"
                          style={{
                            transform: isExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: `transform 400ms ${T}`,
                          }}
                        />
                      </button>

                      {/* Status */}
                      <span
                        className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: st.bg, color: st.color }}
                      >
                        {st.label}
                      </span>

                      {/* Actions — context-aware */}
                      <div className="flex gap-1.5">
                        {/* Approve — available on pending or flagged */}
                        {(row.status === "pending" || row.status === "flagged") && (
                          <button
                            onClick={() => updateStatus(row.id, "approved")}
                            className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold"
                            style={{
                              background: "rgba(31,138,68,0.15)",
                              color: "#1F8A44",
                              transition: `all 500ms ${T}`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(31,138,68,0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(31,138,68,0.15)";
                            }}
                          >
                            <Check className="inline h-3.5 w-3.5" /> Approve
                          </button>
                        )}

                        {/* Reject — available on pending or flagged */}
                        {(row.status === "pending" || row.status === "flagged") && (
                          <button
                            onClick={() => updateStatus(row.id, "rejected")}
                            className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold"
                            style={{
                              background: "rgba(192,48,58,0.12)",
                              color: "#C0303A",
                              transition: `all 500ms ${T}`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(192,48,58,0.25)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(192,48,58,0.12)";
                            }}
                          >
                            <X className="inline h-3.5 w-3.5" /> Reject
                          </button>
                        )}

                        {/* Flag — available on pending only */}
                        {row.status === "pending" && (
                          <button
                            onClick={() => updateStatus(row.id, "flagged")}
                            className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold"
                            style={{
                              background: "rgba(224,140,16,0.12)",
                              color: "#E08C10",
                              transition: `all 500ms ${T}`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(224,140,16,0.25)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(224,140,16,0.12)";
                            }}
                          >
                            <AlertTriangle className="inline h-3.5 w-3.5" /> Flag
                          </button>
                        )}

                        {/* Undo — available on approved or rejected */}
                        {(row.status === "approved" || row.status === "rejected") && (
                          <button
                            onClick={() => updateStatus(row.id, "pending")}
                            className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              color: "rgba(255,255,255,0.5)",
                              transition: `all 500ms ${T}`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                            }}
                          >
                            <Undo2 className="inline h-3.5 w-3.5" /> Undo
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expanded details: description + photos */}
                    {isExpanded && (
                      <div
                        className="px-5 pb-5"
                        style={{
                          borderTop: "1px solid rgba(255,255,255,0.04)",
                          animation: `fadeInDown 400ms ${T} both`,
                        }}
                      >
                        {/* Description */}
                        <div className="pt-4">
                          <div className="mb-2 flex items-center gap-2">
                            <FileText size={14} className="text-teal" />
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-teal/70">
                              Landlord Description
                            </p>
                          </div>
                          <div className="rounded-xl bg-white/[0.03] px-4 py-3">
                            <p className="text-sm leading-relaxed text-white/60">
                              {row.description}
                            </p>
                          </div>
                        </div>

                        {/* Photos */}
                        <div className="mt-5 mb-3 flex items-center gap-2">
                          <ImageIcon size={14} className="text-gold" />
                          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gold/70">
                            Listing Photos ({row.photos.length})
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                          {row.photos.map((photo, idx) => (
                            <button
                              key={photo}
                              type="button"
                              onClick={() =>
                                setLightbox({
                                  photos: row.photos,
                                  index: idx,
                                })
                              }
                              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
                              style={{ transition: `transform 500ms ${T}` }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.03)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                            >
                              <Image
                                src={photo}
                                alt={`${row.property} photo ${idx + 1}`}
                                fill
                                sizes="200px"
                                className="object-cover"
                              />
                              {/* Hover overlay */}
                              <div className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-all duration-300 group-hover:bg-navy/40">
                                <Eye
                                  size={20}
                                  className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />
                              </div>
                              {/* Photo number */}
                              <span className="absolute bottom-1.5 right-1.5 rounded bg-navy/70 px-1.5 py-0.5 text-[9px] font-bold text-white/70 backdrop-blur-sm">
                                {idx + 1}/{row.photos.length}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 backdrop-blur-xl"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative mx-4 max-h-[85vh] max-w-4xl overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.photos[lightbox.index]}
              alt={`Photo ${lightbox.index + 1}`}
              width={1200}
              height={800}
              className="h-auto max-h-[80vh] w-full object-contain"
            />

            {/* Controls */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-navy/80 to-transparent px-6 pb-5 pt-12">
              {/* Prev */}
              <button
                type="button"
                onClick={() =>
                  setLightbox((prev) =>
                    prev
                      ? {
                          ...prev,
                          index:
                            (prev.index - 1 + prev.photos.length) %
                            prev.photos.length,
                        }
                      : null
                  )
                }
                className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm"
                style={{ transition: `background 300ms ${T}` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
              >
                Prev
              </button>

              {/* Counter */}
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                {lightbox.index + 1} / {lightbox.photos.length}
              </span>

              {/* Next */}
              <button
                type="button"
                onClick={() =>
                  setLightbox((prev) =>
                    prev
                      ? {
                          ...prev,
                          index: (prev.index + 1) % prev.photos.length,
                        }
                      : null
                  )
                }
                className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm"
                style={{ transition: `background 300ms ${T}` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
              >
                Next
              </button>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-navy/60 text-white backdrop-blur-sm"
              style={{ transition: `background 300ms ${T}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(11,25,41,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(11,25,41,0.6)";
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
