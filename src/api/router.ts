import { Application } from 'express';
import UserRouter from './routes/user';

class RouterApp {
    private userRouter: UserRouter
    constructor(app: Application) {
        this.userRouter = new UserRouter();
        this.allRoute(app);
    }

    private allRoute(app: Application) {
        app.get('/api', (req, res, next ) => {
            return res.status(200).json({
                name: "name"
            });
         });
        app.use('/api/users', this.userRouter.routes);
    }
}

export default RouterApp;