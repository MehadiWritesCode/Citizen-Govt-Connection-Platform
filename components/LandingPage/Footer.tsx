import { ShieldCheck, Phone, Mail, Globe, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function FooterGovPremium() {
  return (
    <footer className="relative border-t border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-[#0B1220]">
      {/* soft separator band so it won't blend with previous section */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-b from-transparent to-white/90 dark:to-slate-950/80" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-slate-800/80" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Top row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-sm overflow-hidden bg-white/80 dark:bg-slate-900
                  flex items-center justify-center ring-1 ring-slate-200 dark:ring-slate-800"
          >
            <Image
              src="/images/logo.png"
              alt="App Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>

            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                CivicSync
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Official civic reporting & safety updates
              </p>
            </div>

            {/* Official pill (tiny) */}
            <span className="ml-2 hidden sm:inline-flex items-center rounded-full border border-slate-200/70 bg-slate-50/80 px-2.5 py-1 text-[11px] font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-400">
              Official portal
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 active:scale-[0.98]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50
                         dark:bg-slate-100 dark:text-slate-900"
            >
              Access Portal
              <ExternalLink className="h-4 w-4 opacity-70" />
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-slate-50 active:scale-[0.98]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40
                         dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-100 dark:hover:bg-slate-900"
            >
              Emergency
              <Phone className="h-4 w-4 opacity-80" />
            </a>
          </div>
        </div>

        {/* Divider (premium gradient line) */}
        <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-slate-800/80" />

        {/* Bottom row (very clean) */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Contact inline */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
              999 / 112
            </span>

            <span className="hidden sm:inline-block h-4 w-px bg-slate-200/80 dark:bg-slate-800/80" />

            <a
              href="mailto:support@civicsync.gov"
              className="inline-flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition"
            >
              <Mail className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
              support@civicsync.gov
            </a>

            <span className="hidden sm:inline-block h-4 w-px bg-slate-200/80 dark:bg-slate-800/80" />

            <a
              href="#"
              className="inline-flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition"
            >
              <Globe className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
              Official website
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>
          </div>

          {/* Links inline */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold">
            {["Privacy", "Terms", "Accessibility", "Open Data"].map((x) => (
              <a
                key={x}
                href="#"
                className="text-slate-700 hover:text-slate-900 transition dark:text-slate-300 dark:hover:text-white"
              >
                {x}
              </a>
            ))}
          </div>
        </div>

        {/* Tiny copyright */}
        <p className="mt-6 text-[11px] text-slate-500 dark:text-slate-500">
          © 2026 CivicSync. Official digital service. For emergencies call 999.
        </p>
      </div>
    </footer>
  );
}
