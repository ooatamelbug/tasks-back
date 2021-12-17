import { ResponseDataService } from "./../interfaces/global";
import Logger from "../../logger/log";
import TaskRepo from "../repository/task";
import TasksEntity from "../entities/task";

class TaskService implements TaskRepo {
  public log: Logger;

  constructor() {
    this.log = new Logger();
  }

  async createTask(uerId, body) {
    // init the statusCode and response object
    let statusCode = 200;
    let response = <ResponseDataService>{};
    try {
      // extract some variable from of body params
      let { title, desc } = body;
      const newTask = TasksEntity.create({
        title,
        desc,
        user: uerId,
        status: false,
      });

      await newTask.save();
      // change the statusCode and message
      statusCode = 201;
      response.data = [newTask];
      response.success = true;
    } catch (error) {
      // change the statusCode and message
      this.log.getlog().error(error);
      statusCode = 500;
      response.message = "error in server!";
    }
    return { statusCode, response };
  }
}

export default TaskService;
