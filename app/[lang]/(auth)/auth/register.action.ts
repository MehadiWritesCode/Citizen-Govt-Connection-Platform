"use server";

import { supabaseServer } from "@/lib/supabase_postgresql/server";
import { redirect } from "next/navigation";

//!------------------- Nearby services ---------------------
export async function NearbyServices(userId: string, address: string) {
  const supabase = supabaseServer();
  const apiKey = process.env.LOCATIONIQ_API_KEY;
  if (!apiKey) return { ok: false, message: "LOCATIONIQ_API_KEY missing" };

  try {
    const geoResponse = await fetch(
      `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(address + ", Bangladesh")}&format=json`,
    );
    const geoData = await geoResponse.json();
    if (!geoData?.[0]) return { ok: false, message: "Location not found" };

    const { lat, lon } = geoData[0];

    //!for police station & fire services
    async function searchPoliceFire(pfAdress: string) {
      const delta = 0.2; //range 20km
      const latNum = Number(lat);
      const lonNum = Number(lon);

      const viewBox = `${lonNum - delta},${latNum - delta},${lonNum + delta},${latNum + delta}`;
      const res = await fetch(
        `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(pfAdress)}&format=json&bounded=1&viewbox=${viewBox}&limit=5`,
      );
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }

    // fetch hospital data
    const nearbyResponse = await fetch(
      `https://us1.locationiq.com/v1/nearby?key=${apiKey}&lat=${lat}&lon=${lon}&tag=hospital&radius=5000&format=json&limit=5`,
    );
    const nearbyData = await nearbyResponse.json();
    const hospitals = Array.isArray(nearbyData) ? nearbyData : [];

    //call searchPoliceFire
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

    // merge all results
    const all = [
      ...hospitals.map((p) => ({ ...p, __service_type: "hospital" })),

      ...policeData.map((p) => ({ ...p, __service_type: "police" })),
      ...thanaData.map((p) => ({ ...p, __service_type: "police" })),

      ...fireData.map((p) => ({ ...p, __service_type: "fire_station" })),
      ...fireServiceData.map((p) => ({ ...p, __service_type: "fire_station" })),
      ...fireCivilData.map((p) => ({ ...p, __service_type: "fire_station" })),
    ];

    //remove duplicate
    const seen = new Set<string>();
    const servicesData = all
      .map((p) => {
        const name = p.name ?? p.display_name ?? "Unknown";
        const plat = p.lat;
        const plon = p.lon;

        const key = `${name}|${plat}|${plon}|${p.__service_type}`;
        if (seen.has(key)) return null;
        seen.add(key);

        return {
          user_id: userId,
          service_name: name,
          service_type: p.__service_type,
          map_link: `https://www.google.com/maps/search/?api=1&query=${plat},${plon}`,
        };
      })
      .filter(Boolean);

    //console.log("sample nearby item:", nearbyData?.[0]);

    const { error: delErr } = await supabase
      .from("nearby")
      .delete()
      .eq("user_id", userId);
    if (delErr) console.log("delete error:", delErr);

    const { error: insErr } = await supabase
      .from("nearby")
      .insert(servicesData);
    if (insErr) console.log("insert error:", insErr);

    console.log("Nearby services data saved");
  } catch (err) {
    console.log("Nearby services data insert", err);
  }
}

//!------------------Registration process ----------------------------------

//Return type
export type ActionResult =
  | { ok: true }
  | { ok: false; field?: string; message?: string };

//check input strings
function mustString(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}
export async function CreateUser(
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = supabaseServer();

  const name = mustString(formData.get("name"));
  const phone = mustString(formData.get("phone"));
  const nid = mustString(formData.get("nid"));
  const ageStr = mustString(formData.get("age"));
  const dob = mustString(formData.get("dob"));
  const address = mustString(formData.get("address"));
  const password = mustString(formData.get("password"));
  const confirmPassword = mustString(formData.get("confirmPassword"));

  const age = ageStr ? Number(ageStr) : null;

  // Verification
  if (!name) return { ok: false, field: "name", message: "Name required" };
  if (!/^01\d{9}$/.test(phone))
    return { ok: false, field: "phone", message: "Invalid phone number" };
  if (![10, 13, 17].includes(nid.length))
    return { ok: false, field: "nid", message: "Invalid NID" };
  if (!dob)
    return { ok: false, field: "dob", message: "Date of birth required" };
  if (!address)
    return { ok: false, field: "address", message: "Address required" };
  if (password.length < 6)
    return { ok: false, field: "password", message: "Password too short" };

  if (password !== confirmPassword)
    return {
      ok: false,
      field: "confirmPassword",
      message: "Password mismatch",
    };

  if (age !== null && (Number.isNaN(age) || age < 0 || age > 120))
    return { ok: false, field: "age", message: "Invalid age" };

  // check duplicate user
  const { data: exist, error: existError } = await supabase
    .from("profiles")
    .select("id")
    .or(`phone.eq.${phone},nid.eq.${nid}`)
    .limit(1);

  if (existError) return { ok: false, message: existError.message };
  if (exist && exist.length > 0)
    return { ok: false, message: "User already exist" };

  // Create Auth User
  const fakeEmail = `${phone}@demo.app`;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: fakeEmail,
    password,
  });

  if (authError) return { ok: false, message: authError.message };

  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password,
    });

  if (signInError) return { ok: false, message: signInError.message };

  const user = signInData.user;
  if (!user) return { ok: false, message: "User session not created" };

  // Insert in database
  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    name,
    phone,
    nid,
    age,
    dob,
    address,
  });

  if (error) return { ok: false, message: error.message };

  await NearbyServices(user.id, address);
  redirect("/user-dashboard");
}
