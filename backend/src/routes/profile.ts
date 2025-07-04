import express from "express";
import { requireAuth } from "../middlewares/auth";
import { getUserInfo } from "../codeforces_api";
import { User } from "@prisma/client";

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
    try {
        const authenticatedUser = req.user as User;
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

export default router; 