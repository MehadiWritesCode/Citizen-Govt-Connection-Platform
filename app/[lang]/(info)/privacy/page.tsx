"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  Globe,
  Database,
  FileText,
  Bell,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

type SectionKey =
  | "overview"
  | "data"
  | "use"
  | "ai"
  | "sharing"
  | "security"
  | "retention"
  | "rights"
  | "children"
  | "contact";

type Section = {
  key: SectionKey;
  title: string;
  icon: React.ReactNode;
  blurb: string;
};

const SECTIONS: Section[] = [
  {
    key: "overview",
    title: "Overview",
    icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
    blurb:
      "How we protect your information while improving public services through transparent reporting.",
  },
  {
    key: "data",
    title: "What We Collect",
    icon: <Database className="h-4 w-4" aria-hidden="true" />,
    blurb:
      "Account info, reports, media, location (when enabled), and usage diagnostics.",
  },
  {
    key: "use",
    title: "How We Use Data",
    icon: <FileText className="h-4 w-4" aria-hidden="true" />,
    blurb:
      "To route reports, provide updates, measure resolution rates, and improve service quality.",
  },
  {
    key: "ai",
    title: "AI Verification & Services",
    icon: <Eye className="h-4 w-4" aria-hidden="true" />,
    blurb:
      "How AI helps verify authenticity and power chat services (laws, health, farming, education).",
  },
  {
    key: "sharing",
    title: "Sharing & Disclosure",
    icon: <Globe className="h-4 w-4" aria-hidden="true" />,
    blurb:
      "What’s public, what stays private, and when we share with authorities or providers.",
  },
  {
    key: "security",
    title: "Security",
    icon: <Lock className="h-4 w-4" aria-hidden="true" />,
    blurb:
      "Encryption, access controls, monitoring, and incident response practices.",
  },
  {
    key: "retention",
    title: "Retention",
    icon: <Bell className="h-4 w-4" aria-hidden="true" />,
    blurb: "How long we keep data and how deletion is handled.",
  },
  {
    key: "rights",
    title: "Your Rights",
    icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
    blurb: "Access, correction, deletion, objection, and complaint options.",
  },
  {
    key: "children",
    title: "Children’s Privacy",
    icon: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
    blurb: "Extra care for minors and guidance for guardians.",
  },
  {
    key: "contact",
    title: "Contact",
    icon: <ChevronRight className="h-4 w-4" aria-hidden="true" />,
    blurb: "How to reach the Data Protection Officer and submit requests.",
  },
];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function useActiveSection(keys: SectionKey[]) {
  const [active, setActive] = useState<SectionKey>("overview");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const els = keys
      .map((k) => document.getElementById(k))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id as SectionKey);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );
    els.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [keys]);

  return { active, setActive };
}

function scrollToSection(key: SectionKey) {
  const el = document.getElementById(key);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium shadow-sm",
        "border-slate-200 bg-white text-slate-700",
        "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
      )}
    >
      {children}
    </span>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "rounded-xl border p-5 shadow-sm",
        "border-slate-200 bg-white",
        "dark:border-slate-800 dark:bg-slate-950"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cx(
            "mt-0.5 rounded-lg border p-2",
            "border-slate-200 bg-slate-50 text-slate-700",
            "dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          <div className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{kicker}</Badge>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300 sm:text-base">
        {desc}
      </p>
    </div>
  );
}

