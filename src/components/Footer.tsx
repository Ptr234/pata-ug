import Link from "next/link";
import Image from "@/components/Img";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:py-16 md:pb-16">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image src="/logo/logofordarkbg.png" alt="pata.ug" width={590} height={172} className="h-10 w-auto sm:h-11" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60 sm:mt-4">
              Find your next home in Uganda
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
              Quick Links
            </h3>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 sm:mt-5 sm:flex-col sm:gap-y-3">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
              Contact
            </h3>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60 sm:mt-5 sm:flex-col sm:gap-y-3">
              <li>
                <a
                  href="mailto:support@pata.ug"
                  className="transition-colors hover:text-gold"
                >
                  support@pata.ug
                </a>
              </li>
              <li>
                <a
                  href="tel:+256700000000"
                  className="transition-colors hover:text-gold"
                >
                  +256 700 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-center text-xs text-white/60">
            &copy; {new Date().getFullYear()} pata.ug. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
