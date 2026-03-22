"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Building2,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  CreditCard,
  Shield,
  Check,
  AlertCircle,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const T = "cubic-bezier(0.16, 1, 0.3, 1)";

const STEPS = [
  { number: 1, label: "Role", desc: "Choose your account type" },
  { number: 2, label: "Details", desc: "Personal information" },
  { number: 3, label: "Verify", desc: "Identity verification" },
];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form state
  const [role, setRole] = useState<"tenant" | "landlord" | "">("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [idPhoto, setIdPhoto] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canProceedStep1 = role !== "";
  const canProceedStep2 = fullName.trim().length >= 3 && phone.trim().length >= 9;
  const canSubmit = nationalId.trim().length >= 6 && agreed;

  const handleSubmit = () => {
    setSubmitting(true);

    // Store user data in localStorage (matching existing mock pattern)
    const userData = {
      fullName,
      phone: `+256${phone.replace(/^0/, "")}`,
      email,
      nationalId,
      role,
      verificationStatus: "pending" as const, // pending → verified by admin
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("pata-role", role);
    localStorage.setItem("pata-user", JSON.stringify(userData));

    // Redirect to appropriate dashboard after a brief delay
    setTimeout(() => {
      router.push(role === "landlord" ? "/landlord" : "/dashboard");
    }, 1500);
  };

  const labelCls =
    "mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-white/60";
  const inputCls =
    "w-full rounded-xl bg-white/[0.08] px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:bg-white/[0.14] focus:ring-2 focus:ring-gold/30";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="/property_images/houses/house_12.jpg"
        alt="Property in Kampala"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/90 to-navy/85" />
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

      <div className="relative z-10 mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
        <ScrollReveal variant="scale">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-block font-display text-3xl tracking-tight"
            >
              <span className="text-white">pata</span>
              <span className="text-gradient-gold font-extrabold">.ug</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Create your account to get started
            </p>
          </div>

          {/* Progress steps */}
          <div className="mb-8 flex items-center justify-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s.number} className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background:
                      step > s.number
                        ? "linear-gradient(135deg, #d4a853, #B8903D)"
                        : step === s.number
                          ? "rgba(212,168,83,0.2)"
                          : "rgba(255,255,255,0.06)",
                    color:
                      step > s.number
                        ? "#fff"
                        : step === s.number
                          ? "#d4a853"
                          : "rgba(255,255,255,0.4)",
                    boxShadow:
                      step > s.number
                        ? "0 4px 12px rgba(212,168,83,0.3)"
                        : "none",
                    transition: `all 500ms ${T}`,
                  }}
                >
                  {step > s.number ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    s.number
                  )}
                </div>
                <span
                  className="hidden text-[10px] font-bold uppercase tracking-wider sm:inline"
                  style={{
                    color:
                      step >= s.number
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.3)",
                  }}
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className="h-px w-8"
                    style={{
                      background:
                        step > s.number
                          ? "linear-gradient(90deg, #d4a853, #B8903D)"
                          : "rgba(255,255,255,0.1)",
                      transition: `background 500ms ${T}`,
                    }}
                  />
                )}
              </div>
            ))}
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
              {/* ── Step 1: Role ── */}
              {step === 1 && (
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                    I want to...
                  </h2>
                  <p className="mt-2 text-sm text-white/50">
                    Choose how you will use pata.ug
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        id: "tenant" as const,
                        label: "Find a Home",
                        desc: "Browse and rent verified properties across Kampala",
                        icon: Home,
                        accent: "#0A9396",
                      },
                      {
                        id: "landlord" as const,
                        label: "List Properties",
                        desc: "List your properties and connect with verified tenants",
                        icon: Building2,
                        accent: "#D4622A",
                      },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const selected = role === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setRole(opt.id)}
                          className="group rounded-2xl p-6 text-left"
                          style={{
                            background: selected
                              ? `${opt.accent}18`
                              : "rgba(255,255,255,0.04)",
                            border: selected
                              ? `2px solid ${opt.accent}`
                              : "2px solid transparent",
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
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-xl"
                            style={{ background: `${opt.accent}20` }}
                          >
                            <Icon
                              size={24}
                              style={{ color: opt.accent }}
                            />
                          </div>
                          <p
                            className="mt-4 font-display text-lg font-bold tracking-tight"
                            style={{
                              color: selected ? opt.accent : "#fff",
                            }}
                          >
                            {opt.label}
                          </p>
                          <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                            {opt.desc}
                          </p>
                          {selected && (
                            <div
                              className="mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white"
                              style={{ background: opt.accent }}
                            >
                              <Check size={10} /> Selected
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Step 2: Personal Details ── */}
              {step === 2 && (
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                    Your Details
                  </h2>
                  <p className="mt-2 text-sm text-white/50">
                    We need this to set up your account
                  </p>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className={labelCls}>Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={`${inputCls} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm text-white/50">
                          +256
                        </span>
                        <input
                          type="tel"
                          placeholder="700 000 000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`${inputCls} pl-[5.5rem]`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>
                        Email{" "}
                        <span className="text-white/30">(optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. john@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 3: Verify ── */}
              {step === 3 && (
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                    Verify Your Identity
                  </h2>
                  <p className="mt-2 text-sm text-white/50">
                    We verify all users before they can access the platform.
                    This keeps everyone safe.
                  </p>

                  {/* Why we verify */}
                  <div
                    className="mt-5 flex items-start gap-3 rounded-xl p-4"
                    style={{ background: "rgba(10,147,150,0.08)" }}
                  >
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <p className="text-xs leading-relaxed text-white/60">
                      All users must provide a valid National ID for
                      verification. Your account will be reviewed by our team
                      within 24 hours before you can subscribe or transact.
                    </p>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className={labelCls}>National ID Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <input
                          type="text"
                          placeholder="e.g. CM9300012345678A"
                          value={nationalId}
                          onChange={(e) => setNationalId(e.target.value)}
                          className={`${inputCls} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>
                        Upload ID Photo{" "}
                        <span className="text-white/30">(front side)</span>
                      </label>
                      <div
                        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8"
                        style={{
                          borderColor: idPhoto
                            ? "rgba(212,168,83,0.5)"
                            : "rgba(255,255,255,0.1)",
                          background: idPhoto
                            ? "rgba(212,168,83,0.06)"
                            : "rgba(255,255,255,0.02)",
                          transition: `all 500ms ${T}`,
                        }}
                        onClick={() => setIdPhoto("uploaded")}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(212,168,83,0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = idPhoto
                            ? "rgba(212,168,83,0.5)"
                            : "rgba(255,255,255,0.1)";
                        }}
                      >
                        {idPhoto ? (
                          <>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
                              <Check className="h-5 w-5 text-gold" />
                            </div>
                            <p className="mt-3 text-sm font-bold text-gold">
                              ID Photo Uploaded
                            </p>
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-8 w-8 text-white/30" />
                            <p className="mt-3 text-sm font-medium text-white/50">
                              Tap to upload your National ID photo
                            </p>
                            <p className="mt-1 text-[10px] text-white/30">
                              JPEG or PNG, max 5 MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Terms */}
                    <label className="flex cursor-pointer items-start gap-3">
                      <button
                        type="button"
                        onClick={() => setAgreed(!agreed)}
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded"
                        style={{
                          background: agreed
                            ? "linear-gradient(135deg, #d4a853, #B8903D)"
                            : "rgba(255,255,255,0.08)",
                          transition: `all 300ms ${T}`,
                        }}
                      >
                        {agreed && <Check className="h-3 w-3 text-white" />}
                      </button>
                      <span className="text-xs leading-relaxed text-white/50">
                        I confirm the information provided is accurate and I
                        agree to pata.ug&apos;s{" "}
                        <span className="text-gold">Terms of Service</span> and{" "}
                        <span className="text-gold">Privacy Policy</span>
                      </span>
                    </label>
                  </div>

                  {/* Verification status note */}
                  <div
                    className="mt-5 flex items-start gap-3 rounded-xl p-4"
                    style={{ background: "rgba(212,168,83,0.06)" }}
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <p className="text-xs leading-relaxed text-white/50">
                      Your account will be marked as{" "}
                      <span className="font-bold text-amber">
                        Pending Verification
                      </span>{" "}
                      until our team reviews your ID. You can browse listings
                      but cannot subscribe or contact landlords until verified.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div
              className="flex items-center justify-between px-6 py-5 sm:px-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/60"
                  style={{ transition: `color 500ms ${T}` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-medium text-white/60"
                  style={{ transition: `color 500ms ${T}` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#d4a853";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  Already have an account?
                </Link>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={
                    (step === 1 && !canProceedStep1) ||
                    (step === 2 && !canProceedStep2)
                  }
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-30"
                  style={{
                    background: "linear-gradient(135deg, #d4a853, #B8903D)",
                    boxShadow: "0 4px 16px rgba(212,168,83,0.25)",
                    transition: `all 500ms ${T}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(212,168,83,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(212,168,83,0.25)";
                  }}
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit || submitting}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-30"
                  style={{
                    background: submitting
                      ? "rgba(255,255,255,0.1)"
                      : "linear-gradient(135deg, #d4a853, #B8903D)",
                    boxShadow: submitting
                      ? "none"
                      : "0 4px 16px rgba(212,168,83,0.25)",
                    transition: `all 500ms ${T}`,
                  }}
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-gold" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" /> Create Account
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Footer link to login */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-gold"
              style={{ transition: `color 500ms ${T}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#f0d89f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#d4a853";
              }}
            >
              Back to Home <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
