"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  ShieldCheck,
  FileText,
  Lock,
  Scale,
  AlertTriangle,
  Globe,
  Cpu,
  Camera,
  MapPin,
  LifeBuoy,
  ChevronRight,
  Menu,
  X,
  Home as HomeIcon,
  ShieldAlert,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const TOC = [
  { id: "overview", title: "Overview", icon: <FileText className="h-4 w-4" /> },
  {
    id: "eligibility",
    title: "Eligibility & Accounts",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  { id: "reports", title: "Reporting & Content", icon: <Camera className="h-4 w-4" /> },
  { id: "ai", title: "AI Verification & Services", icon: <Cpu className="h-4 w-4" /> },
  { id: "privacy", title: "Privacy & Data", icon: <Lock className="h-4 w-4" /> },
  { id: "geo", title: "Geolocation & Safety", icon: <MapPin className="h-4 w-4" /> },
  { id: "acceptable", title: "Acceptable Use", icon: <AlertTriangle className="h-4 w-4" /> },
  { id: "legal", title: "Legal & Liability", icon: <Scale className="h-4 w-4" /> },
  { id: "international", title: "International Use", icon: <Globe className="h-4 w-4" /> },
  { id: "support", title: "Support & Contact", icon: <LifeBuoy className="h-4 w-4" /> },
];

function cx(...classses: (string | false | null | undefined)[]) {
  return classses.filter(Boolean).join(" ");
}

function useActiveSection(sectionIds: string[], offsetPx = 140) {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const compute = () => {
      ticking = false;

      const y = window.scrollY ?? 0;
      let current = sectionIds[0] ?? "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (top - offsetPx <= y) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(compute);
      }
    };

    // initial compute
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
    };
  }, [sectionIds, offsetPx]);

  return active;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.offsetTop - 96, behavior: "smooth" });
}

function Badge({ children }: React.PropsWithChildren) {
  return (
    <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
      {children}
    </span>
  );
}

type SectionProps = React.PropsWithChildren<{
  id: string;
  title: string;
  subtitle?: string;
}>;

function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl dark:text-slate-100">
          {title}
        </h2>

        {subtitle ? (
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
        {children}
      </div>
      <div className="mt-8 h-px w-full bg-slate-100 dark:bg-slate-800" />
    </section>
  );
}


