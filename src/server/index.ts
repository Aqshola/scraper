import { Context } from "@/libs/context";
import { initTRPC } from "@trpc/server";

const serve = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.message,
      },
    };
  },
});
export const middleware = serve.middleware;
export const router = serve.router;
export const procedure = serve.procedure;
