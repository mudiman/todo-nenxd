const pinoLogger = require("pino");

export const logger = pinoLogger({
  name: "todo_muxt",
  level: process.env.PINO_LOG_LEVEL || "info",
});
