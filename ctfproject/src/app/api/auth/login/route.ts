import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { users } from "@/lib/server/database/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }
        const user = await db.select().from(users).where(eq(users.username, username)).limit(1);
        if (!user[0] || user[0].password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : "Login failed!" });
    }
}
