import { Request } from "express";
import { ValidationError } from "express-validator";

export interface ResponseDataService {
    data?: [any];
    success?: boolean;
    message?: string;
    errors?: ValidationError[]; 
    token?:  string
    userData?: {
        firstname: string;
        lastname: string;
        username: string;
    } 
}

export interface ReturnDataService {
    statusCode: number;
    response: ResponseDataService;
}

export interface RequestUser extends Request {
    user?: string
}