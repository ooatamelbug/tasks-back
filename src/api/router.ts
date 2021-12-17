import { Application } from 'express';
import UserRouter from './routes/user';
import TaskRouter from './routes/task';

class RouterApp {
    private userRouter: UserRouter
    private taskRouter: TaskRouter
    constructor(app: Application) {
        this.userRouter = new UserRouter();
        this.taskRouter = new TaskRouter();
        this.allRoute(app);
    }

    private allRoute(app: Application) {
        app.use('/api/users', this.userRouter.router);
        app.use('/api/tasks', this.taskRouter.router);
    }
}

export default RouterApp;