const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Partners = require("../sequelize/models/partners");

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

chai.use(chaiHttp);

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
  describe("GET * PARTNERS", () => {
    it("It should return all partners.", async () => {
      await Partners.create(partnersSample);
      const res = await chai.request(server).get("/partners");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(partnersSample);
      res.body[0].should.have.property("name");
      res.body[0].should.have.property("address");
      res.body[0].should.have.property("phone");
      res.body.length.should.be.eql(1);
    });
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
describe("POST ONE PARTNERS", () => {
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
});

//PUT TEST
describe("PUT ONE PARTNERS", () => {
  it("should update a SINGLE partners", async () => {
    const partners = await Partners.create(partnersSample);
    const res = await chai
      .request(server)
      .put(`/partners/${partners.uuid}`)
      .send({ number: 10 });
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
  });
});

//DELETE TEST
describe("DELETE ONE PARTNERS", () => {
  it("should delete a SINGLE partners", async () => {
    const partners = await Partners.create(partnersSample);
    const res = await chai.request(server).delete(`/partners/${partners.uuid}`);
    res.should.have.status(200);
    res.should.be.json;
  });
});
