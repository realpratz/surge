import cron from "node-cron";
import {
  fetchContests,
  fetchProblems,
  fetchSubmissions,
  fetchRatingChanges,
} from "./controllers/codeforces";

export function startCronJobs() {
  cron.schedule("0 */2 * * *", async () => {
    console.log(
      `[Cron] Refreshing Contests and problems at ${new Date().toISOString()}`
    );
    await fetchContests();
    await fetchProblems();
  });

  cron.schedule("0 */3 * * *", async () => {
    console.log(`[Cron] Refreshing submissions at ${new Date().toISOString()}`);
    await fetchSubmissions();
  });

  cron.schedule("0 */5 * * *", async () => {
    console.log(
      `[Cron] Refreshing rating changes at ${new Date().toISOString()}`
    );
    await fetchRatingChanges();
  });
}
