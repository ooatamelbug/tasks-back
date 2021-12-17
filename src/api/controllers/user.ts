import { NextFunction, Request, Response } from "express";
import UserService from "../services/user";

class UserController {
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  
  public async rigester(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    const result = await new UserService().rigesterUser(req.body);
    return res.status(result.statusCode).json(result.response);
  }

  public async login (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    const result = await new UserService().login(req.body);
    res.setHeader("token", result.response.token || "");
    return res.status(result.statusCode).json(result.response);
  }
}

export default UserController;
