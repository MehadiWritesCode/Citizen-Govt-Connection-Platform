"use server";

import { supabaseServer } from "@/lib/supabase_postgresql/server";
import { redirect } from "next/navigation";

//Nearby services
export async function NearbyServices (userId:string,address:string){
  const supabase = supabaseServer();
  const apiKey = process.env.LOCATIONIQ_API_KEY


  try{
   const  geoResponse = await fetch(`https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(address + ", Bangladesh")}&format=json`)
   const geoData = await geoResponse.json();
   if (!geoData?.[0]) return {ok:false,messsage:"Location not found"};

   const {latitude,longitude} = geoData[0];

   const nearbyResponse = await fetch(`https://us1.locationiq.com/v1/nearby?key=${apiKey}&lat=${latitude}&lon=${longitude}&tag=hospital,police,fire_station&radius=5000&format=json`)
   const nearbyData = await nearbyResponse.json();


  }catch(err){
    
  }
}





//Return type
export type ActionResult =
  | { ok: true}
  | { ok: false; field?: string; message?: string };

//check input strings
function mustString(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}
export async function CreateUser(
  prevState: ActionResult,
  formData: FormData
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

  //Verification
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

  //check duplicate user
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

const {data:authData, error:authError} = await supabase.auth.signUp({
  email:fakeEmail,
  password
});

if(authError) return {ok:false,message:authError.message}

const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password,
    });

  if (signInError) return { ok: false, message: signInError.message };

  const user = signInData.user;
  if (!user) return { ok: false, message: "User session not created" };

//Insert in database
  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    name,
    phone,
    nid,
    age,
    dob,
    address
  });

  if (error) return { ok: false, message: error.message };
  redirect("/user-dashboard");
}



