import winston from "winston";
import { IBaseLogger } from "../../core/iLoggers/iBaseLogger";

// Wraps winston behind IBaseLogger - if you ever swap logging
// libraries, only this file changes, nothing that depends on
// IBaseLogger needs to know.
export class BaseLogger implements IBaseLogger {
  private readonly logger = winston.createLogger({
    level: process.env.LOG_LEVEL ?? "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [new winston.transports.Console()],
  });

  info(message: string, meta?: Record<string, unknown>): void {
    this.logger.info(message, meta);
  }
  warn(message: string, meta?: Record<string, unknown>): void {
    this.logger.warn(message, meta);
  }
  error(message: string, meta?: Record<string, unknown>): void {
    this.logger.error(message, meta);
  }
  debug(message: string, meta?: Record<string, unknown>): void {
    this.logger.debug(message, meta);
  }
}
