"use client";

import React, { useId, useMemo, useState } from "react";
import {
  MapPin,
  CheckCircle2,
  Plus,
  Minus,
  Navigation2,
  Search,
  Info,
  ShieldAlert,
  Moon,
  Eye,
  Zap,
  Layers,
  LocateFixed,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

type MapMode = "safe-route" | "all-reports";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SafetyNavigator() {
  const [mapMode, setMapMode] = useState<MapMode>("safe-route");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedPin, setSelectedPin] = useState<null | "critical">(null);
  const patternId = useId();

  const stats = useMemo(
    () => [
      {
        label: "Night safety",
        val: "Optimal",
        icon: <Moon className="w-4 h-4" />,
        tone: "text-blue-700 dark:text-blue-300",
        bg: "bg-blue-50 dark:bg-blue-500/10",
      },
      {
        label: "Lighting",
        val: "High",
        icon: <Zap className="w-4 h-4" />,
        tone: "text-amber-800 dark:text-amber-300",
        bg: "bg-amber-50 dark:bg-amber-500/10",
      },
      {
        label: "Surveillance",
        val: "Active",
        icon: <Eye className="w-4 h-4" />,
        tone: "text-emerald-800 dark:text-emerald-300",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
      },
    ],
    []
  );

  return (
    <section className="bg-white dark:bg-slate-950">
      {/* Official header band */}
      <div className="border-b border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            Safety Navigator • Verified reports • Advisory routing
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Data refresh: <span className="font-semibold text-slate-700 dark:text-slate-200">5 min</span>
          </div>
        </div>
      </div>

      <div className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* Map */}
            <div className="lg:col-span-8">
              <div
                className={cx(
                  "relative overflow-hidden",
                  "rounded-2xl",
                  "border border-slate-200/70 dark:border-slate-800",
                  "bg-slate-100 dark:bg-slate-900",
                  "h-[360px] sm:h-[440px] lg:h-[520px]"
                )}
              >
                {/* Map header row */}
                <div className="absolute top-0 left-0 right-0 z-10">
                  <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950">
                    {/* Mode toggle */}
                    <div className="inline-flex rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-1">
                      <button
                        type="button"
                        onClick={() => setMapMode("safe-route")}
                        className={cx(
                          "px-3 py-2 rounded-lg text-xs font-semibold transition",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30",
                          mapMode === "safe-route"
                            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                        )}
                      >
                        Safe route
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapMode("all-reports")}
                        className={cx(
                          "px-3 py-2 rounded-lg text-xs font-semibold transition",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30",
                          mapMode === "all-reports"
                            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                        )}
                      >
                        All reports
                      </button>
                    </div>

                    {/* Legend */}
                    <div className="hidden sm:flex items-center gap-4 text-xs text-slate-700 dark:text-slate-300">
                      <span className="inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        Verified
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                        Critical
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">Scale · 200m</span>
                    </div>
                  </div>
                </div>

                {/* Map background (calmer / official) */}
                <div className="absolute inset-0 pt-[52px]">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={patternId} width="120" height="120" patternUnits="userSpaceOnUse">
                        <path
                          d="M 120 0 L 0 0 0 120"
                          fill="none"
                          stroke="rgba(148,163,184,0.22)"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>

                    {/* base */}
                    <rect width="100%" height="100%" fill="rgba(241,245,249,1)" />
                    <rect width="100%" height="100%" fill={`url(#${patternId})`} />

                    {/* roads (subtle) */}
                    <path d="M0 150 Q250 150 500 150 T1200 150" stroke="white" strokeWidth="22" fill="none" />
                    <path d="M0 150 Q250 150 500 150 T1200 150" stroke="rgba(148,163,184,0.30)" strokeWidth="1" fill="none" />

                    <path d="M320 -40 L320 820" stroke="white" strokeWidth="22" fill="none" />
                    <path d="M320 -40 L320 820" stroke="rgba(148,163,184,0.30)" strokeWidth="1" fill="none" />

                    <path d="M640 -40 L640 820" stroke="white" strokeWidth="22" fill="none" />
                    <path d="M640 -40 L640 820" stroke="rgba(148,163,184,0.30)" strokeWidth="1" fill="none" />

                    {/* Safe path */}
                    {mapMode === "safe-route" && (
                      <>
                        <path
                          d="M120 460 L320 460 L320 150 L640 150 L640 70"
                          stroke="rgba(16,185,129,0.20)"
                          strokeWidth="14"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <path
                          d="M120 460 L320 460 L320 150 L640 150 L640 70"
                          stroke="#059669"
                          strokeWidth="7"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray="14,10"
                          className="animate-[dash_3s_linear_infinite]"
                        />
                      </>
                    )}

                    {/* report dots */}
                    {mapMode === "all-reports" && (
                      <>
                        <circle cx="470" cy="320" r="18" fill="rgba(239,68,68,0.18)" />
                        <circle cx="470" cy="320" r="7" fill="rgba(239,68,68,0.55)" />
                        <circle cx="540" cy="240" r="14" fill="rgba(245,158,11,0.16)" />
                        <circle cx="540" cy="240" r="6" fill="rgba(245,158,11,0.55)" />
                        <circle cx="250" cy="250" r="12" fill="rgba(59,130,246,0.14)" />
                        <circle cx="250" cy="250" r="5" fill="rgba(59,130,246,0.55)" />
                      </>
                    )}
                  </svg>

                  {/* Markers */}
                  <div className="absolute top-[140px] left-[305px] w-5 h-5 bg-amber-500 rounded-full border-[3px] border-white shadow-sm" />
                  <div className="absolute top-[440px] left-[98px] w-9 h-9 bg-blue-600 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div className="absolute top-[40px] left-[610px] w-9 h-9 bg-emerald-600 rounded-xl border-[3px] border-white shadow-sm flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>

                  {/* Critical pin */}
                  <button
                    type="button"
                    onClick={() => setSelectedPin(selectedPin === "critical" ? null : "critical")}
                    aria-label="Open critical alert details"
                    className="absolute top-[300px] left-[470px]"
                  >
                    <span className="absolute -inset-5 rounded-full bg-red-500/10 animate-pulse" />
                    <span className="relative w-11 h-11 bg-red-600 rounded-2xl flex items-center justify-center border-[3px] border-white shadow-sm">
                      <ShieldAlert className="w-5 h-5 text-white" />
                    </span>
                  </button>

                  {/* Alert card (responsive placement) */}
                  <div
                    className={cx(
                      "absolute z-10 w-[280px] sm:w-[300px]",
                      "left-4 sm:left-[420px]",
                      "bottom-4 sm:top-[360px] sm:bottom-auto",
                      selectedPin === "critical"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none",
                      "transition-all duration-200"
                    )}
                    style={{ filter: "drop-shadow(0 10px 25px rgba(15,23,42,0.12))" }}
                  >
                    <div className="rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 overflow-hidden">
                      <div className="p-4 flex items-start gap-3">
                        <div className="mt-0.5 w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-700 dark:text-red-300">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Critical road damage
                          </p>
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            Area restricted. Crews on site. Recommended detour available.
                          </p>
                          <div className="mt-3 flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                              Reported · 2h ago
                            </span>
                            <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-200">
                              Avoid
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Keyframes */}
                  <style>{`
                    @keyframes dash { to { stroke-dashoffset: -50; } }
                  `}</style>
                </div>

                {/* Controls (no blur, official) */}
                <div className="absolute top-[72px] left-4 z-10 flex flex-col gap-2">
                  {[
                    { icon: <Plus className="w-5 h-5" />, label: "Zoom in" },
                    { icon: <Minus className="w-5 h-5" />, label: "Zoom out" },
                    { icon: <LocateFixed className="w-5 h-5" />, label: "Locate" },
                    { icon: <Layers className="w-5 h-5" />, label: "Layers" },
                  ].map((b) => (
                    <button
                      key={b.label}
                      type="button"
                      aria-label={b.label}
                      className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800
                                 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900
                                 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
                    >
                      {b.icon}
                    </button>
                  ))}
                </div>

                {/* Bottom row */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end gap-3">
                  <div className="max-w-[270px] rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">92</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Safety score
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Zone A · recommended
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 w-[92%]" />
                    </div>
                    <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
                      Based on recent reports, lighting, and patrol activity.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-2xl px-4 py-3 text-sm font-semibold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900
                               hover:opacity-95 active:scale-[0.98] transition flex items-center gap-2
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
                  >
                    <Navigation2 className="w-5 h-5" />
                    Recalculate
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Safety Navigator
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed max-w-[60ch]">
                  Find routes informed by verified reports and maintenance logs. Use{" "}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">All reports</span> to review risk locations.
                </p>
              </div>

              {/* Inputs */}
              <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    type="text"
                    placeholder="Current location"
                    className="w-full rounded-xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 py-3 pl-10 pr-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                    <Navigation2 className="w-5 h-5" />
                  </div>
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    type="text"
                    placeholder="Destination"
                    className="w-full rounded-xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 py-3 pl-10 pr-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30"
                  />
                </div>

                <button
                  type="button"
                  className="w-full rounded-xl py-3 text-sm font-semibold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900
                             hover:opacity-95 active:scale-[0.98] transition flex items-center justify-center gap-2
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
                >
                  <Search className="w-4 h-4" /> Search route
                </button>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Route intelligence
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Updated · 5 min ago
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cx("p-2.5 rounded-xl", stat.bg, stat.tone)}>
                          {stat.icon}
                        </div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {stat.label}
                        </span>
                      </div>

                      <span className={cx("text-xs font-semibold", stat.tone)}>{stat.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Advisory note
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Green routes indicate no reported maintenance issues in the last 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
