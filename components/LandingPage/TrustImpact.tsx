// import React from "react";
// import { Users, ShieldCheck, Zap } from "lucide-react";

// type Item = {
//   icon: React.ReactNode;
//   label: string;
//   badge: string;
//   desc: string;
// };

// const items: Item[] = [
//   {
//     icon: <Users className="w-5 h-5" />,
//     label: "Community Verified",
//     badge: "Verified reports",
//     desc: "Reports are confirmed by local residents so the data stays reliable.",
//   },
//   {
//     icon: <ShieldCheck className="w-5 h-5" />,
//     label: "Privacy Protected",
//     badge: "Secure by design",
//     desc: "Your identity and report details stay protected with secure handling.",
//   },
//   {
//     icon: <Zap className="w-5 h-5" />,
//     label: "Priority Routing",
//     badge: "Faster response",
//     desc: "Critical issues are automatically flagged for faster action by teams.",
//   },
// ];

// export default function TrustImpact() {
//   return (
//     <section className="py-12 sm:py-14 lg:py-16 px-4 sm:px-6 bg-white dark:bg-slate-950">
//       <div className="max-w-7xl mx-auto">
//         {/* Header (this makes it obvious it's a Trust section) */}
//         <div className="mb-7 sm:mb-9 flex flex-col gap-2">
//           <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
//             Trust & Impact
//           </p>
//           <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
//             Built for reliability, privacy, and faster resolution.
//           </h2>
//           <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
//             CivicSync combines verified community signals with structured routing so issues get handled
//             quickly—without compromising user privacy.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//           {items.map((item, i) => (
//             <div
//               key={i}
//               className="rounded-md border border-slate-200/70 dark:border-slate-800
//                          bg-white dark:bg-slate-900
//                          p-5 sm:p-6
//                          hover:bg-slate-50/60 dark:hover:bg-slate-900/70
//                          hover:border-slate-300 dark:hover:border-slate-700
//                          transition-colors
//                          active:scale-[0.99]"
//             >
//               <div className="flex items-start gap-4">
//                 {/* Icon */}
//                 <div
//                   className="shrink-0 w-11 h-11 rounded-md
//                              bg-slate-100 dark:bg-slate-800
//                              text-slate-700 dark:text-slate-200
//                              flex items-center justify-center"
//                 >
//                   {item.icon}
//                 </div>

//                 {/* Text */}
//                 <div className="min-w-0">
//                   <div className="flex flex-wrap items-center gap-2">
//                     <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
//                       {item.label}
//                     </h3>
//                     <span
//                       className="text-[11px] font-semibold px-2 py-0.5 rounded-sm
//                                  bg-emerald-50 dark:bg-emerald-900/20
//                                  text-emerald-700 dark:text-emerald-300
//                                  border border-emerald-100 dark:border-emerald-800"
//                     >
//                       {item.badge}
//                     </span>
//                   </div>

//                   <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
//                     {item.desc}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Small trust note (optional but helps “trust section” feel) */}
//         <div className="mt-6 text-xs text-slate-500 dark:text-slate-400">
//           *Trust signals are based on community validation + department activity logs.
//         </div>
//       </div>
//     </section>
//   );
// }




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
    label: "Community Verified",
    badge: "Verification workflow",
    desc: "Reports are cross-checked by local residents and flagged for review when signals conflict.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    label: "Privacy Protected",
    badge: "Secure handling",
    desc: "Identity details are protected with access controls and limited visibility to authorized staff.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Priority Routing",
    badge: "Faster escalation",
    desc: "Critical hazards are automatically routed to the appropriate team with higher urgency.",
  },
];

export default function TrustImpact() {
  return (
    <section className="bg-white dark:bg-slate-950">
      {/* Subtle official band */}
      <div className="border-y border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left summary */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Trust & impact
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15]">
                Built for reliability, privacy, and timely resolution.
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-[60ch]">
                CivicSync combines verified community signals with structured routing and auditable activity logs—so reports can be handled
                quickly without compromising privacy.
              </p>

              {/* Standards mini-card */}
              <div className="mt-5 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-5">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Service standards
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <FileCheck2 className="w-4 h-4 mt-0.5 text-emerald-700 dark:text-emerald-400" />
                    <span>Audit-ready status updates and department activity logs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="w-4 h-4 mt-0.5 text-emerald-700 dark:text-emerald-400" />
                    <span>Access controls to protect sensitive report information.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 mt-0.5 text-emerald-700 dark:text-emerald-400" />
                    <span>Priority routing for safety-critical hazards after verification.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="shrink-0 w-11 h-11 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 flex items-center justify-center">
                        {item.icon}
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                            {item.label}
                          </h3>
                          <span className="text-[11px] font-semibold px-2 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200">
                            {item.badge}
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Note */}
              <p className="mt-5 text-xs text-slate-600 dark:text-slate-400">
                Trust signals are derived from community validation and service-department activity logs where available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
