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
describe("LOCATION", () => {
  before(() => sequelize.sync({ force: true }));
  const locationSample = {
    latitude: 40,
    longitude: 40
  };

  //GET ALL TEST
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
  //GET ONE TEST
  describe("GET ONE LOCATION", () => {
    it("should return a SINGLE LOCATION", async () => {
      const getLocation = await Location.create(locationSample);
      const res = await chai
        .request(server)
        .get(`/locations/${getLocation.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(locationKeys);
    });
  });

  //PUT TEST ONE LOCATION
  describe("PUT ONE LOCATION", () => {
    it("It should update one location.", async () => {
      const createdLocation = await Location.create(locationSample);
      const res = await chai
        .request(server)
        .put(`/locations/${createdLocation.uuid}`)
        .send({ latitude: 33, longitude: 33 });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });

    //PUT TEST FAIL ONE LOCATION
    it("should fail at updating a SINGLE location (string values instead of integer)", async () => {
      const changeLocation = await Location.create(locationSample);
      const res = await chai
        .request(server)
        .put(`/locations/${changeLocation.uuid}`)
        .send({ latitude: "aaaee", longitude: "adfd" });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });

    it("should fail at updating a SINGLE location (wrong keys)", async () => {
      const changeLocation = await Location.create(locationSample);
      const res = await chai
        .request(server)
        .put(`/locations/${changeLocation.uuid}`)
        .send({ laude: 1, lontude: 4 });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //POST TEST ONE LOCATION
  describe("POST ONE LOCATION", () => {
    it("It should add one location.", async () => {
      const createdLocation = await Location.create(locationSample);
      const res = await chai
        .request(server)
        .post(`/locations/${createdLocation.uuid}`)
        .send(locationSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(locationSample);
      res.body.should.have.keys(locationKeys);
    });

    //POST TEST FAIL ONE LOCATION
    it("should fail at adding one location (wrong keys)", async () => {
      const createdLocation = await Location.create(locationSample);
      const res = await chai
        .request(server)
        .post(`/locations/${createdLocation.uuid}`)
        .send({ latude: 20, lontude: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });

    //POST TEST FAIL ONE LOCATION
    it("should fail at adding one location", async () => {
      const createdLocation = await Location.create(locationSample);
      const res = await chai
        .request(server)
        .post(`/locations/${createdLocation.uuid}`)
        .send({ latitude: "tedwv", longitude: "xwves" });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //DELETE ALL LOCATIONS
  describe("DELETE ONE LOCATION", () => {
    it("It should delete one location", async () => {
      const deletedLocation = await Location.create(locationSample);
      const res = await chai
        .request(server)
        .delete(`/locations/${deletedLocation}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
