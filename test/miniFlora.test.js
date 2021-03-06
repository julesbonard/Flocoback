const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const MiniFlora = require("../sequelize/models/miniFlora");

chai.use(chaiHttp);

const miniFloraKeys = ["uuid", "number", "createdAt", "updatedAt"];
const miniFloraSample = {
  number: 123
};

describe("MINIFLORA", () => {
  before(() => sequelize.sync({ force: true }));
  //GET ALL TEST
  describe("GET * MINIFLORA", () => {
    it("It should return all miniFlora.", async () => {
      await MiniFlora.create(miniFloraSample);
      const res = await chai.request(server).get("/miniFlora");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(miniFloraSample);
      res.body.length.should.be.eql(1);
    });
  });

  //GET TEST
  describe("GET ONE MINIFLORA", () => {
    it("should return a SINGLE miniFlora", async () => {
      const miniFlora = await MiniFlora.create(miniFloraSample);
      const res = await chai
        .request(server)
        .get(`/miniFlora/${miniFlora.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(miniFloraKeys);
    });
  });

  //POST TEST
  describe("POST ONE MINIFLORA", () => {
    it("should add a SINGLE miniFlora", async () => {
      const res = await chai
        .request(server)
        .post(`/miniFlora`)
        .send(miniFloraSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(miniFloraSample);
      res.body.should.have.keys(miniFloraKeys);
    });

    //POST TEST FAIL ONE miniFlora
    it("should fail at adding one miniFlora (wrong keys)", async () => {
      const res = await chai
        .request(server)
        .post(`/miniFlora`)
        .send({ number: false });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
    it("should fail at adding one miniFlora (wrong keys)", async () => {
      const res = await chai
        .request(server)
        .post(`/miniFlora`)
        .send({ numer: "ddjdjd" });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //PUT TEST
  describe("PUT ONE MINIFLORA", () => {
    it("should update a SINGLE miniFlora", async () => {
      const miniFlora = await MiniFlora.create(miniFloraSample);
      const res = await chai
        .request(server)
        .put(`/miniFlora/${miniFlora.uuid}`)
        .send({ number: 12 });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
    });

    //PUT TEST FAIL ONE miniFlora
    it("should fail at updating a SINGLE miniFlora (interger values instead of string)", async () => {
      const changeMiniFlora = await MiniFlora.create(miniFloraSample);
      const res = await chai
        .request(server)
        .put(`/miniFlora/${changeMiniFlora.uuid}`)
        .send({ number: "fffsdf" });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //DELETE TEST
  describe("DELETE ONE MINIFLORA", () => {
    it("should delete a SINGLE miniFlora", async () => {
      const miniFlora = await MiniFlora.create(miniFloraSample);
      const res = await chai
        .request(server)
        .delete(`/miniFlora/${miniFlora.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
