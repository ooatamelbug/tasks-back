import express, { Application } from 'express';


class ApplicationExpress {
    private app: Application;

    constructor(){
        this.app = express();
    }

    public configration () {
        this.app.use(express.json());
        this.app.set("port", 3000);
    }

    public route () {
        this.app.use('/', (req, res, next ) => {
           return res.status(200).json({
               name: "name"
           });
        });
    }

    public getApp () {
        return this.app;
    }

    public listen () {
        this.app.listen(this.app.get("port"), () => {
            console.log("listen");
        })
    }
    
}

export default ApplicationExpress;