import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Client } from "../Client/Client.entity";

@Entity("policies")
export class Policy {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
    name: "amountInsured",
  })
  amountInsured: number;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    name: "inceptionDate",
  })
  inceptionDate: string;

  @Column({
    name: "installmentPayment",
  })
  installmentPayment: boolean;

  @Column({
    name: "clientId",
  })
  clientId: string;

  @ManyToOne(() => Client, (client) => client.policies)
  @JoinColumn({ name: "clientId" })
  client: Client;
}
