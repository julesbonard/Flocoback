const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Seed = require("../sequelize/models/seeds");

chai.use(chaiHttp);

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

const seedsSample = {
  name: "rose",
  status: "vulnérable",
  type: "vivace",
  environment: "extérieur/intérieur",
  season: "printemps",
  exposure: "sun",
  spray: "fréquente"
};
const usersSample = {
  firstName: "Toto",
  lastName: "Paul",
  avatar:
    "https://images.assetsdelivery.com/compings_v2/gmast3r/gmast3r1710/gmast3r171002485.jpg",
  email: "totopaul@gmail.com",
  pseudo: "azerty",
  password: "ytreza23",
  isOAuth: true
};

let token = "";

describe("SEED", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const res = await chai
      .request(server)
      .post(`/users`)
      .send(usersSample);
    token = res.body.token;
  });
  //GET ALL TEST
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
        .set("access-token", token)
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
        .set("access-token", token)
        .send({ status: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
    it("should fail at adding a SINGLE seeds", async () => {
      const res = await chai
        .request(server)
        .post("/statsCity")
        .set("access-token", token)
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
        .set("access-token", token)
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
        .set("access-token", token)
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
      const res = await chai
        .request(server)
        .delete(`/seeds/${seeds.uuid}`)
        .set("access-token", token);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
