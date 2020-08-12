import Queue from "bull";
import redisConfig from "../../config/redis";
import * as jobs from "../jobs";

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name, data) {
    const queueFound = this.queues.find((queue) => queue.name === name);
    return queueFound.bull.add(data);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);
      queue.bull.on("failed", (job, err) => {
        console.log("Job > ", job.data);
        console.log("Error > ", err);
      });
    });
  },
};
