"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "@/components/Img";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Plus,
  ArrowRight,
  Home,
  Search,
  CreditCard,
  HelpCircle,
  Shield,
} from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { getUserProfile } from "@/lib/user";

/* Icon map for nav links */
const NAV_ICONS: Record<string, React.ElementType> = {
  "/search": Search,
  "/pricing": CreditCard,
  "/how-it-works": HelpCircle,
  "/verified": Shield,
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/landlord") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/deals") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/notifications");

  // Persist login state via localStorage
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"tenant" | "landlord" | "admin">("tenant");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("pata-role") : null;
    if (stored) {
      setLoggedIn(true);
      setUserRole(stored as "tenant" | "landlord" | "admin");
    }

    if (isDashboardRoute) {
      const role = pathname.startsWith("/admin") ? "admin" : pathname.startsWith("/landlord") ? "landlord" : "tenant";
      localStorage.setItem("pata-role", role);
      setLoggedIn(true);
      setUserRole(role);
    }
  }, [isDashboardRoute, pathname]);

  const isLoggedInRoute = loggedIn || isDashboardRoute;

  const handleLogout = () => {
    localStorage.removeItem("pata-role");
    setLoggedIn(false);
    setProfileOpen(false);
    router.push("/login");
  };

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = headerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <header
      ref={headerRef}
      onMouseMove={handleMouseMove}
      className="sticky top-0 z-50"
      style={{
        background: scrolled
          ? "rgba(11, 25, 41, 0.88)"
          : "rgba(11, 25, 41, 1)",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        boxShadow: scrolled
          ? "0 8px 40px rgba(11, 25, 41, 0.15), inset 0 -1px 0 rgba(212, 168, 83, 0.06)"
          : "none",
        transition:
          "background 700ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 700ms cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 700ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Cursor-tracking gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(500px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(212, 168, 83, 0.035), transparent 40%)`,
          opacity: scrolled ? 1 : 0,
        }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute inset-x-0 bottom-0 h-[1px]"
        style={{
          background: scrolled
            ? "linear-gradient(90deg, transparent 10%, rgba(212, 168, 83, 0.12) 50%, transparent 90%)"
            : "transparent",
          transition: "background 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <div className="relative mx-auto flex h-14 max-w-7xl items-center px-4 sm:h-16 lg:h-[72px] lg:px-8">
        {/* ═══ Logo ═══ */}
        <Link href="/" className="mr-4 shrink-0 lg:mr-6">
          <Image
            src="/logo/logofordarkbg.png"
            alt="pata.ug"
            width={590}
            height={172}
            className="h-9 w-auto sm:h-10 lg:h-11"
            priority
          />
        </Link>

        {/* ═══ Nav links — spread across full width ═══ */}
        <nav className="hidden flex-1 items-center justify-between lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              pathname.startsWith(link.href + "/");
            const NavIcon = NAV_ICONS[link.href];

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex-1 text-center px-2 py-2.5"
              >
                {/* Hover pill bg */}
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: isActive
                      ? "rgba(212, 168, 83, 0.08)"
                      : "transparent",
                    transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "transparent";
                  }}
                />

                <span className="relative flex items-center gap-2">
                  {NavIcon && (
                    <NavIcon
                      size={14}
                      className={`transition-all duration-500 ${
                        isActive
                          ? "text-gold"
                          : "text-white/60 group-hover:text-white/60"
                      }`}
                    />
                  )}
                  <span
                    className={`text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-500 ${
                      isActive
                        ? "text-gold"
                        : "text-white/55 group-hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </span>

                {/* Underline — gold gradient, center-origin */}
                <span
                  className="absolute inset-x-5 -bottom-0 h-[2px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #d4a853, transparent)",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transition:
                      "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                    transformOrigin: "center",
                  }}
                />
              </Link>
            );
          })}
        </nav>

        {/* ═══ Right section ═══ */}
        <div className="ml-auto flex items-center gap-2 lg:gap-3">
          {/* Landlord-only: List Property CTA (visible on /landlord routes) */}
          {(userRole === "landlord" && loggedIn) && (
            <Link
              href="/landlord/listings/new"
              className="hidden items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold md:inline-flex"
              style={{
                background: "rgba(212, 168, 83, 0.08)",
                border: "1px solid rgba(212, 168, 83, 0.15)",
                transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212, 168, 83, 0.15)";
                e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.3)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(212, 168, 83, 0.08)";
                e.currentTarget.style.borderColor = "rgba(212, 168, 83, 0.15)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Plus size={12} />
              List Property
            </Link>
          )}

          {/* Public pages: Auth buttons (visible when NOT on dashboard/landlord/admin) */}
          {!isLoggedInRoute && (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/70"
                style={{ transition: `all 500ms ${EASE}` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Log In
              </Link>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
                style={{
                  background: "linear-gradient(135deg, #d4a853, #B8903D)",
                  boxShadow: "0 2px 8px rgba(212,168,83,0.25)",
                  transition: `all 500ms ${EASE}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(212,168,83,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(212,168,83,0.25)";
                }}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Notification bell (only on logged-in routes) */}
          {isLoggedInRoute && (
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="group relative p-2"
            style={{
              transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Bell
              size={19}
              className="text-white/50 transition-colors duration-500 group-hover:text-white"
            />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
          </Link>
          )}

          {/* Profile avatar + dropdown (only on logged-in routes) */}
          {isLoggedInRoute && (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="group flex items-center gap-2"
            >
              <div className="relative">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{
                    background: userRole === "admin"
                      ? "linear-gradient(135deg, #d4a853, #B8903D)"
                      : userRole === "landlord"
                        ? "linear-gradient(135deg, #D4622A, #B54E1C)"
                        : "linear-gradient(135deg, #0A9396, #077B7E)",
                    boxShadow: profileOpen
                      ? "0 0 0 2px rgba(212, 168, 83, 0.4)"
                      : "0 0 0 0px rgba(212, 168, 83, 0)",
                    transition:
                      "box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 0 2px rgba(212, 168, 83, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    if (!profileOpen)
                      e.currentTarget.style.boxShadow =
                        "0 0 0 0px rgba(212, 168, 83, 0)";
                  }}
                >
                  {userRole === "admin" ? "AD" : userRole === "landlord" ? "SN" : "JD"}
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-[1.5px] border-navy bg-green" />
              </div>
              <ChevronDown
                size={13}
                className="hidden text-white/70 md:block"
                style={{
                  transform: profileOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition:
                    "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-2xl bg-white"
                style={{
                  boxShadow:
                    "0 24px 80px rgba(11, 25, 41, 0.18), 0 0 1px rgba(11, 25, 41, 0.1)",
                  animation:
                    "fadeInDown 350ms cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
              >
                {/* User header — role-specific */}
                <div className="bg-smoke/50 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{
                        background: userRole === "admin"
                          ? "linear-gradient(135deg, #d4a853, #B8903D)"
                          : userRole === "landlord"
                            ? "linear-gradient(135deg, #D4622A, #B54E1C)"
                            : "linear-gradient(135deg, #0A9396, #077B7E)",
                      }}
                    >
                      {getUserProfile().initials}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-navy">
                        {getUserProfile().fullName}
                      </p>
                      <p className="text-[11px] text-text-muted">
                        {userRole === "admin" ? "Admin Account" : userRole === "landlord" ? "Landlord Account" : "Client Account"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-1.5">
                  {[
                    {
                      href: userRole === "admin" ? "/admin" : userRole === "landlord" ? "/landlord" : "/dashboard",
                      icon: LayoutDashboard,
                      label: "Dashboard",
                    },
                    {
                      href: "/account/profile",
                      icon: User,
                      label: "Profile",
                    },
                    {
                      href: "/notifications",
                      icon: Bell,
                      label: "Notifications",
                      badge: 2,
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm text-navy"
                      style={{
                        transition:
                          "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F7F8FA";
                        e.currentTarget.style.paddingLeft = "24px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.paddingLeft = "20px";
                      }}
                    >
                      <item.icon size={15} className="text-teal" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-smoke/80 py-1.5">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-5 py-2.5 text-sm text-red"
                    style={{
                      transition:
                        "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#FAEAEA";
                      e.currentTarget.style.paddingLeft = "24px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.paddingLeft = "20px";
                    }}
                  >
                    <LogOut size={15} />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
          )}

          {/* ═══ Mobile hamburger ═══ */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl lg:hidden"
            style={{
              background: mobileMenuOpen
                ? "rgba(212, 168, 83, 0.12)"
                : "transparent",
              transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {mobileMenuOpen ? (
              <X
                size={20}
                className="text-gold"
                style={{
                  animation:
                    "scaleIn 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            ) : (
              <Menu
                size={20}
                className="text-white/60"
                style={{
                  animation:
                    "scaleIn 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            )}
          </button>
        </div>
      </div>

      {/* ═══ Mobile menu — full-screen overlay ═══ */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-14 z-40 lg:hidden sm:top-16"
          style={{
            background: "rgba(11, 25, 41, 0.97)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            animation:
              "fadeInDown 350ms cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <div className="flex h-full flex-col px-5 pb-24 pt-6 overflow-y-auto">
            {/* Nav links with icons */}
            <nav className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                const NavIcon = NAV_ICONS[link.href] ?? Home;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`touch-press-sm flex items-center gap-3.5 rounded-2xl px-5 py-4 text-sm font-semibold ${
                      isActive
                        ? "bg-gold/10 text-gold"
                        : "text-white/55 active:bg-white/[0.06]"
                    }`}
                    style={{
                      animation: `fadeInUp 500ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms both`,
                      transition: "background 300ms ease, color 300ms ease",
                    }}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isActive ? "bg-gold/15" : "bg-white/[0.04]"
                      }`}
                    >
                      <NavIcon
                        size={18}
                        className={isActive ? "text-gold" : "text-white/70"}
                      />
                    </span>
                    <span className="flex-1 uppercase tracking-wide">
                      {link.label}
                    </span>
                    {isActive && (
                      <ChevronRight className="h-4 w-4 text-gold/60" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA */}
            <Link
              href="/login"
              className="btn-gold mt-6 w-full justify-center py-4 text-sm"
              style={{
                animation:
                  "fadeInUp 500ms cubic-bezier(0.16, 1, 0.3, 1) 300ms both",
              }}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
