import { openai } from "@/config/openai";
import { NextRequest, NextResponse } from "next/server";
import { REPORT_PROMPT } from "@/constants/resport-prompt";
import { db } from "@/config/db";
import { SessionTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { messages, sessionDetails, sessionId } = await req.json();

  try {
    const UserInput =
      "AI Doctor Agent Info:" +
      JSON.stringify(sessionDetails) +
      " , Conversation:" +
      JSON.stringify(messages);
    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-nemo:free",
      messages: [
        { role: "system", content: REPORT_PROMPT },
        {
          role: "user",
          content: UserInput,
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
    const result = await db
      .update(SessionTable)
      .set({ report: parseJson, conversation: messages })
      .where(eq(SessionTable.sessionId, sessionId));
    return NextResponse.json(parseJson);
  } catch (error) {
    return NextResponse.json(error);
  }
}
