"use client";

import React, { useMemo, useState } from "react";
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

const ui = {
  shell: "bg-white dark:bg-slate-950",
  border: "border border-slate-200/70 dark:border-slate-800",
  card: "rounded-2xl bg-white/80 dark:bg-slate-950/70 backdrop-blur",
  soft: "bg-slate-50/70 dark:bg-slate-900/35",
  textSub: "text-slate-600 dark:text-slate-400",
  text: "text-slate-900 dark:text-slate-100",
  btn: "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50",
  btnPrimary:
    "bg-slate-900 text-white hover:opacity-95 dark:bg-slate-100 dark:text-slate-900",
  btnGhost:
    "bg-white/70 dark:bg-slate-950/60 hover:bg-slate-50 dark:hover:bg-slate-900",
  pill:
    "rounded-full px-2.5 py-1 text-[11px] font-semibold border border-slate-200/70 dark:border-slate-800",
};

export default function SafetyNavigatorLite() {
  const [mapMode, setMapMode] = useState<MapMode>("safe-route");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedPin, setSelectedPin] = useState<null | "critical">(null);

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
    <section className={ui.shell}>
      {/* Slim official strip */}
      <div className={cx("border-b", "border-slate-200/70 dark:border-slate-800", ui.soft)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className={cx("flex items-center gap-2 text-xs font-semibold", ui.textSub)}>
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            Safety Navigator • Verified reports
          </div>
          <div className={cx("text-xs", ui.textSub)}>
            Data refresh:{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">5 min</span>
          </div>
        </div>
      </div>

      <div className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Map */}
          <div className="lg:col-span-8">
            <div
              className={cx(
                ui.card,
                ui.border,
                "relative overflow-hidden h-[360px] sm:h-[440px] lg:h-[520px]"
              )}
            >
              {/* Top bar inside map */}
              <div className={cx("absolute inset-x-0 top-0 z-10", ui.soft, "border-b border-slate-200/70 dark:border-slate-800")}>
                <div className="px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
                  {/* Mode toggle */}
                  <div className={cx(ui.border, "rounded-xl p-1 bg-white/70 dark:bg-slate-950/60")}>
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

                  {/* Minimal legend */}
                  <div className="hidden sm:flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      Verified
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      Critical
                    </span>
                  </div>
                </div>
              </div>

              {/* Map base (CSS-only, super light) */}
              <div
                className="absolute inset-0 pt-[52px]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(148,163,184,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.22) 1px, transparent 1px)",
                  backgroundSize: "120px 120px",
                  backgroundColor: "rgb(241 245 249)",
                }}
              >
                {/* Roads */}
                <div className="absolute inset-x-0 top-[110px] h-[22px] bg-white/90" />
                <div className="absolute inset-x-0 top-[110px] h-px bg-slate-300/40" />
                <div className="absolute left-[32%] top-0 bottom-0 w-[22px] bg-white/90" />
                <div className="absolute left-[32%] top-0 bottom-0 w-px bg-slate-300/40 translate-x-[10px]" />
                <div className="absolute left-[62%] top-0 bottom-0 w-[22px] bg-white/90" />
                <div className="absolute left-[62%] top-0 bottom-0 w-px bg-slate-300/40 translate-x-[10px]" />

                {/* Safe route (div-based dashed line) */}
                {mapMode === "safe-route" && (
                  <>
                    <div className="absolute left-[12%] top-[78%] w-[20%] h-[10px] rounded-full bg-emerald-500/15" />
                    <div className="absolute left-[12%] top-[78%] w-[20%] h-[6px] border-t-[6px] border-emerald-600 border-dashed rounded-full opacity-90" />

                    <div className="absolute left-[32%] top-[30%] w-[10px] h-[48%] rounded-full bg-emerald-500/15" />
                    <div className="absolute left-[32%] top-[30%] w-[6px] h-[48%] border-l-[6px] border-emerald-600 border-dashed rounded-full opacity-90" />

                    <div className="absolute left-[32%] top-[28%] w-[30%] h-[10px] rounded-full bg-emerald-500/15" />
                    <div className="absolute left-[32%] top-[28%] w-[30%] h-[6px] border-t-[6px] border-emerald-600 border-dashed rounded-full opacity-90" />

                    <div className="absolute left-[62%] top-[10%] w-[10px] h-[18%] rounded-full bg-emerald-500/15" />
                    <div className="absolute left-[62%] top-[10%] w-[6px] h-[18%] border-l-[6px] border-emerald-600 border-dashed rounded-full opacity-90" />
                  </>
                )}

                {/* Report dots (all-reports) */}
                {mapMode === "all-reports" && (
                  <>
                    <div className="absolute left-[56%] top-[45%]">
                      <div className="absolute -inset-5 rounded-full bg-red-500/10" />
                      <div className="w-3 h-3 rounded-full bg-red-600 shadow-sm" />
                    </div>
                    <div className="absolute left-[64%] top-[32%]">
                      <div className="absolute -inset-4 rounded-full bg-amber-500/10" />
                      <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
                    </div>
                    <div className="absolute left-[24%] top-[34%]">
                      <div className="absolute -inset-4 rounded-full bg-blue-500/10" />
                      <div className="w-3 h-3 rounded-full bg-blue-600 shadow-sm" />
                    </div>
                  </>
                )}

                {/* Markers */}
                <div className="absolute left-[31%] top-[26%] w-5 h-5 bg-amber-500 rounded-full border-[3px] border-white shadow-sm" />
                <div className="absolute left-[10%] top-[76%] w-9 h-9 bg-blue-600 rounded-2xl border-[3px] border-white shadow-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="absolute left-[60%] top-[8%] w-9 h-9 bg-emerald-600 rounded-2xl border-[3px] border-white shadow-sm flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>

                {/* Critical pin */}
                <button
                  type="button"
                  onClick={() => setSelectedPin(selectedPin === "critical" ? null : "critical")}
                  aria-label="Open critical alert details"
                  className="absolute left-[56%] top-[42%]"
                >
                  <span className="absolute -inset-6 rounded-full bg-red-500/10 animate-pulse" />
                  <span className="relative w-11 h-11 bg-red-600 rounded-2xl flex items-center justify-center border-[3px] border-white shadow-sm">
                    <ShieldAlert className="w-5 h-5 text-white" />
                  </span>
                </button>

                {/* Alert popover */}
                <div
                  className={cx(
                    "absolute z-10 w-[280px] sm:w-[320px]",
                    "left-4 sm:left-[42%]",
                    "bottom-4 sm:top-[52%] sm:bottom-auto",
                    selectedPin === "critical"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none",
                    "transition-all duration-200"
                  )}
                  style={{ filter: "drop-shadow(0 10px 25px rgba(15,23,42,0.12))" }}
                >
                  <div className={cx(ui.card, ui.border, "overflow-hidden")}>
                    <div className="p-4 flex items-start gap-3">
                      <div className="mt-0.5 w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-700 dark:text-red-300">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className={cx("text-sm font-semibold", ui.text)}>
                          Critical road damage
                        </p>
                        <p className={cx("mt-1 text-xs leading-relaxed", ui.textSub)}>
                          Area restricted. Crews on site. Recommended detour available.
                        </p>
                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                          <span className={cx(ui.pill, "bg-slate-50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-200")}>
                            Reported · 2h ago
                          </span>
                          <span className={cx(ui.pill, "bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-200 border-red-200/60 dark:border-red-500/20")}>
                            Avoid
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute top-[68px] left-4 z-10 flex flex-col gap-2">
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
                      className={cx(
                        "w-11 h-11 rounded-2xl flex items-center justify-center",
                        ui.card,
                        ui.border,
                        "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900",
                        "active:scale-[0.98] transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
                      )}
                    >
                      {b.icon}
                    </button>
                  ))}
                </div>

                {/* Bottom bar */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end gap-3">
                  <div className={cx(ui.card, ui.border, "max-w-[270px] p-4")}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                          92
                        </span>
                      </div>
                      <div>
                        <p className={cx("text-sm font-semibold", ui.text)}>Safety score</p>
                        <p className={cx("text-xs", ui.textSub)}>Zone A · recommended</p>
                      </div>
                    </div>

                    <div className="mt-3 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 w-[92%]" />
                    </div>
                    <p className={cx("mt-2 text-[11px]", ui.textSub)}>
                      Based on recent reports, lighting, and patrol activity.
                    </p>
                  </div>

                  <button type="button" className={cx(ui.btn, ui.btnPrimary, "rounded-2xl px-4 py-3")}>
                    <Navigation2 className="w-5 h-5" />
                    Recalculate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <h2 className={cx("text-2xl sm:text-3xl font-semibold tracking-tight", ui.text)}>
                Safety Navigator
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Find routes informed by verified reports and maintenance logs. Use{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">All reports</span>{" "}
                to review risk locations.
              </p>
            </div>

            {/* Inputs (less heavy) */}
            <div className={cx(ui.card, ui.border, "p-4 space-y-3")}>
              <Field
                icon={<MapPin className="w-5 h-5" />}
                value={from}
                onChange={setFrom}
                placeholder="Current location"
              />
              <Field
                icon={<Navigation2 className="w-5 h-5" />}
                value={to}
                onChange={setTo}
                placeholder="Destination"
              />

              <button type="button" className={cx(ui.btn, ui.btnPrimary, "w-full py-3")}>
                <Search className="w-4 h-4" /> Search route
              </button>
            </div>

            {/* Stats (compact) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className={cx("text-xs font-semibold", ui.textSub)}>Route intelligence</p>
                <p className={cx("text-[11px]", ui.textSub)}>Updated · 5 min ago</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className={cx(ui.card, ui.border, "p-4 flex items-center justify-between")}>
                    <div className="flex items-center gap-3">
                      <div className={cx("p-2.5 rounded-xl", stat.bg, stat.tone)}>{stat.icon}</div>
                      <span className={cx("text-sm font-semibold", ui.text)}>{stat.label}</span>
                    </div>
                    <span className={cx("text-xs font-semibold", stat.tone)}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className={cx(ui.soft, ui.border, "rounded-2xl p-4")}>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <p className={cx("text-sm font-semibold", ui.text)}>Advisory note</p>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Green routes indicate no reported maintenance issues in the last 48 hours.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
        {icon}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/70 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 py-3 pl-10 pr-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30"
      />
    </div>
  );
}
