import { db } from "@/lib/db";
import { courses } from "@/lib/server/database/schema";
import { eq } from "drizzle-orm";

// Create a new course
export async function POST(req: Request) {
  try {
    const { courseName, courseDescription } = await req.json();

    if (!courseName || !courseDescription) {
      return new Response(
        JSON.stringify({ message: "Missing fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await db.insert(courses).values({
      courseName,
      courseDescription,
    });

    return new Response(
      JSON.stringify({ message: "Course created successfully" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create course" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Get all courses
export async function GET() {
  try {
    const allCourses = await db.select().from(courses);

    if (allCourses.length === 0) {
      return new Response(
        JSON.stringify({ message: "No courses found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(allCourses), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch courses" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
