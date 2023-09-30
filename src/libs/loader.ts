import { PROCESS_STEP } from "@/constant";
import { redisClient } from "@/libs/redis";

export const handleLoading = (id: string, val: number) => {
  const percentage = (val / PROCESS_STEP) * 100;
  redisClient.set(id, percentage);
};
