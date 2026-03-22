"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Send,
  Shield,
  MapPin,
  Building2,
  CreditCard,
  Paperclip,
} from "lucide-react";
import { chatMessages, type ChatMessage } from "@/lib/mock-data";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const DEAL_INFO: Record<string, { property: string; estate: string; district: string; rent: string; deposit: string; photo: string }> = {
  "deal-001": { property: "2-Bed Apartment in Bukoto", estate: "Bukoto", district: "Kampala", rent: "UGX 1,700,000", deposit: "UGX 5,100,000 (3 months)", photo: "/property_images/apartments/apartment_1.jpg" },
  "deal-002": { property: "3-Bed Townhouse in Muyenga", estate: "Muyenga", district: "Kampala", rent: "UGX 3,400,000", deposit: "UGX 6,800,000 (2 months)", photo: "/property_images/houses/house_5.jpg" },
  "deal-003": { property: "Studio in Naguru", estate: "Naguru", district: "Kampala", rent: "UGX 800,000", deposit: "UGX 800,000 (1 month)", photo: "/property_images/studios/studio_1.jpg" },
  "deal-004": { property: "2-Bed in Entebbe", estate: "Entebbe", district: "Wakiso", rent: "UGX 2,200,000", deposit: "UGX 6,600,000 (3 months)", photo: "/property_images/apartments/apartment_10.jpg" },
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-UG", { hour: "2-digit", minute: "2-digit" });
}

function formatDay(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return "Today";
  return d.toLocaleDateString("en-UG", { weekday: "long", day: "numeric", month: "short" });
}

export default function TenantChatPage() {
  const params = useParams<{ id: string }>();
  const dealId = params.id;
  const info = DEAL_INFO[dealId];

  const [messages, setMessages] = useState<ChatMessage[]>(
    () => chatMessages.filter(
      (m) => m.dealId === dealId && (
        (m.from === "tenant" && m.to === "admin") ||
        (m.from === "admin" && m.to === "tenant")
      )
    )
  );

  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `msg-${Date.now()}`, dealId, from: "tenant", to: "admin", senderName: "You", text: draft.trim(), timestamp: new Date().toISOString() },
    ]);
    setDraft("");
  };

  if (!info) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-navy gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
          <Building2 className="h-8 w-8 text-gold" />
        </div>
        <p className="font-display text-2xl tracking-tighter text-white">Deal not found</p>
        <Link href="/deals" className="btn-gold">Back to Deals</Link>
      </div>
    );
  }

  // Group messages by day
  const grouped: { day: string; msgs: ChatMessage[] }[] = [];
  messages.forEach((msg) => {
    const day = formatDay(msg.timestamp);
    const last = grouped[grouped.length - 1];
    if (last && last.day === day) last.msgs.push(msg);
    else grouped.push({ day, msgs: [msg] });
  });

  return (
    <div className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-navy">
      {/* ═══ FIXED HEADER ═══ */}
      <div className="shrink-0">
        {/* Property bar */}
        <div className="relative overflow-hidden">
          <Image src={info.photo} alt={info.property} fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/80" />

          <div className="relative mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <div className="flex items-center gap-4">
              <Link
                href="/deals"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-white/50"
                style={{ transition: `all 400ms ${T}` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>

              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                <Image src={info.photo} alt={info.property} fill sizes="44px" className="object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">{info.property}</p>
                <div className="flex items-center gap-2 text-[10px] text-white/40">
                  <span className="flex items-center gap-1"><MapPin size={10} className="text-teal" />{info.estate}, {info.district}</span>
                  <span className="text-white/15">|</span>
                  <span>{info.rent}/mo</span>
                </div>
              </div>

              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-black text-white"
                style={{ background: "linear-gradient(135deg, #d4a853, #B8903D)" }}
              >
                P
              </div>
            </div>
          </div>
        </div>

        {/* Safety strip */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2 sm:px-6">
            <Shield size={11} className="shrink-0 text-teal/60" />
            <p className="text-[9px] text-white/30">
              Chatting with <span className="font-bold text-teal/50">pata.ug</span> — we negotiate on your behalf
            </p>
          </div>
        </div>
      </div>

      {/* ═══ SCROLLABLE MESSAGES — fills remaining space ═══ */}
      <div className="flex-1 overflow-y-auto" id="chat-messages">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          {grouped.map((group) => (
            <div key={group.day}>
              {/* Day separator */}
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/[0.04]" />
                <span className="rounded-full bg-white/[0.04] px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-white/20">
                  {group.day}
                </span>
                <div className="h-px flex-1 bg-white/[0.04]" />
              </div>

              <div className="space-y-2.5">
                {group.msgs.map((msg) => {
                  const isMe = msg.from === "tenant";
                  return (
                    <div key={msg.id} className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold text-white"
                        style={{
                          background: isMe
                            ? "linear-gradient(135deg, #0A9396, #077B7E)"
                            : "linear-gradient(135deg, #d4a853, #B8903D)",
                        }}
                      >
                        {isMe ? "Y" : "P"}
                      </div>
                      <div
                        className="max-w-[75%] rounded-2xl px-4 py-3"
                        style={{
                          background: isMe
                            ? "rgba(10,147,150,0.1)"
                            : "linear-gradient(135deg, rgba(212,168,83,0.1), rgba(212,168,83,0.05))",
                          borderBottomRightRadius: isMe ? "4px" : undefined,
                          borderBottomLeftRadius: !isMe ? "4px" : undefined,
                        }}
                      >
                        <p className="whitespace-pre-line text-sm leading-relaxed text-white/80">{msg.text}</p>
                        <p className={`mt-1 text-[8px] text-white/20 ${isMe ? "text-right" : ""}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <Shield className="h-8 w-8 text-white/10" />
              <p className="mt-4 text-sm text-white/25">No messages yet. Start the conversation!</p>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ═══ FIXED INPUT BAR ═══ */}
      <div className="shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto flex max-w-3xl items-center gap-2.5 px-4 py-3 sm:px-6">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/25"
            style={{ transition: `all 400ms ${T}` }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}
          >
            <Paperclip size={16} />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-xl bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:bg-white/[0.1] focus:ring-2 focus:ring-gold/30"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!draft.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white disabled:opacity-20"
            style={{
              background: draft.trim() ? "linear-gradient(135deg, #d4a853, #B8903D)" : "rgba(255,255,255,0.04)",
              boxShadow: draft.trim() ? "0 4px 16px rgba(212,168,83,0.3)" : "none",
              transition: `all 500ms ${T}`,
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
