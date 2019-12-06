const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Partner = require("../sequelize/models/partners");

describe("PARTNER", () => {
  chai.use(chaiHttp);
  before(() => sequelize.sync({ force: true }));
  const partnerSample = {
    name: "Name",
    address: "Address",
    phone: 0640404040
  };
  describe("GET * PARTNERS", () => {
    it("It should return all partners.", async () => {
      await Partner.create(partnerSample);
      const res = await chai.request(server).get("/partners");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(partnerSample);
      res.body[0].should.have.property("name");
      res.body[0].should.have.property("address");
      res.body[0].should.have.property("phone");
      res.body.length.should.be.eql(1);
    });
  });
});
