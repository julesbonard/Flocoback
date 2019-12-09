const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Pot = require("../sequelize/models/pots");

describe("POT", () => {
  chai.use(chaiHttp);
  before(() => sequelize.sync({ force: true }));
  const PotSample = {
    Width: 40,
    length: 35,
    Depth: 40
  };
  describe("GET * POTS", () => {
    it("It should return all pots.", async () => {
      await Pot.create(PotSample);
      const res = await chai.request(server).get("/pots");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(PotSample);
      res.body.length.should.be.eql(1);
    });
  });
});
