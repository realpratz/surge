// /backend/scripts/fetch-codeforces.ts
import { db, client } from "../drizzle/db";
import { userContests, users } from "../drizzle/schema";
import { RatingChange } from "../types/codeforces";

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchRatingChanges(handle: string, userId: string) {
  const res = await fetch(
    `https://codeforces.com/api/user.rating?handle=${handle}`
  );
  const data = await res.json();
  if (data.status !== "OK") throw new Error("Failed to fetch");

  const fetchedRatingChanges: RatingChange[] = data.result;

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
    console.log("Inserting...");
    const insertedRows = await db
      .insert(userContests)
      .values(contests)
      .onConflictDoNothing();
    console.log(`Updated user_contests for ${handle}`);
    console.log("Inserted", insertedRows.rowCount, "rows");
  } catch (err) {
    console.error(err);
  }
  await sleep(2000); // wait 2 seconds between API calls
}

async function updateUsers() {
  await client.connect();

  const userData = await db
    .select({
      cfHandle: users.cfHandle,
      userId: users.id,
    })
    .from(users);

  for (const user of userData) {
    if (!user.cfHandle) continue;
    try {
      await fetchRatingChanges(user.cfHandle, user.userId);
    } catch (err) {
      console.error(`Failed for ${user.cfHandle}:`, err);
    }
  }
}

updateUsers()
  .then(() => {
    console.log("Successfully updated ratingChanges!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error updating user ratingChanges:", err);
  });
