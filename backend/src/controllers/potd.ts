import { Request, Response, NextFunction } from "express";
import { db } from "../drizzle/db";
import {
  potd,
  problems,
  potdSolves,
  submissions,
  users,
} from "../drizzle/schema";
import { getRandomProblem, verifySubmission } from "../codeforces_api";
import { eq, gte, desc, and } from "drizzle-orm";

// GET /potd/current
export async function getCurrentPotd(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const userId = (req.user as { id: string }).id;

    // Try to fetch the scheduled POTD and its problem
    const scheduled = await db
      .select({ p: problems, pt: potd })
      .from(potd)
      .innerJoin(problems, eq(problems.id, potd.problemId))
      .where(eq(potd.date, today))
      .limit(1);

    let problemRow;
    let potdId;

    if (scheduled.length) {
      problemRow = scheduled[0].p;
      potdId = scheduled[0].pt.id;
    } else {
      // Fallback to a random problem
      problemRow = await getRandomProblem(800, 2000);
      const inserted = await db
        .insert(potd)
        .values({ date: today, problemId: problemRow.id })
        .returning();
      potdId = inserted[0].id;
    }

    // Check if user has alr solved it
    const solve = await db
      .select()
      .from(potdSolves)
      .where(and(eq(potdSolves.userId, userId), eq(potdSolves.potdId, potdId)))
      .limit(1);

    res.json({ problem: problemRow, solved: solve.length > 0 });
  } catch (err) {
    next(err);
  }
}

// POST /potd/schedule
export async function schedulePotd(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { problemId, contestId, problemIndex, date } = req.body as {
      problemId?: number;
      contestId?: number;
      problemIndex?: string;
      date: string;
    };

    // If caller provided contestId+problemIndex instead of problemId, resolve it
    if (!problemId) {
      if (!contestId || !problemIndex) {
        res.status(400).json({
          message:
            "Must provide either problemId or (contestId + problemIndex)",
        });
        return;
      }
      const [problem] = await db
        .select({ id: problems.id })
        .from(problems)
        .where(
          and(
            eq(problems.contestId, contestId),
            eq(problems.index, problemIndex)
          )
        )
        .limit(1);

      if (!problem) {
        res.status(404).json({
          message: `No problem found for contestId=${contestId} index='${problemIndex}'`,
        });
        return;
      }
      problemId = problem.id;
    }

    const todayStr = new Date().toISOString().split("T")[0];
    if (date <= todayStr) {
      res.status(400).json({ message: "Date must be after today" });
      return;
    }

    // Check if a POTD already exists for this date, including its problem details
    const existingWithProblem = await db
      .select({ entry: potd, oldProblem: problems })
      .from(potd)
      .innerJoin(problems, eq(problems.id, potd.problemId))
      .where(eq(potd.date, date))
      .limit(1);

    let overwritten = false;
    let result;
    let oldProblemData;

    if (existingWithProblem.length) {
      overwritten = true;
      oldProblemData = existingWithProblem[0].oldProblem;
      // Update to new problem
      result = await db
        .update(potd)
        .set({ problemId })
        .where(eq(potd.date, date));
    } else {
      // No existing entry, insert new
      result = await db.insert(potd).values({ problemId, date });
    }

    // Fetch new problem details for response
    const [newProblem] = await db
      .select()
      .from(problems)
      .where(eq(problems.id, problemId));

    if (overwritten) {
      res.json({
        message: "Overwritten existing POTD",
        overwritten: {
          date,
          oldProblem: oldProblemData,
          newProblem,
        },
        result,
      });
    } else {
      res.json({
        message: "Scheduled POTD",
        scheduled: {
          date,
          problem: newProblem,
        },
        result,
      });
    }
  } catch (err) {
    next(err);
  }
}

// GET /potd/schedule
export async function getScheduledPotd(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const upcoming = await db
      .select({ p: potd, pr: problems })
      .from(potd)
      .innerJoin(problems, eq(problems.id, potd.problemId))
      .where(gte(potd.date, today))
      .orderBy(potd.date);

    res.json(upcoming);
  } catch (err) {
    next(err);
  }
}

// POST /potd/verify-solve
export async function verifyPotdSolve(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req.user as { id: string }).id;
    const { contestId, index } = req.body;

    const [dbUser] = await db.select().from(users).where(eq(users.id, userId));
    if (!dbUser || !dbUser.cfHandle) {
      throw new Error("CF handle not set");
    }

    const solved = await verifySubmission(
      dbUser.cfHandle,
      contestId,
      index,
      "OK"
    );
    if (!solved) {
      res.status(400).json({ message: "Not solved yet" });
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const [potdRow] = await db.select().from(potd).where(eq(potd.date, today));
    if (!potdRow) {
      throw new Error("No POTD scheduled for today");
    }

    const existingSolve = await db
      .select()
      .from(potdSolves)
      .where(
        and(eq(potdSolves.potdId, potdRow.id), eq(potdSolves.userId, userId))
      );

    if (existingSolve.length > 0) {
      res.json({ message: "Already recorded" });
      return;
    }

    const insert = await db.insert(potdSolves).values({
      potdId: potdRow.id,
      userId,
    });

    res.json({ message: "Solve recorded", insert });
  } catch (err) {
    next(err);
  }
}

// GET /potd/solve-history
export async function getSolveHistory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // requireAuth middleware ensures req.user exists
    const userId = (req.user as { id: string }).id;

    const history = await db
      .select({ solve: potdSolves, problem: problems })
      .from(potdSolves)
      .innerJoin(potd, eq(potd.id, potdSolves.potdId))
      .innerJoin(problems, eq(problems.id, potd.problemId))
      .where(eq(potdSolves.userId, userId))
      .orderBy(desc(potdSolves.solvedAt));

    res.json(history);
  } catch (err) {
    next(err);
  }
}
