import express from "express";

export function requireAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.isAuthenticated() || !req.user) {
    res
      .status(401)
      .json({ success: false, message: "Authentication required." });
    return;
  }
  next();
}
