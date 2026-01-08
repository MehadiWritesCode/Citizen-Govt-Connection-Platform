import React from "react";
import { Users, ShieldCheck, Zap } from "lucide-react";

type Item = {
  icon: React.ReactNode;
  label: string;
  badge: string;
  desc: string;
};

const items: Item[] = [
  {
    icon: <Users className="w-5 h-5" />,
    label: "Community Verified",
    badge: "Verified reports",
    desc: "Reports are confirmed by local residents so the data stays reliable.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    label: "Privacy Protected",
    badge: "Secure by design",
    desc: "Your identity and report details stay protected with secure handling.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Priority Routing",
    badge: "Faster response",
    desc: "Critical issues are automatically flagged for faster action by teams.",
  },
];

export default function TrustImpact() {
  return (
    <section className="py-12 sm:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header (this makes it obvious it's a Trust section) */}
        <div className="mb-7 sm:mb-9 flex flex-col gap-2">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            Trust & Impact
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
            Built for reliability, privacy, and faster resolution.
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            CivicSync combines verified community signals with structured routing so issues get handled
            quickly—without compromising user privacy.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-200/70 dark:border-slate-800
                         bg-white dark:bg-slate-900
                         p-5 sm:p-6
                         hover:bg-slate-50/60 dark:hover:bg-slate-900/70
                         hover:border-slate-300 dark:hover:border-slate-700
                         transition-colors
                         active:scale-[0.99]"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="shrink-0 w-11 h-11 rounded-md
                             bg-slate-100 dark:bg-slate-800
                             text-slate-700 dark:text-slate-200
                             flex items-center justify-center"
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {item.label}
                    </h3>
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-sm
                                 bg-emerald-50 dark:bg-emerald-900/20
                                 text-emerald-700 dark:text-emerald-300
                                 border border-emerald-100 dark:border-emerald-800"
                    >
                      {item.badge}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small trust note (optional but helps “trust section” feel) */}
        <div className="mt-6 text-xs text-slate-500 dark:text-slate-400">
          *Trust signals are based on community validation + department activity logs.
        </div>
      </div>
    </section>
  );
}
