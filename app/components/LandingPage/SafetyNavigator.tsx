"use client";

import React, { useMemo, useState } from "react";
import {
  MapPin,
  Navigation2,
  Search,
  Info,
  Moon,
  Eye,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { SafetyNavigatorDictionary } from "../../../dict_interface/safety_navigator";
import dynamic from "next/dynamic";
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });


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
  pill: "rounded-full px-2.5 py-1 text-[11px] font-semibold border border-slate-200/70 dark:border-slate-800",
};

interface MapDictionary {
  dict: SafetyNavigatorDictionary;
}

export default function SafetyNavigatorLite({ dict }: MapDictionary) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const stats = useMemo(
    () => [
      {
        label: `${dict.statNightSafetyLabel}`,
        val: `${dict.statNightSafetyValue}`,
        icon: <Moon className="w-4 h-4" />,
        tone: "text-blue-700 dark:text-blue-300",
        bg: "bg-blue-50 dark:bg-blue-500/10",
      },
      {
        label: `${dict.statLightingLabel}`,
        val: `${dict.statLightingValue}`,
        icon: <Zap className="w-4 h-4" />,
        tone: "text-amber-800 dark:text-amber-300",
        bg: "bg-amber-50 dark:bg-amber-500/10",
      },
      {
        label: `${dict.statSurveillanceLabel}`,
        val: `${dict.statSurveillanceValue}`,
        icon: <Eye className="w-4 h-4" />,
        tone: "text-emerald-800 dark:text-emerald-300",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
      },
    ],
    [dict],
  );

  return (
    <section className={ui.shell} id="safeRoutes">
      {/* Slim official strip */}
      <div
        className={cx(
          "border-b",
          "border-slate-200/70 dark:border-slate-800",
          ui.soft,
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div
            className={cx(
              "flex items-center gap-2 text-xs font-semibold",
              ui.textSub,
            )}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            {dict.stripTitle}
          </div>
          <div className={cx("text-xs", ui.textSub)}>
            {dict.dataRefreshLabel}{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {dict.dataRefreshValue}
            </span>
          </div>
        </div>
      </div>

      <div className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Map Column */}
          <div className="lg:col-span-8">
            <div
              className={cx(
                ui.card,
                ui.border,
                "relative overflow-hidden h-[360px] sm:h-[440px] lg:h-[520px]",
              )}
            >
              {/* REAL MAP INTEGRATION */}
              <div className="absolute inset-0 z-0">
                  <LeafletMap alertTitle={dict.alertTitle} alertDesc={dict.alertDesc} />
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <h2
                className={cx(
                  "text-2xl sm:text-3xl font-semibold tracking-tight",
                  ui.text,
                )}
              >
                {dict.sidebarTitle}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {dict.sidebarDescPrefix}{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {dict.sidebarDescHighlight}
                </span>{" "}
                {dict.sidebarDescSuffix}
              </p>
            </div>

            <div className={cx(ui.card, ui.border, "p-4 space-y-3 shadow-sm")}>
              <Field
                icon={<MapPin className="w-5 h-5" />}
                value={from}
                onChange={setFrom}
                placeholder={dict.placeholderFrom}
              />
              <Field
                icon={<Navigation2 className="w-5 h-5" />}
                value={to}
                onChange={setTo}
                placeholder={dict.placeholderTo}
              />
              <button
                type="button"
                className={cx(ui.btn, ui.btnPrimary, "w-full py-3")}
              >
                <Search className="w-4 h-4" /> {dict.searchRouteBtn}
              </button>
            </div>

            {/* Stats & Tips */}
            <div className="space-y-3">
              <p className={cx("text-xs font-semibold", ui.textSub)}>
                {dict.routeIntelligence}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={cx(
                      ui.card,
                      ui.border,
                      "p-4 flex items-center justify-between shadow-sm",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cx("p-2.5 rounded-xl", stat.bg, stat.tone)}
                      >
                        {stat.icon}
                      </div>
                      <span className={cx("text-sm font-semibold", ui.text)}>
                        {stat.label}
                      </span>
                    </div>
                    <span className={cx("text-xs font-semibold", stat.tone)}>
                      {stat.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={cx(ui.soft, ui.border, "rounded-2xl p-4")}>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <p className={cx("text-sm font-semibold", ui.text)}>
                  {dict.advisoryTitle}
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {dict.advisoryText}
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
