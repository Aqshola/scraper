import pino, { Logger } from "pino";

let logger: Logger;
if (process.env.NODE_ENV != "production") {
  logger = pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  });
} else {
  logger = pino();
}

export { logger };
