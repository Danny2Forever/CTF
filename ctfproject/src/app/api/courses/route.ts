import { db } from "@/lib/db";
import { courses } from "@/lib/server/database/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    try{
        const {courseName, courseDescription} = await req.json();
            if (!courseName || !courseDescription) {
                return new Response('Missing fields', { status: 400 });
            }
            await db.insert(courses).values({
                courseName,
                courseDescription
            });
            return new Response('Create course successfully', { status: 201 });
    } catch (error) {
        return new Response(error instanceof Error ? error.message : "Create course fail", { status: 500 });
    }
}


export async function GET() {
    try{
        const allCourses = await db.select().from(courses);
        return allCourses

    } catch (error) {
        return new Response(error instanceof Error ? error.message : "The courses not found", { status: 404 });
    }
}
