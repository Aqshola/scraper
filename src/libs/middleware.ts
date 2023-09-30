/** MIDDLEWARE */

import { middleware } from "@/server";
import { TRPCError } from "@trpc/server";
import { logger } from "@/libs/logger";

export const connectionMiddleware = middleware(async (opts) => {
  const { res } = opts.ctx;
  res.setTimeout(360000, () => {
    throw new TRPCError({ code: "TIMEOUT", message: "REQUEST TIMEOUT" });
  });
  return opts.next();
});

export const logMiddlware = middleware(async (opts) => {
  const start = Date.now();
  const result = await opts.next();
  const durationMS = Date.now() - start;

  if (result.ok) {
    logger.info(`[INFO] RESULT SUCCESS, DURATION : ${durationMS}`);
  }
  return result;
});
