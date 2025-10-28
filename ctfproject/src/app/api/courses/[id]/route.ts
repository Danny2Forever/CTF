import { db } from "@/lib/db";
import { courses } from "@/lib/server/database/schema";
import { eq } from "drizzle-orm";

export async function GET({ params }: { params: { id: string } }) {
    const { id } = params;
    try{
        const course = await db.select().from(courses).where(eq(courses.id, Number(id)));
        return course

    } catch (error) {
        return new Response(error instanceof Error ? error.message : `The course id[${id}] not found`, { status: 404 });
    }
}

