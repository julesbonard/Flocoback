const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const StatsTaxons = require("../sequelize/models/statsTaxons");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const statsTaxonsSample = {
  number: 3,
  restored: true,
  status: "en danger critique"
};
describe("STATSTAXONS", () => {
  describe("GET * STATSTAXONS", () => {
    it("It should return all statsTaxons.", async () => {
      await StatsTaxons.create(statsTaxonsSample);
      const res = await chai.request(server).get("/statsTaxons");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(statsTaxonsSample);
      res.body.length.should.be.eql(1);
    });
  });
});
