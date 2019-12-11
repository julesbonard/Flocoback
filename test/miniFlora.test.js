const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const MiniFlora = require("../sequelize/models/miniFlora");

const miniFloraKeys = ["uuid", "number", "createdAt", "updatedAt"];

chai.use(chaiHttp);
describe("MINIFLORA", () => {
  before(() => sequelize.sync({ force: true }));
  const miniFloraSample = {
    number: 123
  };
  //GET ALL TEST
  describe("GET * MINIFLORA", () => {
    it("It should return all miniFlora.", async () => {
      await MiniFlora.create(miniFloraSample);
      const res = await chai.request(server).get("/miniFlora");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(miniFloraSample);
      res.body[0].should.have.property("number");
      res.body.length.should.be.eql(1);
    });
    //FAIL GET ALL TEST
    it("should fail at returning all miniFlora", async () => {
      await MiniFlora.create(miniFloraSample);
      const res = await chai.request(server).get(`/statsOxy`);
      res.should.have.status(404);
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
    //FAIL GET TEST
    it("should fail at returning a SINGLE miniFlora", async () => {
      const miniFlora = await MiniFlora.create(miniFloraSample);
      const res = await chai.request(server).get(`${miniFlora.uuid}`);
      res.should.have.status(404);
    });
  });

  //POST TEST
  describe("POST ONE MINIFLORA", () => {
    it("should add a SINGLE miniFlora", async () => {
      await MiniFlora.create(miniFloraSample);
      const res = await chai
        .request(server)
        .post(`/miniFlora`)
        .send(miniFloraSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(miniFloraSample);
      res.body.should.have.property("number");
    });
    // FAIL POST TEST
    it("should fail at adding a SINGLE miniFlora", async () => {
      const res = await chai
        .request(server)
        .post("/miniFlora")
        .send({ dte: 23, rat: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //PUT TEST
  describe("PUT ONE MINIFLORA", () => {
    it("should update a SINGLE miniFlora", async () => {
      const miniFlora = await MiniFlora.create(miniFloraSample);
      const res = await chai
        .request(server)
        .put(`/miniFlora/${miniFlora.uuid}`)
        .send({ number: 10 });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
    });
    // FAIL PUT TEST
    it("should fail at updating a SINGLE miniFlora", async () => {
      const miniFlora = await MiniFlora.create(miniFloraSample);
      const res = await chai
        .request(server)
        .put(`/miniFlora/${miniFlora.uuid}`)
        .send({ number: "aaaee" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
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
