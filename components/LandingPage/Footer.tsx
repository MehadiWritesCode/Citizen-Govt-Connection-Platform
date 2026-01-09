import React from "react";
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Globe,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function FooterGov() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/70 dark:border-slate-800">
      {/* Official portal strip */}
      <div className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/70 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Official city service portal
              </p>
              <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                CivicSync — Reporting, status tracking, and safe-route guidance
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-[70ch]">
                Submit public issues, follow resolution timelines, and access safety advisories from verified sources.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-3 text-sm font-semibold hover:opacity-95 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
            >
              Access Portal
              <ArrowRight className="w-4 h-4 opacity-80" />
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-5 py-3 text-sm font-semibold border border-slate-200/70 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
            >
              Emergency Contacts
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Department / Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                CivicSync Service Desk
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Urban safety & civic reporting
              </p>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-[60ch]">
              Use this portal to file reports, review verified advisories, and track service requests. For immediate danger, contact emergency services.
            </p>

            {/* Address / jurisdiction */}
            <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <MapPin className="w-4 h-4 mt-0.5 text-emerald-700 dark:text-emerald-400" />
              <div className="space-y-0.5">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  City Operations Center
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Zone A · Zone B · Zone C · Serving metropolitan districts
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterLinks
              title="Services"
              links={[
                "Report an Issue",
                "Track Request",
                "Safe Routes",
                "Safety Advisories",
                "Public Notices",
              ]}
            />
            <FooterLinks
              title="Information"
              links={["Service Standards", "Data Policy", "Accessibility", "FAQ", "Status Page"]}
            />
            <FooterLinks
              title="Departments"
              links={["Roads & Transport", "Lighting", "Waste & Sanitation", "Water & Drainage", "Public Safety"]}
            />
          </div>

          {/* Emergency / Contact box */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-5 space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Contact & emergency
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  For urgent hazards, call the emergency hotline.
                </p>
              </div>

              <div className="space-y-2">
                <a
                  href="#"
                  className="group flex items-center justify-between gap-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
                >
                  <span className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold">
                    <Phone className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    Emergency hotline
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 text-sm font-semibold">
                    999 / 112
                  </span>
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between gap-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
                >
                  <span className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold">
                    <Mail className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    Service desk
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                    support@civicsync.gov
                  </span>
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between gap-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
                >
                  <span className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold">
                    <Globe className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    Official website
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition" />
                </a>
              </div>

              {/* Optional newsletter (restrained) */}
              <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Notices (optional)
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Receive weekly advisories and service updates.
                </p>

                <div className="mt-3 flex gap-2">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30"
                  />
                  <button className="shrink-0 rounded-xl bg-emerald-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-emerald-700 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40">
                    Subscribe
                  </button>
                </div>

                <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                  This service is informational. Do not use for emergencies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal / bottom */}
        <div className="mt-10 pt-6 border-t border-slate-200/70 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center md:text-left">
            © 2026 CivicSync. An official digital service. Content provided “as is” for public information.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {["Accessibility", "Privacy", "Terms", "Open Data"].map((x) => (
              <a
                key={x}
                href="#"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 rounded"
              >
                {x}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 rounded"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="truncate">{l}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
