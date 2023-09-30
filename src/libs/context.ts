import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { BROWSER_ID_CUSTOM_HEADER } from "@/constant";

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const browserId = req.headers[BROWSER_ID_CUSTOM_HEADER];

  return {
    req,
    res,
    browserId,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
