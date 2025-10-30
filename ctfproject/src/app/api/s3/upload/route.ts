import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/s3/uploadImage";
import { db } from "@/lib/db";
import { uploads } from "@/lib/server/database/schema";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const problemName = formData.get("problemName") as string;
    const problemID = Number(formData.get("problemID"));

    if (!file || !problemName || !problemID) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadImage(
      {
        buffer,
        originalname: file.name,
        mimetype: file.type,
        size: buffer.length,
      },
      problemName,
      problemID
    );

    if (result.success) {
      await db.insert(uploads).values({
        problemName,
        problemID,
        s3Key: result.key!,
        url: result.location!,
      });
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to upload docker.tar to courses" }), {
      status: 500,
    });
  }
}
