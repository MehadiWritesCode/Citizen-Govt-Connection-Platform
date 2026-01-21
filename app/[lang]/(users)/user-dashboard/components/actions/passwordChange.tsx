"use server"

import { supabaseServer } from "@/lib/supabase_postgresql/server"

type response = {
  ok:boolean,
  message:string
}| null

export const ActionPassswordChange =async (prevState:response,formData:FormData):Promise<response>=>{

  const supabase = supabaseServer();

  const currentPassword = String(formData.get("currentPassword"));
    const newPassword = String(formData.get("newPassword"));

    if (!currentPassword || currentPassword.trim() === "" || !newPassword || newPassword.trim() === "") {
     return {
      ok: false,
      message: "Invalid Information"
     };
   }

   if(currentPassword === newPassword) return {ok:false,message:"New Password Must be different from Old"}
   
   const {data:{user}} = await supabase.auth.getUser();
   if(!user) return {ok:false,message:"User not found"}

   const email = user.email;
   if(!email) return {ok:false,message:"User Not Found!"}

   const {error:signInErr} = await supabase.auth.signInWithPassword({
    email,
    password:currentPassword
   })
   if(signInErr) return {ok:false,message:"Wrong Password"}

   const {error:updateError} = await supabase.auth.updateUser({
    password:newPassword
   })
   if(updateError) return {ok:false,message:updateError.message}

   return {ok:true,message:"Password Changed !"}
}
