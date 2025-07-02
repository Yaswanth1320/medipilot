

import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq, gte, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const DECREMENT_AMOUNT = 5;

export async function PATCH(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = user.primaryEmailAddress.emailAddress;
    //@ts-ignore
    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, userEmail),
    });
    
    if (!existingUser) {
        return NextResponse.json({ error: "User not found in database" }, { status: 404 });
    }
  
    if (existingUser.credits < DECREMENT_AMOUNT) {
        return NextResponse.json({ error: "Insufficient credits" }, { status: 402 }); // 402 Payment Required is a fitting status code
    }

    const updatedUserResult = await db
      .update(usersTable)
      .set({
        // Use sql`` from Drizzle to perform arithmetic operations safely
        credits: sql`${usersTable.credits} - ${DECREMENT_AMOUNT}`,
      })
      .where(eq(usersTable.email, userEmail))
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        credits: usersTable.credits,
      });

    if (!updatedUserResult || updatedUserResult.length === 0) {
        throw new Error("Failed to update user credits.");
    }

    return NextResponse.json(updatedUserResult[0]);
    
  } catch (error) {
    console.error("Error updating credits:", error);
    // Return a generic server error
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}