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


@Entity("users")
class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @OneToMany(
    () => TasksEntity,
    tasks => tasks.user
  )
  tasks: TasksEntity[]

  @CreateDateColumn()
  created_at: Date;


  @UpdateDateColumn()
  updated_at: Date;

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
