"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "@/components/Img";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Mail,
  Lock,
  ArrowRight,
  Home,
  Building2,
  Linkedin,
} from "lucide-react";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const ROLES = [
  {
    id: "tenant",
    label: "Tenant",
    desc: "Browse & rent properties",
    icon: Home,
    href: "/dashboard",
    accent: "#0A9396",
    accentLight: "rgba(10,147,150,0.12)",
  },
  {
    id: "landlord",
    label: "Landlord",
    desc: "List & manage properties",
    icon: Building2,
    href: "/landlord",
    accent: "#D4622A",
    accentLight: "rgba(212,98,42,0.12)",
  },
] as const;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    "tenant" | "landlord" | ""
  >("");

  const inputCls =
    "w-full rounded-xl bg-white/[0.08] px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:bg-white/[0.14] focus:ring-2 focus:ring-gold/30";

  const handleLogin = () => {
    const role = ROLES.find((r) => r.id === selectedRole);
    if (!role) return;

    localStorage.setItem("pata-role", role.id);

    // Load default profile if user hasn't signed up before
    const existing = localStorage.getItem("pata-user");
    if (!existing) {
      const defaultUser = {
        fullName:
          role.id === "landlord" ? "Sarah Namutebi" : "John Doe",
        phone:
          role.id === "landlord" ? "+256772200200" : "+256700100100",
        email:
          email ||
          (role.id === "landlord"
            ? "sarah.namutebi@email.com"
            : "john.doe@email.com"),
        nationalId: "",
        role: role.id,
        verificationStatus: "verified",
      };
      localStorage.setItem("pata-user", JSON.stringify(defaultUser));
    }

    router.push(role.href);
  };

  const canLogin = email.trim().length > 0 && selectedRole !== "";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="/property_images/houses/house_12.jpg"
        alt="Property in Kampala"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/90 to-navy/85" />

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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(212,168,83,0.08),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-md px-4 py-8 sm:px-6 sm:py-16">
        <ScrollReveal variant="scale">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/logofordarkbg.png"
                alt="pata.ug"
                width={590}
                height={172}
                className="mx-auto h-14 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Sign in to your account
            </p>
          </div>

          {/* Card */}
          <div
            className="overflow-hidden rounded-3xl"
            style={{
              background: "rgba(11, 25, 41, 0.7)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
            }}
          >
            <div className="p-6 sm:p-8">
              {/* Email & Password fields */}
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${inputCls} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inputCls} pl-11`}
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* OAuth buttons */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                {/* Google */}
                <button
                  type="button"
                  className="group flex items-center justify-center gap-2.5 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>

                {/* LinkedIn */}
                <button
                  type="button"
                  className="group flex items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 hover:shadow-lg"
                  style={{ background: "#0A66C2" }}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </button>
              </div>

              {/* Role selection */}
              <div className="mt-6">
                <label className="mb-2.5 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                  Continue as
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {ROLES.map((role) => {
                    const Icon = role.icon;
                    const selected = selectedRole === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className="group rounded-xl p-4 text-left"
                        style={{
                          background: selected
                            ? `${role.accent}18`
                            : "rgba(255,255,255,0.04)",
                          border: selected
                            ? `2px solid ${role.accent}`
                            : "2px solid rgba(255,255,255,0.06)",
                          transition: `all 500ms ${T}`,
                        }}
                        onMouseEnter={(e) => {
                          if (!selected)
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.07)";
                        }}
                        onMouseLeave={(e) => {
                          if (!selected)
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300"
                            style={{
                              background: selected
                                ? `${role.accent}30`
                                : role.accentLight,
                            }}
                          >
                            <Icon
                              size={18}
                              style={{ color: role.accent }}
                            />
                          </div>
                          <div>
                            <p
                              className="text-sm font-bold"
                              style={{
                                color: selected ? role.accent : "#fff",
                              }}
                            >
                              {role.label}
                            </p>
                            <p className="text-[11px] leading-snug text-white/40">
                              {role.desc}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Login button */}
              <button
                type="button"
                onClick={handleLogin}
                disabled={!canLogin}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-30"
                style={{
                  background: canLogin
                    ? "linear-gradient(135deg, #d4a853, #B8903D)"
                    : "rgba(255,255,255,0.06)",
                  boxShadow: canLogin
                    ? "0 4px 16px rgba(212,168,83,0.25)"
                    : "none",
                  transition: `all 500ms ${T}`,
                }}
                onMouseEnter={(e) => {
                  if (canLogin) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(212,168,83,0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  if (canLogin) {
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(212,168,83,0.25)";
                  }
                }}
              >
                Sign In <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-white/50">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-gold transition-colors duration-500 hover:text-gold-dark"
              >
                Sign Up
              </Link>
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white/60 transition-colors duration-500 hover:text-white"
            >
              Back to Home
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
