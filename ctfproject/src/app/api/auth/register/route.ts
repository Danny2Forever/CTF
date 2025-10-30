import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { eq, or } from "drizzle-orm"; 
import { users } from "@/lib/server/database/schema";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const {username, password, email, phoneNumber, firstName, lastName} = await req.json();
        if (!username || !password || !email || !phoneNumber || !firstName || !lastName) {
            return new Response('Missing fields', { status: 400 });
        }

         const existingUser = await db
        .select()
        .from(users)
        .where(
            or(
            eq(users.username, username),
            eq(users.email, email)
            )
        )
        .limit(1);

        if (existingUser.length > 0) {
        return new Response(
            JSON.stringify({ error: "Username or email already taken" }),
            { status: 409 }
        );
        }

        // Insert new user (default role = "user")
        const [newUser] = await db
        .insert(users)
        .values({
            username,
            password,
            email,
            phoneNumber,
            firstName,
            lastName,
            role: "user" // <-- make sure the role column exists in your schema
        })
        .returning();

        // Sign JWT including role
        const token = jwt.sign(
        { id: newUser.id, username: newUser.username, role: newUser.role }, // role must be here
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
        );



        return new Response(JSON.stringify({ message: "User registered successfully", token }), { status: 201 });
    } catch (error) {
        return new Response(error instanceof Error ? error.message : "Register failed!", { status: 500 });
    }
}