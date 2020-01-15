const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const User = require("../sequelize/models/users");
const bcrypt = require("bcrypt");

chai.use(chaiHttp);

const usersKeys = [
  "uuid",
  "avatar",
  "firstName",
  "lastName",
  "email",
  "pseudo",
  "password",
  "isOAuth",
  "createdAt",
  "updatedAt"
];
const usersSample = {
  firstName: "Toto",
  lastName: "Paul",
  avatar:
    "https://images.assetsdelivery.com/compings_v2/gmast3r/gmast3r1710/gmast3r171002485.jpg",
  email: "totopaul@gmail.com",
  pseudo: "azerty",
  password: "ytreza23",
  isOAuth: true
};
let token = "";

describe("USERS", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const res = await chai
      .request(server)
      .post(`/users`)
      .send(usersSample);
    token = res.body.token;
  });

  //GET ALL TEST
  describe("GET * USERS", () => {
    it("It should return all users.", async () => {
      await User.create(usersSample);
      const res = await chai.request(server).get("/users");
      if (bcrypt.compareSync(usersSample.password, res.body[0].password)) {
        usersSample.password = res.body[0].password;
      }
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(usersSample);
      res.body[0].should.have.keys(usersKeys);
      res.body.length.should.be.eql(2);
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
      if (bcrypt.compareSync(usersSample.password, res.body.user.password)) {
        usersSample.password = res.body.user.password;
      }
      res.should.have.status(201);
      res.should.be.json;
      res.body.user.should.be.a("object");
      res.body.user.should.include(usersSample);
      res.body.user.should.have.keys(usersKeys);
    });
    // FAIL POST TEST
    it("should fail at adding a SINGLE users", async () => {
      const res = await chai
        .request(server)
        .post("/users")
        .send({ dte: 23 });
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
        .set("access-token", token)
        .send({ pseudo: "scfresxcf" });
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
        .set("access-token", token)
        .send({ firstName: 234 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //DELETE TEST
  describe("DELETE ONE USERS", () => {
    it("should delete a SINGLE users", async () => {
      const users = await User.create(usersSample);
      const res = await chai
        .request(server)
        .delete(`/users/${users.uuid}`)
        .set("access-token", token);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
