import { db } from "@/lib/db";
import { problems } from "@/lib/server/database/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // params is a Promise
) {
  const { id } = await context.params; 
  try {
    const courseProblems = await db
      .select()
      .from(problems)
      .where(eq(problems.courseId, Number(id)));

    return new Response(JSON.stringify(courseProblems), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : `The problems for course id [${id}] not found`,
      { status: 500 }
    );
  }
}
