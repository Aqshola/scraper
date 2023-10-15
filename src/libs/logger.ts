import pino from "pino";
import pretty from "pino-pretty";

const stream = pretty({
  levelFirst: true,
  colorize: true,
});
export const logger = pino(
  {
    name: "Logger",
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
  },
  stream
);
