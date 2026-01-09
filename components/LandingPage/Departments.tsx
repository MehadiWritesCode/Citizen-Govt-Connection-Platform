import { ArrowRight, ChevronRight, BadgeCheck, Clock3 } from "lucide-react";

type Category = {
  title: string;
  icon: string;
  tone: "emerald" | "amber" | "blue" | "indigo";
  volume: string;
  eta: string;
};

const categories: Category[] = [
  { title: "Waste Management", icon: "♻️", tone: "emerald", volume: "1,240", eta: "< 24h" },
  { title: "Street Lights", icon: "💡", tone: "amber", volume: "860", eta: "24–48h" },
  { title: "Road Repair", icon: "🚧", tone: "blue", volume: "1,020", eta: "48–72h" },
  { title: "Drainage", icon: "💧", tone: "indigo", volume: "540", eta: "24–48h" },
];

function toneClasses(tone: Category["tone"]) {
  const map = {
    emerald: {
      badge: "bg-emerald-50 text-emerald-800 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/20",
      dot: "bg-emerald-600",
    },
    amber: {
      badge: "bg-amber-50 text-amber-900 border-amber-200/60 dark:bg-amber-500/10 dark:text-amber-200 dark:border-amber-500/20",
      dot: "bg-amber-600",
    },
    blue: {
      badge: "bg-blue-50 text-blue-900 border-blue-200/60 dark:bg-blue-500/10 dark:text-blue-200 dark:border-blue-500/20",
      dot: "bg-blue-600",
    },
    indigo: {
      badge: "bg-indigo-50 text-indigo-900 border-indigo-200/60 dark:bg-indigo-500/10 dark:text-indigo-200 dark:border-indigo-500/20",
      dot: "bg-indigo-600",
    },
  };
  return map[tone];
}

export default function Departments() {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14 lg:py-16">
        {/* Header (official style) */}
        <div className="mb-8 sm:mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Service directory
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Main Departments
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              Reports are routed to the appropriate department for verification and resolution.
            </p>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl
                       border border-slate-200/70 dark:border-slate-800
                       bg-white dark:bg-slate-950
                       px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100
                       hover:bg-slate-50 dark:hover:bg-slate-900
                       active:scale-[0.98] transition
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
          >
            View all departments <ArrowRight className="w-4 h-4 opacity-70" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat) => {
            const t = toneClasses(cat.tone);
            return (
              <button
                key={cat.title}
                type="button"
                className="group text-left w-full rounded-2xl
                           border border-slate-200/70 dark:border-slate-800
                           bg-white dark:bg-slate-950
                           hover:bg-slate-50 dark:hover:bg-slate-900/40
                           transition-colors
                           active:scale-[0.99]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30"
              >
                {/* Card header */}
                <div className="p-5 sm:p-6 border-b border-slate-200/70 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`h-12 w-12 rounded-xl border flex items-center justify-center text-2xl ${t.badge}`}
                      >
                        {cat.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {cat.title}
                        </h4>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                          Active monitoring & response
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 h-9 w-9 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-slate-50 dark:group-hover:bg-slate-900 transition">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card meta */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className={`h-2 w-2 rounded-full ${t.dot}`} />
                    Verified routing enabled
                    <BadgeCheck className="w-4 h-4 opacity-80" />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-3">
                      <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                        Open reports
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {cat.volume}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-3">
                      <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <Clock3 className="w-3.5 h-3.5" />
                        Typical response
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {cat.eta}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-2">
                    View reports <ArrowRight className="w-4 h-4 opacity-70" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Small note */}
        <div className="mt-8 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-4">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Departments may prioritize reports marked as <span className="font-semibold">Critical</span> after verification.
          </p>
        </div>
      </div>
    </section>
  );
}
