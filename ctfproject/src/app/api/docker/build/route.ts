export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { buildImage } from "@/lib/docker/buildImage";
import { db } from "@/lib/db";
import { dockerImages } from "@/lib/server/database/schema";

export async function POST(req: Request) {
  try {
    const { s3Key, problemName, problemID } = await req.json();
    if (!s3Key || !problemName || !problemID) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await buildImage(s3Key, problemName, problemID);

    // Save to DB
    await db.insert(dockerImages).values({
      problemName,
      problemID,
      tag: `${problemName.toLowerCase()}-${problemID}:1.0.0`,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
