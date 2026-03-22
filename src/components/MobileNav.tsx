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
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-white shadow-elevated md:hidden">
      <ul className="flex h-16 items-center justify-around">
        {tabs.map(({ label, href, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");

          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors ${
                  isActive ? "text-gold" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <span
                  className={`mb-0.5 h-1 w-1 rounded-full transition-colors ${
                    isActive ? "bg-gold" : "bg-transparent"
                  }`}
                />
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[11px] font-medium leading-tight">
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
