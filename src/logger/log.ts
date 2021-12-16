import logger from "pino";
import day from "dayjs";

class Logger {
  private loggerInfo;
  constructor() {
    this.loggerInfo = logger({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
      timestamp: () => `,"time": "${day().format()}"`,
    });
  }
  public getlog() {
    return this.loggerInfo;
  }
}

export default Logger;
