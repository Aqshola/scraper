import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "@/server/routers/route";
import { getBrowserIdentification } from "@/libs/fingerprint";
import { BROWSER_ID_CUSTOM_HEADER } from "@/constant";
import { getBaseUrl } from "@/helpers/util";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: getBaseUrl() + "/api",
          headers() {
            return {
              [BROWSER_ID_CUSTOM_HEADER]: getBrowserIdentification(),
            };
          },
        }),
      ],
    };
  },
  ssr: true,
});
