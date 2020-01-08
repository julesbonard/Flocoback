const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Partners = require("../sequelize/models/partners");

chai.use(chaiHttp);

const partnersKeys = [
  "uuid",
  "name",
  "address",
  "tags",
  "phone",
  "score",
  "website",
  "createdAt",
  "updatedAt"
];
const partnersSample = {
  name: "name",
  address: "address",
  phone: 0640404040,
  tags: "dfsg",
  website: "sdgkg",
  score: 1
};

describe("PARTNERS", () => {
  before(() => sequelize.sync({ force: true }));

  //GET * TEST
  describe("GET * PARTNER", () => {
    it("It should return all partners.", async () => {
      await Partners.create(partnersSample);
      const res = await chai.request(server).get("/partners");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(partnersSample);
      res.body[0].should.keys(partnersKeys);
      res.body.length.should.be.eql(1);
    });
  });

  //GET TEST
  describe("GET ONE PARTNER", () => {
    it("should return a SINGLE partners", async () => {
      const partners = await Partners.create(partnersSample);
      const res = await chai.request(server).get(`/partners/${partners.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(partnersKeys);
    });
  });

  //POST TEST
  describe("POST ONE PARTNER", () => {
    it("should add a SINGLE partners", async () => {
      const res = await chai
        .request(server)
        .post(`/partners`)
        .send(partnersSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(partnersSample);
      res.body.should.have.keys(partnersKeys);
    });

    //POST TEST FAIL ONE partners
    it("should fail at adding one partners (wrong keys)", async () => {
      const res = await chai
        .request(server)
        .post(`/partners`)
        .send({ name: false });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
    it("should fail at adding one partners (wrong keys)", async () => {
      const res = await chai
        .request(server)
        .post(`/partners`)
        .send({ nam: "ddjdjd" });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //PUT TEST
  describe("PUT ONE PARTNER", () => {
    it("should update a SINGLE partners", async () => {
      const partners = await Partners.create(partnersSample);
      const res = await chai
        .request(server)
        .put(`/partners/${partners.uuid}`)
        .send({ name: "dfgdgdgdg" });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });

    //PUT TEST FAIL ONE partners
    it("should fail at updating a SINGLE partners (interger values instead of string)", async () => {
      const changepartners = await Partners.create(partnersSample);
      const res = await chai
        .request(server)
        .put(`/partners/${changepartners.uuid}`)
        .send({ name: 1342 });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //DELETE TEST
  describe("DELETE ONE PARTNER", () => {
    it("should delete a SINGLE partners", async () => {
      const partners = await Partners.create(partnersSample);
      const res = await chai
        .request(server)
        .delete(`/partners/${partners.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
