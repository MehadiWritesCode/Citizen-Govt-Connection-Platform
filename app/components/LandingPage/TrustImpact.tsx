import React from "react";
import { Users, ShieldCheck, Zap, FileCheck2, Lock } from "lucide-react";

type Item = {
  icon: React.ReactNode;
  label: string;
  badge: string;
  desc: string;
};

const items: Item[] = [
  {
    icon: <Users className="w-5 h-5" />,
    label: "Community verified",
    badge: "Verification",
    desc: "Cross-checked reports with conflict flags when signals differ.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    label: "Privacy protected",
    badge: "Secure",
    desc: "Access-controlled visibility for sensitive report details.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Priority routing",
    badge: "Faster",
    desc: "Critical hazards escalated to the right team automatically.",
  },
];

export default function TrustImpact() {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
        {/* Header: compact + premium */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-300">
              TRUST & IMPACT
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Reliable by design. Private by default.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Built with verification signals, access control, and audit-ready activity logs.
            </p>
          </div>

          {/* Small stats row: looks premium, low text */}
          <div className="grid grid-cols-2 gap-3 sm:max-w-md sm:ml-auto">
            <MiniStat
              icon={<FileCheck2 className="w-4 h-4" />}
              label="Audit logs"
              value="Enabled"
            />
            <MiniStat
              icon={<Lock className="w-4 h-4" />}
              label="Data access"
              value="Restricted"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition
                         hover:border-slate-300 hover:shadow-md
                         dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 ring-1 ring-emerald-600/15 text-emerald-700 dark:text-emerald-300 dark:ring-emerald-400/20">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800
                                 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tiny note (optional, very minimal) */}
        <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
          Signals are based on community validation and department activity where available.
        </p>
      </div>
    </section>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span className="text-emerald-700 dark:text-emerald-300">{icon}</span>
          {label}
        </span>
        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
          {value}
        </span>
      </div>
    </div>
  );
}
