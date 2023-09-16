import { createClient } from "redis";
export const initRedis = async () => {
  const redisClient = createClient();
  redisClient.on("error", (err) => console.error("Error Redis :" + err));
  await redisClient.connect();
  console.log("REDIS START");
  return redisClient;
};
