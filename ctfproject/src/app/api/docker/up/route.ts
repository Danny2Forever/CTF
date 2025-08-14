export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { composeUp } from "@/lib/docker/composeUp";

export async function POST(req: Request) {
  try {
    const { userName, problemName, problemID } = await req.json();
    const result = await composeUp(userName, problemName, problemID);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
