import { ResponseDataService, ReturnDataService } from "./../interfaces/global";
import UserEntity from "../entities/user";
import UserRepo from "../repository/user";
import { hash } from "bcryptjs";
import { omit } from "lodash";
import Logger from "../../logger/log";

class UserService implements UserRepo {
  public log: Logger;

  constructor() {
    this.log = new Logger();
  }
  /**
   * this function for rigester new user to app
   * @param body
   * @returns the status of operation or request and response
   */
  async rigesterUser(body) {
    // init the statusCode and response object
    let statusCode = 200;
    let response = <ResponseDataService>{};
    try {
      // extract some variable from of body params
      let { username, password, firstname, lastname } = body;
      // check if the any user have same this username
      const getUser = await UserEntity.findOne({ 
        where: {
          username
        }   
      });
      // check if any user
      if (getUser) {
        // change the statusCode and message
        statusCode = 400;
        response.message = "this username is used!";
      } else {
        // hash the password
        const hashPassword = await hash(password, 12);

        // create new user
        const newUser = UserEntity.create({
          username,
          password: hashPassword,
          firstname,
          lastname,
        });
        
        await newUser.save();
        // change the statusCode and message
        statusCode = 201;
        response.userData = omit(newUser, "password");
        response.success = true;
      }
    } catch (error) {
      // change the statusCode and message
      this.log.getlog().error(error);
      statusCode = 500;
      response.message = "error in server!";
    }
    // return status Code and  response
    return { statusCode, response };
  }

  async login(body) {}
}

export default UserService;
