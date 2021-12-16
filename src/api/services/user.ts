import { ResponseDataService, ReturnDataService } from "./../interfaces/global";
import User from "../entities/user";
import UserRepo from "../repository/user";
import { hash } from "bcryptjs";
import { omit } from "lodash";

class UserService implements UserRepo {
  async rigesterUser(body) {
    let statusCode = 200;
    let response = <ResponseDataService> {};
    try {
      let { username, password, firstname, lastname } = body;
      const getUser = await User.findOne({ username });
      if (getUser) {
        statusCode = 509;
        const message = "this username is used!";
      } else {
        const hashPassword = await hash(password, 12);
        const newUser = await User.create({
          username,
          password: hashPassword,
          firstname,
          lastname
        });
        statusCode = 201;
        response.userData = omit(newUser, "password");
        response.success = true;
      }
    } catch (error) {}
    return { statusCode, response };
  }
  async login(body) {}
}

export default UserService;
