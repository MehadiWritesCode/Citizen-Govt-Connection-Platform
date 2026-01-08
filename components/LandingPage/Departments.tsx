import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

type Category = {
  title: string;
  icon: string;
  color: string; // light bg
  darkColor: string; // dark bg
};

const categories: Category[] = [
  {
    title: "Waste Management",
    icon: "♻️",
    color: "bg-emerald-50",
    darkColor: "dark:bg-emerald-900/20",
  },
  {
    title: "Street Lights",
    icon: "💡",
    color: "bg-amber-50",
    darkColor: "dark:bg-amber-900/15",
  },
  {
    title: "Road Repair",
    icon: "🚧",
    color: "bg-blue-50",
    darkColor: "dark:bg-blue-900/15",
  },
  {
    title: "Drainage",
    icon: "💧",
    color: "bg-indigo-50",
    darkColor: "dark:bg-indigo-900/15",
  },
];

export default function Departments() {
  return (
    <section className="py-12 sm:py-14 lg:py-16 px-4 sm:px-6 bg-slate-50/40 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-8 sm:mb-10 gap-5">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Main Departments
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl text-sm leading-relaxed">
              Each report is routed to the right team for faster resolution.
            </p>
          </div>

          <button
            className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm
                       hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors
                       active:scale-[0.98]"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat, i) => (
            <button
              key={i}
              type="button"
              className="group text-left w-full
                         p-5 sm:p-6 rounded-sm
                         bg-white dark:bg-slate-900
                         border border-slate-200/70 dark:border-slate-800
                         hover:bg-slate-50/60 dark:hover:bg-slate-900/70
                         hover:border-slate-300 dark:hover:border-slate-700
                         transition-colors
                         active:scale-[0.99] active:bg-slate-50 dark:active:bg-slate-800"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 ${cat.color} ${cat.darkColor}
                            rounded-md flex items-center justify-center text-2xl
                            mb-4 sm:mb-5`}
              >
                {cat.icon}
              </div>

              <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {cat.title}
              </h4>

              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Active monitoring & dedicated response.
              </p>

              <div className="mt-5 flex justify-between items-center">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  View reports
                </span>
                <div className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-300" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
