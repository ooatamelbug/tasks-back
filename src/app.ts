import "reflect-metadata";
import express, { Application, Router } from 'express';
import RouterApp from './api/router';
import Database from './database/config';
import cors from "cors";
import Logger from './logger/log';

class ApplicationExpress {
    private app: Application;
    private logger: Logger; 
    private port: number;

    constructor(){
        this.app = express();
        this.connectDB();
        this.corsConfigration();
        this.configration();
        new RouterApp(this.app);
        this.route();
        this.logger = new Logger();
    }

    public configration () {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.port = 3000;
    }

    public corsConfigration () {
        this.app.use(cors());
    }

    public async connectDB () {
       await new Database();
    }

    public route () {
        
    }

    public getApp () {
        return this.app;
    }

    public listen () {
        this.app.listen(this.port, () => {
            this.logger.getlog().info("listen");
        })
    }
    
}

export default ApplicationExpress;