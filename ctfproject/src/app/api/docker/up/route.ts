export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { composeUp } from "@/lib/docker/composeUp";

export async function POST(req: Request) {
  try {
    const { userName, problemName, problemID } = await req.json();
    const result = await composeUp(userName, problemName, problemID);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Starting Docker Container Error" }), {
      status: 500,
    });
  }
}
