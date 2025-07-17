import { db } from "../drizzle/db";
import {
  contests,
  problems,
  submissions,
  userContests,
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
export async function addCodeforcesProblems(
  fetchedProblems: Problem[],
) {
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

  if (newProblems.length === 0) return;

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
    throw new Error(`Error inserting new problems: ${err}`);
  }
}

//Helper function to add codeforces submissions to database
export async function addCodeforcesSubmissions(
  fetchedSubmissions: Submission[],
  userId: string,
  handle: string,
) {
  console.log(`Trying to add submissions for ${handle}`)
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

  try {
    console.log("Inserting...");
    const insertedRows = await db
      .insert(submissions)
      .values(userSubmissions)
      .onConflictDoNothing();
    console.log(`Updated submissions for ${handle}`);
    console.log("Inserted", insertedRows.rowCount, "rows");
  } catch (err) {
    throw new Error(`Error inserting submissions: ${err}`);
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

  try {
    const insertedRows = await db
      .insert(userContests)
      .values(contests)
      .onConflictDoNothing();
    console.log(`Updated user_contests for ${handle}`);
    console.log("Inserted", insertedRows.rowCount, "rows");
  } catch (err) {
    console.error(err);
    throw err;
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

  try {
    const newContests = await db
      .insert(contests)
      .values(formattedContests)
      .onConflictDoNothing()
    console.log("Updated Contests!");
    console.log(`Added ${newContests.rowCount} contests`);
  } catch (err) {
    console.log("Error inserting contests:", err);
  }
}
