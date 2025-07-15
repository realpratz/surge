import { Router } from "express";
import {
  getCurrentPotd,
  schedulePotd,
  getScheduledPotd,
  verifyPotdSolve,
  getSolveHistory,
} from "../controllers/potd";
import { requireAuth, requireCruxMember } from "../middlewares/auth";

const router = Router();

// public: fetch current problem of the day
router.get("/current", getCurrentPotd);

// scheduling endpoints (crux only)
router.post("/schedule", requireCruxMember, schedulePotd);
router.get("/schedule", requireCruxMember, getScheduledPotd);

// solve verification & user history (verified users only)
router.post("/verify-solve", requireAuth, verifyPotdSolve);
router.get("/solve-history", requireAuth, getSolveHistory);

export default router;
