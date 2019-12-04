const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const StatsCity = require("../sequelize/models/statsCity");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const statsCitySample = {
  district: 4,
  street: 345
};
describe("STATSCITY", () => {
  describe("GET * STATSCITY", () => {
    it("It should return all statsCity.", async () => {
      await StatsCity.create(statsCitySample);
      const res = await chai.request(server).get("/statsCity");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(statsCitySample);
      res.body.length.should.be.eql(1);
    });
  });
});
