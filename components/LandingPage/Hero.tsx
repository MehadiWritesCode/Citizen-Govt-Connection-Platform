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
      pill:
        "text-emerald-900 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-200",
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
    <section className="relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Subtle premium texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.65] dark:opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_48%)] dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.10),transparent_52%)]" />

      {/* Official header band */}
      <div className="relative border-b border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/55">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600/10 ring-1 ring-emerald-600/15 dark:ring-emerald-400/20">
              <ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
            </span>
            <span className="truncate">
              Official civic service • Verified updates • Public reporting
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
            <span>
              Service status:{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Operational
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main hero */}
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-14">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300">
              <Activity className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              City reporting & safety guidance
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-[44px] leading-[1.12]">
              Report issues. Track progress.
              <span className="block mt-1 text-slate-700 dark:text-slate-300">
                Navigate with verified advisories.
              </span>
            </h1>

            <p className="max-w-[60ch] text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
              CivicSync helps residents submit public service reports, follow
              resolution timelines, and access community-verified route safety
              information.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-[0.98] dark:bg-slate-100 dark:text-slate-900 sm:w-auto
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60
                focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
              >
                <Plus className="h-5 w-5" />
                Submit a report
                <ArrowRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200/70 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-slate-50 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:hover:bg-slate-900 sm:w-auto
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50
                focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
              >
                <Navigation className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                Find safe routes
              </button>
            </div>

            {/* Trust metrics row (lighter visual weight) */}
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
              {[
                { k: "Verified updates", v: "Hourly" },
                { k: "Avg response time", v: "< 24h" },
                { k: "Resolution success", v: "98%" },
              ].map((m) => (
                <div
                  key={m.k}
                  className="rounded-2xl border border-slate-200/60 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
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
            <div className="rounded-3xl border border-slate-200/70 bg-white/70 shadow-[0_20px_60px_rgba(2,6,23,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
              {/* Feed header */}
              <div className="border-b border-slate-200/70 bg-white/60 px-5 py-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">
                      Community reports
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      Recent submissions and verified resolutions
                    </p>
                  </div>

                  {/* Tabs */}
                  <div className="inline-flex w-full rounded-2xl border border-slate-200/70 bg-white/80 p-1 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 sm:w-auto">
                    <button
                      onClick={() => setActiveTab("recent")}
                      aria-pressed={activeTab === "recent"}
                      className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition sm:flex-none
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30
                        ${
                          activeTab === "recent"
                            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                            : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                        }`}
                    >
                      Recent
                    </button>
                    <button
                      onClick={() => setActiveTab("resolved")}
                      aria-pressed={activeTab === "resolved"}
                      className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition sm:flex-none
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30
                        ${
                          activeTab === "resolved"
                            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                            : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                        }`}
                    >
                      Resolved
                    </button>
                  </div>
                </div>
              </div>

              {/* Feed list */}
              <div className="space-y-3 p-4 sm:p-6">
                {list.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/55 dark:hover:bg-slate-900/40"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200/70 bg-slate-50 text-xl dark:border-slate-800 dark:bg-slate-900/40">
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {item.title}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${item.pill}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}

                {list.length === 0 && (
                  <div className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/55 dark:text-slate-300">
                    No items found.
                  </div>
                )}
              </div>

              {/* Footnote */}
              <div className="border-t border-slate-200/70 bg-white/60 px-5 py-4 text-xs text-slate-600 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400 sm:px-6">
                Data is community-submitted and may be verified through city
                departments where available.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
