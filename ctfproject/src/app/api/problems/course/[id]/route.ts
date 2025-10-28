import { db } from "@/lib/db";
import { problems } from "@/lib/server/database/schema";
import { eq } from "drizzle-orm";

export async function GET({ params }: { params: { id: string } }) {
    const { id } = params;
    try{
        const problem = await db.select().from(problems).where(eq(problems.courseId, Number(id)));
        return problem

    } catch (error) {
        return new Response(error instanceof Error ? error.message : `The problems id[${id}] not found`, { status: 404 });
    }
}

