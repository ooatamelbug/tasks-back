import { ResponseDataService } from "./../interfaces/global";
import Logger from "../../logger/log";
import TaskRepo from "../repository/task";
import TasksEntity from "../entities/task";
import UserEntity from "../entities/user";

class TaskService implements TaskRepo {
  public log: Logger;

  constructor() {
    this.log = new Logger();
  }

  async createTask(uerId, body) {
    // init the statusCode and response object
    let statusCode: number = 200;
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
  
  async getTasks(userId) {
    // init the statusCode and response object
    let statusCode: number = 200;
    let response = <ResponseDataService>{};
    try {
      const tasks = await TasksEntity.find({
        where: {
          user :userId
        },
      });
      this.log.getlog().info(tasks);
      
      response.data = tasks;
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
