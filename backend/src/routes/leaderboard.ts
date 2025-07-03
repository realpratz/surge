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
                    cfRating: true,
                }
            }
        )
        res.json(leaderboard)
    } catch (err) {
        console.error(`error fetching leaderboard:${err}`)
        res.status(500).json({ message: "Server error" });
    }
})

export default router