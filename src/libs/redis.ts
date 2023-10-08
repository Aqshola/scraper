import { TRPCError } from "@trpc/server";
import { createClient } from "redis";
import { logger } from "./logger";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSOWRD,
  database: process.env.REDIS_DATABASE as unknown as number,
});
const connectRedis = async () => {
  try {
    await redisClient.connect();
    redisClient.on("connect", () => {
      logger.info("REDIS CONNECTED");
    });
  } catch (error) {
    process.exit();
  }
};

connectRedis();
redisClient.on("error", (err) => {
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Something wrong",
  });
});
