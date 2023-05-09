import { expect } from "chai";
import { agent as request } from "supertest";
import { getRepository, Connection, Repository } from "typeorm";

import { dbCreateConnection } from "orm/dbCreateConnection";

import { app } from "../../../";
import { Client } from "../../../orm/entities";
import { getDBFixture } from "../../../utils";

import "mocha";

describe("E2E - Login user", () => {
  let dbConnection: Connection;
  let clientRepository: Repository<Client>;
  const unencryptedPass = "123";
  const dbFixture = getDBFixture();
  const fixtureUser = dbFixture.clients[0];

  before(async () => {
    dbConnection = await dbCreateConnection();
    clientRepository = getRepository(Client);
    await clientRepository.save(dbFixture.clients);
  });

  after(async () => {
    await dbConnection?.dropDatabase();
  });

  it("should return a JWT token", async () => {
    const res = await request(app)
      .post("/v1/auth/login")
      .send({ email: fixtureUser.email, password: unencryptedPass });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Token successfully created.");
    expect(res.body.data).not.to.be.empty;
    expect(res.body.data).to.be.an("string");
  });

  it("should report error when password don't match", async () => {
    const res = await request(app)
      .post("/v1/auth/login")
      .send({ email: fixtureUser.email, password: "wrong_password" });
    expect(res.status).to.equal(401);
    expect(res.body.errorType).to.equal("General");
    expect(res.body.errors).to.eql(["Incorrect password"]);
    expect(res.body.errorRaw).to.an("null");
    expect(res.body.errorsValidation).to.an("null");
  });
});
