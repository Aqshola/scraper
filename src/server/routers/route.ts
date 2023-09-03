import { procedure, router } from "@/server";
import { z } from "zod";

export const appRouter = router({
  searchProduct: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return `${opts.input.text}`;
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
