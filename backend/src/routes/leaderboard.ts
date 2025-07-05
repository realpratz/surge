import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
    try {
        const leaderboard = await prisma.user.findMany(
            {
                orderBy: {
                    cfRating: 'desc',
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    cfHandle: true,
                    cfRating: true,
                    pfpUrl: true,
                },
            }
        )
        const updatedLeaderboard = leaderboard.map((user) => {
            const match = user.email.match(/f(\d{4})/)
            const batch = match ? match[1] : null
            return { ...user, batch: batch }
        })
        res.status(200).json(updatedLeaderboard)
    } catch (err) {
        console.error(`error fetching leaderboard:${err}`)
        res.status(500).json({ message: "Server error" });
    }
})

export default router