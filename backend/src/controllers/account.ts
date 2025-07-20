import {
  getRandomProblem,
  verifySubmission,
  linkCfHandle,
} from "../codeforces_api";
import express from "express";
import { users } from "../drizzle/schema";
import {
  fetchUserSubmissions,
  fetchUserRatingChanges,
} from "../controllers/codeforces";

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
      const verifiedUser = await linkCfHandle(handle, authenticatedUser.id);
      if (verifiedUser.cfHandle && verifiedUser.id) {
        //Refresh user data with priority 1! (Lower is more urgent)
        await fetchUserSubmissions(verifiedUser.cfHandle, verifiedUser.id, 1);
        await fetchUserRatingChanges(verifiedUser.cfHandle, verifiedUser.id, 1);
      }
      res.status(200).json({
        success: true,
        message: "Account verified.",
        data: verifiedUser,
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
