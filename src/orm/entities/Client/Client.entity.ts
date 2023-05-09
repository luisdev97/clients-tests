import bcrypt from "bcryptjs";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Policy } from "../Policy/Policy.entity";

import { Role } from "./types";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    default: "user" as Role,
    length: 10,
  })
  role: string;

  @OneToMany(() => Policy, (policy) => policy.client)
  policies?: Policy[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
