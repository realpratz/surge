import express from "express";
import type { Request, Response } from "express";
import { requireAuth } from "../middlewares/auth";
import { getUserInfo } from "../codeforces_api";
import { db } from "../drizzle/db";
import {user as userTable} from "../drizzle/schema";
import {eq} from "drizzle-orm";

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
    try {
        const authenticatedUser = req.user as typeof userTable.$inferSelect;
        const { name, cfHandle, email, pfpUrl } = authenticatedUser;
        let cfRating = null;
        if (cfHandle) {
            try {
                const userInfo = await getUserInfo(cfHandle);
                cfRating = userInfo.rating;
            } catch (err: any) {
                cfRating = null;
            }
        }
        res.status(200).json({
            name,
            email,
            pfpUrl,
            cfHandle,
            cfRating,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get("/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params as { slug: string };
    try {
        const user = await db
            .select()
            .from(userTable)
            .where(eq(userTable.cfHandle, slug))
            .limit(1)
            .then(rows => rows[0]);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        let cfRating = null;
        if (user.cfHandle) {
            try {
                const userInfo = await getUserInfo(user.cfHandle);
                cfRating = userInfo.rating;
            } catch (err: any) {
                cfRating = null;
            }
        }

        res.status(200).json({
            name: user.name,
            email: user.email,
            pfpUrl: user.pfpUrl,
            cfHandle: user.cfHandle,
            cfRating,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router; 