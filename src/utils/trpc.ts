import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "@/server/routers/route";
import { getBrowserIdentification } from "@/libs/fingerprint";
import { BROWSER_ID_CUSTOM_HEADER } from "@/constant";
import { getBaseUrl } from "@/helpers/util";
import fetchPonyFill from "fetch-ponyfill";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          fetch: fetchPonyFill().fetch,
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
