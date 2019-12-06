const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const StatsCity = require("../sequelize/models/statsCity");

const statsCityKeys = ["uuid", "district", "street", "createdAt", "updatedAt"];

chai.use(chaiHttp);
describe("STATSCITY", () => {
  before(() => sequelize.sync({ force: true }));
  const statsCitySample = {
    street: 123,
    district: 3
  };
  //GET ALL TEST
  describe("GET * STATSCITY", () => {
    it("It should return all statsCity.", async () => {
      await StatsCity.create(statsCitySample);
      const res = await chai.request(server).get("/statsCity");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(statsCitySample);
      res.body[0].should.have.property("district");
      res.body[0].should.have.property("street");
      res.body.length.should.be.eql(1);
    });
    //FAIL GET ALL TEST
    it("should fail at returning a SINGLE statsCity", async () => {
      await StatsCity.create(statsCitySample);
      const res = await chai.request(server).get(`/statsOxy`);
      res.should.have.status(404);
    });
  });

  //GET TEST
  describe("GET ONE STATSCITY", () => {
    it("should return a SINGLE statsCity", async () => {
      const statsCity = await StatsCity.create(statsCitySample);
      const res = await chai
        .request(server)
        .get(`/statsCity/${statsCity.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(statsCityKeys);
    });
    //FAIL GET TEST
    it("should fail at returning a SINGLE statsCity", async () => {
      const statsCity = await StatsCity.create(statsCitySample);
      const res = await chai.request(server).get(`${statsCity.uuid}`);
      res.should.have.status(404);
    });
  });

  //POST TEST
  describe("POST ONE STATSCITY", () => {
    it("should add a SINGLE statsCity", async () => {
      await StatsCity.create(statsCitySample);
      const res = await chai
        .request(server)
        .post(`/statsCity`)
        .send(statsCitySample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(statsCitySample);
      res.body.should.have.property("street");
      res.body.should.have.property("district");
    });
    // FAIL POST TEST
    it("should fail at adding a SINGLE statsCity", async () => {
      const res = await chai
        .request(server)
        .post("/statsCity")
        .send({ dte: 23, rat: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //PUT TEST
  describe("PUT ONE STATSCITY", () => {
    it("should update a SINGLE statsCity", async () => {
      const statsCity = await StatsCity.create(statsCitySample);
      const res = await chai
        .request(server)
        .put(`/statsCity/${statsCity.uuid}`)
        .send({ street: 10 });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
    });
    // FAIL PUT TEST
    it("should fail at updating a SINGLE statsCity", async () => {
      const statsCity = await StatsCity.create(statsCitySample);
      const res = await chai
        .request(server)
        .put(`/statsCity/${statsCity.uuid}`)
        .send({ street: "aaaee" });
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a("object");
    });
  });

  //DELETE TEST
  describe("DELETE ONE STATSCITY", () => {
    it("should delete a SINGLE statsCity", async () => {
      const statsCity = await StatsCity.create(statsCitySample);
      const res = await chai
        .request(server)
        .delete(`/statsCity/${statsCity.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
    //FAIL DELETE TEST
    it("should fail at deleting a SINGLE statsCity", async () => {
      const statsCity = await StatsCity.create(statsCitySample);
      const res = await chai.request(server).delete(`/${statsCity.uuid}`);
      res.should.have.status(404);
    });
  });
});
