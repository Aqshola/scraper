import { handleLoading } from "@/libs/loader";
import { procedure, router } from "@/server";
import { getRedisClient } from "@/libs/redis";
import { z } from "zod";

const redis = getRedisClient();

const loading = router({
  get: procedure.query(async (opts) => {
    const request_browser_id = opts.ctx.browserId as string;
    const cache_data = await redis.get(request_browser_id);

    if (cache_data) {
      const parse_data_cache = JSON.parse(cache_data) as number;
      return parse_data_cache;
    }

    return 0;
  }),
  set: procedure
    .input(
      z.object({
        value: z.number(),
      })
    )
    .mutation(async (opts) => {
      console.log("CALLED MUTATE LOADING");
      const request_browser_id = opts.ctx.browserId as string;
      handleLoading(request_browser_id, 0);
    }),
});

export default loading;
