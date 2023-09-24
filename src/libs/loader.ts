import { PROCESS_STEP } from "@/constant";
import { getRedisClient } from "@/libs/redis";

export const handleLoading = (id: string, val: number) => {
  const redis = getRedisClient();
  const percentage = (val / PROCESS_STEP) * 100;
  redis.set(id, percentage);
};
