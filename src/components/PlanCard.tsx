"use client";

import Link from "next/link";
import { Check, Shield, ArrowRight } from "lucide-react";

interface PlanCardProps {
  name: string;
  price: string;
  duration: string;
  features: readonly string[];
  cta: string;
  href?: string;
  popular?: boolean;
  variant?: "client" | "landlord";
}

export default function PlanCard({
  name,
  price,
  duration,
  features,
  cta,
  href,
  popular = false,
  variant = "client",
}: PlanCardProps) {
  const isClient = variant === "client";
  const accent = isClient ? "#0A9396" : "#D4622A";

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-3xl"
      style={{
        background: popular ? "#0B1929" : "rgba(255,255,255,1)",
        boxShadow: popular
          ? "0 24px 48px -12px rgba(11, 25, 41, 0.25)"
          : "0 4px 24px rgba(11, 25, 41, 0.06)",
        transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = popular
          ? "0 32px 64px -16px rgba(11, 25, 41, 0.35)"
          : "0 20px 48px -12px rgba(11, 25, 41, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = popular
          ? "0 24px 48px -12px rgba(11, 25, 41, 0.25)"
          : "0 4px 24px rgba(11, 25, 41, 0.06)";
      }}
    >
      {/* Popular: decorative gradient at top */}
      {popular && (
        <div
          className="h-1"
          style={{
            background: `linear-gradient(90deg, ${accent}, #d4a853, ${accent})`,
          }}
        />
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-8">
        {/* Badge */}
        {popular && (
          <span
            className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white"
            style={{
              background: "linear-gradient(135deg, #d4a853, #B8903D)",
              boxShadow: "0 2px 8px rgba(212, 168, 83, 0.3)",
            }}
          >
            <Shield className="h-3 w-3" />
            Most Popular
          </span>
        )}

        {/* Plan name */}
        <h3
          className="font-display text-xl font-bold"
          style={{ color: popular ? "#fff" : "#0B1929" }}
        >
          {name}
        </h3>

        {/* Price */}
        <div className="mt-4">
          <p
            className="font-display text-4xl font-bold tracking-tight"
            style={{ color: popular ? "#fff" : "#0B1929" }}
          >
            {price}
          </p>
          <p
            className="mt-1 text-sm"
            style={{ color: popular ? "rgba(255,255,255,0.4)" : "#8896A4" }}
          >
            {duration}
          </p>
        </div>

        {/* Divider */}
        <div
          className="my-6 h-px"
          style={{
            background: popular
              ? "rgba(255,255,255,0.08)"
              : "rgba(11, 25, 41, 0.06)",
          }}
        />

        {/* Features */}
        <ul className="flex flex-1 flex-col gap-3.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: popular
                    ? `${accent}25`
                    : `${accent}12`,
                }}
              >
                <Check size={12} style={{ color: accent }} strokeWidth={3} />
              </span>
              <span
                className="text-sm leading-relaxed"
                style={{
                  color: popular
                    ? "rgba(255,255,255,0.65)"
                    : "#4A5568",
                }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={href || "/signup"}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black uppercase tracking-wider text-white"
          style={{
            background: popular
              ? "linear-gradient(135deg, #d4a853, #B8903D)"
              : accent,
            boxShadow: popular
              ? "0 4px 20px rgba(212, 168, 83, 0.3)"
              : `0 4px 16px ${accent}30`,
            transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = popular
              ? "0 8px 32px rgba(212, 168, 83, 0.4)"
              : `0 8px 24px ${accent}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = popular
              ? "0 4px 20px rgba(212, 168, 83, 0.3)"
              : `0 4px 16px ${accent}30`;
          }}
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
