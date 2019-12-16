const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Pot = require("../sequelize/models/pots");
const User = require("../sequelize/models/users");

chai.use(chaiHttp);

const potsKeys = [
  "uuid",
  "width",
  "length",
  "depth",
  "createdAt",
  "updatedAt",
  "UserUuid"
];
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

describe("POT", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const user = await User.create(usersSample);
    potsSample = {
      ...potsSample,
      UserUuid: user.uuid
    };
  });
  //GET ALL TEST
  describe("GET * POTS", () => {
    it("It should return all pots.", async () => {
      await Pot.create(potsSample);
      const res = await chai.request(server).get("/pots");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(potsSample);
      res.body.length.should.be.eql(1);
    });
  });

  //GET TEST
  describe("GET ONE POTS", () => {
    it("should return a SINGLE pots", async () => {
      const pots = await Pot.create(potsSample);
      const res = await chai.request(server).get(`/pots/${pots.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(potsKeys);
    });
  });

  //POST TEST
  describe("POST ONE POTS", () => {
    it("should add a SINGLE pots", async () => {
      await Pot.create(potsSample);
      const res = await chai
        .request(server)
        .post(`/pots`)
        .send(potsSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(potsSample);
      res.body.should.have.keys(potsKeys);
    });
    // FAIL POST TEST
    it("should fail at adding a SINGLE pots", async () => {
      const res = await chai
        .request(server)
        .post("/pots")
        .send({ epth: 40 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
    it("should fail at adding a SINGLE pots", async () => {
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
  describe("PUT ONE POTS", () => {
    it("should update a SINGLE pots", async () => {
      const pots = await Pot.create(potsSample);
      const res = await chai
        .request(server)
        .put(`/pots/${pots.uuid}`)
        .send({ depth: 4 });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });
    // FAIL PUT TEST
    it("should fail at updating a SINGLE pots", async () => {
      const pots = await Pot.create(potsSample);
      const res = await chai
        .request(server)
        .put(`/pots/${pots.uuid}`)
        .send({ depth: "aaaee" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //DELETE TEST
  describe("DELETE ONE POTS", () => {
    it("should delete a SINGLE pots", async () => {
      const pots = await Pot.create(potsSample);
      const res = await chai.request(server).delete(`/pots/${pots.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
