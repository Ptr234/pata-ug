"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "@/components/Img";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Send,
  User,
  Building2,
  Shield,
  MapPin,
  CreditCard,
  Handshake,
  Check,
  Phone,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { chatMessages, deals, type ChatMessage, type ChatSide } from "@/lib/mock-data";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ─── Deal info lookup ─── */
interface DealInfo {
  property: string;
  estate: string;
  district: string;
  rent: string;
  photo: string;
  tenant: { name: string; phone: string; email: string };
  landlord: { name: string; phone: string; email: string };
  location: { lat: number; lng: number };
}

const DEAL_INFO: Record<string, DealInfo> = {
  "deal-001": {
    property: "2-Bed Apartment in Bukoto", estate: "Bukoto", district: "Kampala", rent: "UGX 1,700,000",
    photo: "/property_images/apartments/apartment_1.jpg",
    tenant: { name: "John Doe", phone: "+256700100100", email: "john.doe@email.com" },
    landlord: { name: "James Mukasa", phone: "+256700100100", email: "james.mukasa@email.com" },
    location: { lat: 0.3476, lng: 32.5953 },
  },
  "deal-002": {
    property: "3-Bed Townhouse in Muyenga", estate: "Muyenga", district: "Kampala", rent: "UGX 3,400,000",
    photo: "/property_images/houses/house_5.jpg",
    tenant: { name: "Mary Akello", phone: "+256772300300", email: "mary.akello@email.com" },
    landlord: { name: "Richard Ssentamu", phone: "+256700500500", email: "richard.s@email.com" },
    location: { lat: 0.3012, lng: 32.6001 },
  },
  "deal-003": {
    property: "Studio in Naguru", estate: "Naguru", district: "Kampala", rent: "UGX 800,000",
    photo: "/property_images/studios/studio_1.jpg",
    tenant: { name: "Peter Ouma", phone: "+256701300300", email: "peter.ouma@email.com" },
    landlord: { name: "Peter Ochieng", phone: "+256701300300", email: "peter.o@email.com" },
    location: { lat: 0.3342, lng: 32.6025 },
  },
  "deal-004": {
    property: "2-Bed in Entebbe", estate: "Entebbe", district: "Wakiso", rent: "UGX 2,200,000",
    photo: "/property_images/apartments/apartment_10.jpg",
    tenant: { name: "Alice Nambi", phone: "+256774700700", email: "alice.nambi@email.com" },
    landlord: { name: "Annet Birungi", phone: "+256703121212", email: "annet.b@email.com" },
    location: { lat: 0.0512, lng: 32.4637 },
  },
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-UG", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-UG", { day: "numeric", month: "short" });
}

