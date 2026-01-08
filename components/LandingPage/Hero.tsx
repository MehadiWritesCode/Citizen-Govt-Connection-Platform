"use client";

import React from "react";
import { ArrowRight, Navigation, Plus, Zap, Clock, Activity } from "lucide-react";

type HeroProps = {
  activeTab: "recent" | "resolved";
  setActiveTab: React.Dispatch<React.SetStateAction<"recent" | "resolved">>;
};

export default function Hero({ activeTab, setActiveTab }: HeroProps) {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-14 lg:pb-16 px-4 sm:px-6 overflow-hidden bg-white dark:bg-slate-950">
      {/* Softer background blobs (less blur + less opacity) */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[520px] h-[520px] sm:w-[600px] sm:h-[600px] bg-emerald-50 dark:bg-emerald-950 rounded-full blur-[160px] -z-10 opacity-35" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] bg-blue-50 dark:bg-blue-950 rounded-full blur-[160px] -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left */}
        <div className="space-y-6 sm:space-y-7">
          {/* Badge: smaller + calmer */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <Zap className="w-4 h-4 fill-emerald-500" />
            Real-time Safety Updates
          </div>

          {/* Headline: reduced sizes */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 leading-[1.12] tracking-tight">
            Empowering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Citizen Action.
            </span>
          </h1>

          {/* Paragraph: less big + nicer reading */}
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-[46ch] font-medium">
            A smarter way to report local issues. Connect directly with city officials and find safer routes home.
          </p>

          {/* Buttons: slightly smaller */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              className="group flex items-center justify-center gap-2.5 bg-emerald-600 text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-md font-bold text-sm
                         hover:bg-emerald-700 transition-colors
                         active:scale-[0.98] active:bg-emerald-700"
            >
              <Plus className="w-5 h-5" />
              Report New Issue
              <ArrowRight className="w-4.5 h-4.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              className="flex items-center justify-center gap-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200
                         border border-slate-200 dark:border-slate-800
                         px-6 sm:px-7 py-3.5 sm:py-4 rounded-md font-bold text-sm
                         hover:border-emerald-200 dark:hover:border-emerald-700 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/15
                         transition-colors
                         active:scale-[0.98] active:bg-slate-50 dark:active:bg-slate-800"
            >
              <Navigation className="w-5 h-5 text-emerald-600" />
              Safe Route Finder
            </button>
          </div>
        </div>

        {/* Right: Community Feed */}
        <div className="relative">
          <div
            className="bg-white dark:bg-slate-900 rounded-md
                       border border-slate-200 dark:border-slate-800
                       p-5 sm:p-6 md:p-7 relative z-10"
          >
            <div className="flex items-center justify-between mb-5 sm:mb-6 gap-4">
              <div className="space-y-1">
                <h3 className="font-black text-base sm:text-lg text-slate-800 dark:text-slate-100">
                  Community Feed
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Real-time verification
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("recent")}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors active:scale-[0.98] ${
                    activeTab === "recent"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  Recent
                </button>

                <button
                  onClick={() => setActiveTab("resolved")}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors active:scale-[0.98] ${
                    activeTab === "resolved"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  Resolved
                </button>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {[
                { title: "Broken Drainage Pipe", time: "2 mins ago", status: "Critical", icon: "💧", pill: "text-red-600 bg-red-50 dark:bg-red-900/25" },
                { title: "Street Light Outage", time: "15 mins ago", status: "Assigned", icon: "💡", pill: "text-amber-700 bg-amber-50 dark:bg-amber-900/20" },
                { title: "Illegal Dumping", time: "1 hour ago", status: "Verified", icon: "♻️", pill: "text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20" },
                { title: "Pothole Emergency", time: "3 hours ago", status: "Resolving", icon: "🚧", pill: "text-blue-700 bg-blue-50 dark:bg-blue-900/20" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-md
                             border border-slate-200/70 dark:border-slate-800
                             bg-slate-50/70 dark:bg-slate-950/30
                             hover:bg-white dark:hover:bg-slate-900/60
                             transition-colors cursor-pointer
                             active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 bg-white dark:bg-slate-900 rounded-md flex items-center justify-center text-xl border border-slate-200 dark:border-slate-800">
                      {item.icon}
                    </div>

                    <div>
                      <p className="font-bold text-sm text-slate-800 dark:text-slate-100">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.pill}`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating stat: smaller + less attention */}
          <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 p-4 rounded-md border border-slate-200 dark:border-slate-800 z-20 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-md flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 dark:text-slate-100">98%</p>
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Success Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
