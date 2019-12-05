const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const StatsOxygene = require("../sequelize/models/statsOxygene");

const statsOxygeneKeys = ["uuid", "date", "rate", "createdAt", "updatedAt"];

chai.use(chaiHttp);
describe("STATSOXYGENE", () => {
  before(() => sequelize.sync({ force: true }));
  const statsOxygeneSample = {
    date: "1970-01-01T00:00:00.000Z",
    rate: 34
  };
  describe("GET * STATSOXYGENE", () => {
    it("It should return all statsOxygene.", async () => {
      await StatsOxygene.create(statsOxygeneSample);
      const res = await chai.request(server).get("/statsOxygene");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(statsOxygeneSample);
      res.body[0].should.have.property("date");
      res.body[0].should.have.property("rate");
      res.body.length.should.be.eql(1);
    });
  });

  describe("GET ONE STATSOXYGENE", () => {
    it("should return a SINGLE statsOxygene", async () => {
      const statsOxygene = await StatsOxygene.create(statsOxygeneSample);
      const res = await chai
        .request(server)
        .get(`/statsOxygene/${statsOxygene.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(statsOxygeneKeys);
    });
  });

  describe("PUT ONE STATSOXYGENE", () => {
    it("should update a SINGLE statsOxygene", async () => {
      const statsOxygene = await StatsOxygene.create(statsOxygeneSample);
      const res = await chai
        .request(server)
        .put(`/statsOxygene/${statsOxygene.uuid}`)
        .send({ rate: 10 });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(statsOxygeneKeys);
    });
  });

  describe("POST ONE STATSOXYGENE", () => {
    it("should add a SINGLE statsOxygene", async () => {
      await StatsOxygene.create(statsOxygeneSample);
      const res = await chai
        .request(server)
        .post(`/statsOxygene`)
        .send(statsOxygeneSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(statsOxygeneSample);
      res.body.should.have.property("date");
      res.body.should.have.property("rate");
    });
    it("should fail at adding a SINGLE statsOxygene", async () => {
      const res = await chai
        .request(server)
        .post("/statsOxygene")
        .send({ dte: 23, rat: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  describe("DELETE ONE STATSOXYGENE", () => {
    it("should delete a SINGLE statsOxygene", async () => {
      const statsOxygene = await StatsOxygene.create(statsOxygeneSample);
      const res = await chai
        .request(server)
        .delete(`/statsOxygene/${statsOxygene.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });
  });
});
