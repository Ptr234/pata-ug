"use strict";

export default function imageLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // Avoid double-prepending if src already includes the base
  if (base && !src.startsWith(base)) {
    return `${base}${src}`;
  }
  return src;
}
