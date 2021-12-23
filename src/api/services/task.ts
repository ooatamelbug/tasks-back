import { ResponseDataService, ReturnDataService } from "./../interfaces/global";
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
          user: userId,
        },
      });

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

  async editTasks(userId, taskId, body) {
    // init the statusCode and response object
    let statusCode: number = 200;
    let response = <ResponseDataService>{};
    try {
      const { title, desc, status } = body;

      const task = await TasksEntity.findOne({
        where: {
          id: taskId,
          user: userId,
        },
      });
      if (!task) {
        statusCode = 404;
        response.success = false;
        response.message = "this task not found or not allow to edit!";
      } else {
        task.title = title;
        task.desc = desc;
        task.status = status;
        await task.save();

        statusCode = 200;
        response.data = [task];
        response.success = true;
      }
    } catch (error) {
      // change the statusCode and message
      this.log.getlog().error(error);
      statusCode = 500;
      response.message = "error in server!";
    }
    return { statusCode, response };
  }

  async deleteTasks(userId, body) {
    // init the statusCode and response object
    let statusCode: number = 200;
    let response = <ResponseDataService>{};
    return await new Promise<ReturnDataService>(async (resolve, reject) => {
      try {
        const { tasksId } = body;
        tasksId.forEach(async (task) => {
          const taskData = await TasksEntity.findOne({
            where: {
              id: task.id,
              user: userId,
            },
          });
          if (!taskData) {
            statusCode = 404;
            response.message = "this task not found or not allow to delete!";
            resolve({ statusCode, response });
          }
        });
        tasksId.forEach(async (eachTask) => {
          const taskData = await TasksEntity.findOne({
            where: {
              id: eachTask.id,
              user: userId,
            },
          });
          await taskData?.remove();
        });
        statusCode = 200;
        response.success = true;
        resolve({ statusCode, response });
      } catch (error) {
        // change the statusCode and message
        this.log.getlog().error(error);
        statusCode = 500;
        response.message = "error in server!";
        resolve({ statusCode, response });
      }
    });
  }
}

export default TaskService;
