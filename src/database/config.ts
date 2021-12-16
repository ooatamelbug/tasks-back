import { createConnection } from "typeorm";
import Logger from '../logger/log';

class Database {
  private connectdb;
  private logger: Logger; 
  constructor() {
    this.logger = new Logger();
    this.connect();
  }

  private async connect() {
    try {
      this.connectdb = await createConnection({
        type: "postgres",
        name: "tasks",
        port: 5432,
        username: "postgres",
        password: "postgres",
        synchronize: true,
        database: "tasks",
        entities: ["src/api/entities/**/*.ts"],
        logging: false,
      });
      this.logger.getlog().info("connect");
    } catch (err) {
      this.logger.getlog().error(err);
    }
  }
}

export default Database;