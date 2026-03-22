"use client";

import { Suspense, useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "@/components/Img";
import {
  SearchX,
  ChevronDown,
  ArrowUpDown,
  SlidersHorizontal,
  LayoutGrid,
  List,
  MapPin,
  ArrowRight,
  X,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import FilterBar, { type FilterState } from "@/components/FilterBar";
import ScrollReveal from "@/components/ScrollReveal";
import { properties } from "@/lib/mock-data";
import { CATEGORIES } from "@/lib/constants";

/* ─────────────────────────── Sort types ──────────────────────────── */

type SortOption = "newest" | "price-asc" | "price-desc";

/** Parse a distance string like "500m" or "1.2km" into metres. */
function parseDistanceMetres(d: string): number {
  const num = parseFloat(d);
  if (Number.isNaN(num)) return Infinity;
  return d.toLowerCase().includes("km") ? num * 1000 : num;
}

/** Max distance (metres) to count as "near". */
const NEAR_THRESHOLD = 2000;

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
};

/* ─────────────────────────── Wrapper with Suspense ───────────────── */

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-navy">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gold/20 border-t-gold" />
            <p className="text-sm font-medium text-white/70">
              Loading properties...
            </p>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}

/* ─────────────────────────── Page Content ────────────────────────── */

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";
  const initialRegion = searchParams.get("region") ?? "";
  const initialDistrict = searchParams.get("district") ?? "";
  const initialMinPrice = Number(searchParams.get("minPrice") || "0");
  const initialMaxPrice = Number(searchParams.get("maxPrice") || "0");
  const initialBedrooms = searchParams.get("bedrooms") ?? "";

  const [filters, setFilters] = useState<FilterState | null>(
    (initialRegion || initialDistrict || initialMinPrice || initialMaxPrice || initialBedrooms)
      ? {
          category: initialCategory,
          minPrice: initialMinPrice,
          maxPrice: initialMaxPrice,
          region: initialRegion,
          district: initialDistrict,
          county: "",
          subcounty: "",
          parish: "",
          village: "",
          estate: "",
          bedrooms: initialBedrooms,
          bathrooms: "",
          furnished: "",
          fencing: "",
          parking: false,
          petFriendly: false,
          verified: false,
          lifestyleTag: "",
          featured: false,
          nearSchool: false,
          nearHospital: false,
          nearShopping: false,
        }
      : null
  );
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleFilterChange = useCallback((f: FilterState) => {
    setFilters(f);
  }, []);

  const activeCategory = filters !== null ? filters.category : initialCategory;

  /* ── Filter + sort ── */
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (activeCategory) {
      const cats = activeCategory.split(",").filter(Boolean);
      if (cats.length > 0) {
        result = result.filter((p) => cats.includes(p.category));
      }
    }

    if (filters) {
      if (filters.minPrice > 0)
        result = result.filter((p) => p.price >= filters.minPrice);
      if (filters.maxPrice > 0)
        result = result.filter((p) => p.price <= filters.maxPrice);

      // Location hierarchy filtering
      if (filters.region)
        result = result.filter((p) => p.loc?.region === filters.region);
      if (filters.district)
        result = result.filter((p) => p.loc?.district === filters.district);
      if (filters.county)
        result = result.filter((p) => p.loc?.county === filters.county);
      if (filters.subcounty)
        result = result.filter((p) => p.loc?.subcounty === filters.subcounty);
      if (filters.parish)
        result = result.filter((p) => p.loc?.parish === filters.parish);
      if (filters.village)
        result = result.filter((p) => p.loc?.village === filters.village);

      // Legacy estate text search (fallback)
      if (filters.estate) {
        const q = filters.estate.toLowerCase();
        result = result.filter((p) => p.estate.toLowerCase().includes(q));
      }
      if (filters.bedrooms) {
        if (filters.bedrooms === "5+")
          result = result.filter((p) => p.bedrooms >= 5);
        else result = result.filter((p) => p.bedrooms === Number(filters.bedrooms));
      }
      if (filters.bathrooms) {
        if (filters.bathrooms === "3+")
          result = result.filter((p) => p.bathrooms >= 3);
        else result = result.filter((p) => p.bathrooms === Number(filters.bathrooms));
      }
      if (filters.furnished) {
        const fVal = filters.furnished.toLowerCase();
        if (fVal === "fully") result = result.filter((p) => p.furnished);
        else if (fVal === "unfurnished") result = result.filter((p) => !p.furnished);
      }
      if (filters.parking) result = result.filter((p) => p.parking);
      if (filters.petFriendly) result = result.filter((p) => p.petFriendly);
      if (filters.verified) result = result.filter((p) => p.isVerified);
      if (filters.fencing) result = result.filter((p) => p.fencing?.includes(filters.fencing as typeof p.fencing[number]));
      if (filters.lifestyleTag) result = result.filter((p) => p.lifestyleTags?.includes(filters.lifestyleTag as typeof p.lifestyleTags[number]));
      if (filters.featured) result = result.filter((p) => p.isFeatured);

      // Proximity / nearby filters
      if (filters.nearSchool)
        result = result.filter((p) =>
          p.nearbyPlaces?.some((np) => np.type === "school" && parseDistanceMetres(np.distance) <= NEAR_THRESHOLD)
        );
      if (filters.nearHospital)
        result = result.filter((p) =>
          p.nearbyPlaces?.some((np) => np.type === "hospital" && parseDistanceMetres(np.distance) <= NEAR_THRESHOLD)
        );
      if (filters.nearShopping)
        result = result.filter((p) =>
          p.nearbyPlaces?.some((np) =>
            (np.type === "supermarket" || np.type === "mall") && parseDistanceMetres(np.distance) <= NEAR_THRESHOLD
          )
        );
    }

    switch (sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [activeCategory, filters, sortBy]);

  const furnishedLabel = (val: boolean): string | undefined =>
    val ? "Furnished" : undefined;
  const parkingCount = (val: boolean): number | undefined =>
    val ? 1 : undefined;

  /* ── Active category label ── */
  const activeCatLabel = activeCategory
    ? CATEGORIES.find((c) => c.id === activeCategory)?.label
    : null;

  /* ─────────────────────────── Render ────────────────────────────── */

  return (
    <main className="min-h-screen bg-smoke">
      {/* ═══ Bold Hero Header — R/NESS style ═══ */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/property_images/apartments/apartment_7.jpg"
          alt="Browse properties in Kampala"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-navy/80" />
        {/* Background layers */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,168,83,0.06),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-teal/[0.05] blur-3xl"
        />

        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/60">
            <Link
              href="/"
              className="transition-colors duration-500 hover:text-gold"
            >
              Home
            </Link>
            <span className="text-white/15">/</span>
            <span className="font-medium text-white/50">Browse</span>
            {activeCatLabel && (
              <>
                <span className="text-white/15">/</span>
                <span className="font-medium text-gold">{activeCatLabel}</span>
              </>
            )}
          </nav>

          {/* Heading row */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-6xl">
                {activeCatLabel || "Browse"}{" "}
                <span className="text-gradient-gold">Properties</span>
              </h1>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-white/70">
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1 ? "property" : "properties"}{" "}
                available across Kampala&apos;s top estates
              </p>
            </div>

            {/* Quick category pills — horizontal on desktop */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/search?category=${cat.id}`}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-500 ${
                    activeCategory === cat.id
                      ? "bg-gold text-white shadow-gold"
                      : "bg-white/[0.06] text-white/50 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.label.split(" ")[0]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Toolbar — Sort + View toggle ═══ */}
      <div
        className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl"
        style={{
          boxShadow: "0 1px 0 rgba(11, 25, 41, 0.04)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Left: result count */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <MapPin className="h-3.5 w-3.5 text-teal" />
              <span className="font-display text-lg font-bold text-navy">
                {filteredProperties.length}
              </span>
              results
            </span>

            {activeCategory && (
              <button
                onClick={() => {
                  // Clear category by navigating to /search
                  router.push("/search");
                }}
                className="flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold transition-all duration-400 hover:bg-gold/20"
              >
                {activeCatLabel}
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Right: controls */}
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div
              className="hidden items-center rounded-xl p-0.5 sm:flex"
              style={{ background: "rgba(11, 25, 41, 0.04)" }}
            >
              {(["grid", "list"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className="relative rounded-lg p-2"
                  style={{
                    transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {viewMode === mode && (
                    <span
                      className="absolute inset-0 rounded-lg bg-white shadow-soft"
                      style={{
                        animation:
                          "scaleIn 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  )}
                  {mode === "grid" ? (
                    <LayoutGrid
                      size={16}
                      className={`relative ${
                        viewMode === mode ? "text-navy" : "text-text-muted"
                      }`}
                    />
                  ) : (
                    <List
                      size={16}
                      className={`relative ${
                        viewMode === mode ? "text-navy" : "text-text-muted"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-text-primary shadow-soft"
                style={{
                  transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 24px rgba(11, 25, 41, 0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 20px rgba(11, 25, 41, 0.04)";
                }}
              >
                <ArrowUpDown className="h-4 w-4 text-text-muted" />
                {SORT_LABELS[sortBy]}
                <ChevronDown
                  className="h-3.5 w-3.5 text-text-muted"
                  style={{
                    transform: sortOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition:
                      "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </button>

              {sortOpen && (
                <div
                  className="absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-2xl bg-white py-1.5"
                  style={{
                    boxShadow:
                      "0 20px 60px rgba(11, 25, 41, 0.12), 0 0 1px rgba(11, 25, 41, 0.08)",
                    animation:
                      "fadeInDown 300ms cubic-bezier(0.16, 1, 0.3, 1) both",
                  }}
                >
                  {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSortBy(key);
                        setSortOpen(false);
                      }}
                      className="flex w-full items-center px-4 py-2.5 text-left text-sm"
                      style={{
                        background:
                          sortBy === key
                            ? "rgba(212, 168, 83, 0.08)"
                            : "transparent",
                        color: sortBy === key ? "#B8903D" : "#0B1929",
                        fontWeight: sortBy === key ? 700 : 400,
                        transition:
                          "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseEnter={(e) => {
                        if (sortBy !== key)
                          e.currentTarget.style.background = "#F7F8FA";
                      }}
                      onMouseLeave={(e) => {
                        if (sortBy !== key)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {SORT_LABELS[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Content area ═══ */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-6 lg:gap-8">
          {/* ═══ LEFT SIDEBAR — Filter (sticky) ═══ */}
          <aside className="hidden w-72 shrink-0 lg:block xl:w-80">
            <div className="sticky top-[90px]">
              <FilterBar onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Mobile filter (shown inline on small screens) */}
          <div className="mb-4 lg:hidden">
            <FilterBar onFilterChange={handleFilterChange} />
          </div>

          {/* ═══ RIGHT — Property Grid ═══ */}
          <div className="min-w-0 flex-1">
        {filteredProperties.length > 0 ? (
          <ScrollReveal variant="scale">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-4"
              }
            >
              {filteredProperties.map((property, i) =>
                viewMode === "grid" ? (
                  <div
                    key={property.id}
                    style={{
                      animation: `fadeInUp 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms both`,
                    }}
                  >
                    <PropertyCard
                      id={property.id}
                      title={property.title}
                      category={property.category}
                      district={property.district}
                      estate={property.estate}
                      price={property.price}
                      bedrooms={property.bedrooms}
                      bathrooms={property.bathrooms}
                      photo={property.photos[0]}
                      isVerified={property.isVerified}
                      isFeatured={property.isFeatured}
                      negotiable={property.negotiable}
                      upfrontMonths={property.upfrontMonths}
                      securityDeposit={property.securityDeposit}
                      fencing={property.fencing}
                      furnished={furnishedLabel(property.furnished)}
                      parking={parkingCount(property.parking)}
                      lifestyleTags={property.lifestyleTags}
                      isGuest
                    />
                  </div>
                ) : (
                  /* ── List view card ── */
                  <Link
                    key={property.id}
                    href={`/property/${property.id}`}
                    className="group flex gap-5 rounded-2xl bg-white p-4 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
                    style={{
                      animation: `fadeInUp 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms both`,
                    }}
                  >
                    {/* Photo */}
                    <div className="img-zoom relative h-28 w-40 flex-shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-48">
                      <Image
                        src={property.photos[0]}
                        alt={property.title}
                        fill
                        sizes="192px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                      {property.isVerified && (
                        <span className="absolute right-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[9px] font-black uppercase text-white">
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-teal">
                          {property.category}
                        </span>
                        <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-navy transition-colors duration-500 group-hover:text-teal">
                          {property.title}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-text-muted">
                          <MapPin className="h-3 w-3" />
                          {property.estate}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="font-display text-xl font-bold tracking-tight text-navy">
                          UGX{" "}
                          {property.price.toLocaleString("en-UG")}
                          <span className="text-xs font-normal text-text-muted">
                            /mo
                          </span>
                        </p>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-gold opacity-0 transition-all duration-500 group-hover:opacity-100">
                          View details
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </ScrollReveal>
        ) : (
          /* ═══ Empty State ═══ */
          <ScrollReveal variant="scale">
            <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-24 text-center">
              {/* Decorative */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.06),transparent_60%)]"
              />

              <div className="relative">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/[0.05]">
                  <SearchX className="h-10 w-10 text-white/60" />
                </div>
                <h2 className="mt-8 font-display text-3xl font-bold uppercase tracking-tighter text-white">
                  No properties found
                </h2>
                <p className="mx-auto mt-4 max-w-md leading-relaxed text-white/70">
                  We couldn&apos;t find any properties matching your current
                  filters. Try broadening your search or explore a different
                  category.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={() => { router.push("/search"); }}
                    className="btn-gold"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Reset Filters
                  </button>
                  <Link href="/" className="btn-outline-white">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
          </div>
        </div>
      </div>
    </main>
  );
}
