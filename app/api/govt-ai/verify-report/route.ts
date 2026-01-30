import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase_postgresql/admin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

export async function POST(req: Request) {
  try {
    const {
      category,
      eventLocation,
      division,
      district,
      upazila,
      union,
      media_url,
      details,
      reportId,
    } = await req.json();
    if (
      !category ||
      !eventLocation ||
      !division ||
      !district ||
      !upazila ||
      !union ||
      !details ||
      !reportId
    ) {
      return NextResponse.json({ error: "Missing Data" }, { status: 400 });
    }

    const supabase = supabaseAdmin();
    const systemInstruction = `You are an expert Digital Forensic Investigator and Fact-Checker for a public incident reporting system. Your primary responsibility is to analyze the authenticity of user-submitted reports by evaluating images, text, and geographical consistency.

           EVALUATION CRITERIA:

          1. IMAGE ANALYSIS (If provided):
             - Detect signs of AI generation, photoshopping, or digital manipulation.
             - Verify if the image content logically aligns with the text description.
             - Distinguish between real-world incident photos (e.g., road damage, accidents) and generic internet stock photos, memes, or unrelated media.

          2. TEXTUAL ANALYSIS (If no image):
             - Analyze sentiment, tone, and intent.
             - Flag reports that are jokes, spam, nonsensical, or contain profanity and abusive language.

          3. GEOGRAPHICAL & CATEGORICAL LOGIC:
             - Location Validation: Cross-reference the "Event Location" text with the provided administrative data (Division, District, Union).
               - If there is a blatant mismatch (e.g., event location claims to be in 'Jessore' but the administrative data says 'Dhaka'), reject or severely penalize the score.
               - If the location name is gibberish (e.g., "fgskkue") or contains offensive words, mark it as fraudulent.
               - If the specific location is unknown to you but the administrative context is correct, apply a minor score penalty.
               - Category Consistency: Check if the category (e.g., Road, Electricity) matches the details/image.
               - Be lenient with overlapping categories: If a user reports a broken traffic light under "Road" instead of "Electricity," do not penalize them, as these are logically related in a real-world context.

           4. MANDATORY AI-GENERATION CHECK:
                - If the image looks too clean, has distorted textures, or surreal lighting typical of AI tools, YOU MUST REDUCE the score to below 30 immediately.
                - If the user provides a very short or generic description (e.g., "Good", "Test", "Hello"), the report must be REJECTED (Score < 40) regardless of the image.
                - DO NOT be lenient with AI-generated content. If you suspect digital fraud, prioritize safety and give a Low Score.

           5."CRITICAL IMAGE INSPECTION: Actively look for AI hallmarks:
             - Inconsistent Physics: Shadows pointing in different directions or floating objects.
             - Textual Glitches: Blurred or nonsensical text on signboards or backgrounds.
             - Anatomical Errors: Extra fingers, mismatched ears, or distorted facial features in people.
             - Surface Quality: Overly smooth 'plastic' skin or hyper-realistic but soulless textures. If any of these are suspected, the score MUST be below 30."
             - "Be extremely skeptical. AI models often generate hyper-realistic pollution, smoke, and water reflections that look 'too perfect' or 'cinematic'. If the image looks like a professional photography shot or a high-quality digital painting of a disaster, penalize the score."
             - "First, describe any visual anomalies you find. Then, determine if it's AI-generated. Finally, provide the score."

          SCORING SYSTEM (0-100):
          - High Score (70-100): Authentic evidence, clear documentation, and logically consistent metadata.
          - Mid Score (40-69): Likely genuine but lacks strong visual proof or has minor geographical/categorical inconsistencies.
          - Low Score (0-39): Fake, AI-generated, spam, malicious intent, or severe location mismatch.

          OUTPUT FORMAT:
          - Provide a concise, professional explanation of your verdict (e.g., "Geographical data is inconsistent with the reported event location," or "The evidence shows authentic road damage with matching categorical context").
          - Your response MUST always end with the score in this exact format: "Score: [number]"`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-09-2025",
      systemInstruction,
      generationConfig: {
      temperature: 0.1, // make AI more logical
      topP: 0.8,
  }
    });

    const userInput = `
    REPORT TO VERIFY:
          - Category: ${category}
          - Event Location: ${eventLocation}
          - Division: ${division}, District: ${district}, Upazila: ${upazila}, Union: ${union}
          - Description: ${details}
      Analyze this data against the image (if provided) and the criteria in your system instructions.
        `;
    const parts: Part[] = [{ text: userInput }];

    // ! convert in to base64
    if (media_url) {
      try {
        const imgResponse = await fetch(media_url);
      //  console.log("image found ",imgResponse) // * debugging
        const buffer = await imgResponse.arrayBuffer();
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: Buffer.from(buffer).toString("base64"),
          },
        });
      } catch (error) {
        console.error(error);
        parts.push({ text: "SYSTEM NOTE: The user attached an image, but it could not be loaded for analysis. Be extra cautious." });
      }
    }

    // ! verification by AI
    const result = await model.generateContent(parts);
    const aiText = result.response.text();
    console.log("Ai text", aiText); // * debugging

    // ! Find score
    const scoreMatch = aiText.match(/Score:\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;
    console.log("score", score); // * debugging

    let verifyStatus = "pending";

    if (score >= 90) verifyStatus = "verified";
    else verifyStatus = "rejected";

    console.log(verifyStatus); // *  debugging
    const { data, error: updateError } = await supabase
      .from("reports")
      .update({ status: verifyStatus })
      .eq("id", reportId)
      .select();
    if (updateError) {
      console.error(updateError);
    }
    console.log("success update db", data);
    return NextResponse.json({ success: true, score, status: verifyStatus });

  } catch (error) {

    console.log(error);
    return NextResponse.json(
      { error: "Internal Error in AI verification" },
      { status: 500 },
    );
  }
}
