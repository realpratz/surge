import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import {
  contests,
  problems,
  submissions,
  userContests,
  users,
  verdictEnum,
} from "../drizzle/schema";
import {
  Contest,
  Problem,
  RatingChange,
  Submission,
} from "../types/codeforces";

const verdictMap: Record<string, typeof verdictEnum.enumName> = {
  OK: "AC",
  WRONG_ANSWER: "WA",
  TIME_LIMIT_EXCEEDED: "TLE",
  RUNTIME_ERROR: "RE",
  COMPILATION_ERROR: "CE",
};

function mapVerdict(apiVerdict: string | null | undefined): string {
  if (!apiVerdict) return "other";
  return verdictMap[apiVerdict] ?? "other";
}

let problemKeysMap: Record<string, number> = {};

async function refreshProblemKeysCache() {
  const problemsData = await db
    .select({
      problemId: problems.id,
      contestId: problems.contestId,
      index: problems.index,
    })
    .from(problems);

  problemsData.forEach((problemData) => {
    const key = `${problemData.contestId}-${problemData.index}`;
    problemKeysMap[key] = problemData.problemId;
  });
}

//Helper function to add codeforces problems to database
export async function addCodeforcesProblems(fetchedProblems: Problem[]) {
  const newProblems: (typeof problems.$inferInsert)[] = [];
  refreshProblemKeysCache();

  fetchedProblems.forEach((fetchedProblem: Problem) => {
    const problemKey = `${fetchedProblem.contestId}-${fetchedProblem.index}`;
    if (!problemKeysMap[problemKey]) {
      newProblems.push({
        contestId: fetchedProblem.contestId!,
        index: fetchedProblem.index,
        name: fetchedProblem.name,
        rating: fetchedProblem.rating ?? null,
        points: fetchedProblem.points ?? null,
        tags: fetchedProblem.tags,
      });
    }
  });

  if (newProblems.length === 0) {
    console.log("No new problems found!");
    return;
  }

  try {
    const insertedProblems = await db
      .insert(problems)
      .values(newProblems)
      .onConflictDoNothing()
      .returning({
        id: problems.id,
        contestId: problems.contestId,
        index: problems.index,
      });

    console.log("Inserted", insertedProblems.length, "new problems!");

    insertedProblems.forEach((insertedProblem) => {
      const problemKey = `${insertedProblem.contestId}-${insertedProblem.index}`;
      problemKeysMap[problemKey] = insertedProblem.id;
    });
  } catch (err) {
    console.error(`Error inserting new problems: ${err}`);
    return;
  }
}

//Helper function to add codeforces submissions to database
export async function addCodeforcesSubmissions(
  fetchedSubmissions: Submission[],
  userId: string,
  handle: string
) {
  console.log(`Trying to add submissions for ${handle}`);
  refreshProblemKeysCache();
  const userSubmissions = fetchedSubmissions
    .filter((fetchedSubmission) => fetchedSubmission.contestId ?? null)
    .map((fetchedSubmission) => {
      const {
        id,
        problem,
        creationTimeSeconds,
        relativeTimeSeconds,
        programmingLanguage,
        verdict,
        passedTestCount,
        timeConsumedMillis,
        memoryConsumedBytes,
      } = fetchedSubmission;
      return {
        id,
        userId,
        problemId: problemKeysMap[`${problem.contestId}-${problem.index}`],
        submittedAt: new Date(creationTimeSeconds * 1000).toISOString(),
        relativeTimeSeconds:
          relativeTimeSeconds == 2147483647 ? 0 : relativeTimeSeconds,
        programmingLanguage,
        verdict: mapVerdict(verdict),
        passedTestCount,
        timeConsumedMillis,
        memoryKb: Math.floor(memoryConsumedBytes / 1000),
      } as typeof submissions.$inferInsert;
    });

  if (userSubmissions.length === 0) {
    console.log(`No submissions found for ${handle}`);
    return;
  }

  try {
    console.log("Inserting...");
    const insertedRows = await db
      .insert(submissions)
      .values(userSubmissions)
      .onConflictDoNothing();
    console.log(`Updated submissions for ${handle}`);
    console.log("Inserted", insertedRows.rowCount, "rows");
  } catch (err) {
    console.error(`Error inserting submissions: ${err}`);
    return;
  }
}

export async function updateUserRatings(
  fetchedRatingChanges: RatingChange[],
  userId: string,
  handle: string
) {
  const contests = fetchedRatingChanges.map((ratingChange) => ({
    userId,
    contestId: ratingChange.contestId,
    rank: ratingChange.rank,
    oldRating: ratingChange.oldRating,
    newRating: ratingChange.newRating,
    updateTime: new Date(
      ratingChange.ratingUpdateTimeSeconds * 1000
    ).toISOString(),
  }));

  if (contests.length === 0) {
    console.log(`No contests found for ${handle}`);
    return;
  }

  try {
    const insertedRows = await db
      .insert(userContests)
      .values(contests)
      .onConflictDoNothing()
      .returning();
    console.log(`Updated user_contests for ${handle}`);
    console.log("Inserted", insertedRows.length, "rows");

    if (insertedRows.length === 0) return;

    const updatedRating = insertedRows
      .filter((entry) => entry.updateTime)
      .sort(
        (a, b) =>
          new Date(a.updateTime!).getTime() - new Date(b.updateTime!).getTime()
      )
      .pop()?.newRating;

    if (!updatedRating) return;

    await db
      .update(users)
      .set({ cfRating: updatedRating })
      .where(eq(users.id, userId));
    console.log(`Updating rating for ${handle} to ${updatedRating}`);
  } catch (err) {
    console.error(err);
    return;
  }
}

export async function updateProblems(fetchedProblems: Problem[]) {
  const formattedProblems = fetchedProblems
    .filter((problem) => problem.contestId)
    .map((problem) => ({
      contestId: problem.contestId!,
      index: problem.index,
      name: problem.name,
      rating: problem.rating ?? null,
      points: problem.points ?? null,
      tags: problem.tags,
    }));

  if (formattedProblems.length === 0) {
    console.log("No problems found while updating problems");
    return;
  }

  try {
    console.log("Inserting...");
    const insertedRows = await db
      .insert(problems)
      .values(formattedProblems)
      .onConflictDoNothing();
    console.log("Done!");
    console.log("Inserted", insertedRows.rowCount, "rows");
  } catch (err) {
    console.error(err);
    return;
  }
}

export async function updateContests(fetchedContests: Contest[]) {
  const formattedContests = fetchedContests.map(
    (contest): typeof contests.$inferInsert => ({
      externalId: contest.id,
      name: contest.name,
      startTime: contest.startTimeSeconds
        ? new Date(contest.startTimeSeconds * 1000).toISOString()
        : null,
      durationMinutes: contest.durationSeconds / 60,
      url: `https://codeforces.com/contest/${contest.id}`,
    })
  );

  if (formattedContests.length === 0) {
    console.log("No contests fonud while updating contests");
    return;
  }

  try {
    const newContests = await db
      .insert(contests)
      .values(formattedContests)
      .onConflictDoNothing();
    console.log("Updated Contests!");
    console.log(`Added ${newContests.rowCount} contests`);
  } catch (err) {
    console.error("Error inserting contests:", err);
    return;
  }
}
