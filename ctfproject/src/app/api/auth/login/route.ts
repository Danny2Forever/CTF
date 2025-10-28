import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { users } from "@/lib/server/database/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const {username, password} = await req.json();
        if (!username || !password) {
            return new Response('Username and password are required', { status: 400 });
        }
        const user = await db.select().from(users).where(eq(users.username, username)).limit(1);
        if (!user[0] || user[0].password !== password) {
            return new Response('Invalid credentials', { status: 401 });
        }
        const token = jwt.sign(
            { id: user[0].id, username: user[0].username },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        return new Response(JSON.stringify({ message: "Login successful", token }),
        { status: 200});
    } catch (error) {
        return new Response(error instanceof Error ? error.message : "Login failed!", { status: 500 });
    }
}
