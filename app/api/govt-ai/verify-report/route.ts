import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase_postgresql/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

export async function POST(req: Request) {

  try{
      const {media_url, details , reportId} = await req.json();
      if(!details || !reportId) {
        return NextResponse.json({ error :"Missing Data"},{status:400})
      }

      const supabase = supabaseServer();
      const systemInstruction = `You are a Digital Forensic Expert and Fact-Checker for a public reporting system. Your goal is to analyze the authenticity of reports submitted by users.

        CRITERIA FOR EVALUATION :
        1. IF AN IMAGE IS PROVIDED:
           - Check for signs of AI generation, photoshopping, or digital manipulation.
           - Verify if the image content logically matches the text description provided.
           - Ensure the image depicts a real incident (e.g., road damage, accident) rather than being a generic internet photo or a meme.

        2. IF NO IMAGE IS PROVIDED (TEXT ONLY):
           - Analyze the sentiment and intent of the text.
           - Detect if the report is a joke, spam, contains profanity/abusive language, or is intentionally misleading/nonsense.

        3. SCORING SYSTEM (0-100):
           - High Score (70-100): Authentic evidence, consistent description, and high public importance.
           - Mid Score (40-69): Likely real but lacks strong visual evidence or has minor inconsistencies.
           - Low Score (0-39): Fake, AI-generated, spam, joke, or contains offensive content.

        OUTPUT FORMAT:
        - Provide a brief, professional explanation for your decision (e.g., "The image shows genuine asphalt cracks consistent with the description," or "The text contains offensive slang and lacks factual reporting").
        - Always conclude your response with the score in this exact format: "Score: [number]"`

        const model = genAI.getGenerativeModel({
          model:"gemini-1.5-flash",
          systemInstruction
        })

        const parts: Part[] = [{text:`${details}`}];

        // ! convert in to base64
        if(media_url){

          try{
            const imgResponse = await fetch(media_url);
            const buffer = await imgResponse.arrayBuffer();
            parts.push({
              inlineData:{
                mimeType:"image/jpeg",
                data:Buffer.from(buffer).toString("base64")
              }
            })
          }catch(error){
              console.error(error)
          }
        }

        // ! verification by AI
        const result = await model.generateContent(parts);
        const aiText = result.response.text();

        // ! Find score
        const scoreMatch = aiText.match(/Score:\s*(\d+)/i);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;

        let verifyStatus = "pending";

        if(score >= 70) verifyStatus = "verified";
        if(score < 70) verifyStatus = "rejected"

          const {error:updateError} = await supabase
          .from("reports")
          .update({status:verifyStatus})
          .eq("id",reportId)

          if(updateError){
            console.error(updateError);
          }
       return NextResponse.json({ success: true, score, status: verifyStatus });

    }catch(error){

     console.log(error);
     return NextResponse.json({ error: "Internal Error in AI verification" }, { status: 500 });
  }
}
