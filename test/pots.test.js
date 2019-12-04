const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Pot = require("../sequelize/models/pots");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const userSample = {
  Width: 40,
  length: 25,
  Depth: 40
};
describe("POT", () => {
  describe("GET * POTS", () => {
    it("It should return all pots.", async () => {
      await Pot.create(userSample);
      const res = await chai.request(server).get("/pots");
      console.log(typeof res.body[0].Width);

      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(userSample);
      res.body.length.should.be.eql(1);
    });
  });
});
