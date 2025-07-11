import {
  getRandomProblem,
  verifySubmission,
  getUserInfo,
} from "../codeforces_api";
import express from "express";
import { db } from "../drizzle/db"
import { users } from "../drizzle/schema" 
import { eq } from "drizzle-orm"

export async function startVerificationController(
  req: express.Request,
  res: express.Response
) {
  try {
    const problem = await getRandomProblem();
    res.status(200).json({
      problemLink: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`,
      contestId: problem.contestId,
      index: problem.index,
      message: "Submit a compilation error within 60 seconds.",
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function checkVerificationController(
  req: express.Request,
  res: express.Response
) {
  try {
    const { handle, contestId, index } = req.body;

    if (!handle || !contestId || !index) {
      res.status(400).json({
        success: false,
        message: "Handle, contestId, or index missing.",
      });
      return;
    }

    const authenticatedUser = req.user as typeof users.$inferSelect;

    const isVerified = await verifySubmission(handle, contestId, index);

    if (isVerified) {
      const userInfo = await getUserInfo(handle);
      const updatedUser = await db
        .update(users)
        .set({
          cfHandle: handle,
          cfRating: userInfo.rating,
        })
        .where(eq(users.id, authenticatedUser.id))
      res.status(200).json({
        success: true,
        message: "Account verified.",
        data: updatedUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Verification failed, please try again.",
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}
