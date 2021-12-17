import "reflect-metadata";
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
        name: "default",
        port: 5432,
        host: "localhost",
        username: "postgres",
        password: "postgres",
        synchronize: true,
        database: "tasks",
        entities: ["src/api/entities/**/*.ts"],
        migrations: ["src/api/database/migrations/**/*.ts"],
        logging: false,
      });
      this.logger.getlog().info("connect");
    } catch (err) {
      this.logger.getlog().error(err);
    }
  }
}

export default Database;