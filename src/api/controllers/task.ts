import { NextFunction, Request, Response } from "express";
import TaskService from "../services/task";
import { RequestUser } from "./../interfaces/global";
class TaskController {
  public taskService: TaskService;
  constructor() {
    this.taskService = new TaskService();
  }

  public async create(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    const result = await new TaskService().createTask(req.user, req.body);
    return res.status(result.statusCode).json(result.response);
  }

  public async tasks(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    const result = await new TaskService().getTasks(req.user);
    return res.status(result.statusCode).json(result.response);
  }
  
  public async edit(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    const result = await new TaskService().editTasks(req.user,req.params.id, req.body);
    return res.status(result.statusCode).json(result.response);
  }

  public async delete(
    req: RequestUser,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    const result = await new TaskService().deleteTasks(req.user,req.body);
    return res.status(result.statusCode).json(result.response);
  }
}

export default TaskController;
