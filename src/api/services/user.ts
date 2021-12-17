import { ResponseDataService } from "./../interfaces/global";
import UserEntity from "../entities/user";
import UserRepo from "../repository/user";
import { compare, hash } from "bcryptjs";
import { omit } from "lodash";
import Logger from "../../logger/log";
import { sign } from "jsonwebtoken";

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
          username,
        },
      });
      // check if any user
      if (getUser) {
        // change the statusCode and message
        statusCode = 400;
        response.success = false;
        response.message = "this username is used!";
      } else {
        // create new user
        const newUser = UserEntity.create({
          username,
          password,
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

  async login(body) {
    // init the statusCode and response object
    let statusCode = 200;
    let response = <ResponseDataService>{};
    try {
      // extract some variable from of body params
      let { username, password } = body;
      // check if the any user have same this username
      const getUserByUsername: UserEntity | undefined =
        await UserEntity.findOne({
          where: {
            username,
          },
        });
      // check if any user
      if (!getUserByUsername) {
        // retrun error because the username is wrong
        statusCode = 404;
        response.success = false;
        response.message =
          "this username not founded please check it again or make new account!";
      } else {
        // compare the request provide password and the password in user data
        const getUserPassword = await compare(
          password,
          getUserByUsername.password
        );
        // check if is two password is same after hashed
        if (!getUserPassword) {
          // retrun error because the passsword is wrong
          statusCode = 404;
          response.success = false;
          response.message = "invalid password for this user!";
        } else {
          // create token from data user
          const token = await sign(
            { username: getUserByUsername.username, id: getUserByUsername.id },
            "entertoAPP",
            {
              expiresIn: "2h",
            }
          );
          // change the statusCode and message
          statusCode = 200;
          response.token = token;
          response.userData = omit(getUserByUsername, "password");
          response.success = true;
        }
      }
    } catch (error) {
      // change the statusCode and message
      this.log.getlog().error(error);
      statusCode = 500;
      response.message = "error in server!";
    }
    return { statusCode, response };
  }
}

export default UserService;
