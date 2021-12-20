import { Router } from "express";
import TaskController from "../controllers/task";
import Auth from "../middleware/auth";
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
      [Auth, ...validation.taskValidation, validate],
      this.taskController.create
    );
    this.router.get("/all", [Auth], this.taskController.tasks);

    this.router.put(
      "/edit/:id",
      [
        Auth,
        ...validation.updateTaskIdValidation,
        ...validation.updateTaskValidation,
        validate,
      ],
      this.taskController.edit
    );
    this.router.delete(
      "/delete",
      [
        Auth,
        ...validation.deleteTaskValidation,
        validate,
      ],
      this.taskController.delete
    );
  }
}

export default TaskRouter;
