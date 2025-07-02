import { db } from "@/config/db";
import { SessionTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const { userProblem, selectedDoctor } = await req.json();
  const user = await currentUser();

  try {
    const result = await db
      .insert(SessionTable)
      .values({
        sessionId: uuidv4(),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        notes: userProblem,
        selectedDoctor: selectedDoctor,
        createdOn: new Date().toString(),
      })
      //@ts-ignore
      .returning({ SessionTable });

    return NextResponse.json(result[0].SessionTable);
  } catch (error) {
    NextResponse.json(error);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  if (sessionId == "all") {
    const result = await db
      .select()
      .from(SessionTable)
      .where(
        //@ts-ignore
        eq(SessionTable.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(SessionTable.id));

    return NextResponse.json(result);
  } else {
    const result = await db
      .select()
      .from(SessionTable)
      //@ts-ignore
      .where(eq(SessionTable.sessionId, sessionId));

    return NextResponse.json(result[0]);
  }
}
