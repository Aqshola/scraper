import * as trpc from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { BROWSER_ID_CUSTOM_HEADER } from "@/constant";

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  const browserId = req.headers[BROWSER_ID_CUSTOM_HEADER];

  return {
    browserId,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
