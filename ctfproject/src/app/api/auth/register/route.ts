import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { users } from "@/lib/server/database/schema";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {username, password, email, phoneNumber, firstName, lastName} = req.body;
        if (!username || !password || !email || !phoneNumber || !firstName || !lastName) {
            return res.status(400).json({ error: "Missing fields" });
        }
        await db.insert(users).values({
            username,
            password,
            email,
            phoneNumber,
            firstName,
            lastName,
        });
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : "Register failed!" });
    }
}