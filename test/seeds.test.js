const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Seed = require("../sequelize/models/seeds");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const SeedSample = {
  name: "rose",
  statut: "vulnérable",
  type: "vivace",
  environment: "extérieur/intérieur",
  season: "printemps",
  exposure: "sun",
  spray: "fréquente"
};
describe("SEED", () => {
  describe("GET * SEEDS", () => {
    it("It should return all seeds.", async () => {
      await Seed.create(SeedSample);
      const res = await chai.request(server).get("/seeds");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(SeedSample);
      res.body.length.should.be.eql(1);
    });
  });
});
