import { ResponseDataService } from "./../interfaces/global";
import { validationResult, Result, ValidationError } from "express-validator";
import { NextFunction, Request, Response } from "express";
import Logger from "../../logger/log";

const validate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      const response: ResponseDataService = {
        message: "error validate",
        errors: errors.array(),
        success: false,
      };
      return res.status(400).json(response);
    }
    next();
  } catch (error) {
    const log = new Logger();
    log.getlog().error(error);
    const response: ResponseDataService = {
      message: "error ",
      success: false,
    };
    return res.status(500).json(response);
  }
};

export default validate;
