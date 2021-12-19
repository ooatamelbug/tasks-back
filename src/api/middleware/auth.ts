import { paylaodInterface } from './../interfaces/user';
import { ResponseDataService, RequestUser } from "./../interfaces/global";
import { NextFunction, Response, Request } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import Logger from "../../logger/log";

const Auth = async (req: RequestUser, res: Response, next: NextFunction) => {
  const log = new Logger();
  try {
    let response =  <ResponseDataService>{};
    const tokenInHeader = <string>req.headers["authorization"];
    if (!tokenInHeader) {
      response = {
        message: "not authorization",
        success: false,
      };
      return res.status(401).json(response);
    } else {
      const verifyToken: string | JwtPayload = await verify(
        tokenInHeader,
        "entertoAPP"
      );
    log.getlog().info(verifyToken);
    if (!verifyToken) {
        response = {
            message: "not valid authorization",
            success: false,
          };
          return res.status(401).json(response);
      } else {
          const { id } = <paylaodInterface>verifyToken;
          req.user = id;
          next();
      }
    }
  } catch (error) {
    const response: ResponseDataService = {
      message: "error "+ error.message,
      success: false,
    };
    return res.status(500).json(response);
  }
};

export default Auth;