import { Router } from "express";
import TaskController from "../controllers/task";
import validate from "../middleware/validate";
import validation from "../validation/task";

class TaskRouter {
  public router: Router;
  private taskController: TaskController;
  constructor() {
    this.router = Router();
    this.taskController = new TaskController();
    this.routes();
  }

  public routes() {
    this.router.post(
        "/create",
        [ ...validation.taskValidation, validate],
        this.taskController.create
    );
  }
}

export default TaskRouter;
