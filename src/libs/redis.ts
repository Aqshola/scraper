import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient>;
export const initRedis = () => {
  redisClient = createClient();
  redisClient.on("error", (err) => {
    console.error("Error Redis :" + err);
    throw new Error("REDIS ERROR");
  });
  redisClient.connect();
  console.log("REDIS START");
};

export const getRedisClient = () => redisClient;
