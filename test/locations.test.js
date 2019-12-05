const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Location = require("../sequelize/models/locations");

const locationKeys = [
  "uuid",
  "latitude",
  "longitude",
  "createdAt",
  "updatedAt"
];

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const locationSample = {
  latitude: 40,
  longitude: 40
};
describe("LOCATION", () => {
  describe("GET * LOCATIONS", () => {
    it("It should return all locations.", async () => {
      await Location.create(locationSample);
      const res = await chai.request(server).get("/locations");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body.length.should.be.eql(1);
      res.body[0].should.include(locationSample);
      res.body[0].should.have.keys(locationKeys);
    });
  });
  describe("PUT * LOCATIONS", () => {
    it("It should update all locations.", async () => {
      await Location.create(locationSample);
      const res = await chai
        .request(server)
        .put("/locations")
        .send({ latitude: 33, longitude: 33 });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(locationSample);
      res.body[0].should.have.property("latitude");
      res.body[0].should.have.property("longitude");
    });
  });
  describe("POST ONE LOCATIONS", () => {
    it("It should add one locations.", async () => {
      const res = await chai
        .request(server)
        .post("/locations")
        .send(locationSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(locationSample);
      res.body.should.have.keys(locationKeys);
    });

    it("should fail at adding one location", async () => {
      const res = await chai
        .request(server)
        .post("/locations")
        .send({ latude: 20, lontude: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });
  describe("DELETE ONE LOCATIONS", () => {
    it("It should delete the selected location", async () => {
      const createdLocation = await Location.create(locationSample);
      const res = await chai
        .request(server)
        .delete(`/locations/${createdLocation.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(locationSample);
      res.body.should.have.keys(locationKeys);
    });
  });
});
