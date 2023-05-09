import { Client } from "orm/entities/Client/Client.entity";
import { Role } from "orm/entities/Client/types";
import { Policy } from "orm/entities/Policy/Policy.entity";

export function getDBFixture() {
  const basicClient = new Client();
  basicClient.id = "66164d4e-ee50-11ed-a05b-0242ac120003";
  basicClient.name = "Juan Nuñez";
  basicClient.email = "juan@domain.com";
  basicClient.password = "123";
  basicClient.hashPassword();
  basicClient.role = "admin" as Role;

  const adminClient = new Client();
  adminClient.id = "725cf33c-ee50-11ed-a05b-0242ac120003";
  adminClient.name = "Luis David";
  adminClient.email = "luis@gmail.com";
  adminClient.password = "simple_admin_key";
  adminClient.hashPassword();
  adminClient.role = "admin" as Role;

  const firstPolicy = new Policy();
  firstPolicy.amountInsured = 52550;
  firstPolicy.email = "v";
  firstPolicy.inceptionDate = "";
  firstPolicy.installmentPayment = true;
  firstPolicy.clientId = adminClient.id;

  const secondPolicy = new Policy();
  secondPolicy.amountInsured = 52550;
  secondPolicy.email = "s";
  secondPolicy.inceptionDate = "2014-05-11T12:28:41Z";
  secondPolicy.installmentPayment = true;
  secondPolicy.clientId = adminClient.id;

  const thirdPolicy = new Policy();
  thirdPolicy.amountInsured = 17241;
  thirdPolicy.email = "z";
  thirdPolicy.inceptionDate = "2014-05-11T12:28:41Z";
  thirdPolicy.installmentPayment = false;
  thirdPolicy.clientId = adminClient.id;

  return {
    clients: [basicClient, adminClient],
    policies: [firstPolicy, secondPolicy, thirdPolicy],
  };
}
