import { logger } from "@/libs/logger";

export const measureTime = async (callback: any, label: string = "") => {
  logger.info(callback);
  const start = Date.now();
  let res = await callback();
  const end = Date.now();
  const parsed = (end - start) / 1000;
  logger.info(`${label} takes : ${parsed}`);
  return res;
};

export const retryFunction = async <T>(
  promiseFunc: (e?: any) => T,
  counter: number
): Promise<T | undefined> => {
  try {
    return await promiseFunc();
  } catch (error) {
    if (counter <= 0) {
      logger.error(error, "error happens");
      throw error;
    }
    return await retryFunction(promiseFunc, counter - 1);
  }
};

export const measureAndRetry = async (
  callback: any,
  label: string = "",
  retryCount: number = 3
) => {
  logger.info(`${label} START`);
  const res = await measureTime(
    async () => await retryFunction(async () => await callback(), retryCount),
    label
  );
  logger.info(`${label} END`);

  return res;
};

export const getBaseUrl = () => {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `127.0.0.1:${process.env.PORT ?? 3000}`;
};
