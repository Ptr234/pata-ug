"use client";

import Link from "next/link";
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  CheckCheck,
  BellOff,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { notifications } from "@/lib/mock-data";
import type { NotificationChannel } from "@/lib/mock-data";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const CHANNEL_CONFIG: Record<
  NotificationChannel,
  { icon: React.ElementType; bg: string; text: string; label: string }
> = {
  sms: {
    icon: Smartphone,
    bg: "rgba(10,147,150,0.15)",
    text: "#0A9396",
    label: "SMS",
  },
  email: {
    icon: Mail,
    bg: "rgba(224,140,16,0.15)",
    text: "#E08C10",
    label: "Email",
  },
  "in-app": {
    icon: Bell,
    bg: "rgba(212,168,83,0.15)",
    text: "#d4a853",
    label: "In-App",
  },
  whatsapp: {
    icon: MessageSquare,
    bg: "rgba(31,138,68,0.15)",
    text: "#1F8A44",
    label: "WhatsApp",
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <main className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-navy">
        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Teal radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(10,147,150,0.08),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <ScrollReveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-4 text-sm text-white/70"
            >
              <Link
                href="/"
                className="text-white/50 hover:text-teal"
                style={{ transition: `color 500ms ${T}` }}
              >
                Home
              </Link>
              <span className="mx-2 text-white/60">/</span>
              <Link
                href="/dashboard"
                className="text-white/50 hover:text-teal"
                style={{ transition: `color 500ms ${T}` }}
              >
                Dashboard
              </Link>
              <span className="mx-2 text-white/60">/</span>
              <span className="font-medium text-white/70">Notifications</span>
            </nav>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="section-label text-teal">Alerts</p>
                <div className="mt-3 flex items-center gap-3">
                  <h1 className="font-display text-xl font-bold uppercase tracking-tighter text-white sm:text-3xl md:text-5xl">
                    NOTIFICATIONS
                  </h1>
                  {unreadCount > 0 && (
                    <span
                      className="flex h-7 min-w-[28px] items-center justify-center rounded-full px-2 text-xs font-bold text-white"
                      style={{ backgroundColor: "#d4a853" }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-md text-base leading-relaxed text-white/70">
                  All your alerts and messages in one place.
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  className="mt-8 inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-gold"
                  style={{
                    transition: `color 500ms ${T}, transform 500ms ${T}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#B8903D";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#d4a853";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <CheckCheck className="h-4 w-4" />
                  Mark all read
                </button>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ NOTIFICATION LIST ═══ */}
      <section className="min-h-[50vh] bg-smoke">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          {notifications.length > 0 ? (
            <ScrollReveal>
              <div className="space-y-3">
                {notifications.map((notif) => {
                  const channel = CHANNEL_CONFIG[notif.channel];
                  const ChannelIcon = channel.icon;
                  return (
                    <article
                      key={notif.id}
                      className="flex items-start gap-3 rounded-xl bg-navy p-4 shadow-card sm:gap-4 sm:rounded-2xl sm:p-5"
                      style={{
                        borderLeft: !notif.read
                          ? "3px solid #d4a853"
                          : "3px solid transparent",
                        transition: `transform 500ms ${T}, box-shadow 500ms ${T}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateX(4px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 40px rgba(11, 25, 41, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateX(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 24px rgba(11, 25, 41, 0.06)";
                      }}
                    >
                      {/* Icon circle */}
                      <div
                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: !notif.read
                            ? "rgba(10,147,150,0.15)"
                            : "rgba(255,255,255,0.04)",
                        }}
                      >
                        <Bell
                          className="h-5 w-5"
                          style={{
                            color: !notif.read
                              ? "#0A9396"
                              : "rgba(255,255,255,0.35)",
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            color: notif.read
                              ? "rgba(255,255,255,0.50)"
                              : "#FFFFFF",
                            fontWeight: notif.read ? 400 : 600,
                          }}
                        >
                          {notif.message}
                        </p>
                        <div className="mt-2.5 flex flex-wrap items-center gap-3">
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold"
                            style={{
                              backgroundColor: channel.bg,
                              color: channel.text,
                              transition: `transform 500ms ${T}, box-shadow 500ms ${T}`,
                              cursor: "default",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          >
                            <ChannelIcon className="h-3 w-3" />
                            {channel.label}
                          </span>
                          <span className="text-xs text-white/70">
                            {timeAgo(notif.when)}
                          </span>
                        </div>
                      </div>

                      {/* Unread dot */}
                      {!notif.read && (
                        <div
                          className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full shadow-gold animate-pulse-gold"
                          style={{ backgroundColor: "#d4a853" }}
                        />
                      )}
                    </article>
                  );
                })}
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal variant="scale">
              <div className="flex flex-col items-center justify-center rounded-xl bg-navy px-4 py-12 text-center shadow-elevated sm:rounded-3xl sm:px-6 sm:py-20">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 animate-float">
                  <BellOff className="h-8 w-8 text-teal" />
                </div>
                <h2 className="mt-5 font-display text-xl tracking-tighter text-white">
                  No notifications
                </h2>
                <p className="mt-2 max-w-sm text-sm text-white/70">
                  You&apos;re all caught up. New alerts will appear here when
                  there&apos;s activity on your account.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  );
}
