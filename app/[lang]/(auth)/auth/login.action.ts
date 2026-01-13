"use server"
import { redirect } from "next/navigation";
import { supabaseServer } from "../../../../lib/supabase_postgresql/server";

export type LoginActionResult =
  | { ok: true }
  | { ok: false; field?: string; message?: string };
//check input strings
function mustString(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}
export async function SignInUser(
  prevState: LoginActionResult,
  formData: FormData
): Promise<LoginActionResult> {
  const supabase = supabaseServer();

  const phone = mustString(formData.get("phone"));
  const password = mustString(formData.get("password"));

  if (!phone) return { ok: false, field: "phone", message: "Number required" };
  if (password.length < 6)
    return { ok: false, field: "password", message: "Password too short" };

  const fakeEmail = `${phone}@demo.app`;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: fakeEmail,
    password,
  });

  if (error) {
    return {
      ok: false,
      field: "password",
      message: "Phone or password incorrect",
    };
  }

  const userId = data.user?.id;
  if(!userId) return {ok:false,message:"Login Failed"};

  const {data:profile , error:profileError} = await supabase
  .from('profiles')
  .select("id")
  .eq("id",userId)
  .single()

  if(!profile || profileError) return {ok:false ,message:"Profile Not Found!"}

  redirect('/user-dashboard');
}
