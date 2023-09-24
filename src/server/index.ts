import { Context } from "@/libs/context";
import { initRedis } from "@/libs/redis";
import { initTRPC } from "@trpc/server";

const serve = initTRPC.context<Context>().create();
initRedis();

export const router = serve.router;
export const procedure = serve.procedure;
export const middleware = serve.middleware;
