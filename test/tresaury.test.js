const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Tresaury = require("../sequelize/models/tresaury");

const tresauryKeys = [
  "uuid",
  "level",
  "badge",
  "points",
  "createdAt",
  "updatedAt"
];

chai.use(chaiHttp);

const tresaurySample = {
  level: 10,
  badge: "captain",
  points: 1
};

describe("TRESAURY", () => {
  before(() => sequelize.sync({ force: true }));
  describe("GET * TRESAURY", () => {
    it("It should return all tresaury.", async () => {
      await Tresaury.create(tresaurySample);
      const res = await chai.request(server).get("/tresaury");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body.length.should.be.eql(1);
      res.body[0].should.include(tresaurySample);
      res.body[0].should.have.keys(tresauryKeys);
    });
  });
  //GET ONE TEST
  describe("GET ONE TRESAURY", () => {
    it("should return a SINGLE tresaury", async () => {
      const tresaury = await Tresaury.create(tresaurySample);
      const res = await chai.request(server).get(`/tresaury/${tresaury.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(tresauryKeys);
    });
  });

  //PUT TEST ONE tresaury
  describe("PUT ONE TRESAURY", () => {
    it("It should update one tresaury.", async () => {
      const createdTresaury = await Tresaury.create(tresaurySample);
      const res = await chai
        .request(server)
        .put(`/tresaury/${createdTresaury.uuid}`)
        .send({ level: 12334 });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });

    //PUT TEST FAIL ONE tresaury
    it("should fail at updating a SINGLE tresaury (string values instead of integer)", async () => {
      const changeTresaury = await Tresaury.create(tresaurySample);
      const res = await chai
        .request(server)
        .put(`/tresaury/${changeTresaury.uuid}`)
        .send({ points: "sdf" });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });

    it("should fail at updating a SINGLE tresaury (wrong keys)", async () => {
      const changeTresaury = await Tresaury.create(tresaurySample);
      const res = await chai
        .request(server)
        .put(`/tresaury/${changeTresaury.uuid}`)
        .send({ poi: 1, elv: 4 });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //POST TEST ONE tresaury
  describe("POST ONE TRESAURY", () => {
    it("It should add one tresaury.", async () => {
      const res = await chai
        .request(server)
        .post(`/tresaury`)
        .send(tresaurySample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(tresaurySample);
      res.body.should.have.keys(tresauryKeys);
    });

    //POST TEST FAIL ONE tresaury
    it("should fail at adding one tresaury (wrong keys)", async () => {
      const res = await chai
        .request(server)
        .post(`/tresaury`)
        .send({ lev: 20, bad: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });

    //POST TEST FAIL ONE tresaury
    it("should fail at adding one tresaury", async () => {
      const res = await chai
        .request(server)
        .post(`/tresaury`)
        .send({ level: "tedwv", points: "xwves" });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //DELETE ALL tresaury
  describe("DELETE ONE TRESAURY", () => {
    it("It should delete one tresaury", async () => {
      const deletedTresaury = await Tresaury.create(tresaurySample);
      const res = await chai
        .request(server)
        .delete(`/tresaury/${deletedTresaury.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
