const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Partner = require("../sequelize/models/partners");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const partnerSample = {
  name: "Name",
  address: "Address",
  phone: 0640404040
};
describe("PARTNER", () => {
  describe("GET * PARTNERS", () => {
    it("It should return all partners.", async () => {
      await Partner.create(partnerSample);
      const res = await chai.request(server).get("/partners");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(partnerSample);
      res.body.length.should.be.eql(1);
    });
  });
});
