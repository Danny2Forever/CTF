// app/api/auth/login/route.ts
import { db } from "@/lib/db";
import { users } from "@/lib/server/database/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return new Response("Username and password are required", { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.username, username));

    if (!user || user.password !== password) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return new Response(JSON.stringify({ token, message: "Login successful" }), { status: 200 });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "Login failed!", { status: 500 });
  }
}
