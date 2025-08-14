export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { composeDown } from "@/lib/docker/composeDown";

export async function POST(req: Request) {
  try {
    const { userName, problemName, problemID } = await req.json();

    if (!userName || !problemName || !problemID) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await composeDown(userName, problemName, problemID);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
