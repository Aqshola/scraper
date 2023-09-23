import { createClient } from "redis";
export const initRedis = async () => {
  const redisClient = createClient();
  redisClient.on("error", (err) => {
    console.error("Error Redis :" + err);
    throw new Error("REDIS ERROR");
  });
  await redisClient.connect();
  console.log("REDIS START");
  return redisClient;
};
