import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany
} from "typeorm";
import {  genSalt, hash } from "bcryptjs";
import TasksEntity from "./task";

@ObjectType()
@Entity("users")
class UserEntity extends BaseEntity {
  @Field((_type) => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  password: string;

  @Field((_type) => [TasksEntity])
  @OneToMany(
    () => TasksEntity,
    tasks => tasks.user
  )
  tasks: TasksEntity[]

  @Field()
  @CreateDateColumn()
  created_at: Date;


  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field()
  public getFullname () {
    return `${this.firstname} ${this.lastname}`;
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert () {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }
  
}

export default UserEntity;
