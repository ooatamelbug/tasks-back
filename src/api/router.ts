import { Application, response } from 'express';


class RouterApp {
    constructor(app: Application) {
        this.allRoute(app);
    }

    private allRoute(app: Application) {
        app.use('/', (req, res) => {
            res.status(200).json({data: "data"});
        });
    }
}

export default RouterApp;