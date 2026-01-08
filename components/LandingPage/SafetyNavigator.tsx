"use client";

import React, { useId, useState } from "react";
import {
  MapPin,
  CheckCircle2,
  Plus,
  Navigation2,
  Search,
  Info,
  ShieldAlert,
  Moon,
  Eye,
  Zap,
} from "lucide-react";

type MapMode = "safe-route" | "all-reports";

export default function SafetyNavigator() {
  const [mapMode] = useState<MapMode>("safe-route");
  const patternId = useId(); // unique id to avoid duplicate SVG ids

  return (
    <section className="py-12 sm:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Map */}
          <div
            className="lg:col-span-8 relative rounded-md overflow-hidden
                       border border-slate-200/70 dark:border-slate-800
                       bg-slate-100 dark:bg-slate-900
                       h-[360px] sm:h-[440px] lg:h-[520px]"
          >
            {/* Map background */}
            <div className="absolute inset-0 bg-[#F1F3F4] dark:bg-slate-900">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={patternId} width="100" height="100" patternUnits="userSpaceOnUse">
                    <path
                      d="M 100 0 L 0 0 0 100"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>

                <rect width="100%" height="100%" fill={`url(#${patternId})`} />

                {/* Roads */}
                <path
                  d="M0 150 Q250 150 500 150 T1000 150"
                  stroke="white"
                  strokeWidth="20"
                  fill="none"
                />
                <path d="M300 0 L300 600" stroke="white" strokeWidth="20" fill="none" />
                <path d="M600 0 L600 600" stroke="white" strokeWidth="20" fill="none" />

                {/* Safe Path */}
                {mapMode === "safe-route" && (
                  <path
                    d="M100 450 L300 450 L300 150 L600 150 L600 50"
                    stroke="#10B981"
                    strokeWidth="7"
                    fill="none"
                    strokeDasharray="14,10"
                    // Tailwind arbitrary animation (no styled-jsx needed)
                    className="animate-[dash_3s_linear_infinite]"
                  />
                )}
              </svg>

              {/* Markers */}
              <div className="absolute top-[140px] left-[290px] w-5 h-5 bg-amber-500 rounded-full border-4 border-white dark:border-slate-950 animate-pulse" />
              <div className="absolute top-[440px] left-[90px] w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-slate-950 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <div className="absolute top-[40px] left-[590px] w-8 h-8 bg-emerald-600 rounded-md border-4 border-white dark:border-slate-950 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>

              {/* Critical Alert Pin + tooltip */}
              <div className="absolute top-[300px] left-[450px] group/pin pointer-events-auto cursor-pointer">
                <div className="relative">
                  <div className="absolute -inset-4 bg-red-500/15 rounded-full animate-ping" />
                  <div className="relative w-10 h-10 bg-red-600 rounded-md flex items-center justify-center border-2 border-white dark:border-slate-950">
                    <ShieldAlert className="w-5 h-5 text-white" />
                  </div>

                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52
                               bg-white dark:bg-slate-900
                               p-3 rounded-md border border-slate-200/70 dark:border-slate-800
                               opacity-0 group-hover/pin:opacity-100 transition-opacity"
                  >
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Critical Road Damage
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Area restricted. Crews on site.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <button
                type="button"
                className="w-10 h-10 bg-white dark:bg-slate-900 rounded-md
                           border border-slate-200/70 dark:border-slate-800
                           flex items-center justify-center text-slate-600 dark:text-slate-300
                           hover:bg-slate-50 dark:hover:bg-slate-800
                           active:scale-[0.96] transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>

              <button
                type="button"
                className="w-10 h-10 bg-white dark:bg-slate-900 rounded-md
                           border border-slate-200/70 dark:border-slate-800
                           flex items-center justify-center text-slate-600 dark:text-slate-300
                           hover:bg-slate-50 dark:hover:bg-slate-800
                           active:scale-[0.96] transition-all"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            {/* Bottom overlays */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
              <div
                className="bg-white dark:bg-slate-900 p-3 rounded-md
                           border border-slate-200/70 dark:border-slate-800
                           pointer-events-auto max-w-[230px]"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-md flex items-center justify-center text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                    92
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Safety score
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Zone A · recommended
                    </p>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[92%]" />
                </div>
              </div>

              <div className="pointer-events-auto">
                <button
                  type="button"
                  className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900
                             px-4 py-3 rounded-sm text-sm font-semibold
                             hover:bg-slate-800 dark:hover:bg-slate-200
                             active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <Navigation2 className="w-5 h-5" />
                  Recalculate
                </button>
              </div>
            </div>

            {/* Keyframes for Tailwind arbitrary animation */}
            <style>{`
              @keyframes dash { to { stroke-dashoffset: -50; } }
            `}</style>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Safety Navigator
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-[60ch]">
                Find paths verified by community data and maintenance logs.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Current location"
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800
                             py-3 pl-10 pr-3 rounded-md text-sm
                             text-slate-900 dark:text-slate-100 placeholder:text-slate-400
                             focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                  <Navigation2 className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Destination"
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800
                             py-3 pl-10 pr-3 rounded-md text-sm
                             text-slate-900 dark:text-slate-100 placeholder:text-slate-400
                             focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
                />
              </div>

              <button
                type="button"
                className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900
                           py-3 rounded-sm text-sm font-semibold
                           hover:bg-slate-800 dark:hover:bg-slate-200
                           active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Search route
              </button>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Route intelligence
              </p>

              {[
                {
                  label: "Night safety",
                  val: "Optimal",
                  icon: <Moon className="w-4 h-4" />,
                  tone: "text-blue-600 dark:text-blue-400",
                },
                {
                  label: "Lighting",
                  val: "High",
                  icon: <Zap className="w-4 h-4" />,
                  tone: "text-amber-600 dark:text-amber-400",
                },
                {
                  label: "Surveillance",
                  val: "Active",
                  icon: <Eye className="w-4 h-4" />,
                  tone: "text-emerald-600 dark:text-emerald-400",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-md
                             bg-white dark:bg-slate-900
                             border border-slate-200/70 dark:border-slate-800
                             active:scale-[0.99] transition-transform"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-md bg-slate-50 dark:bg-slate-800 ${stat.tone}`}>
                      {stat.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {stat.label}
                    </span>
                  </div>

                  <span className={`text-xs font-semibold ${stat.tone}`}>{stat.val}</span>
                </div>
              ))}
            </div>

            {/* Info card */}
            <div className="p-4 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Tip
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Green routes indicate no reported maintenance issues in the last 48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
