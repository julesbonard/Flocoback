const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Seed = require("../sequelize/models/seeds");

const seedsKeys = [
  "uuid",
  "name",
  "status",
  "type",
  "environment",
  "season",
  "exposure",
  "spray",
  "createdAt",
  "updatedAt"
];

describe("SEED", () => {
  chai.use(chaiHttp);
  before(() => sequelize.sync({ force: true }));
  const seedsSample = {
    name: "rose",
    status: "vulnérable",
    type: "vivace",
    environment: "extérieur/intérieur",
    season: "printemps",
    exposure: "sun",
    spray: "fréquente"
  };
  describe("GET * SEEDS", () => {
    it("It should return all seeds.", async () => {
      await Seed.create(seedsSample);
      const res = await chai.request(server).get("/seeds");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(seedsSample);
      res.body.length.should.be.eql(1);
    });
  });

  //GET TEST
  describe("GET ONE SEEDS", () => {
    it("should return a SINGLE seeds", async () => {
      const seeds = await Seed.create(seedsSample);
      const res = await chai.request(server).get(`/seeds/${seeds.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(seedsKeys);
    });
  });

  //POST TEST
  describe("POST ONE SEEDS", () => {
    it("should add a SINGLE seeds", async () => {
      await Seed.create(seedsSample);
      const res = await chai
        .request(server)
        .post(`/seeds`)
        .send(seedsSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(seedsSample);
      res.body.should.have.keys(seedsKeys);
    });
    // FAIL POST TEST
    it("should fail at adding a SINGLE seeds", async () => {
      const res = await chai
        .request(server)
        .post("/seeds")
        .send({ status: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
    it("should fail at adding a SINGLE seeds", async () => {
      const res = await chai
        .request(server)
        .post("/statsCity")
        .send({ nudfff: "ert", qsd: "xcvb" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //PUT TEST
  describe("PUT ONE SEEDS", () => {
    it("should update a SINGLE seeds", async () => {
      const seeds = await Seed.create(seedsSample);
      const res = await chai
        .request(server)
        .put(`/seeds/${seeds.uuid}`)
        .send({ status: "scfresxcf" });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });
    // FAIL PUT TEST
    it("should fail at updating a SINGLE seeds", async () => {
      const seeds = await Seed.create(seedsSample);
      const res = await chai
        .request(server)
        .put(`/seeds/${seeds.uuid}`)
        .send({ status: 123 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //DELETE TEST
  describe("DELETE ONE SEEDS", () => {
    it("should delete a SINGLE seeds", async () => {
      const seeds = await Seed.create(seedsSample);
      const res = await chai.request(server).delete(`/seeds/${seeds.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
