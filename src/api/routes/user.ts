import { Router } from "express";
import UserController from "../controllers/user";

class UserRouter {
    public router: Router
    private userController: UserController
    constructor() {
        this.router = Router();
        this.userController = new UserController();
    }

    public routes () {
        this.router.post('/create', [], this.userController.rigester);
    }
}

export default UserRouter;
