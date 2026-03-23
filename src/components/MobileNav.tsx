"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, CreditCard, Handshake, User, Building2, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavTab {
  label: string;
  href: string;
  icon: LucideIcon;
}

const TENANT_TABS: NavTab[] = [
  { label: "Browse", href: "/search", icon: Search },
  { label: "My Pass", href: "/dashboard", icon: CreditCard },
  { label: "Deals", href: "/deals", icon: Handshake },
  { label: "Profile", href: "/account/profile", icon: User },
];

const LANDLORD_TABS: NavTab[] = [
  { label: "Browse", href: "/search", icon: Search },
  { label: "Listings", href: "/landlord", icon: Building2 },
  { label: "Deals", href: "/deals", icon: Handshake },
  { label: "Profile", href: "/account/profile", icon: User },
];

const ADMIN_TABS: NavTab[] = [
  { label: "Overview", href: "/admin", icon: Shield },
  { label: "Listings", href: "/admin/listings", icon: Building2 },
  { label: "Deals", href: "/admin/deals", icon: Handshake },
  { label: "Profile", href: "/account/profile", icon: User },
];

const PUBLIC_TABS: NavTab[] = [
  { label: "Browse", href: "/search", icon: Search },
  { label: "Pricing", href: "/pricing", icon: CreditCard },
  { label: "How It Works", href: "/how-it-works", icon: Handshake },
  { label: "Log In", href: "/login", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("pata-role") : null;
    setRole(stored);
  }, [pathname]);

  const tabs = role === "admin"
    ? ADMIN_TABS
    : role === "landlord"
      ? LANDLORD_TABS
      : role === "tenant"
        ? TENANT_TABS
        : PUBLIC_TABS;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 md:hidden safe-bottom"
      style={{
        background: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderTop: "1px solid rgba(11, 25, 41, 0.06)",
        boxShadow: "0 -4px 24px rgba(11, 25, 41, 0.06)",
      }}
    >
      <ul className="flex items-stretch justify-around px-1">
        {tabs.map(({ label, href, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="touch-press-sm relative flex flex-col items-center gap-0.5 py-3 pt-3"
              >
                {/* Active pill background */}
                {isActive && (
                  <span
                    className="absolute inset-x-2 top-1 bottom-1 rounded-2xl"
                    style={{
                      background: "rgba(212, 168, 83, 0.08)",
                      animation: "scaleIn 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                )}

                {/* Active top indicator bar */}
                <span
                  className="absolute inset-x-4 top-0 h-[2.5px] rounded-full"
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, transparent, #d4a853, transparent)"
                      : "transparent",
                    transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                  }}
                />

                <span className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className="transition-colors duration-300"
                    style={{
                      color: isActive ? "#d4a853" : "#8896A4",
                    }}
                  />
                </span>
                <span
                  className="relative text-[10px] font-semibold leading-tight transition-colors duration-300"
                  style={{
                    color: isActive ? "#B8903D" : "#8896A4",
                  }}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
