import { TRPCError } from "@trpc/server";
import { createClient } from "redis";

export const redisClient = createClient();
const connectRedis = async () => {
  try {
    await redisClient.connect();
    redisClient.on("connect", () => {
      console.log("REDIS CONNECTED");
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
