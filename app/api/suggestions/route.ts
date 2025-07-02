import { openai } from "@/config/openai";
import { AIDoctorAgents } from "@/constants/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userProblem } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-nemo:free",
      messages: [
        { role: "system", content: JSON.stringify(AIDoctorAgents) },
        {
          role: "user",
          content: `User Notes/Symptoms: ${userProblem}\nBased on the user's notes, suggest a list of relevant doctors from the system data. Return a valid JSON array of doctor objects. Don't miss any fields. Ensure at least one doctor is returned. Respond ONLY with a valid JSON array.`,
        },
      ],
    });

    const rawResp = completion.choices[0].message;
    //@ts-ignore
    let finalResp = rawResp.content.trim();

    // Clean up common formatting issues
    finalResp = finalResp
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log(finalResp);

    let parsed;
    try {
      parsed = JSON.parse(finalResp);
      if (!Array.isArray(parsed)) {
        parsed = [parsed]; 
      }
    } catch (err) {
      console.error("JSON parse failed", err);
      return NextResponse.json({ error: "Invalid JSON from AI response" });
    }
    console.log(parsed);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("OpenAI error", error);
    return NextResponse.json({ error: "Failed to get AI response" });
  }
}
