import { expect } from "chai";
import { agent } from "supertest";
import { getRepository, Connection, Repository, getManager } from "typeorm";

import { app } from "../../..";
import { dbCreateConnection } from "../../../orm/dbCreateConnection";
import { Client, Policy } from "../../../orm/entities";
import { getDBFixture } from "../../../utils";

import "mocha";

describe("E2E- Get client policies", () => {
  let dbConnection: Connection;
  let clientRepository: Repository<Client>;
  let policyRepository: Repository<Policy>;
  const dbFixture = getDBFixture();

  before(async () => {
    dbConnection = await dbCreateConnection();
    await dbConnection.synchronize();
    const entityManager = getManager();
    await entityManager.clear(Policy);
    await entityManager.clear(Client);
    clientRepository = getRepository(Client);
    policyRepository = getRepository(Policy);
    await clientRepository.save(dbFixture.clients);
    await policyRepository.save(dbFixture.policies);
  });

  after(async () => {
    await dbConnection?.dropDatabase();
  });

  it("should return a list that contains a client with two policies", async () => {
    const res = await agent(app)
      .get("/v1/clients/policies")
      .query({ clientName: "Luis David" });
    expect(res.body.message).to.equal("Client Policies.");
    expect(res.body.data.policies).to.length(3);
    expect(res.body.data.policies[2].amountInsured).to.equal(17241);
  });

  it("should return an error for not found client", async () => {
    const res = await agent(app)
      .get("/v1/clients/policies")
      .query({ clientName: "Pedro rosas" });
    expect(res.body.errorMessage).to.equal(
      "Client with name:Pedro rosas not found."
    );
    expect(res.body.errors).to.includes("Client not found.");
  });
});
