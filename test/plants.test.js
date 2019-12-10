const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Plant = require("../sequelize/models/plants");

chai.use(chaiHttp);
describe("Plant", () => {
  before(() => sequelize.sync({ force: true }));
  const plantSample = {
    image:
      "https://www.ikea.com/fr/fr/images/products/monstera-potted-plant__0653991_PE708220_S5.JPG?f=s"
  };

  describe("GET * PLANTS", () => {
    it("It should return all plants.", async () => {
      await Plant.create(plantSample);
      const res = await chai.request(server).get("/plants");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(plantSample);
      res.body.length.should.be.eql(1);
    });
  });

  describe("GET ONE PLANT", () => {
    it("should return only one plant", async () => {
      const plant = await Plant.create(plantSample);
      const res = await chai.request(server).get(`/plants/${plant.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(plantSample);
      res.body.should.have.keys(["uuid", "image", "createdAt", "updatedAt"]);
    });
  });
});
