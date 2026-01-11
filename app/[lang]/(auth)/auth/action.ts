"use server"

import { supabaseServer } from "../../../../lib/supabase_postgresql/server"

//Return type
  type ActionResult =
  |{ok:true}
  |{ok:false; field?:string; message?:string}

  //check input strings
   function mustString (v:FormDataEntryValue | null){
     return typeof v === "string" ? v.trim() : "";
  }
export default async function CreateUser(formData:FormData):Promise<ActionResult>{
  
  const supabase = supabaseServer();

  const name = mustString(formData.get("name") );
  const phone = mustString(formData.get("phone") );
  const nid = mustString(formData.get("nid") );
  const ageStr = mustString(formData.get("age") );
  const dob = mustString(formData.get("dob") );
  const address = mustString(formData.get("address") );
  const password = mustString(formData.get("password") );
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
    return { ok: false, field: "confirmPassword", message: "Password mismatch" };

  if (age !== null && (Number.isNaN(age) || age < 0 || age > 120))
    return { ok: false, field: "age", message: "Invalid age" };


  //check duplicate user
  return { ok: false, field: "age", message: "Invalid age" };
}
