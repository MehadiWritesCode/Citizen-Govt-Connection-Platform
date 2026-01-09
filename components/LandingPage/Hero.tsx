"use client";

import React from "react";
import {
  ArrowRight,
  Navigation,
  Plus,
  Clock,
  Activity,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

type HeroProps = {
  activeTab: "recent" | "resolved";
  setActiveTab: React.Dispatch<React.SetStateAction<"recent" | "resolved">>;
};

export default function Hero({ activeTab, setActiveTab }: HeroProps) {
  const items = [
    {
      title: "Broken Drainage Pipe",
      time: "2 mins ago",
      status: "Critical",
      icon: "💧",
      pill: "text-red-800 bg-red-50 dark:bg-red-500/10 dark:text-red-200",
      tab: "recent" as const,
    },
    {
      title: "Street Light Outage",
      time: "15 mins ago",
      status: "Assigned",
      icon: "💡",
      pill: "text-amber-900 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-200",
      tab: "recent" as const,
    },
    {
      title: "Illegal Dumping",
      time: "1 hour ago",
      status: "Verified",
      icon: "♻️",
      pill: "text-emerald-900 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-200",
      tab: "recent" as const,
    },
    {
      title: "Pothole Emergency",
      time: "3 hours ago",
      status: "Resolving",
      icon: "🚧",
      pill: "text-blue-900 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-200",
      tab: "recent" as const,
    },
    {
      title: "Sidewalk Crack Repair",
      time: "Yesterday",
      status: "Resolved",
      icon: "🧱",
      pill: "text-slate-800 bg-slate-100 dark:bg-slate-800 dark:text-slate-200",
      tab: "resolved" as const,
    },
    {
      title: "Traffic Signal Reset",
      time: "2 days ago",
      status: "Resolved",
      icon: "🚦",
      pill: "text-slate-800 bg-slate-100 dark:bg-slate-800 dark:text-slate-200",
      tab: "resolved" as const,
    },
  ];

  const list = items.filter((x) => x.tab === activeTab);

  return (
    <section className="bg-white dark:bg-slate-950">
      {/* Official header band */}
      <div className="border-b border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            Official civic service • Verified updates • Public reporting
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4" />
            Service status: Operational
          </div>
        </div>
      </div>

      {/* Main hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs font-semibold">
              <Activity className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              City reporting & safety guidance
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.12]">
              Report issues. Track progress.
              <span className="block mt-1 text-slate-700 dark:text-slate-300">
                Navigate with verified advisories.
              </span>
            </h1>

            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-[60ch]">
              CivicSync helps residents submit public service reports, follow resolution timelines,
              and access community-verified route safety information.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl
                           bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900
                           px-6 py-3 text-sm font-semibold
                           hover:opacity-95 active:scale-[0.98] transition
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60
                           focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
              >
                <Plus className="w-5 h-5" />
                Submit a report
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl
                           bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100
                           border border-slate-200/70 dark:border-slate-800
                           px-6 py-3 text-sm font-semibold
                           hover:bg-slate-50 dark:hover:bg-slate-900
                           active:scale-[0.98] transition
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50
                           focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
              >
                <Navigation className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                Find safe routes
              </button>
            </div>

            {/* Trust metrics row (more gov than “floating card”) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { k: "Verified updates", v: "Hourly" },
                { k: "Avg response time", v: "< 24h" },
                { k: "Resolution success", v: "98%" },
              ].map((m) => (
                <div
                  key={m.k}
                  className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-4"
                >
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {m.k}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {m.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
              {/* Feed header */}
              <div className="px-5 sm:px-6 py-5 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Community reports
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Recent submissions and verified resolutions
                    </p>
                  </div>

                  {/* Tabs */}
                  <div className="inline-flex w-full sm:w-auto rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-1">
                    <button
                      onClick={() => setActiveTab("recent")}
                      aria-pressed={activeTab === "recent"}
                      className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs font-semibold transition
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30
                        ${
                          activeTab === "recent"
                            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                        }`}
                    >
                      Recent
                    </button>
                    <button
                      onClick={() => setActiveTab("resolved")}
                      aria-pressed={activeTab === "resolved"}
                      className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs font-semibold transition
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30
                        ${
                          activeTab === "resolved"
                            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                        }`}
                    >
                      Resolved
                    </button>
                  </div>
                </div>
              </div>

              {/* Feed list */}
              <div className="p-4 sm:p-6 space-y-3">
                {list.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center text-xl shrink-0">
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold ${item.pill}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}

                {list.length === 0 && (
                  <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                    No items found.
                  </div>
                )}
              </div>

              {/* Footnote */}
              <div className="px-5 sm:px-6 py-4 border-t border-slate-200/70 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/40">
                Data is community-submitted and may be verified through city departments where available.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