export default function App() {
  const sectionIds = useMemo(() => TOC.map((t) => t.id), []);
  const active = useActiveSection(sectionIds, 150);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const router = useRouter();
  const lastUpdated = "January 20, 2026";

  // lock body scroll when drawer open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ESC closes mobile drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <div className={cx(dark ? "dark" : "", "min-h-screen")}>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 dark:bg-slate-950 dark:text-slate-100 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-100">
        {/* Official Govt strip */}
        <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-[10px] uppercase tracking-wider text-slate-500 md:px-6 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[8px] text-white">
                <ShieldAlert size={10} />
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Official Portal</span>
              <span className="hidden sm:inline">| CGCP Transparency Initiative</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="cursor-help hover:text-slate-800 dark:hover:text-slate-200" type="button">
                Metrics
              </button>
              <button className="cursor-help hover:text-slate-800 dark:hover:text-slate-200" type="button">
                Accessibility
              </button>

              <button
                type="button"
                onClick={() => setDark((v) => !v)}
                className="ml-2 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                {dark ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </div>

        {/* Header / Sticky Nav */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 md:hidden dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="flex flex-col">
                <h1 className="text-base font-bold tracking-tight md:text-lg">Terms of Service</h1>
                <p className="hidden text-xs text-slate-500 md:block dark:text-slate-400">
                  Reference No: CGCP-2026-TOS-v4
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 md:inline-flex dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </button>

              <button
                type="button"
                onClick={() => scrollToId("privacy")}
                className="rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-200 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:shadow-slate-900/30"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-[80%] max-w-xs bg-white shadow-2xl animate-in slide-in-from-left duration-200 dark:bg-slate-950">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-slate-100">Document Sections</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md p-1 hover:bg-slate-100 dark:hover:bg-slate-900"
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="max-h-[calc(100vh-70px)] overflow-y-auto p-2">
                {TOC.map((item) => {
                  const isActive = active === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        scrollToId(item.id);
                        setMobileOpen(false);
                      }}
                      className={cx(
                        "flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-medium transition-colors",
                        isActive
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                          : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                      )}
                    >
                      <span
                        className={cx(
                          "shrink-0",
                          isActive ? "opacity-100" : "opacity-80"
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.title}</span>
                      {/* Mobile active indicator */}
                      <span
                        className={cx(
                          "h-1.5 w-1.5 rounded-full",
                          isActive
                            ? "bg-emerald-400"
                            : "bg-transparent"
                        )}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content Layout */}
        <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-[260px_1fr] md:gap-10 md:px-6 md:py-12">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Navigation
                  </p>
                </div>
                <nav className="space-y-0.5">
                  {TOC.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToId(item.id)}
                        className={cx(
                          "group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all",
                          isActive
                            ? "bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className={cx(isActive ? "" : "text-slate-400 dark:text-slate-500")}>
                            {item.icon}
                          </span>
                          {item.title}
                        </span>
                        <ChevronRight
                          className={cx(
                            "h-4 w-4 transition-transform",
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                          )}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>
              {/* Citizen support --------------------------- */}
              <div className="rounded-xl bg-green-800 p-4 text-white dark:shadow-indigo-900/30">
                <p className="text-xs font-bold uppercase tracking-wider">Citizen Support</p>
                <p className="mt-2 text-sm font-medium leading-relaxed">
                  Need help understanding these terms? Our citizen advocates are available 24/7.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId("support")}
                  className="mt-4 w-full rounded-lg bg-white/20 py-2 text-xs font-bold transition-colors hover:bg-white/30"
                >
                  Contact Advocate
                </button>
              </div>
            </div>
          </aside>

          {/* Content Body */}
          <div className="space-y-12">
            {/* Hero Section */}
            <header>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/20">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Legally Binding Agreement
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl dark:text-slate-100">
                CGCPP Terms.
              </h2>

              <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed dark:text-slate-300">
                Establishing a foundation of transparency, accountability, and digital safety for every citizen utilizing government-connected services.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Badge>v4.0.2 Stable</Badge>
                <Badge>Effective: {lastUpdated}</Badge>
                <Badge>GDPR & CCPA Aligned</Badge>
              </div>
            </header>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10 space-y-12 dark:border-slate-800 dark:bg-slate-950">
              <Section
                id="overview"
                title="1. Overview"
                subtitle="The scope of our relationship with citizens."
              >
                <p>
                  CGCP is a public-service digital infrastructure designed to bridge the gap between residents and government agencies. By accessing this platform, you enter into a binding agreement with the CGCP Governance Board.
                </p>
                <p>
                  Our primary mission is to facilitate seamless reporting of infrastructure issues, public health concerns, and administrative feedback while ensuring data integrity through advanced verification.
                </p>
                <div className="bg-slate-50 border-l-4 border-slate-900 p-4 italic text-slate-600 dark:bg-slate-900/40 dark:border-white dark:text-slate-200">
                  We prioritize human safety and accurate data over automated speed.
                </div>
              </Section>

              <Section id="eligibility" title="2. Eligibility & Accounts">
                <p>To maintain a verified account on CGCP, users must meet the following criteria:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Be at least 16 years of age (or have parental consent for educational modules).</li>
                  <li>Provide a valid form of digital identification if requesting Verified Citizen status.</li>
                  <li>Maintain only one active account per individual or business entity.</li>
                </ul>
              </Section>

              <Section id="reports" title="3. Reporting & Content Standards">
                <p>Quality reporting is the backbone of CGCP. All submissions must adhere to the following:</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                    <p className="font-bold text-slate-900 mb-2 dark:text-slate-100">Permitted Content</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Civil infrastructure photos, emergency reports, administrative complaints, and community improvement suggestions.
                    </p>
                  </div>
                  <div className="rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/30">
                    <p className="font-bold text-red-900 mb-2 dark:text-red-200">Prohibited Content</p>
                    <p className="text-xs text-red-700 dark:text-red-200/90">
                      Graphic violence, unauthorized personal information, deepfakes intended to mislead, or commercially-driven spam.
                    </p>
                  </div>
                </div>
              </Section>

              <Section id="ai" title="4. AI Verification & Automated Systems">
                <p>CGCP utilizes proprietary AI models to assist in the rapid verification of reports. This includes:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Media Authentication:</strong> Detection of AI-generated or manipulated images/videos to prevent misinformation.
                  </li>
                  <li>
                    <strong>Priority Routing:</strong> Automated sentiment and urgency analysis to direct critical life-safety reports to emergency dispatchers.
                  </li>
                  <li>
                    <strong>Citizen AI Assistant:</strong> Information bots providing guidance on local laws and health tips. Note: advisory only.
                  </li>
                </ul>
              </Section>

              <Section id="privacy" title="5. Privacy & Data Sovereignty">
                <p>We believe your data belongs to you. Our data handling follows Privacy by Design principles:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Public Metrics:</strong> Only aggregated, non-identifiable data is shown on public transparency dashboards.</li>
                  <li><strong>Encryption:</strong> Personal identifiers are encrypted at rest (AES-256) and protected in transit (TLS).</li>
                  <li><strong>Data Retention:</strong> Reports are archived per statutory limits (typically 7 years) and then permanently purged.</li>
                </ul>
              </Section>

              <Section id="geo" title="6. Geolocation Protocols">
                <p>
                  Precise geolocation is required for infrastructure reporting (e.g., potholes, utility outages). By enabling location services, you grant CGCP permission to share these coordinates with the specific field agency responsible for repairs.
                </p>
                <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300">
                  Tip: You may submit a report without precise GPS, but resolution time may increase and verification may require follow-up.
                </div>
              </Section>

              <Section id="acceptable" title="7. Acceptable Use">
                <p>
                  You agree not to misuse CGCP. The following activities are strictly prohibited:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Attempting to access systems, data, or accounts without authorization.</li>
                  <li>Submitting false reports intended to harass, mislead, or waste public resources.</li>
                  <li>Uploading malware, exploits, or content designed to disrupt service availability.</li>
                  <li>Publishing personal data of others (doxxing) or confidential government identifiers.</li>
                </ul>
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-amber-800 text-xs leading-relaxed dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-200">
                  <strong>Enforcement:</strong> Accounts may be suspended/terminated, and serious abuse may be reported to relevant authorities.
                </div>
              </Section>

              <Section id="legal" title="8. Liability & Jurisdictional Authority">
                <p>
                  CGCP serves as a facilitator. We do not personally perform road repairs or police activities. Liability for service delays generally rests with the responding governmental body, subject to applicable laws.
                </p>
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-amber-800 text-xs leading-relaxed dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-200">
                  <strong>DISCLAIMER:</strong> THE SERVICES ARE PROVIDED AS IS. CGCP DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF ACCURACY, RELIABILITY, OR FITNESS FOR A PARTICULAR PURPOSE.
                </div>
              </Section>

              <Section id="international" title="9. International Use">
                <p>
                  If you access CGCP outside your primary jurisdiction, you are responsible for compliance with local laws, data export restrictions, and lawful basis for processing.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Cross-border Transfers:</strong> May rely on approved transfer mechanisms where required.</li>
                  <li><strong>Sanctions:</strong> Access may be restricted in sanctioned regions or for sanctioned entities.</li>
                </ul>
              </Section>

              <Section id="support" title="10. Support & Contact">
                <p>
                  For account help, report follow-ups, or accessibility accommodations, contact the CGCP help desk.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                    <p className="font-bold text-slate-900 mb-1 dark:text-slate-100">Help Center</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">24/7 guidance, documentation, and incident response procedures.</p>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                    <p className="font-bold text-slate-900 mb-1 dark:text-slate-100">Report Abuse</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Flag misinformation, impersonation, or prohibited content submissions.</p>
                  </div>
                </div>
              </Section>

              {/* Bottom Note */}
              <div className="mt-12 rounded-2xl bg-slate-900 p-8 text-white dark:bg-white dark:text-slate-900">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-bold">Still have questions?</h3>
                    <p className="mt-1 text-sm text-slate-400 dark:text-slate-600">
                      Our transparency report details how we use your data every year.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToId("overview")}
                    className="whitespace-nowrap rounded-lg bg-white px-6 py-2 text-sm font-bold text-slate-900 transition-transform hover:scale-105 active:scale-95 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                  >
                    View 2025 Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-slate-600 dark:text-slate-300 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>CGCP © {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                className="rounded-md px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-900"
                href="/privacy"
              >
                Privacy
              </Link>
              <Link
                className="rounded-md px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-900"
                href="/contact"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
