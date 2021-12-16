import { createConnection } from "typeorm";

class Database {
  private connectdb;
  constructor() {
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
        logging: true,
      });
      console.log("connect");
    } catch (err) {
      console.log(err);
    }
  }
}

export default Database;