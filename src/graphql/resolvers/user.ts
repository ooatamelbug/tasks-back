import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import UserEntity from "../../api/entities/user";
import { ContextEntity } from "../context";
import { rigesterUser } from "../InputType";
import {
  ResponseDataService,
  ReturnDataService,
} from "../../api/interfaces/global";
import { omit } from "lodash";

@Resolver()
export class userResolver {
  @Mutation(() => UserEntity, {nullable: true })
  async rigesterUser(
      @Arg("data") { username, password, firstname, lastname }: rigesterUser,
    @Ctx() { req, res }: ContextEntity
  ): Promise<UserEntity | ReturnDataService> {
    // init the statusCode and response object
    let statusCode = 200;
    let response = <ResponseDataService>{};
    try {
      const getUser = await UserEntity.findOne({
        where: {
          username,
        },
      });

      if (getUser) {
        // change the statusCode and message
        statusCode = 400;
        response.success = false;
        response.message = "this username is used!";
        return { statusCode, response };
      } else {
        // create new user
        const newUser = UserEntity.create({
          username,
          password,
          firstname,
          lastname,
        });
        await newUser.save();
        const user = omit(newUser, "password");
        return { ...user, password: "" };
      }
    } catch (err) {
      statusCode = 500;
      response.success = false;
      response.message = "error in server!";
      return { statusCode, response };
    }
  }
}
