import { initTRPC } from "@trpc/server";

const serve = initTRPC.create();
export const router = serve.router;
export const procedure = serve.procedure;
export const middleware = serve.middleware;
