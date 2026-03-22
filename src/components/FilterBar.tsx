"use client";

import { useState, useCallback } from "react";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Check,
  RotateCcw,
} from "lucide-react";
import { CATEGORIES, DISTRICTS, DISTRICT_NAMES } from "@/lib/constants";

/* ────────────────────────── Types ────────────────────────── */

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  district: string;
  estate: string;
  bedrooms: string;
  bathrooms: string;
  furnished: string;
  parking: boolean;
  petFriendly: boolean;
  verified: boolean;
}

export interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

/* ────────────────────────── Defaults ─────────────────────── */

const DEFAULT_FILTERS: FilterState = {
  category: "",
  minPrice: 0,
  maxPrice: 0,
  district: "",
  estate: "",
  bedrooms: "",
  bathrooms: "",
  furnished: "",
  parking: false,
  petFriendly: false,
  verified: false,
};

const CATEGORY_OPTIONS = [
  { id: "", label: "All Categories" },
  ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

const BEDROOM_OPTIONS = ["Any", "1", "2", "3", "4", "5+"];
const BATHROOM_OPTIONS = ["Any", "1", "2", "3+"];
const FURNISHED_OPTIONS = ["Any", "Unfurnished", "Partially", "Fully"];

/* ────────────────────────── Shared styles ────────────────── */

const labelClasses =
  "block text-[10px] font-black uppercase tracking-[0.15em] text-gold/70 mb-2";


const selectClasses =
  "w-full appearance-none rounded-xl bg-white/[0.12] px-3.5 py-2.5 pr-9 text-sm font-medium text-white outline-none transition-all duration-500 focus:bg-white/[0.18] focus:ring-2 focus:ring-gold/30 [&>option]:bg-navy [&>option]:text-white [&>option]:py-2";

/* ────────────────────────── Toggle ───────────────────────── */

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all duration-500"
      style={{
        background: checked
          ? "rgba(212, 168, 83, 0.12)"
          : "rgba(255,255,255,0.03)",
      }}
      onMouseEnter={(e) => {
        if (!checked) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        if (!checked)
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      }}
    >
      {/* Switch track */}
      <span
        className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full"
        style={{
          background: checked
            ? "linear-gradient(135deg, #d4a853, #B8903D)"
            : "rgba(255,255,255,0.12)",
          boxShadow: checked ? "0 2px 8px rgba(212, 168, 83, 0.25)" : "none",
          transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span
          className="inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm"
          style={{
            transform: checked ? "translateX(17px)" : "translateX(3px)",
            transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </span>
      <span
        className="text-xs font-semibold"
        style={{
          color: checked ? "#d4a853" : "rgba(255,255,255,0.45)",
          transition: "color 400ms",
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* ────────────────────────── Component ────────────────────── */

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleApply = useCallback(() => {
    onFilterChange?.(filters);
    setMobileOpen(false);
  }, [filters, onFilterChange]);

  const handleClear = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    onFilterChange?.(DEFAULT_FILTERS);
  }, [onFilterChange]);

  const hasActiveFilters =
    filters.category !== "" ||
    filters.minPrice > 0 ||
    filters.maxPrice > 0 ||
    filters.district !== "" ||
    filters.estate !== "" ||
    filters.bedrooms !== "" ||
    filters.bathrooms !== "" ||
    filters.furnished !== "" ||
    filters.parking ||
    filters.petFriendly ||
    filters.verified;

  const selectedCategories = filters.category
    ? filters.category.split(",").filter(Boolean)
    : [];

  const toggleCategory = (id: string) => {
    if (id === "") {
      updateFilter("category", "");
      return;
    }
    const current = selectedCategories.includes(id)
      ? selectedCategories.filter((c) => c !== id)
      : [...selectedCategories, id];
    updateFilter("category", current.join(","));
  };

  const categoryLabel =
    selectedCategories.length === 0
      ? "All Categories"
      : selectedCategories.length === 1
        ? CATEGORY_OPTIONS.find((c) => c.id === selectedCategories[0])?.label ??
          "1 selected"
        : `${selectedCategories.length} selected`;

  /* ────────────────── Filter panel ────────────────── */

  const filterPanel = (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* 1 ─ Category */}
      <div className="relative sm:col-span-2 xl:col-span-1">
        <label className={labelClasses}>What are you looking for?</label>
        <button
          type="button"
          onClick={() => setCategoryOpen((prev) => !prev)}
          className={`${selectClasses} flex items-center justify-between text-left`}
        >
          <span className="truncate">{categoryLabel}</span>
          <ChevronDown
            size={14}
            className="shrink-0 text-white/50"
            style={{
              transform: categoryOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </button>

        {categoryOpen && (
          <div
            className="absolute left-0 top-full z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl bg-navy py-2"
            style={{
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.3), 0 0 1px rgba(255,255,255,0.1)",
              animation:
                "fadeInDown 300ms cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            {CATEGORY_OPTIONS.map((opt) => {
              const isSelected =
                opt.id === ""
                  ? selectedCategories.length === 0
                  : selectedCategories.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleCategory(opt.id)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-300"
                  style={{
                    color: isSelected ? "#d4a853" : "rgba(255,255,255,0.6)",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded"
                    style={{
                      background: isSelected
                        ? "linear-gradient(135deg, #d4a853, #B8903D)"
                        : "rgba(255,255,255,0.08)",
                      transition: "all 300ms",
                    }}
                  >
                    {isSelected && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </span>
                  <span className={isSelected ? "font-bold" : ""}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2 ─ Budget */}
      <div className="sm:col-span-2 xl:col-span-1">
        <label className={labelClasses}>Your Budget per Month</label>
        <div className="relative">
          <select
            value={
              filters.minPrice && filters.maxPrice
                ? `${filters.minPrice}-${filters.maxPrice}`
                : filters.minPrice
                  ? `${filters.minPrice}-0`
                  : ""
            }
            onChange={(e) => {
              const val = e.target.value;
              if (!val) {
                updateFilter("minPrice", 0);
                updateFilter("maxPrice", 0);
              } else {
                const [min, max] = val.split("-").map(Number);
                updateFilter("minPrice", min);
                updateFilter("maxPrice", max);
              }
            }}
            className={selectClasses}
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
          <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
        </div>
      </div>

      {/* 3 ─ District */}
      <div>
        <label className={labelClasses}>Which District?</label>
        <div className="relative">
          <select
            value={filters.district}
            onChange={(e) => {
              updateFilter("district", e.target.value);
              updateFilter("estate", "");
            }}
            className={selectClasses}
          >
            <option value="">All Districts</option>
            {DISTRICT_NAMES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
        </div>
      </div>

      {/* 4 ─ Estate / Area */}
      <div>
        <label className={labelClasses}>Estate / Area</label>
        <div className="relative">
          <select
            value={filters.estate}
            onChange={(e) => updateFilter("estate", e.target.value)}
            className={selectClasses}
          >
            <option value="">All Areas</option>
            {(filters.district
              ? (DISTRICTS[filters.district] ?? [])
              : Object.values(DISTRICTS).flat()
            ).map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
        </div>
      </div>

      {/* 5 ─ Bedrooms */}
      <div>
        <label className={labelClasses}>How Many Beds?</label>
        <div className="relative">
          <select
            value={filters.bedrooms}
            onChange={(e) => updateFilter("bedrooms", e.target.value)}
            className={selectClasses}
          >
            {BEDROOM_OPTIONS.map((opt) => (
              <option key={opt} value={opt === "Any" ? "" : opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
          />
        </div>
      </div>

      {/* 6 ─ Bathrooms */}
      <div>
        <label className={labelClasses}>Bathrooms</label>
        <div className="relative">
          <select
            value={filters.bathrooms}
            onChange={(e) => updateFilter("bathrooms", e.target.value)}
            className={selectClasses}
          >
            {BATHROOM_OPTIONS.map((opt) => (
              <option key={opt} value={opt === "Any" ? "" : opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
          />
        </div>
      </div>

      {/* 7 ─ Furnished */}
      <div>
        <label className={labelClasses}>Furnishing</label>
        <div className="relative">
          <select
            value={filters.furnished}
            onChange={(e) => updateFilter("furnished", e.target.value)}
            className={selectClasses}
          >
            {FURNISHED_OPTIONS.map((opt) => (
              <option key={opt} value={opt === "Any" ? "" : opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
          />
        </div>
      </div>

      {/* 7, 8, 9 ─ Toggles */}
      <div className="flex flex-wrap items-end gap-2 sm:col-span-2 xl:col-span-2">
        <Toggle
          label="Parking"
          checked={filters.parking}
          onChange={() => updateFilter("parking", !filters.parking)}
        />
        <Toggle
          label="Pet-Friendly"
          checked={filters.petFriendly}
          onChange={() => updateFilter("petFriendly", !filters.petFriendly)}
        />
        <Toggle
          label="Verified"
          checked={filters.verified}
          onChange={() => updateFilter("verified", !filters.verified)}
        />
      </div>
    </div>
  );

  /* ────────────────── Action bar ─────────────────── */

  const actionBar = (
    <div
      className="mt-5 flex items-center justify-between pt-5"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {hasActiveFilters ? (
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-1.5 text-xs font-medium text-white/70 transition-colors duration-400 hover:text-white/70"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear all
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={handleApply}
        className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white"
        style={{
          background: "linear-gradient(135deg, #d4a853, #B8903D)",
          boxShadow: "0 4px 16px rgba(212, 168, 83, 0.25)",
          transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 8px 24px rgba(212, 168, 83, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 16px rgba(212, 168, 83, 0.25)";
        }}
      >
        <Check className="h-3.5 w-3.5" />
        Apply Filters
      </button>
    </div>
  );

  /* ────────────────────────── Render ─────────────────────── */

  return (
    <>
      {/* ──── Desktop: dark inline bar ──── */}
      <div className="hidden lg:block">
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(11, 25, 41, 0.95)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 8px 40px rgba(11, 25, 41, 0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {filterPanel}
          {actionBar}
        </div>
      </div>

      {/* ──── Mobile: collapsible ──── */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-bold"
          style={{
            background: mobileOpen
              ? "linear-gradient(135deg, #d4a853, #B8903D)"
              : "rgba(11, 25, 41, 0.95)",
            color: mobileOpen ? "#fff" : "rgba(255,255,255,0.7)",
            boxShadow: mobileOpen
              ? "0 8px 24px rgba(212, 168, 83, 0.25)"
              : "0 4px 20px rgba(11, 25, 41, 0.08)",
            transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {mobileOpen ? (
            <>
              <X size={16} />
              Close Filters
            </>
          ) : (
            <>
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && (
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black text-navy"
                  style={{
                    background: "linear-gradient(135deg, #d4a853, #f0d89f)",
                  }}
                >
                  !
                </span>
              )}
            </>
          )}
        </button>

        {mobileOpen && (
          <div
            className="mt-3 rounded-2xl p-5"
            style={{
              background: "rgba(11, 25, 41, 0.95)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 40px rgba(11, 25, 41, 0.15)",
              animation:
                "fadeInDown 400ms cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            {filterPanel}
            {actionBar}
          </div>
        )}
      </div>
    </>
  );
}
