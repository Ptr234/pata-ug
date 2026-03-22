interface StatusBadgeProps {
  status: string;
}

function getStatusStyles(status: string): string {
  switch (status.toLowerCase().replace(/\s+/g, "_")) {
    case "under_review":
      return "bg-smoke text-slate";
    case "live":
      return "bg-green-light text-green";
    case "expiring":
      return "bg-amber-light text-amber";
    case "expired":
      return "bg-red-light text-red";
    case "rented":
      return "bg-teal-light text-teal";
    case "flagged":
      return "bg-purple-light text-purple";
    default:
      return "bg-smoke text-slate";
  }
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const label = status.includes("_")
    ? status
        .split("_")
        .map((word) => capitalize(word))
        .join(" ")
    : capitalize(status);

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium shadow-soft transition-shadow hover:shadow-card ${getStatusStyles(status)}`}
    >
      {label}
    </span>
  );
}
