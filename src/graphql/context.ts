import {Request, Response } from 'express';

export type ContextEntity = {
    req: Request,
    res: Response
}