"use server";

import { console } from "inspector";

export async function SendToAi(formData: FormData) {

  const msg = formData.get("msg")?.toString() || "";
  const lang = formData.get("lang")?.toString() === "en" ? "en" : "bn";
  const fileList = formData.getAll("file") as File[];

  if(!msg && fileList.length === 0) return;

   const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/govt-ai/chat`,{

    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify({
      messages:[{role:"user",content:msg}],
      lang
    })
  })

  if(!response.ok){
    return;
  }

  const data = await response.json();
  
}
