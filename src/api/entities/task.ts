import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable
} from "typeorm";
import UserEntity from "./user";

@ObjectType()
@Entity("tasks")
class TasksEntity extends BaseEntity {
  @Field((_type) => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  title: string


  @Field()
  @Column()
  desc: string


  @Field()
  @Column()
  status: boolean

  @Field(() => UserEntity)
  @ManyToOne(
      () => UserEntity,
      user => user.tasks
  )
  user: UserEntity

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

export default TasksEntity;
