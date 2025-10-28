import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { users } from "@/lib/server/database/schema";

export async function POST(req: Request) {
    try {
        const {username, password, email, phoneNumber, firstName, lastName} = await req.json();
        if (!username || !password || !email || !phoneNumber || !firstName || !lastName) {
            return new Response('Missing fields', { status: 400 });
        }
        await db.insert(users).values({
            username,
            password,
            email,
            phoneNumber,
            firstName,
            lastName,
        });
        return new Response('User registered successfully', { status: 201 });
    } catch (error) {
        return new Response(error instanceof Error ? error.message : "Register failed!", { status: 500 });
    }
}