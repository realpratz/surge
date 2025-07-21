import express from "express";
import type { Request, Response } from "express";
import { requireAuth } from "../middlewares/auth";
import { getUserByHandle } from "../utils/users";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  try {
    const authenticatedUser = req.user as typeof users.$inferSelect;
    const { name, cfHandle, email, pfpUrl } = authenticatedUser;
    if (!cfHandle) {
      res
        .status(500)
        .json({ success: false, message: "CodeForces account not linked!" });
      return;
    }
    const userData = await getUserByHandle(cfHandle);
    if (!userData) {
      res.status(500).json({ success: false, message: "User not found!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params as { slug: string };
  try {
    const userData = await getUserByHandle(slug);
    if (!userData) {
      res.status(404).json({ success: false, message: "User not found!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.patch("/edit", async (req: Request, res: Response) => {
  try {
    const authenticatedUser = req.user as typeof users.$inferSelect;
    const { id } = authenticatedUser;

    const { pfpUrl, atcoderHandle, leetcodeHandle, codechefHandle } = req.body;

    if (
      pfpUrl === undefined &&
      atcoderHandle === undefined &&
      leetcodeHandle === undefined &&
      codechefHandle === undefined
    ) {
      res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
      return;
    }

    const updateFields: Partial<typeof users.$inferInsert> = {};

    if (pfpUrl !== undefined) updateFields.pfpUrl = pfpUrl;
    if (atcoderHandle !== undefined) updateFields.atcoderHandle = atcoderHandle;
    if (leetcodeHandle !== undefined)
      updateFields.leetcodeHandle = leetcodeHandle;
    if (codechefHandle !== undefined)
      updateFields.codechefHandle = codechefHandle;

    await db.update(users).set(updateFields).where(eq(users.id, id));

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully." });
  } catch (err: any) {
    const message = err.message || "";

    if (message.includes("atcoder_handle")) {
      res
        .status(409)
        .json({ success: false, message: "AtCoder handle already in use." });
      return;
    } else if (message.includes("leetcode_handle")) {
      res
        .status(409)
        .json({ success: false, message: "LeetCode handle already in use." });
      return;
    } else if (message.includes("codechef_handle")) {
      res
        .status(409)
        .json({ success: false, message: "CodeChef handle already in use." });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

export default router;
