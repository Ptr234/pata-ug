"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ArrowLeft,
  Users,
  Search,
  ShieldCheck,
  Clock,
  AlertCircle,
  Home,
  Building2,
  Phone,
  Mail,
  CreditCard,
  Check,
  X,
  ChevronDown,
  Eye,
  MapPin,
} from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ─── Types ─── */
type Role = "tenant" | "landlord";
type VerifStatus = "verified" | "pending" | "unverified";

interface UserRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  nationalId: string;
  role: Role;
  verification: VerifStatus;
  district: string;
  joined: string;
  listings?: number;
  deals: number;
}

/* ─── Mock users ─── */
const INITIAL_USERS: UserRecord[] = [
  { id: "u-001", name: "John Doe", phone: "+256700100100", email: "john.doe@email.com", nationalId: "CM9300012345678A", role: "tenant", verification: "verified", district: "Kampala", joined: "10 Mar", listings: undefined, deals: 3 },
  { id: "u-002", name: "Sarah Namutebi", phone: "+256772200200", email: "sarah.n@email.com", nationalId: "CF8200098765432B", role: "landlord", verification: "verified", district: "Kampala", joined: "05 Mar", listings: 8, deals: 5 },
  { id: "u-003", name: "Peter Ouma", phone: "+256701300300", email: "peter.ouma@email.com", nationalId: "CM9400011112222C", role: "tenant", verification: "pending", district: "Kampala", joined: "18 Mar", listings: undefined, deals: 1 },
  { id: "u-004", name: "Grace Achieng", phone: "+256753400400", email: "grace.a@email.com", nationalId: "CF8500033334444D", role: "landlord", verification: "verified", district: "Wakiso", joined: "12 Feb", listings: 3, deals: 2 },
  { id: "u-005", name: "Moses Ssempijja", phone: "+256709800800", email: "moses.s@email.com", nationalId: "CM9100055556666E", role: "landlord", verification: "pending", district: "Kampala", joined: "20 Mar", listings: 1, deals: 0 },
  { id: "u-006", name: "Alice Nambi", phone: "+256774700700", email: "alice.nambi@email.com", nationalId: "CF8600077778888F", role: "tenant", verification: "verified", district: "Wakiso", joined: "01 Mar", listings: undefined, deals: 2 },
  { id: "u-007", name: "David Ssali", phone: "+256700900900", email: "david.ssali@email.com", nationalId: "CM9200099990000G", role: "tenant", verification: "unverified", district: "Mukono", joined: "21 Mar", listings: undefined, deals: 0 },
  { id: "u-008", name: "Dorothy Namubiru", phone: "+256771010101", email: "dorothy.n@email.com", nationalId: "CF8300011112345H", role: "landlord", verification: "verified", district: "Wakiso", joined: "15 Jan", listings: 4, deals: 3 },
  { id: "u-009", name: "Herbert Kiggundu", phone: "+256752111111", email: "herbert.k@email.com", nationalId: "CM9500022223456I", role: "landlord", verification: "verified", district: "Kampala", joined: "28 Feb", listings: 6, deals: 4 },
  { id: "u-010", name: "Fatuma Nabirye", phone: "+256703121212", email: "fatuma.n@email.com", nationalId: "CF8700033334567J", role: "tenant", verification: "pending", district: "Jinja", joined: "19 Mar", listings: undefined, deals: 0 },
];

