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
          content:
            "User Notes/Symptoms:" +
            userProblem +
            ", Depends on user notes and symptoms, Please suggest list of doctors, Return object in Json only.",
        },
      ],
    });

    const rawResp = completion.choices[0].message;
    //@ts-ignore
    const finalResp = rawResp.content
      .trim()
      .replace("```json", "")
      .replace("```", "");
    const parseJson = JSON.parse(finalResp);
    return NextResponse.json(parseJson);
  } catch (error) {
    return NextResponse.json(error);
  }
}
