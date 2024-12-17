import { NextResponse } from "next/server";

import { getUsersIdAndName } from "@/features/projects/actions";

export async function GET() {
  try {
    const users = await getUsersIdAndName();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    return NextResponse.json({ error: "Failed to get users" }, { status: 500 });
  }
}
