import { router } from "@/server";
import product from "@/server/routers/product";
import loading from "@/server/routers/loading";

export const appRouter = router({
  product,
  loading,
});
// export type definition of API
export type AppRouter = typeof appRouter;
