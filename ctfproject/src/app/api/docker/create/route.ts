export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createContainer } from "@/lib/docker/createContainer";
import { db } from "@/lib/db";
import { containers } from "@/lib/server/database/schema";

export async function POST(req: Request) {
  try {
    const { username, problemName, problemID } = await req.json();
    if (!username || !problemName || !problemID) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await createContainer({ username, problemName, problemID });

    // Save to DB
    await db.insert(containers).values({
      username,
      problemName,
      problemID,
      containerId: result.containerId,
      sshUser: result.sshUser,
      sshPass: result.sshPass,
      port: result.port,
      flagHash: result.flag,
    });

    return NextResponse.json(result);
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Creating Docker Container Error" }), {
      status: 500,
    });
  }
}
