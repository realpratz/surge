import { prisma } from "../db";
import express from "express";
import { User } from "@prisma/client";

export async function validateStartVerificationRequest(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { handle } = req.body;

  if (!handle) {
    res.status(400).json({ success: false, message: "Missing handle." });
    return;
  }

  const authenticatedUser = req.user as User;

  if (authenticatedUser.cfHandle) {
    res
      .status(400)
      .json({ success: false, message: "Handle for user is already set." });
    return;
  }

  const handleUser = await prisma.user.findUnique({
    where: {
      cfHandle: handle,
    },
  });

  if (handleUser) {
    res
      .status(400)
      .json({
        success: false,
        message: "Handle is already linked to an account.",
      });
    return;
  }

  next();
}
