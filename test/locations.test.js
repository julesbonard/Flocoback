const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Location = require("../sequelize/models/locations");

describe("LOCATION", () => {
  chai.use(chaiHttp);
  before(() => sequelize.sync({ force: true }));
  const locationSample = {
    latitude: 40,
    longitude: 40
  };
  describe("GET * LOCATIONS", () => {
    it("It should return all locations.", async () => {
      await Location.create(locationSample);
      const res = await chai.request(server).get("/locations");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(locationSample);
      res.body[0].should.have.property("latitude");
      res.body[0].should.have.property("longitude");
      res.body.length.should.be.eql(1);
    });
  });
});
