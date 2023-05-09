import { expect } from "chai";
import { agent } from "supertest";
import { getRepository, Connection, Repository, getManager } from "typeorm";

import { app } from "../../..";
import { dbCreateConnection } from "../../../orm/dbCreateConnection";
import { Client } from "../../../orm/entities/Client/Client.entity";
import { getDBFixture } from "../../../utils/test-db-fixutre/get-test-db-fixture";

import "mocha";

describe("E2E- Get client by name", () => {
  let dbConnection: Connection;
  let clientRepository: Repository<Client>;
  const dbFixture = getDBFixture();

  const fixtureClient = dbFixture.clients[1];

  before(async () => {
    dbConnection = await dbCreateConnection();
    await dbConnection.synchronize();
    const entityManager = getManager();
    await entityManager.clear(Client);
    clientRepository = getRepository(Client);
    await clientRepository.save(dbFixture.clients);
  });

  after(async () => {
    await dbConnection?.dropDatabase();
  });

  it("should return client not found error", async () => {
    const res = await agent(app)
      .get("/v1/clients")
      .query({ clientName: "Invalid-name" });
    expect(res.body.errorMessage).to.equal(
      "Client with name:Invalid-name not found."
    );
    expect(res.body.errors).to.includes("Client not found.");
  });

  it("should return client data", async () => {
    const res = await agent(app)
      .get(`/v1/clients`)
      .query({ clientName: fixtureClient.name });
    expect(res.body.message).to.equal("Client found.");
    expect(res.body.data.email).to.equal("luis@gmail.com");
  });
});
