import express from "express";
import {
  startVerificationController,
  checkVerificationController,
} from "../controllers/account";
import { validateStartVerificationRequest } from "../middlewares/account";
import { requireAuth } from "../middlewares/auth";

const router = express.Router();

router.use(requireAuth);

router.post(
  "/start-verification",
  validateStartVerificationRequest,
  startVerificationController
);
router.post("/check-verification", checkVerificationController);

export default router;
