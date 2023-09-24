import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/server/routers/route";
import { createContext } from "@/libs/context";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