export default function PrivacyPage() {
  const keys = useMemo(() => SECTIONS.map((s) => s.key), []);
  const { active, setActive } = useActiveSection(keys);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const activeLabel = SECTIONS.find((s) => s.key === active)?.title ?? "Overview";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Top government utility bar */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              Secure Government Service
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              Citizen Government Connection Platform
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge>Privacy</Badge>
            <Badge>Transparency</Badge>
          </div>
        </div>
      </div>

      {/* Header + sticky section nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-slate-800 dark:bg-slate-950/80 dark:supports-[backdrop-filter]:bg-slate-950/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  CGCP
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Privacy & Data Protection
                </div>
              </div>
            </div>

            {/* Mobile TOC button */}
            <button
              type="button"
              className={cx(
                "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2",
                "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 focus:ring-slate-400/50",
                "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 dark:focus:ring-slate-500/50",
                "lg:hidden"
              )}
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open table of contents"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
              <span>Sections</span>
              <span className="ml-2 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                {activeLabel}
              </span>
            </button>

            {/* Desktop inline section chips */}
            <nav className="hidden lg:flex lg:flex-wrap lg:items-center lg:justify-end lg:gap-2">
              {SECTIONS.slice(0, 6).map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setActive(s.key);
                    scrollToSection(s.key);
                  }}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition",
                    active === s.key
                      ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950"
                      : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                  )}
                  aria-current={active === s.key ? "page" : undefined}
                >
                  {s.icon}
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-slate-900/40 dark:bg-black/60"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[92%] max-w-sm bg-white shadow-xl dark:bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-800">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Table of Contents
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Jump to any section
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-2">
              {SECTIONS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setActive(s.key);
                    scrollToSection(s.key);
                    setMobileNavOpen(false);
                  }}
                  className={cx(
                    "w-full rounded-xl border px-3 py-3 text-left transition focus:outline-none focus:ring-2",
                    active === s.key
                      ? // ACTIVE (mobile) — stronger + obvious
                        "border-slate-900 bg-slate-900 text-white ring-2 ring-slate-900/30 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950 dark:ring-slate-100/30"
                      : // INACTIVE (mobile)
                        "border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-400/40 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 dark:focus:ring-slate-500/40"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cx(
                        "mt-0.5 rounded-lg border p-2",
                        active === s.key
                          ? "border-white/20 bg-white/10 text-white dark:border-slate-950/20 dark:bg-slate-950/10 dark:text-slate-950"
                          : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      )}
                    >
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{s.title}</div>
                      <div
                        className={cx(
                          "mt-0.5 text-xs leading-5",
                          active === s.key
                            ? "text-white/80 dark:text-slate-800"
                            : "text-slate-600 dark:text-slate-300"
                        )}
                      >
                        {s.blurb}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Optional: quick “currently viewing” chip at bottom for mobile */}
            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-300">
                  Currently viewing
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  {activeLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left rail (desktop TOC) */}
          <aside className="hidden lg:block">
            <div className="sticky top-[92px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                On this page
              </div>
              <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Active section highlights automatically.
              </div>

              <nav className="mt-4 space-y-1">
                {SECTIONS.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => {
                      setActive(s.key);
                      scrollToSection(s.key);
                    }}
                    className={cx(
                      "group w-full rounded-lg px-3 py-2 text-left text-sm transition",
                      active === s.key
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                        : "text-slate-800 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cx(
                          "inline-flex h-6 w-6 items-center justify-center rounded-md border",
                          active === s.key
                            ? "border-white/20 bg-white/10 text-white dark:border-slate-950/20 dark:bg-slate-950/10 dark:text-slate-950"
                            : "border-slate-200 bg-white text-slate-700 group-hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:group-hover:bg-slate-900"
                        )}
                        aria-hidden="true"
                      >
                        {s.icon}
                      </span>
                      <span className="font-medium">{s.title}</span>
                    </div>
                  </button>
                ))}
              </nav>

              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick note
                </div>
                <p className="mt-1 leading-5">
                  Public transparency metrics (e.g., total reports and resolution rate) are displayed
                  in aggregate. Personal identifiers are not shown publicly unless you choose to
                  share them.
                </p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
            <SectionHeader
              kicker="CGCP Policy"
              title="Privacy Policy"
              desc="CGCP connects citizens with government services through issue reporting, verified submissions, and AI-powered assistance. This policy explains what we collect, how we use it, and your choices."
            />

            {/* Summary Cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <InfoCard
                icon={<Lock className="h-5 w-5" aria-hidden="true" />}
                title="Data Minimization"
              >
                We only collect what’s necessary to deliver services and improve public response.
              </InfoCard>
              <InfoCard
                icon={<Eye className="h-5 w-5" aria-hidden="true" />}
                title="Transparent Reporting"
              >
                Aggregated stats (total issues, % resolved) are shared publicly to increase
                accountability.
              </InfoCard>
              <InfoCard
                icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
                title="Security Controls"
              >
                Encryption, access control, audit trails, and monitoring help protect your
                information.
              </InfoCard>
            </div>

            <div className="mt-10 space-y-12">
              {/* OVERVIEW */}
              <section id="overview" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Overview
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  CGCP is designed for citizen safety, service efficiency, and public trust. We
                  balance transparency with privacy by publishing aggregated performance metrics
                  while limiting personal exposure.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 text-slate-700 dark:text-slate-300"
                      aria-hidden="true"
                    />
                    Reports can include photos/videos to help authorities verify and respond faster.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 text-slate-700 dark:text-slate-300"
                      aria-hidden="true"
                    />
                    You control optional data such as precise location sharing and contact visibility.
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 text-slate-700 dark:text-slate-300"
                      aria-hidden="true"
                    />
                    We aim to comply with applicable data protection laws and public-sector security
                    standards.
                  </li>
                </ul>
              </section>

              {/* DATA */}
              <section id="data" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  What We Collect
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  The exact data we collect depends on what you choose to use.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Account & Contact
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                      <li>Name (optional display name)</li>
                      <li>Phone/email for updates (optional)</li>
                      <li>Authentication identifiers (hashed)</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Reports & Submissions
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                      <li>Issue category, description, time</li>
                      <li>Media (photos/videos) you upload</li>
                      <li>Status updates and authority notes</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Location Data
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                      <li>Approximate area (default)</li>
                      <li>Precise GPS (only if enabled)</li>
                      <li>Place tags (e.g., ward, union, village)</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Usage & Diagnostics
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                      <li>Device/browser information</li>
                      <li>Crash logs and performance metrics</li>
                      <li>Security events (login attempts)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* USE */}
              <section id="use" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  How We Use Data
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      Core service delivery
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>Route reports to the correct authority unit.</li>
                      <li>Notify you about verification, status, and resolution.</li>
                      <li>Display public transparency metrics in aggregate form.</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      Quality, safety, and integrity
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>Detect spam, fraud, and harmful content.</li>
                      <li>Maintain audit trails for public accountability.</li>
                      <li>Analyze recurring issues and high-risk areas (predictive insights).</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      Communications
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>Service updates, security alerts, and policy changes.</li>
                      <li>Optional surveys to improve response effectiveness.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* AI */}
              <section id="ai" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  AI Verification & Services
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  We may use automated systems to help verify report authenticity (e.g., identifying
                  repeated uploads, tampering signals, or inconsistent metadata) and to power
                  citizen-facing assistants.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Verification signals
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                      <li>Media integrity checks (basic authenticity cues)</li>
                      <li>Duplicate and spam detection</li>
                      <li>Risk scoring to prioritize human review</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      AI assistants
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                      <li>Chatbot for laws, health, farming, education</li>
                      <li>Guided complaint filing and status tracking</li>
                      <li>Resource discovery (hospitals, emergency services)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4" aria-hidden="true" />
                    <div>
                      <div className="font-semibold">Important</div>
                      <p className="mt-1 leading-6">
                        AI tools can assist decision-making but do not replace official authority
                        judgment. In sensitive cases (crime, emergencies), human review and official
                        protocols apply.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SHARING */}
              <section id="sharing" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Sharing & Disclosure
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  We share information in a controlled way:
                </p>
                <div className="mt-4 space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Public information
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                      We may display issue counts and resolution percentages publicly. We also may
                      show report details (category, area, timestamp) while minimizing personal
                      identifiers.
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                      <li>Aggregated metrics (default)</li>
                      <li>Location displayed as area/ward level (default)</li>
                      <li>Your name/contact not public unless you opt-in</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Authorities
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                      To resolve issues, relevant departments may receive report data, including
                      media and location. Access is role-based and logged.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Service providers
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                      We may use vetted providers for hosting, analytics, notifications, and
                      security. They process data under contract and only as instructed.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECURITY */}
              <section id="security" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Security
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  We implement technical and organizational measures appropriate to the risk.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <InfoCard icon={<Lock className="h-5 w-5" aria-hidden="true" />} title="Encryption">
                    Data is protected in transit (TLS) and at rest (where applicable), with managed key practices.
                  </InfoCard>
                  <InfoCard icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />} title="Access Controls">
                    Role-based access, least-privilege permissions, and audited administrative actions.
                  </InfoCard>
                  <InfoCard icon={<Bell className="h-5 w-5" aria-hidden="true" />} title="Monitoring">
                    Security monitoring and alerting for suspicious activity, with documented response procedures.
                  </InfoCard>
                  <InfoCard icon={<Eye className="h-5 w-5" aria-hidden="true" />} title="Integrity">
                    Anti-abuse checks help prevent spam submissions and protect platform trust.
                  </InfoCard>
                </div>
              </section>

              {/* RETENTION */}
              <section id="retention" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Retention
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  We keep data only as long as necessary for service delivery, legal obligations, and
                  audit requirements.
                </p>
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Reports may be retained to support investigations, audits, and service improvement.</li>
                    <li>Deletion requests may be limited where legal retention is required.</li>
                    <li>Backups are maintained for resilience and are cycled on a fixed schedule.</li>
                  </ul>
                </div>
              </section>

              {/* RIGHTS */}
              <section id="rights" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Your Rights
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  Depending on applicable laws, you may have rights to access, correct, delete, or object to certain
                  processing.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Common requests
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                      <li>Download a copy of your account data</li>
                      <li>Correct inaccurate personal information</li>
                      <li>Delete your account (where permitted)</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      How to submit
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                      <li>Use the in-app “Privacy Requests” form</li>
                      <li>Email the Data Protection Officer</li>
                      <li>Contact support for urgent concerns</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* CHILDREN */}
              <section id="children" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Children’s Privacy
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  CGCP is intended for general audiences. If local law requires guardian consent for minors,
                  we will apply appropriate safeguards and request consent mechanisms.
                </p>
              </section>

              {/* CONTACT */}
              <section id="contact" className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Contact
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  For questions, requests, or complaints regarding privacy and data protection:
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Data Protection Officer
                    </div>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                      Email: bangladesh.data@CGCP.gov
                    </p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                      Hours: Sun–Thu, 9:00–17:00
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Support
                    </div>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                      Email: bangladesh.support@CGCP.gov
                    </p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                      Emergency reports: use the in-app Emergency flow
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer note */}
            <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                Policy changes
              </div>
              <p className="mt-1 leading-6">
                We may update this policy to reflect improvements or legal changes. Material updates
                will be posted on this page with a revised “Last updated” date.
              </p>
            </div>
          </article>
        </div>
      </main>

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
                href="/terms"
              >
                Terms
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
  );
}
