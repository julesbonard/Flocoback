const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const StatsTaxons = require("../sequelize/models/statsTaxons");

const statsTaxonsKeys = [
  "uuid",
  "restored",
  "number",
  "status",
  "createdAt",
  "updatedAt"
];

chai.use(chaiHttp);
describe("STATSTAXONS", () => {
  before(() => sequelize.sync({ force: true }));
  const statsTaxonsSample = {
    number: 3,
    restored: true,
    status: "en danger critique"
  };
  //GET ALL TEST
  describe("GET * STATSTAXONS", () => {
    it("It should return all statsTaxons.", async () => {
      await StatsTaxons.create(statsTaxonsSample);
      const res = await chai.request(server).get("/statsTaxons");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(statsTaxonsSample);
      res.body[0].should.have.keys(statsTaxonsKeys);
      res.body.length.should.be.eql(1);
    });
  });

  //GET TEST
  describe("GET ONE STATSTAXONS", () => {
    it("should return a SINGLE statsTaxons", async () => {
      const statsTaxons = await StatsTaxons.create(statsTaxonsSample);
      const res = await chai
        .request(server)
        .get(`/statsTaxons/${statsTaxons.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(statsTaxonsKeys);
    });
  });

  //POST TEST
  describe("POST ONE STATSTAXONS", () => {
    it("should add a SINGLE statsTaxons", async () => {
      await StatsTaxons.create(statsTaxonsSample);
      const res = await chai
        .request(server)
        .post(`/statsTaxons`)
        .send(statsTaxonsSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(statsTaxonsSample);
      res.body.should.have.keys(statsTaxonsKeys);
    });
    // FAIL POST TEST
    it("should fail at adding a SINGLE statsTaxons", async () => {
      const res = await chai
        .request(server)
        .post("/statsTaxons")
        .send({ number: 23, restored: 30, status: 1234 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
    it("should fail at adding a SINGLE statsTaxons", async () => {
      const res = await chai
        .request(server)
        .post("/statsCity")
        .send({ nudfff: "ert", qsd: "xcvb" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //PUT TEST
  describe("PUT ONE STATSTAXONS", () => {
    it("should update a SINGLE statsTaxons", async () => {
      const statsTaxons = await StatsTaxons.create(statsTaxonsSample);
      const res = await chai
        .request(server)
        .put(`/statsTaxons/${statsTaxons.uuid}`)
        .send({ number: 10 });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });
    // FAIL PUT TEST
    it("should fail at updating a SINGLE statsTaxons", async () => {
      const statsTaxons = await StatsTaxons.create(statsTaxonsSample);
      const res = await chai
        .request(server)
        .put(`/statsTaxons/${statsTaxons.uuid}`)
        .send({ number: "aaaee" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //DELETE TEST
  describe("DELETE ONE STATSTAXONS", () => {
    it("should delete a SINGLE statsTaxons", async () => {
      const statsTaxons = await StatsTaxons.create(statsTaxonsSample);
      const res = await chai
        .request(server)
        .delete(`/statsTaxons/${statsTaxons.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
