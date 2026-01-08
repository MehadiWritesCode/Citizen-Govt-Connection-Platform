import React from "react";
import { Globe, Phone, ShieldCheck, ArrowRight, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 pt-12 sm:pt-14 pb-10 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Top CTA (minimal, no blur, no loud colors) */}
        <div className="mb-10 sm:mb-12 rounded-md border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="p-5 sm:p-6 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
            <div className="space-y-1.5 max-w-2xl">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Verified reports • safer navigation
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                Improve your city experience with CivicSync.
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[60ch]">
                Report issues, track progress, and get safer route insights.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-2.5 rounded-sm text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                Join Portal
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>

              <button className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 px-5 py-2.5 rounded-sm text-sm font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-[0.98] transition-all">
                Emergency List
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-sm flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-lg text-slate-900 dark:text-slate-100">
                  Civic<span className="text-emerald-600">Sync</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Urban safety & civic reporting
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[62ch]">
              A calm, transparent way to report city issues and navigate with verified community signals.
            </p>

            {/* Newsletter (quiet) */}
            <div className="rounded-md border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Weekly updates
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Safety alerts & resolution summaries.
              </p>

              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 py-2.5 pl-10 pr-3 rounded-sm text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
                  />
                </div>

                <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-sm text-sm font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all">
                  Subscribe
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6">
            <FooterCol title="Resources" links={["Emergency List", "Guidebook", "Map API", "Status"]} />
            <FooterCol title="Support" links={["Legal Info", "Privacy", "Contact", "Help Center"]} />
            <FooterCol title="Community" links={["Explorer", "Safe Routes", "Departments", "Report Issue"]} />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © 2026 CivicSync Portal.
            </p>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Zone A · Zone B · Zone C
            </div>
          </div>

          <div className="flex gap-3">
            <IconBtn label="Website">
              <Globe className="w-5 h-5" />
            </IconBtn>
            <IconBtn label="Hotline">
              <Phone className="w-5 h-5" />
            </IconBtn>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </p>
      <div className="flex flex-col gap-2">
        {links.map((l) => (
          <a
            key={l}
            href="#"
            className="rounded-sm px-3 py-2 text-sm text-slate-700 dark:text-slate-300
                       border border-slate-100 dark:border-slate-800
                       bg-white dark:bg-slate-950
                       hover:bg-slate-50 dark:hover:bg-slate-900
                       active:scale-[0.98] transition-all flex items-center justify-between"
          >
            {l}
            <ArrowRight className="w-4 h-4 opacity-50" />
          </a>
        ))}
      </div>
    </div>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className="w-10 h-10 rounded-sm border border-slate-200 dark:border-slate-800
                 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400
                 hover:bg-slate-50 dark:hover:bg-slate-900
                 active:scale-[0.96] transition-all flex items-center justify-center"
    >
      {children}
    </button>
  );
}
