import { Router } from "express";
import { db } from "../drizzle/db";
import { userContests, users } from "../drizzle/schema";
import { desc, eq, isNotNull, sql, and } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const leaderboard = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        cfHandle: users.cfHandle,
        cfRating: sql`COALESCE(${users.cfRating}, 0)`,
        pfpUrl: users.pfpUrl,
      })
      .from(users)
      .where(isNotNull(users.cfHandle))
      .orderBy(desc(sql`COALESCE(${users.cfRating}, 0)`));
    const updatedLeaderboard = leaderboard
      .map((user) => {
        const match = user.email.match(/f(\d{4})/);
        const batch = match ? match[1] : null;
        return { ...user, batch: batch };
      })
      .filter((user) => user.email.endsWith("@hyderabad.bits-pilani.ac.in"));
    res.status(200).json(updatedLeaderboard);
  } catch (err) {
    console.error(`error fetching leaderboard:${err}`);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params as { slug: string };
  const contestId = parseInt(slug);

  try {
    const leaderboard = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        cfHandle: users.cfHandle,
        cfRating: sql`COALESCE(${users.cfRating}, 0)`,
        rank: userContests.rank,
        pfpUrl: users.pfpUrl,
      })
      .from(users)
      .leftJoin(userContests, eq(users.id, userContests.userId))
      .where(
        and(
          eq(userContests.contestId, contestId),
          isNotNull(userContests.rank),
          isNotNull(users.cfHandle)
        )
      )
      .orderBy(userContests.rank);
    const updatedLeaderboard = leaderboard
      .map((user) => {
        const match = user.email.match(/f(\d{4})/);
        const batch = match ? match[1] : null;
        return {
          ...user,
          batch: batch,
        };
      })
      .filter((user) => user.email.endsWith("@hyderabad.bits-pilani.ac.in"));
    res.status(200).json(updatedLeaderboard);
  } catch (err) {
    console.error(`error fetching leaderboard:${err}`);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
