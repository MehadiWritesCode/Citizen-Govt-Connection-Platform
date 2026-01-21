"use server"

import { supabaseServer } from "@/lib/supabase_postgresql/server"; //../../../../../..

type response = {
  ok:boolean,
  message:string
}|null

export const handleUpdateProfile = async(prevState:response,formData:FormData):Promise<response>=>{

  const name = String(formData.get("name"));
  const address = String(formData.get("address"));
  const supabase = supabaseServer();

  if (!name || name.trim() === "" || !address || address.trim() === "") {
    return {
      ok: false,
      message: "Invalid Information"
    };
  }

      const {data:{user}} = await supabase.auth.getUser();
      if(!user) return {ok:false,message:"User not found"}
  try{

    const {error} = await supabase
    .from("profiles")
    .update({name:name,address:address})
    .eq("id",user.id)

    if(error) return {ok:false,message:error.message};

    return {ok:true,message:"Profile Updated Successfull!"}
  }catch(error){
    return {ok:false, message:"An unexpected error occured"}
  }
}
