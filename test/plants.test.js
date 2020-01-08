const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Plants = require("../sequelize/models/plants");
const Seed = require("../sequelize/models/seeds");
const Pot = require("../sequelize/models/pots");
const User = require("../sequelize/models/users");

chai.use(chaiHttp);

const plantsKeys = ["uuid", "image", "createdAt", "updatedAt", "SeedUuid"];
let plantsSample = {
  image:
    "https://www.ikea.com/fr/fr/images/products/monstera-potted-plant__0653991_PE708220_S5.JPG?f=s"
};

let seedsSample = {
  name: "rose",
  status: "vulnérable",
  type: "vivace",
  environment: "extérieur/intérieur",
  season: "printemps",
  exposure: "sun",
  spray: "fréquente"
};
let potsSample = {
  width: 40,
  length: 35,
  depth: 40
};
const usersSample = {
  firstName: "Toto",
  lastName: "Paul",
  avatar:
    "https://images.assetsdelivery.com/compings_v2/gmast3r/gmast3r1710/gmast3r171002485.jpg",
  age: 23,
  email: "totopaul@gmail.com",
  pseudo: "azerty",
  password: "ytreza23"
};

describe("PLANT", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const user = await User.create(usersSample);
    potsSample = {
      ...potsSample,
      UserUuid: user.uuid
    };
    const pot = await Pot.create(potsSample);
    seedsSample = {
      ...seedsSample,
      PotUuid: pot.uuid
    };
    const seed = await Seed.create(seedsSample);
    plantsSample = {
      ...plantsSample,
      SeedUuid: seed.uuid
    };
  });

  //GET ALL TEST
  describe("GET * Plants", () => {
    it("It should return all plants.", async () => {
      await Plants.create(plantsSample);
      const res = await chai.request(server).get("/plants");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(plantsSample);
      res.body[0].should.keys(plantsKeys);
      res.body.length.should.be.eql(1);
    });
  });

  //GET ONE TEST
  describe("GET ONE PLANTS", () => {
    it("should return a SINGLE Plants", async () => {
      const plants = await Plants.create(plantsSample);
      const res = await chai.request(server).get(`/plants/${plants.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(plantsKeys);
    });
  });

  //POST TEST
  describe("POST ONE Plants", () => {
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

    //POST TEST FAIL ONE plants
    it("should fail at adding one Plants (wrong keys)", async () => {
      const res = await chai
        .request(server)
        .post(`/plants`)
        .send({ image: false });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
    it("should fail at adding one plants (wrong keys)", async () => {
      const res = await chai
        .request(server)
        .post(`/plants`)
        .send({ imag: "ddjdjd" });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //PUT TEST
  describe("PUT ONE plants", () => {
    it("should update a SINGLE plants", async () => {
      const plants = await Plants.create(plantsSample);
      const res = await chai
        .request(server)
        .put(`/plants/${plants.uuid}`)
        .send({ image: "dfgdgdgdg" });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });

    //PUT TEST FAIL ONE plants
    it("should fail at updating a SINGLE plants (interger values instead of string)", async () => {
      const changeplants = await Plants.create(plantsSample);
      const res = await chai
        .request(server)
        .put(`/plants/${changeplants.uuid}`)
        .send({ image: 1342 });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //DELETE TEST
  describe("DELETE ONE plants", () => {
    it("should delete a SINGLE plants", async () => {
      const plants = await Plants.create(plantsSample);
      const res = await chai.request(server).delete(`/plants/${plants.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
