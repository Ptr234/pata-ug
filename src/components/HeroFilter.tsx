"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import LocationPicker from "@/components/LocationPicker";
import type { LocationSelection } from "@/lib/locations";

const BEDROOM_OPTIONS = ["Any", "1", "2", "3", "4", "5+"];

export default function HeroFilter() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [loc, setLoc] = useState<Partial<LocationSelection>>({});
  const [budget, setBudget] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleApply = () => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (loc.region) params.set("region", loc.region);
    if (loc.district) params.set("district", loc.district);
    if (budget) {
      const [min, max] = budget.split("-");
      if (min) params.set("minPrice", min);
      if (max && max !== "0") params.set("maxPrice", max);
    }
    if (bedrooms) params.set("bedrooms", bedrooms);
    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const selectBase =
    "w-full appearance-none rounded-xl bg-white/[0.08] px-3 py-2.5 text-sm font-medium text-white outline-none transition-all duration-300 focus:bg-white/[0.14] focus:ring-2 focus:ring-gold/30 [&>option]:bg-navy [&>option]:text-white";

  const labelBase =
    "block text-[9px] font-black uppercase tracking-[0.15em] text-white/40 mb-1.5";

  return (
    <div
      className="rounded-3xl p-5 sm:p-6"
      style={{
        background: "rgba(11, 25, 41, 0.65)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
      }}
    >
      <p className="mb-4 text-[10px] font-black uppercase tracking-[0.18em] text-gold/70">
        Find Your Place
      </p>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-1">
        {/* Property Type */}
        <div>
          <label className={labelBase}>What are you looking for?</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectBase}
            >
              <option value="">All Types</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
          </div>
        </div>

        {/* Location — cascading from real Uganda data */}
        <div className="sm:col-span-2 lg:col-span-1">
          <LocationPicker
            compact
            value={loc}
            onChange={(l) => setLoc(l)}
          />
        </div>

        {/* Budget */}
        <div>
          <label className={labelBase}>Your Budget per Month</label>
          <div className="relative">
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={selectBase}
            >
              <option value="">Any Price</option>
              <option value="0-300000">Under 300K</option>
              <option value="300000-500000">300K – 500K</option>
              <option value="500000-800000">500K – 800K</option>
              <option value="800000-1500000">800K – 1.5M</option>
              <option value="1500000-2500000">1.5M – 2.5M</option>
              <option value="2500000-5000000">2.5M – 5M</option>
              <option value="5000000-0">5M+</option>
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className={labelBase}>How Many Beds?</label>
          <div className="relative">
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className={selectBase}
            >
              {BEDROOM_OPTIONS.map((opt) => (
                <option key={opt} value={opt === "Any" ? "" : opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
          </div>
        </div>
      </div>

      {/* Apply */}
      <button
        type="button"
        onClick={handleApply}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-black uppercase tracking-wider text-white"
        style={{
          background: "linear-gradient(135deg, #d4a853, #B8903D)",
          boxShadow: "0 4px 16px rgba(212, 168, 83, 0.25)",
          transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(212, 168, 83, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(212, 168, 83, 0.25)";
        }}
      >
        <Search size={14} />
        Browse Properties
      </button>
    </div>
  );
}
