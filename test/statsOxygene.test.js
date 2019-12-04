const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const StatsOxygene = require("../sequelize/models/statsOxygene");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const statsOxygeneSample = {
  date: "1970-01-01T00:00:00.000Z",
  rate: 34
};
describe("STATSOXYGENE", () => {
  describe("GET * STATSOXYGENE", () => {
    it("It should return all statsOxygene.", async () => {
      await StatsOxygene.create(statsOxygeneSample);
      const res = await chai.request(server).get("/statsOxygene");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(statsOxygeneSample);
      res.body.length.should.be.eql(1);
    });
  });
});
