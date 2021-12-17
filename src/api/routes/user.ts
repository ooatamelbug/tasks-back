import { Router } from "express";
import UserController from "../controllers/user";
import validate from "../middleware/validate";
import validation from "../validation/user";

class UserRouter {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.routes();
  }

  public routes() {
    this.router.post(
      "/create",
      [...validation.rigesterValidation, validate],
      this.userController.rigester
    );

  }
}

export default UserRouter;
