import "reflect-metadata";
import express, { Application, Request, Response } from 'express';
import RouterApp from './api/router';
import Database from './database/config';
import cors from "cors";
import Logger from './logger/log';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from 'type-graphql';

class ApplicationExpress {
    private app: Application;
    private logger: Logger; 
    private port: number;
    private server: ApolloServer;


    constructor(){
        this.app = express();
        this.connectDB();
        this.corsConfigration();
        this.configration();
        new RouterApp(this.app);
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

    public async apolloServer () {
        this.server = new ApolloServer({
            introspection: true,
            schema: await buildSchema({
                resolvers: [__dirname + "/graphql/resolvers/*.ts"],
                validate: false
            }),
            context: ({ req, res }) => ({
                req,
                res              
            })
        });
        await this.server.start();
        this.server.applyMiddleware({ app: this.app, cors: true });
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