"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useState } from "react";
import {
  ArrowLeft,
  UploadCloud,
  Info,
  PhoneCall,
  FileText,
  MapPin,
  AlignLeft,
  Tag,
  Image as ImageIcon,
  X,
  CheckCircle2,
  AlertTriangle,
  FileUp,
  Camera,
} from "lucide-react";

import type { Category } from "../../types";
import PageTitle from "../ui/PageTitle";
import Field from "../ui/Field";
import { createNewReport } from "../actions/createNewReport";
import { toast } from "sonner";

export default function NewReportDesignOnly({
  onBack,
}: {
  onBack: () => void;
}) {
  const [state, formAction, isPending] = useActionState(createNewReport, null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [locationSource, setLocationSource] = useState<"gps" | "none">("none");

  // ! open location access --------------
  const openLocation = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setLocationSource("none");
        toast.error("Geolocation not supported on this device!");
        resolve(false);
        return;
      }
      toast.loading("Getting location...", { id: "loc" });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const la = position.coords.latitude;
          const lo = position.coords.longitude;

          setLat(la);
          setLon(lo);
          setLocationSource("gps");

          toast.success(
            `Location captured ✓ (${la.toFixed(5)}, ${lo.toFixed(5)})`,
            {
              id: "loc",
            },
          );

          resolve(true);
        },
        () => {
          setLocationSource("none");
         // toast.error("Location permission denied!", { id: "loc" });
          resolve(false);
        },
        { enableHighAccuracy: true, timeout: 8000 },
      );
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-2">
            <Link
              href="/report-guidelines"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 sm:inline-flex"
            >
              <FileText className="h-4 w-4" />
              Guidelines
            </Link>

            <a
              href="tel:999"
              aria-label="Call emergency number 999"
              className="inline-flex items-center gap-2 rounded-xl bg-[#D3281B] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40"
            >
              <PhoneCall className="h-4 w-4" />
              Call 999
            </a>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-1 pb-28 pt-5 sm:px-6 lg:grid-cols-12 lg:gap-6">
        {/* Main */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <PageTitle
                title="New report"
                subtitle="Submit an issue with clear location and short details."
              />

              <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:flex">
                <Info className="h-4 w-4" />
                Verified submissions process faster
              </div>
            </div>

            {/* status message */}
            {state && (
              <div
                className={[
                  "mt-4 flex items-start gap-2 rounded-2xl border px-3 py-3 text-sm",
                  state.ok
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-100"
                    : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-100",
                ].join(" ")}
              >
                {state.ok ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-4 w-4" />
                )}
                <div className="leading-5">{state.message}</div>
              </div>
            )}

            <form action={formAction} className="mt-5 space-y-4">
              {/* Section: Category */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <Tag className="h-4 w-4" />
                  Category
                </div>

                <Field label="">
                  <select
                    name="category"
                    defaultValue={"Road" as Category}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    <option value="Road">Road</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Water">Water</option>
                    <option value="Crime">Crime</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>
              </div>

              {/* Section: Evidence */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    <UploadCloud className="h-4 w-4" />
                    Evidence <span className="text-rose-600">*</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-1 sm:p-4 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 shadow-sm dark:bg-slate-800">
                        <ImageIcon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          Upload photo
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Clear evidence helps faster verification.
                        </p>
                      </div>
                    </div>

                    {/* camera input */}
                    <div className="flex items-centergap-2">
                      <input
                        id="cameraFile"
                        type="file"
                        name="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0] ?? null;
                          setSelectedFile(f);
                        }}
                      />

                      {/* file input */}
                      <input
                        id="galleryFile"
                        type="file"
                        name="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0] ?? null;
                          setSelectedFile(f);
                        }}
                      />
                      <div className="flex items-center gap-2">
                        {/* Take Photo (icon) */}
                        <button
                          type="button"
                          onClick={async () => {
                            const ok = await openLocation();
                            if (!ok) {
                              alert(
                                "Location permission required to take photo!",
                              );
                              return;
                            }
                            document.getElementById("cameraFile")?.click();
                          }}
                          className="group inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-800 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur transition hover:-translate-y-[1px] hover:border-slate-300 hover:bg-white hover:shadow-[0_10px_25px_rgba(15,23,42,0.08)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(15,23,42,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/25 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:border-slate-600"
                          aria-label="Take photo"
                          title="Take photo"
                        >
                          <Camera className="h-5 w-5 opacity-90 transition group-hover:opacity-100" />
                        </button>

                        {/* Upload from Gallery (icon) */}
                        <button
                          type="button"
                          onClick={() => {
                            document.getElementById("galleryFile")?.click();
                          }}
                          className="group inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-800 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur transition hover:-translate-y-[1px] hover:border-slate-300 hover:bg-white hover:shadow-[0_10px_25px_rgba(15,23,42,0.08)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(15,23,42,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/30 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:border-slate-600"
                          aria-label="Upload from gallery"
                          title="Upload from gallery"
                        >
                          <FileUp className="h-5 w-5 opacity-90 transition group-hover:opacity-100" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Preview row */}
                  <div className="mt-3">
                    {selectedFile ? (
                      <div className="flex flex-col gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/40 dark:bg-emerald-900/20 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                              {selectedFile.name}
                            </p>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300">
                              {(selectedFile.size / 1024).toFixed(1)} KB •
                              Selected
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            const input = document.getElementById(
                              "file",
                            ) as HTMLInputElement | null;
                            if (input) input.value = "";
                          }}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 sm:w-auto"
                        >
                          <X className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        No file selected yet (required)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section: Location */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <MapPin className="h-4 w-4" />
                  Location
                </div>

                <Field label="">
                  <input
                    name="location"
                    placeholder="e.g., Jessore Sadar — Bridge road"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                  <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    Add a landmark to make it easier to verify.
                  </p>
                </Field>
              </div>

              {/* Section: Details */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <AlignLeft className="h-4 w-4" />
                  Details
                </div>

                <Field label="">
                  <textarea
                    name="details"
                    placeholder="Write what happened + urgency."
                    className="w-full min-h-[140px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                  <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    Example: “Water leakage near market road. Spreading fast.”
                  </p>
                </Field>
              </div>

              {/* Desktop actions (optional, mobile uses sticky bar) */}
              <div className="hidden items-center gap-2 pt-1 sm:flex">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
                >
                  {isPending ? "Submitting..." : "Submit report"}
                </button>

                <button
                  type="reset"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
              </div>

              {/* Location access */}
              <input type="hidden" name="lat" value={lat ?? ""} />
              <input type="hidden" name="lon" value={lon ?? ""} />
              <input
                type="hidden"
                name="location_source"
                value={locationSource}
              />
            </form>
          </div>
        </div>

        {/* Sidebar (Guidance) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-[76px] rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Guidance
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Tips for faster processing.
            </p>

            <div className="mt-4 space-y-3">
              {[
                {
                  title: "Write clear location",
                  desc: "Example: “Jessore Sadar — Bridge road.”",
                },
                {
                  title: "Keep details short",
                  desc: "What happened + urgency.",
                },
                {
                  title: "Emergency",
                  desc: "Call 999 for immediate help.",
                },
              ].map((x) => (
                <div
                  key={x.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40"
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {x.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {x.desc}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/report-guidelines"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 sm:hidden"
            >
              <FileText className="h-4 w-4" />
              Guidelines
            </Link>
          </div>
        </aside>
      </div>

      {/* Sticky bottom action bar (mobile-first) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3">
          <button
            formAction={formAction}
            type="submit"
            disabled={isPending}
            className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>

          <button
            type="reset"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