function verifStyle(s: VerifStatus) {
  if (s === "verified") return { bg: "rgba(31,138,68,0.12)", color: "#1F8A44", label: "Verified", Icon: ShieldCheck };
  if (s === "pending") return { bg: "rgba(224,140,16,0.12)", color: "#E08C10", label: "Pending", Icon: Clock };
  return { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", label: "Unverified", Icon: AlertCircle };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"" | Role>("");
  const [verifFilter, setVerifFilter] = useState<"" | VerifStatus>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const updateVerification = (id: string, status: VerifStatus) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, verification: status } : u)));
  };

  const filtered = users.filter((u) => {
    if (roleFilter && u.role !== roleFilter) return false;
    if (verifFilter && u.verification !== verifFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.phone.includes(q) || u.email.toLowerCase().includes(q) || u.nationalId.toLowerCase().includes(q);
    }
    return true;
  });

  const totalTenants = users.filter((u) => u.role === "tenant").length;
  const totalLandlords = users.filter((u) => u.role === "landlord").length;
  const pendingVerif = users.filter((u) => u.verification === "pending").length;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <Image src="/property_images/commercial/commercial_5.jpg" alt="User management" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link href="/admin" className="mb-6 inline-flex items-center gap-2 text-sm text-white/60" style={{ transition: `color 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>
            <p className="section-label text-gold">Platform Users</p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tighter text-white md:text-5xl">
              User <span className="text-gradient-gold">Management</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
              {users.length} registered users · {pendingVerif} pending verification
            </p>
          </ScrollReveal>

          {/* Stats row */}
          <ScrollReveal delay={100}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Total Users", value: users.length, icon: Users, accent: "#d4a853" },
                { label: "Tenants", value: totalTenants, icon: Home, accent: "#0A9396" },
                { label: "Landlords", value: totalLandlords, icon: Building2, accent: "#D4622A" },
                { label: "Pending ID", value: pendingVerif, icon: Clock, accent: "#E08C10" },
              ].map((s) => {
                const SIcon = s.icon;
                return (
                  <div key={s.label} className="rounded-xl bg-white/[0.04] px-4 py-3 backdrop-blur-sm" style={{ transition: `all 500ms ${T}` }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                    <SIcon size={16} style={{ color: s.accent }} />
                    <p className="mt-2 font-display text-2xl font-bold tracking-tight text-white">{s.value}</p>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-white/40">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters + Table */}
      <section className="bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Filters */}
          <ScrollReveal>
            <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl bg-navy p-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search by name, phone, email, or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl bg-white/[0.06] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:bg-white/[0.12] focus:ring-2 focus:ring-gold/30"
                />
              </div>
              {/* Role */}
              <div className="relative">
                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as "" | Role)} className="appearance-none rounded-xl bg-white/[0.06] px-4 py-2.5 pr-9 text-sm font-medium text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-gold/30 [&>option]:bg-navy [&>option]:text-white">
                  <option value="">All Roles</option>
                  <option value="tenant">Tenants</option>
                  <option value="landlord">Landlords</option>
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
              {/* Verification */}
              <div className="relative">
                <select value={verifFilter} onChange={(e) => setVerifFilter(e.target.value as "" | VerifStatus)} className="appearance-none rounded-xl bg-white/[0.06] px-4 py-2.5 pr-9 text-sm font-medium text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-gold/30 [&>option]:bg-navy [&>option]:text-white">
                  <option value="">All Status</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="unverified">Unverified</option>
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
              <p className="text-xs text-white/40">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
            </div>
          </ScrollReveal>

          {/* User cards */}
          <ScrollReveal>
            <div className="space-y-3">
              {filtered.map((user) => {
                const vs = verifStyle(user.verification);
                const VIcon = vs.Icon;
                const isExpanded = expandedId === user.id;

                return (
                  <div
                    key={user.id}
                    className="overflow-hidden rounded-2xl bg-navy"
                    style={{
                      boxShadow: isExpanded ? "0 8px 32px rgba(11,25,41,0.3)" : "0 2px 12px rgba(11,25,41,0.1)",
                      transition: `box-shadow 500ms ${T}`,
                    }}
                  >
                    {/* Row */}
                    <div
                      className="flex flex-wrap items-center gap-4 px-5 py-4"
                      style={{ transition: `background-color 500ms ${T}` }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(212,168,83,0.03)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      {/* Avatar + name */}
                      <div className="flex min-w-[200px] flex-1 items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white"
                          style={{ background: user.role === "landlord" ? "linear-gradient(135deg, #D4622A, #B54E1C)" : "linear-gradient(135deg, #0A9396, #077B7E)" }}
                        >
                          {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{user.name}</p>
                          <p className="mt-0.5 text-[11px] text-white/50">{user.email}</p>
                        </div>
                      </div>

                      {/* Role badge */}
                      <span
                        className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white"
                        style={{ background: user.role === "landlord" ? "#D4622A" : "#0A9396" }}
                      >
                        {user.role === "landlord" ? "Landlord" : "Tenant"}
                      </span>

                      {/* Verification */}
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: vs.bg, color: vs.color }}
                      >
                        <VIcon className="h-3 w-3" /> {vs.label}
                      </span>

                      {/* District */}
                      <span className="hidden items-center gap-1 text-xs text-white/50 sm:flex">
                        <MapPin className="h-3 w-3 text-gold" /> {user.district}
                      </span>

                      {/* Joined */}
                      <span className="hidden text-xs text-white/40 md:block">{user.joined}</span>

                      {/* Expand */}
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : user.id)}
                        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[10px] font-bold text-gold"
                        style={{ background: "rgba(212,168,83,0.08)", transition: `all 500ms ${T}` }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,168,83,0.2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,168,83,0.08)"; }}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Details
                        <ChevronDown className="h-3 w-3" style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: `transform 400ms ${T}` }} />
                      </button>
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                        <div className="grid gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
                          {/* Phone */}
                          <div className="rounded-xl bg-white/[0.03] px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Phone size={12} className="text-teal" />
                              <p className="text-[9px] font-black uppercase tracking-wider text-white/30">Phone</p>
                            </div>
                            <p className="mt-1.5 text-sm font-medium text-white/70">{user.phone}</p>
                          </div>
                          {/* Email */}
                          <div className="rounded-xl bg-white/[0.03] px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Mail size={12} className="text-teal" />
                              <p className="text-[9px] font-black uppercase tracking-wider text-white/30">Email</p>
                            </div>
                            <p className="mt-1.5 text-sm font-medium text-white/70">{user.email}</p>
                          </div>
                          {/* National ID */}
                          <div className="rounded-xl bg-white/[0.03] px-4 py-3">
                            <div className="flex items-center gap-2">
                              <CreditCard size={12} className="text-gold" />
                              <p className="text-[9px] font-black uppercase tracking-wider text-white/30">National ID</p>
                            </div>
                            <p className="mt-1.5 text-sm font-medium text-white/70">{user.nationalId}</p>
                          </div>
                          {/* Activity */}
                          <div className="rounded-xl bg-white/[0.03] px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Users size={12} className="text-gold" />
                              <p className="text-[9px] font-black uppercase tracking-wider text-white/30">Activity</p>
                            </div>
                            <p className="mt-1.5 text-sm text-white/70">
                              {user.deals} deal{user.deals !== 1 ? "s" : ""}
                              {user.listings !== undefined && <span> · {user.listings} listing{user.listings !== 1 ? "s" : ""}</span>}
                            </p>
                          </div>
                        </div>

                        {/* Verification actions */}
                        <div className="mt-4 flex items-center gap-3">
                          {user.verification === "pending" && (
                            <>
                              <button
                                onClick={() => updateVerification(user.id, "verified")}
                                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[11px] font-bold"
                                style={{ background: "rgba(31,138,68,0.15)", color: "#1F8A44", transition: `all 500ms ${T}` }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(31,138,68,0.3)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(31,138,68,0.15)"; }}
                              >
                                <Check className="h-3.5 w-3.5" /> Verify User
                              </button>
                              <button
                                onClick={() => updateVerification(user.id, "unverified")}
                                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[11px] font-bold"
                                style={{ background: "rgba(192,48,58,0.12)", color: "#C0303A", transition: `all 500ms ${T}` }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(192,48,58,0.25)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(192,48,58,0.12)"; }}
                              >
                                <X className="h-3.5 w-3.5" /> Reject ID
                              </button>
                            </>
                          )}
                          {user.verification === "verified" && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                              <ShieldCheck className="h-3.5 w-3.5 text-green" /> Identity confirmed — no action needed
                            </span>
                          )}
                          {user.verification === "unverified" && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                              <AlertCircle className="h-3.5 w-3.5" /> User has not submitted ID yet
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="rounded-2xl bg-navy px-6 py-16 text-center">
                  <Users className="mx-auto h-8 w-8 text-white/20" />
                  <p className="mt-4 text-sm text-white/40">No users match your filters</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
