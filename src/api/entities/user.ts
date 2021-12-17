import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from "typeorm";
import {  genSalt, hash } from "bcryptjs";


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
