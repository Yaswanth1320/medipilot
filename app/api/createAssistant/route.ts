// app/api/createAssistant/route.ts
import { VapiClient } from "@vapi-ai/server-sdk";
import { NextResponse } from "next/server";

const vapi = new VapiClient({
  token: "92b03ec2-5188-4b10-9215-2aa030e5fbe3",
});

export async function POST(req: Request) {
  const body = await req.json();
  const { voiceId, systemPrompt } = body;

  try {
    const assistant = await vapi.assistants.create({
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. I'm here to help you with your health concerns.",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "vapi",
        voiceId,
      },
      model: {
        provider: "openai",
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
        ],
      },
    });

    return NextResponse.json({ assistantId: assistant.id });
  } catch (err: any) {
    console.error("Assistant creation failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
