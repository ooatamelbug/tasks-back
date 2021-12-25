import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import TasksEntity from "../../api/entities/task";
import { ContextEntity } from "../context";
import {
  ResponseDataService,
  ReturnDataService,
} from "../../api/interfaces/global";
import { rigesterUser, createTaskInput, updateTaskInput } from "../InputType";

@Resolver()
export class taskResolver {
  @Query(() => [TasksEntity], { nullable: true })
  async tasks(
    @Arg("userId") userId: string,
    @Ctx() { req, res }: ContextEntity
  ): Promise<TasksEntity[] | []> {
    return await TasksEntity.find({
      where: {
        user: userId,
      },
      relations: ["user"],
    });
  }

  @Query(() => TasksEntity, { nullable: true })
  async getOnTask(
    @Arg("id") id: string,
    @Arg("userId") userId: string,
    @Ctx() { req, res }: ContextEntity
  ): Promise<TasksEntity | undefined> {
    return await TasksEntity.findOne({
      where: {
        user: userId,
        id: id,
      },
    });
  }

  @Mutation(() => TasksEntity, { nullable: true })
  async createTask(
    @Arg("data") { userId, title, desc }: createTaskInput,
    @Ctx() { req, res }: ContextEntity
  ): Promise<TasksEntity> {
    const newTask = await TasksEntity.create({
        title,
        desc,
        user: userId
    }).save();

    return newTask;
  }

  @Mutation(() => TasksEntity, { nullable: true })
  async updateTask(
    @Arg("data") { userId, id, title, status, desc  }: updateTaskInput,
    @Ctx() { req, res }: ContextEntity
  ): Promise<TasksEntity | ReturnDataService> {
    let statusCode: number = 200;
    let response = <ResponseDataService>{};
    const task = await TasksEntity.findOne({
      where: {
        user: userId,
        id: id,
      },
    });
    if (!task) {
      statusCode = 404;
      response.message = "this task is not found or not allowed!";
      response.success = false;

      return { response, statusCode };
    } else {
      task.title = title;
      task.status = status;
      task.desc = desc;
      await task.save();
      return task;
    }
  }

  @Mutation(() => String, { nullable: true })
  async deleteTask(
    @Arg("id") id: string,
    @Ctx() { req, res }: ContextEntity
  ): Promise<String | ReturnDataService> {
    let statusCode: number = 200;
    let response = <ResponseDataService>{};
    const { userId } = req.body;
    const task = await TasksEntity.findOne({
      where: {
        user: userId,
        id: id,
      },
    });
    if (!task) {
      statusCode = 404;
      response.message = "this task is not found or not allowed!";
      response.success = false;

      return { response, statusCode };
    } else {
      await task!.remove();
      return "removed";
    }
  }
}
