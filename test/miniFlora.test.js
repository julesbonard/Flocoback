const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const MiniFlora = require("../sequelize/models/miniFlora");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const miniFloraSample = {
  number: 123
};
describe("MINIFLORA", () => {
  describe("GET * MINIFLORA", () => {
    it("It should return all miniFlora.", async () => {
      await MiniFlora.create(miniFloraSample);
      const res = await chai.request(server).get("/miniFlora");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(miniFloraSample);
      res.body.length.should.be.eql(1);
    });
  });
});
