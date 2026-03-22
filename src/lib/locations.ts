/**
 * Uganda administrative hierarchy loader and query utilities.
 * Data loaded dynamically from /data/uga_admin_hierarchy.json (144K lines).
 * Hierarchy: Region → District → County → Sub-county → Parish → Village
 */

export interface Village { name: string }
export interface Parish { name: string; villages: string[] }
export interface SubCounty { name: string; pcode: string; latitude: number; longitude: number; parishes: Parish[] }
export interface County { name: string; pcode: string; subcounties: SubCounty[] }
export interface District { name: string; pcode: string; counties: County[] }
export interface Region { name: string; pcode: string; districts: District[] }
export interface Hierarchy { country: string; regions: Region[] }

export interface LocationSelection {
  region: string;
  district: string;
  county: string;
  subcounty: string;
  parish: string;
  village: string;
}

const EMPTY: LocationSelection = { region: "", district: "", county: "", subcounty: "", parish: "", village: "" };

let _cache: Hierarchy | null = null;

/** Fetch and cache the hierarchy (runs once). */
export async function loadHierarchy(): Promise<Hierarchy> {
  if (_cache) return _cache;
  try {
    const res = await fetch("/data/uga_admin_hierarchy.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    _cache = await res.json();
    return _cache!;
  } catch (err) {
    console.error("Failed to load Uganda hierarchy:", err);
    // Return minimal fallback so the UI doesn't break
    return { country: "Uganda", regions: [] };
  }
}

/** Get region names. */
export function getRegions(h: Hierarchy): string[] {
  return h.regions.map((r) => r.name);
}

/** Get districts for a region. */
export function getDistricts(h: Hierarchy, region: string): string[] {
  const r = h.regions.find((r) => r.name === region);
  return r ? r.districts.map((d) => d.name) : [];
}

/** Get counties for a district. */
export function getCounties(h: Hierarchy, region: string, district: string): string[] {
  const r = h.regions.find((r) => r.name === region);
  const d = r?.districts.find((d) => d.name === district);
  return d ? d.counties.map((c) => c.name) : [];
}

/** Get sub-counties for a county. */
export function getSubCounties(h: Hierarchy, region: string, district: string, county: string): string[] {
  const r = h.regions.find((r) => r.name === region);
  const d = r?.districts.find((d) => d.name === district);
  const c = d?.counties.find((c) => c.name === county);
  return c ? c.subcounties.map((sc) => sc.name) : [];
}

/** Get parishes for a sub-county. */
export function getParishes(h: Hierarchy, region: string, district: string, county: string, subcounty: string): string[] {
  const r = h.regions.find((r) => r.name === region);
  const d = r?.districts.find((d) => d.name === district);
  const c = d?.counties.find((c) => c.name === county);
  const sc = c?.subcounties.find((sc) => sc.name === subcounty);
  return sc ? sc.parishes.map((p) => p.name) : [];
}

/** Get villages for a parish. */
export function getVillages(h: Hierarchy, region: string, district: string, county: string, subcounty: string, parish: string): string[] {
  const r = h.regions.find((r) => r.name === region);
  const d = r?.districts.find((d) => d.name === district);
  const c = d?.counties.find((c) => c.name === county);
  const sc = c?.subcounties.find((sc) => sc.name === subcounty);
  const p = sc?.parishes.find((p) => p.name === parish);
  return p ? p.villages : [];
}

/** Get GPS coordinates for a sub-county. */
export function getCoords(h: Hierarchy, region: string, district: string, county: string, subcounty: string): { lat: number; lng: number } | null {
  const r = h.regions.find((r) => r.name === region);
  const d = r?.districts.find((d) => d.name === district);
  const c = d?.counties.find((c) => c.name === county);
  const sc = c?.subcounties.find((sc) => sc.name === subcounty);
  return sc ? { lat: sc.latitude, lng: sc.longitude } : null;
}

/** Format a location selection as a display string. */
export function formatLocation(loc: Partial<LocationSelection>): string {
  const parts = [loc.village, loc.parish, loc.subcounty, loc.district, loc.region].filter(Boolean);
  return parts.join(", ");
}

/** Short format: village/parish, district */
export function formatLocationShort(loc: Partial<LocationSelection>): string {
  const area = loc.village || loc.parish || loc.subcounty || loc.county || "";
  return area && loc.district ? `${area}, ${loc.district}` : loc.district || area || "";
}

export { EMPTY as emptyLocation };
