"use client";

import { useActionState, useMemo, useState } from "react";
import { FileUp, X, CheckCircle2, AlertTriangle } from "lucide-react";

//* import country details data
import divisions from "@/data/divisions.json";
import districts from "@/data/districts.json";
import upazilas from "@/data/upazilas.json";
import unions from "@/data/unions.json";

import type { Category } from "../../types";
import Field from "../ui/Field";
import { createNewReport } from "../actions/createNewReport";

export default function NewReport() {
  const [state, formAction, isPending] = useActionState(createNewReport, null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // divisions , district , zilla , upazilla, union
  const [division, setDivision] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [upazila, setUpazila] = useState<string>("");
  const [union, setUnion] = useState<string>("");

  //filtering logic
  const filteredDistrict = useMemo(
    () => districts.filter((d) => d.division_id === division),
    [division],
  );

  const filteredUpazila = useMemo(
    () => upazilas.filter((u) => u.district_id === district),
    [district],
  );

  const filteredUnion = useMemo(
    () => unions.filter((un) => un.upazilla_id === upazila),
    [upazila],
  );

  const clearSelectedFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById(
      "file",
    ) as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-0 sm:p-4">
      <div className="mx-auto w-full max-w-md sm:max-w-2xl px-0 sm:px-0">
        {/* Simple header */}
        <div className="mb-4 px-1">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            New report
          </h1>

          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Submit an issue with clear location and short details.
          </p>
        </div>
        {/* status message */}
        {state && (
          <div
            className={[
              "mb-4 flex items-start gap-2 rounded-xl border px-3 py-3 text-sm",
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
        {/* Simple form card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-4">
          <form action={formAction} className="space-y-4">
            {/* Category */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900 dark:text-slate-100">
                Category
              </label>

              <Field label="">
                <select
                  name="category"
                  defaultValue={"Road" as Category}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
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
            {/* Evidence (File only) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900 dark:text-slate-100">
                প্রমাণ (ছবি / ভিডিও)
                <span className="text-rose-600">*</span>
              </label>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/40">
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setSelectedFile(f);
                  }}
                  required
                />

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => document.getElementById("file")?.click()}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    <FileUp className="h-4 w-4" />
                    Choose file
                  </button>
                </div>
                {/* Selected file preview */}
                <div className="mt-3">
                  {selectedFile ? (
                    <div className="flex flex-col gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/40 dark:bg-emerald-900/20 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {selectedFile.name}
                        </p>

                        <p className="text-[11px] text-slate-600 dark:text-slate-300">
                          {(selectedFile.size / 1024).toFixed(1)} KB • Selected
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={clearSelectedFile}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 sm:w-auto"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      No file selected yet (required)
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Location */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900 dark:text-slate-100">
                ঘটনাস্থলের ঠিকানা / বিবরণ
              </label>

              <Field label="">
                <input
                  name="location"
                  placeholder="উদাহরণ: যশোর সদর, ব্রিজের পাশে, মসজিদের সামনে"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                  required
                />
              </Field>
            </div>
            {/* // !divisions,district,union,upazila dropdown */}

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* division selection */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-900 dark:text-slate-100">
                    বিভাগ (Division)
                  </label>

                  <select
                    name="division"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"
                    onChange={(e) => {
                      setDivision(e.target.value);
                      setDistrict("");
                      setUpazila("");
                      setUnion("");
                    }}
                    required
                  >
                    <option value="">Select Division</option>

                    {divisions.map((divi) => (
                      <option key={divi.id} value={divi.id}>
                        {divi.bn_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* district selection */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-900 dark:text-slate-100">
                    জেলা (District)
                  </label>

                  <select
                    name="district"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      setUpazila("");
                      setUnion("");
                    }}
                    disabled={!division}
                    required
                  >
                    <option value="">Select District</option>

                    {filteredDistrict.map((dis) => (
                      <option key={dis.id} value={dis.id}>
                        {dis.bn_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* upazila selection */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-900 dark:text-slate-100">
                    উপজেলা (Upazila)
                  </label>

                  <select
                    name="upazila"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"
                    onChange={(e) => {
                      setUpazila(e.target.value);
                      setUnion("");
                    }}
                    disabled={!district}
                    required
                  >
                    <option value="">Select Upazila</option>

                    {filteredUpazila.map((upz) => (
                      <option key={upz.id} value={upz.id}>
                        {upz.bn_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* union selection */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-900 dark:text-slate-100">
                    ইউনিয়ন (Union)
                  </label>

                  <select
                    name="union"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"
                    onChange={(e) => {
                      setUnion(e.target.value);
                    }}
                    disabled={!upazila}
                    required
                  >
                    <option value="">Select Union</option>

                    {filteredUnion.map((uni) => (
                      <option key={uni.id} value={uni.id}>
                        {uni.bn_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Details */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-900 dark:text-slate-100">
                ঘটনার বিস্তারিত তথ্য
              </label>

              <Field label="">
                <textarea
                  name="details"
                  placeholder="কি ঘটেছে, কখন ঘটেছে, এবং বিষয়টি কতটা জরুরি—সংক্ষেপে লিখুন"
                  className="w-full min-h-[160px] rounded-xl border border-slate-200 bg-white px-3 py-3 text-base text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                  required
                />
              </Field>
            </div>
            {/* Actions */}
            <div className="flex flex-col gap-2 pt-1 sm:flex-row">
              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60 sm:flex-1"
              >
                {isPending ? "Submitting..." : "Submit report"}
              </button>

              <button
                type="reset"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 sm:w-auto"
                onClick={clearSelectedFile}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
