const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const User = require("../sequelize/models/users");

const usersKeys = [
  "uuid",
  "avatar",
  "firstName",
  "lastName",
  "age",
  "email",
  "pseudo",
  "password",
  "createdAt",
  "updatedAt"
];

chai.use(chaiHttp);
describe("USERS", () => {
  before(() => sequelize.sync({ force: true }));
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
  //GET ALL TEST
  describe("GET * USERS", () => {
    it("It should return all users.", async () => {
      await User.create(usersSample);
      const res = await chai.request(server).get("/users");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(usersSample);
      res.body[0].should.have.keys(usersKeys);
      res.body.length.should.be.eql(1);
    });
  });

  //GET TEST
  describe("GET ONE USERS", () => {
    it("should return a SINGLE users", async () => {
      const users = await User.create(usersSample);
      const res = await chai.request(server).get(`/users/${users.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(usersKeys);
    });
  });

  //POST TEST
  describe("POST ONE USERS", () => {
    it("should add a SINGLE users", async () => {
      await User.create(usersSample);
      const res = await chai
        .request(server)
        .post(`/users`)
        .send(usersSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(usersSample);
      res.body.should.have.keys(usersKeys);
    });
    // FAIL POST TEST
    it("should fail at adding a SINGLE users", async () => {
      const res = await chai
        .request(server)
        .post("/users")
        .send({ dte: 23, age: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
    it("should fail at adding a SINGLE users", async () => {
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
  describe("PUT ONE USERS", () => {
    it("should update a SINGLE users", async () => {
      const users = await User.create(usersSample);
      const res = await chai
        .request(server)
        .put(`/users/${users.uuid}`)
        .send({ age: 10, pseudo: "scfresxcf" });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });
    // FAIL PUT TEST
    it("should fail at updating a SINGLE users", async () => {
      const users = await User.create(usersSample);
      const res = await chai
        .request(server)
        .put(`/users/${users.uuid}`)
        .send({ age: "aaaee" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //DELETE TEST
  describe("DELETE ONE USERS", () => {
    it("should delete a SINGLE users", async () => {
      const users = await User.create(usersSample);
      const res = await chai.request(server).delete(`/users/${users.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