/* ─── Message bubble with avatar ─── */
function Bubble({ msg, side }: { msg: ChatMessage; side: "left" | "right" }) {
  const isAdmin = msg.from === "admin";
  const isTenant = msg.from === "tenant";
  const accent = isAdmin ? "#d4a853" : isTenant ? "#0A9396" : "#D4622A";
  const gradient = isAdmin
    ? "linear-gradient(135deg, #d4a853, #B8903D)"
    : isTenant
      ? "linear-gradient(135deg, #0A9396, #077B7E)"
      : "linear-gradient(135deg, #D4622A, #B54E1C)";
  const initial = isAdmin ? "P" : msg.senderName.charAt(0);

  return (
    <div className={`flex items-end gap-2 ${side === "right" ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[8px] font-bold text-white"
        style={{ background: gradient }}
      >
        {initial}
      </div>
      {/* Bubble */}
      <div
        className="max-w-[80%] rounded-2xl px-3.5 py-2.5"
        style={{
          background: isAdmin
            ? "linear-gradient(135deg, rgba(212,168,83,0.12), rgba(212,168,83,0.06))"
            : isTenant
              ? "rgba(10,147,150,0.08)"
              : "rgba(212,98,42,0.08)",
          borderBottomRightRadius: side === "right" ? "4px" : undefined,
          borderBottomLeftRadius: side === "left" ? "4px" : undefined,
        }}
      >
        <p className="whitespace-pre-line text-[13px] leading-relaxed text-white/80">{msg.text}</p>
        <p className={`mt-1 text-[8px] text-white/20 ${side === "right" ? "text-right" : ""}`}>
          {formatTime(msg.timestamp)}
        </p>
      </div>
    </div>
  );
}

/* ─── Chat column ─── */
function ChatColumn({
  title,
  icon: Icon,
  accent,
  personName,
  messages,
  replyTo,
  onSend,
}: {
  title: string;
  icon: React.ElementType;
  accent: string;
  personName: string;
  messages: ChatMessage[];
  replyTo: ChatSide;
  onSend: (text: string, to: ChatSide) => void;
}) {
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = () => {
    if (!draft.trim()) return;
    onSend(draft.trim(), replyTo);
    setDraft("");
  };

  return (
    <div
      className="flex flex-1 flex-col overflow-hidden rounded-3xl"
      style={{
        background: "rgba(11,25,41,0.5)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{
          background: `linear-gradient(135deg, ${accent}08, transparent)`,
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}CC)`, boxShadow: `0 4px 12px ${accent}30` }}
        >
          {personName.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">{personName}</p>
          <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: `${accent}90` }}>
            {title}
          </p>
        </div>
        <div className="flex h-2 w-2 items-center justify-center">
          <span className="absolute h-2 w-2 animate-ping rounded-full opacity-40" style={{ background: accent }} />
          <span className="relative h-2 w-2 rounded-full" style={{ background: accent }} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4" style={{ maxHeight: "420px" }}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon size={24} style={{ color: `${accent}30` }} />
            <p className="mt-3 text-xs text-white/25">No messages yet</p>
          </div>
        )}
        {messages.map((msg) => (
          <Bubble
            key={msg.id}
            msg={msg}
            side={msg.from === "admin" ? "right" : "left"}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.01)" }}
      >
        <input
          type="text"
          placeholder={`Reply to ${personName}...`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 rounded-xl bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:bg-white/[0.1] focus:ring-2"
          style={{ ["--tw-ring-color" as string]: accent }}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!draft.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white disabled:opacity-20"
          style={{
            background: draft.trim() ? `linear-gradient(135deg, ${accent}, ${accent}CC)` : "rgba(255,255,255,0.04)",
            boxShadow: draft.trim() ? `0 4px 12px ${accent}30` : "none",
            transition: `all 500ms ${T}`,
          }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */

export function AdminDealChatPage() {
  const params = useParams<{ id: string }>();
  const dealId = params.id;
  const info = DEAL_INFO[dealId];

  const [dealStatus, setDealStatus] = useState<"negotiating" | "agreed" | "payment_confirmed" | "closed">("negotiating");

  // Local message state (seeded from mock)
  const [messages, setMessages] = useState<ChatMessage[]>(
    () => chatMessages.filter((m) => m.dealId === dealId)
  );

  // Messages visible in each column
  const tenantMessages = messages.filter(
    (m) =>
      (m.from === "tenant" && m.to === "admin") ||
      (m.from === "admin" && m.to === "tenant")
  );
  const landlordMessages = messages.filter(
    (m) =>
      (m.from === "landlord" && m.to === "admin") ||
      (m.from === "admin" && m.to === "landlord")
  );

  const handleSend = (text: string, to: ChatSide) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      dealId,
      from: "admin",
      to,
      senderName: "pata.ug",
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  if (!info) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-smoke">
        <div className="text-center">
          <p className="font-display text-2xl text-navy">Deal not found</p>
          <Link href="/admin/deals" className="btn-gold mt-4 inline-flex items-center gap-2">
            Back to Deals <ArrowLeft size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-navy">
      {/* ═══ FIXED HEADER ═══ */}
      <div className="shrink-0 relative overflow-hidden">
        <Image src={info.photo} alt={info.property} fill sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/80" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              href="/admin/deals"
              className="mb-4 inline-flex items-center gap-2 text-sm text-white/60"
              style={{ transition: `color 500ms ${T}` }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#d4a853"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Deals
            </Link>

            <div className="flex items-center gap-4">
              {/* Property thumbnail */}
              <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:block">
                <Image src={info.photo} alt={info.property} fill sizes="64px" className="object-cover" />
              </div>
              <div>
                <p className="section-label text-gold">Mediation Room</p>
                <h1 className="mt-1 font-display text-xl font-bold uppercase tracking-tighter text-white sm:text-2xl md:text-3xl">
                  {info.property}
                </h1>
                <p className="mt-1 flex items-center gap-2 text-sm text-white/50">
                  <MapPin size={12} className="text-gold" /> {info.estate}, {info.district}
                  <span className="text-white/20">|</span>
                  {info.rent}/mo
                </p>
              </div>
            </div>

            {/* Participants bar */}
            <div className="mt-5 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-teal/10 px-4 py-2">
                <User size={14} className="text-teal" />
                <span className="text-xs font-bold text-teal">{info.tenant.name}</span>
                <span className="text-[9px] text-white/40">Tenant</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-orange/10 px-4 py-2">
                <Building2 size={14} className="text-orange" />
                <span className="text-xs font-bold text-orange">{info.landlord.name}</span>
                <span className="text-[9px] text-white/40">Landlord</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-gold/10 px-4 py-2">
                <Shield size={14} className="text-gold" />
                <span className="text-xs font-bold text-gold">pata.ug</span>
                <span className="text-[9px] text-white/40">Mediator</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ═══ SCROLLABLE CONTENT — fills remaining space ═══ */}
      <div className="flex-1 overflow-y-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Left: Tenant conversation */}
            <ChatColumn
              title="Tenant Side"
              icon={User}
              accent="#0A9396"
              personName={info.tenant.name}
              messages={tenantMessages}
              replyTo="tenant"
              onSend={handleSend}
            />

            {/* Right: Landlord conversation */}
            <ChatColumn
              title="Landlord Side"
              icon={Building2}
              accent="#D4622A"
              personName={info.landlord.name}
              messages={landlordMessages}
              replyTo="landlord"
              onSend={handleSend}
            />
          </div>

          {/* ─── Deal Controls ─── */}
          <div className="mt-4 rounded-2xl bg-white/[0.04] p-5">
            {/* Status indicator */}
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gold/70">Deal Status</p>
              {[
                { key: "negotiating", label: "Negotiating", color: "#d4a853" },
                { key: "agreed", label: "Agreed — Payment Sent", color: "#E08C10" },
                { key: "payment_confirmed", label: "Paid — Awaiting Close", color: "#1F8A44" },
                { key: "closed", label: "Closed", color: "#0A9396" },
              ].map((s) => (
                <span
                  key={s.key}
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: dealStatus === s.key ? `${s.color}20` : "rgba(255,255,255,0.03)",
                    color: dealStatus === s.key ? s.color : "rgba(255,255,255,0.2)",
                    border: dealStatus === s.key ? `1px solid ${s.color}40` : "1px solid transparent",
                    transition: `all 500ms ${T}`,
                  }}
                >
                  {s.label}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {dealStatus === "negotiating" && (
                <button
                  type="button"
                  onClick={() => {
                    setDealStatus("agreed");
                    // Auto-send payment link messages to both parties
                    handleSend("Deal terms have been agreed! We've sent you a payment link. Please complete your payment to proceed.", "tenant");
                    handleSend("Great news — the tenant has agreed to the terms. A 5% agency fee on 1 month's rent (not the full upfront) will be deducted from your payout when the deal closes. Once the tenant pays the deposit, we'll finalize.", "landlord");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-black uppercase tracking-wider text-white"
                  style={{ background: "linear-gradient(135deg, #d4a853, #B8903D)", boxShadow: "0 4px 16px rgba(212,168,83,0.25)", transition: `all 500ms ${T}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <CreditCard size={14} /> Confirm Deal &amp; Send Payment Links
                </button>
              )}

              {dealStatus === "agreed" && (
                <button
                  type="button"
                  onClick={() => {
                    setDealStatus("payment_confirmed");
                    handleSend("Both payments have been confirmed! You can now close the deal to receive the landlord's contact details.", "tenant");
                    handleSend("Both payments confirmed. The tenant will close the deal shortly. Once done, we'll share their contact details with you.", "landlord");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-black uppercase tracking-wider text-white"
                  style={{ background: "linear-gradient(135deg, #1F8A44, #16753A)", boxShadow: "0 4px 16px rgba(31,138,68,0.25)", transition: `all 500ms ${T}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <Check size={14} /> Confirm Both Payments Received
                </button>
              )}

              {dealStatus === "payment_confirmed" && (
                <button
                  type="button"
                  onClick={() => {
                    setDealStatus("closed");
                    const mapsUrl = `https://www.google.com/maps?q=${info.location.lat},${info.location.lng}`;
                    handleSend(
                      `🎉 Deal closed! Here are the full property & landlord details:\n\n` +
                      `📍 Property: ${info.property}\n` +
                      `📌 Location: ${info.estate}, ${info.district}\n` +
                      `🗺️ GPS: ${mapsUrl}\n\n` +
                      `👤 Landlord: ${info.landlord.name}\n` +
                      `📞 Phone: ${info.landlord.phone}\n` +
                      `📧 Email: ${info.landlord.email}\n\n` +
                      `💰 Agreed Rent: ${info.rent}/month\n\n` +
                      `Please coordinate your move-in directly with the landlord. Thank you for using pata.ug!`,
                      "tenant"
                    );
                    handleSend(
                      `🎉 Deal closed! Here are the tenant's details:\n\n` +
                      `📍 Property: ${info.property}\n` +
                      `📌 Location: ${info.estate}, ${info.district}\n\n` +
                      `👤 Tenant: ${info.tenant.name}\n` +
                      `📞 Phone: ${info.tenant.phone}\n` +
                      `📧 Email: ${info.tenant.email}\n\n` +
                      `💰 Agreed Rent: ${info.rent}/month\n` +
                      `💳 Upfront deposit transferred to your account. 5% agency fee deducted on 1 month's rent only — not the full upfront.\n\n` +
                      `Please coordinate the move-in directly with the tenant. Thank you for listing with pata.ug!`,
                      "landlord"
                    );
                  }}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-black uppercase tracking-wider text-white"
                  style={{ background: "linear-gradient(135deg, #0A9396, #077B7E)", boxShadow: "0 4px 16px rgba(10,147,150,0.25)", transition: `all 500ms ${T}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <Handshake size={14} /> Close Deal &amp; Share Contacts
                </button>
              )}

              {dealStatus === "closed" && (
                <div className="flex items-center gap-2 rounded-xl bg-teal/10 px-5 py-3">
                  <Phone size={14} className="text-teal" />
                  <p className="text-sm font-bold text-teal">Deal closed — contacts have been shared with both parties</p>
                </div>
              )}
            </div>
          </div>

          {/* Tip */}
          <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-white/[0.02] px-4 py-2.5">
            <Shield size={12} className="text-white/20" />
            <p className="text-[10px] text-white/30">
              Each side only sees their conversation with pata.ug
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
