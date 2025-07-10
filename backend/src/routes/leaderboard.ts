import { Router } from "express";
import { db } from "../drizzle/db"
import { user as userTable } from "../drizzle/schema"
import { desc } from "drizzle-orm";
// import { Request, Response } from "express";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const leaderboard = await db
            .select({
                    id: userTable.id,
                    name: userTable.name,
                    email: userTable.email,
                    cfHandle: userTable.cfHandle,
                    cfRating: userTable.cfRating,
                    pfpUrl: userTable.pfpUrl,
                })
            .from(userTable)
            .orderBy(desc(userTable.cfRating));
        const updatedLeaderboard = leaderboard.map((user) => {
            const match = user.email.match(/f(\d{4})/)
            const batch = match ? match[1] : null
            return { ...user, batch: batch }
        }).filter((user) => user.cfRating != null)
        res.status(200).json(updatedLeaderboard)
    } catch (err) {
        console.error(`error fetching leaderboard:${err}`)
        res.status(500).json({ message: "Server error" });
    }
})

export default router