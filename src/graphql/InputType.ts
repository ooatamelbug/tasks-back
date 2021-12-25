import 'reflect-metadata';
import { Field, InputType, ObjectType } from "type-graphql";
import { ValidationError } from "express-validator";
import UserEntity from "./../api/entities/user";
import TasksEntity from "./../api/entities/task";
import { type } from 'os';

@ObjectType()
class userData {
    @Field({ nullable: true })
    firstname: string;
    @Field({ nullable: true })
    lastname: string;
    @Field({ nullable: true })
    username: string;
} 

@InputType()
export class rigesterUser {
    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    firstname: string;
    
    @Field()
    lastname: string;
}

@InputType()
export class createTaskInput {
    @Field()
    userId: string;
    
    @Field()
    title: string;

    @Field({ nullable: true })
    desc: string;
}

@InputType()
export class updateTaskInput {
    @Field()
    userId: string;

    @Field()
    id: string;
    

    @Field()
    status: boolean

    @Field()
    title: string;

    @Field({ nullable: true })
    desc: string;
}