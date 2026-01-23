"use server"

import { supabaseServer } from "../../../../lib/supabase_postgresql/server";

type ServiceType = "hospital" | "police" | "fire_station";

type LocationIQGeoItem = {
  lat: string;
  lon: string;
  display_name?: string;
  name?: string;
};

type LocationIQSearchItem = {
  lat: string;
  lon: string;
  display_name?: string;
  name?: string;
};

type LocationIQNearbyItem = {
  lat: string;
  lon: string;
  display_name?: string;
  name?: string;
};

type NearbyServiceRow = {
  user_id: string;
  service_name: string;
  service_type: ServiceType;
  map_link: string;
};

type ServiceWithType = (LocationIQSearchItem | LocationIQNearbyItem) & {
  __service_type: ServiceType;
};

export async function NearbyServices(userId: string, address: string) {
  const supabase = supabaseServer();
  const apiKey = process.env.LOCATIONIQ_API_KEY;
  if (!apiKey) return { ok: false, message: "LOCATIONIQ_API_KEY missing" };

  // !---------- helpers ----------
  function normalize(s: string) {
    return (s || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s&]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }


  // ! take name and compare if includes with police,fire,hopital etc then set type
  function inferTypeFromName(nameOrDisplay: string): ServiceType | null {
  const t = normalize(nameOrDisplay);

  // strict hospital keywords
  const hospitalPatterns: RegExp[] = [ // * regular expression
    /\bhospital\b/i,
    /\bmedical\s*college\b/i,
    /\bhealth\s*complex\b/i,
    /\bupazila\s*health\s*complex\b/i,
    /হাসপাতাল/u,
    /মেডিকেল\s*কলেজ/u,
    /স্বাস্থ্য\s*কমপ্লেক্স/u,
    /উপজেলা\s*স্বাস্থ্য\s*কমপ্লেক্স/u,
  ];

  // strict police keywords
  const policePatterns: RegExp[] = [
    /\bpolice\s*station\b/i,
    /\bthana\b/i,
    /থানা/u,
    /পুলিশ\s*স্টেশন/u,
  ];

  // strict fire keywords
  const firePatterns: RegExp[] = [
    /\bfire\s*service\b/i,
    /\bfire\s*station\b/i,
    /\bcivil\s*defen[cs]e\b/i,
    /ফায়ার\s*সার্ভিস/u,
    /ফায়ার\s*সার্ভিস/u,
    /ফায়ার\s*স্টেশন/u,
    /ফায়ার\s*স্টেশন/u,
    /সিভিল\s*ডিফেন্স/u,
  ];

  if (hospitalPatterns.some((re) => re.test(t))) return "hospital";
  if (policePatterns.some((re) => re.test(t))) return "police";
  if (firePatterns.some((re) => re.test(t))) return "fire_station";

  return null;
}


  // ! Safely parse response JSON if response is not valid JSON, return null instead of crashing
  async function safeJson<T>(res: Response): Promise<T | null> {
    try {
      return (await res.json()) as T;
    } catch {
      return null;
    }
  }

  try {
    // ---------- geocode ----------
    const geoResponse = await fetch(
      `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(
        address + ", Bangladesh",
      )}&format=json`,
    );

    const geoData = await safeJson<LocationIQGeoItem[]>(geoResponse);
    if (!Array.isArray(geoData) || !geoData[0])
      return { ok: false, message: "Location not found" };

    const { lat, lon } = geoData[0];

    const latNum = Number(lat);
    const lonNum = Number(lon);

    if (!Number.isFinite(latNum) || !Number.isFinite(lonNum)) {
      return { ok: false, message: "Invalid geocode coordinates" };
    }

    // ! for police station & fire services
    async function searchPoliceFire(pfAddress: string) {
      const delta = 0.2; // ~20km-ish bounding box
      const viewBox = `${lonNum - delta},${latNum - delta},${lonNum + delta},${latNum + delta}`;

      const res = await fetch(
        `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(
          pfAddress,
        )}&format=json&bounded=1&viewbox=${viewBox}&limit=5`,
      );

      const data = await safeJson<LocationIQSearchItem[]>(res);
      return Array.isArray(data) ? data : [];
    }

    // ---------- fetch hospital data ----------
    const nearbyResponse = await fetch(
      `https://us1.locationiq.com/v1/nearby?key=${apiKey}&lat=${lat}&lon=${lon}&tag=hospital&radius=5000&format=json&limit=5`,
    );

    const nearbyData = await safeJson<LocationIQNearbyItem[]>(nearbyResponse);
    const hospitals = Array.isArray(nearbyData) ? nearbyData : [];

    const [policeData, fireData, thanaData, fireServiceData, fireCivilData] =
      await Promise.all([
        searchPoliceFire(`police station ${address}, Bangladesh`),
        searchPoliceFire(`fire station ${address}, Bangladesh`),
        searchPoliceFire(`thana ${address}, Bangladesh`),
        searchPoliceFire(`fire service ${address}, Bangladesh`),
        searchPoliceFire(
          `fire service & civil defence station ${address}, Bangladesh`,
        ),
      ]);

    // ---------- merge all results ----------
    const all: ServiceWithType[] = [
      ...hospitals.map((p) => ({ ...p, __service_type: "hospital" as const })),

      ...policeData.map((p) => ({ ...p, __service_type: "police" as const })),
      ...thanaData.map((p) => ({ ...p, __service_type: "police" as const })),

      ...fireData.map((p) => ({
        ...p,
        __service_type: "fire_station" as const,
      })),
      ...fireServiceData.map((p) => ({
        ...p,
        __service_type: "fire_station" as const,
      })),
      ...fireCivilData.map((p) => ({
        ...p,
        __service_type: "fire_station" as const,
      })),
    ];

    // ----------  ----------
    const seen = new Set<string>();

    const servicesData: NearbyServiceRow[] = all
      .map((p) => {
        const rawName = p.name ?? p.display_name ?? "Unknown";
        const plat = p.lat;
        const plon = p.lon;

       //    if (!isAllowedByName(rawName)) return null;
        const inferred = inferTypeFromName(rawName);
        if (!inferred) return null;

        // basic coordinate guard
        if (!plat || !plon) return null;

        const key = `${rawName}|${plat}|${plon}|${inferred}`;
        if (seen.has(key)) return null;
        seen.add(key);

        return {
          user_id: userId,
          service_name: rawName,
          service_type: inferred,
          map_link: `https://www.google.com/maps/search/?api=1&query=${plat},${plon}`,
        };
      })
      .filter((x): x is NearbyServiceRow => x !== null);

    // ---------- delete old ----------
    const { error: delErr } = await supabase
      .from("nearby")
      .delete()
      .eq("user_id", userId);

    if (delErr) console.log("delete error:", delErr);

    // ---------- if nothing found ----------
    if (!servicesData.length) {
      console.log("No nearby services found");
      return { ok: true, message: "No nearby services found", data: [] };
    }

    // ---------- insert new ----------
    const { error: insErr } = await supabase
      .from("nearby")
      .insert(servicesData);

    if (insErr) {
      console.log("insert error:", insErr);
      return { ok: false, message: "Insert failed", error: insErr };
    }

    console.log("Nearby services data saved");
    return {
      ok: true,
      message: "Nearby services data saved",
      data: servicesData,
    };
  } catch (err) {
    console.log("Nearby services data insert", err);
    return { ok: false, message: "Unexpected error", error: err };
  }
}

