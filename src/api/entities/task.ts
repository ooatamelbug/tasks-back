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

@Entity("tasks")
class TasksEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string


  @Column()
  desc: string


  @Column()
  status: boolean

  @ManyToOne(
      () => UserEntity,
      user => user.getFullname
  )
  @JoinTable({
    name: "user_id"
  })
  user: UserEntity

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TasksEntity;
