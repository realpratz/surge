import { JobsOptions, Queue } from "bullmq";

//Add worker to queue with exponential retries
export function addWithRetry(
  queue: Queue,
  name: string,
  data: any,
  options?: JobsOptions
) {
  return queue.add(name, data, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
    removeOnComplete: true,
    removeOnFail: true,
    ...options,
  });
}
