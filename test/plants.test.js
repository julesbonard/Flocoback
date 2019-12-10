const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Plants = require("../sequelize/models/plants");

const plantsKeys = ["uuid", "image", "createdAt", "updatedAt"];
chai.use(chaiHttp);

const plantsSample = {
  image:
    "https://www.ikea.com/fr/fr/images/products/monstera-potted-plant__0653991_PE708220_S5.JPG?f=s"
};

describe("PLANTS", () => {
  before(() => sequelize.sync({ force: true }));
  describe("GET * PLANTS", () => {
    it("It should return all plants.", async () => {
      await Plants.create(plantsSample);
      const res = await chai.request(server).get("/plants");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(plantsSample);
      res.body[0].should.have.property("image");
      res.body.length.should.be.eql(1);
    });
  });
});

//GET TEST
describe("GET ONE PLANTS", () => {
  it("should return a SINGLE plants", async () => {
    const plants = await Plants.create(plantsSample);
    const res = await chai.request(server).get(`/plants/${plants.uuid}`);
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("object");
    res.body.should.have.keys(plantsKeys);
  });
});

//POST TEST
describe("POST ONE PLANTS", () => {
  it("should add a SINGLE plants", async () => {
    const res = await chai
      .request(server)
      .post(`/plants`)
      .send(plantsSample);
    res.should.have.status(201);
    res.should.be.json;
    res.body.should.be.a("object");
    res.body.should.include(plantsSample);
    res.body.should.have.keys(plantsKeys);
  });
});

//PUT TEST
describe("PUT ONE PLANTS", () => {
  it("should update a SINGLE plants", async () => {
    const plants = await Plants.create(plantsSample);
    const res = await chai
      .request(server)
      .put(`/plants/${plants.uuid}`)
      .send({ number: 10 });
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
  });
});

//DELETE TEST
describe("DELETE ONE PLANTS", () => {
  it("should delete a SINGLE plants", async () => {
    const plants = await Plants.create(plantsSample);
    const res = await chai.request(server).delete(`/plants/${plants.uuid}`);
    res.should.have.status(200);
    res.should.be.json;
  });
});
