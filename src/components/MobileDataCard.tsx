import React from "react";

export interface MobileDataRow {
  label: string;
  value: React.ReactNode;
}

interface MobileDataCardProps {
  rows: MobileDataRow[];
  status?: React.ReactNode;
  actions?: React.ReactNode;
  accent?: string;
  className?: string;
}

export default function MobileDataCard({
  rows,
  status,
  actions,
  accent = "border-gold/20",
  className = "",
}: MobileDataCardProps) {
  return (
    <div
      className={`rounded-2xl border ${accent} bg-navy p-4 ${className}`}
    >
      {status && <div className="mb-3">{status}</div>}

      <dl className="space-y-2 text-sm">
        {rows.map((row, i) => (
          <div key={i} className="flex items-start justify-between gap-3">
            <dt className="shrink-0 text-white/50">{row.label}</dt>
            <dd className="text-right font-medium text-white">{row.value}</dd>
          </div>
        ))}
      </dl>

      {actions && (
        <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-3">
          {actions}
        </div>
      )}
    </div>
  );
}
