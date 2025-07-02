import express from "express";
import { startVerificationController,checkVerificationController } from "../controllers/account";
import { validateStartVerificationRequest } from '../middlewares/account';
const router = express.Router();

router.post('/start-verification',validateStartVerificationRequest,startVerificationController);
router.post('/check-verification',checkVerificationController);
export default router