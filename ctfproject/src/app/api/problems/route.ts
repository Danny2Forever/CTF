import { db } from "@/lib/db";
import { problems } from "@/lib/server/database/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    try{
        const {problemName, problemDescription, courseId, dockerImageId} = await req.json();
            if (!problemName || !problemDescription || !courseId || !dockerImageId) {
                return new Response('Missing fields', { status: 400 });
            }
            await db.insert(problems).values({
                problemName,
                problemDescription,
                courseId,
                dockerImageId
            });
            return new Response('Create problem successfully', { status: 201 });
    } catch (error) {
        return new Response(error instanceof Error ? error.message : "Create problem fail", { status: 500 });
    }
}


export async function GET() {
    try{
        const allProblems = await db.select().from(problems);
        return allProblems

    } catch (error) {
        return new Response(error instanceof Error ? error.message : "The problems not found", { status: 404 });
    }
}
