import { db } from "@/lib/db";
import { courses } from "@/lib/server/database/schema";
import { eq } from "drizzle-orm";

interface Props {
  params: { id: string };
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return new Response("Invalid course ID", { status: 400 });
  }

  try {
    const course = await db.select().from(courses).where(eq(courses.id, Number(id)));

    if (course.length === 0) {
      return new Response(`Course with id [${id}] not found`, { status: 404 });
    }
    
    return new Response(JSON.stringify(course[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : `The course id [${id}] not found`,
      { status: 500 }
    );
  }
}
