"use client";

import { useState, useEffect } from "react";
import { ChevronDown, MapPin, Loader2 } from "lucide-react";
import {
  loadHierarchy,
  getRegions,
  getDistricts,
  getCounties,
  getSubCounties,
  getParishes,
  getVillages,
  type Hierarchy,
  type LocationSelection,
  emptyLocation,
} from "@/lib/locations";

interface LocationPickerProps {
  value: Partial<LocationSelection>;
  onChange: (loc: LocationSelection) => void;
  /** "dark" for navy bg forms, "light" for white bg forms */
  theme?: "dark" | "light";
  /** Show only region+district (compact mode for filters) */
  compact?: boolean;
}

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function LocationPicker({
  value,
  onChange,
  theme = "dark",
  compact = false,
}: LocationPickerProps) {
  const [h, setH] = useState<Hierarchy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadHierarchy()
      .then((data) => {
        setH(data);
        setLoading(false);
        if (data.regions.length === 0) setError(true);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const loc = { ...emptyLocation, ...value };

  const update = (field: keyof LocationSelection, val: string) => {
    const next = { ...loc, [field]: val };
    // Clear downstream fields
    const order: (keyof LocationSelection)[] = ["region", "district", "county", "subcounty", "parish", "village"];
    const idx = order.indexOf(field);
    for (let i = idx + 1; i < order.length; i++) next[order[i]] = "";
    onChange(next);
  };

  const isDark = theme === "dark";
  const selectCls = isDark
    ? "w-full appearance-none rounded-xl bg-white/[0.08] px-3 py-2.5 pr-9 text-sm font-medium text-white outline-none transition-all duration-300 focus:bg-white/[0.14] focus:ring-2 focus:ring-gold/30 [&>option]:bg-navy [&>option]:text-white"
    : "w-full appearance-none rounded-xl bg-smoke px-3 py-2.5 pr-9 text-sm font-medium text-navy outline-none transition-all duration-300 focus:ring-2 focus:ring-teal/30";
  const labelCls = isDark
    ? "mb-1.5 block text-[9px] font-black uppercase tracking-[0.15em] text-white/40"
    : "mb-1.5 block text-[9px] font-black uppercase tracking-[0.15em] text-text-muted";
  const chevronCls = isDark
    ? "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
    : "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted";

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-4 text-xs" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#8896A4" }}>
        <Loader2 size={14} className="animate-spin" /> Loading Uganda locations...
      </div>
    );
  }

  if (error || !h) {
    return (
      <div className="flex items-center gap-2 py-4 text-xs" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#8896A4" }}>
        <MapPin size={14} /> Could not load locations. Check your connection.
      </div>
    );
  }

  const regions = getRegions(h);
  const districts = loc.region ? getDistricts(h, loc.region) : [];
  const counties = loc.district ? getCounties(h, loc.region, loc.district) : [];
  const subcounties = loc.county ? getSubCounties(h, loc.region, loc.district, loc.county) : [];
  const parishes = loc.subcounty ? getParishes(h, loc.region, loc.district, loc.county, loc.subcounty) : [];
  const villages = loc.parish ? getVillages(h, loc.region, loc.district, loc.county, loc.subcounty, loc.parish) : [];

  const fields: { key: keyof LocationSelection; label: string; options: string[] }[] = compact
    ? [
        { key: "region", label: "Region", options: regions },
        { key: "district", label: "District", options: districts },
      ]
    : [
        { key: "region", label: "Region", options: regions },
        { key: "district", label: "District", options: districts },
        { key: "county", label: "County", options: counties },
        { key: "subcounty", label: "Sub-county", options: subcounties },
        { key: "parish", label: "Parish", options: parishes },
        { key: "village", label: "Village", options: villages },
      ];

  return (
    <div className={compact ? "grid grid-cols-2 gap-3" : "grid grid-cols-2 gap-3 sm:grid-cols-3"}>
      {fields.map((f) => (
        <div key={f.key}>
          <label className={labelCls}>{f.label}</label>
          <div className="relative">
            <select
              value={loc[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
              disabled={f.options.length === 0 && f.key !== "region"}
              className={`${selectCls} disabled:opacity-30`}
            >
              <option value="">
                {f.options.length === 0 && f.key !== "region"
                  ? `Select ${fields[fields.indexOf(f) - 1]?.label || "above"} first`
                  : `All ${f.label}s`}
              </option>
              {f.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <ChevronDown size={12} className={chevronCls} />
          </div>
        </div>
      ))}
    </div>
  );
}
