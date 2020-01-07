const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Friends = require("../sequelize/models/friends");
const User = require("../sequelize/models/users");

chai.use(chaiHttp);

const friendsKeys = ["uuid", "confirmed", "createdAt", "updatedAt", "UserUuid"];
let friendsSample = {
  confirmed: true
};
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

describe("FRIEND", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const user = await User.create(usersSample);
    friendsSample = {
      ...friendsSample,
      UserUuid: user.uuid
    };
  });

  //GET ALL TEST
  describe("GET * friends", () => {
    it("It should return all friends.", async () => {
      await Friends.create(friendsSample);
      const res = await chai.request(server).get("/friends");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(friendsSample);
      res.body[0].should.keys(friendsKeys);
      res.body.length.should.be.eql(1);
    });
  });

  //GET ONE TEST
  describe("GET ONE FRIENDS", () => {
    it("should return a SINGLE Friends", async () => {
      const friends = await Friends.create(friendsSample);
      const res = await chai.request(server).get(`/friends/${friends.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(friendsKeys);
    });
  });

  //POST TEST
  describe("POST ONE FRIENDS", () => {
    it("should add a SINGLE friends", async () => {
      const res = await chai
        .request(server)
        .post(`/friends`)
        .send(friendsSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(friendsSample);
      res.body.should.have.keys(friendsKeys);
    });

    //POST TEST FAIL ONE FRIENDS
    it("should fail at adding one FRIENDS (wrong keys)", async () => {
      const res = await chai
        .request(server)
        .post(`/friends`)
        .send({ event: false });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
    it("should fail at adding one FRIENDS (wrong keys)", async () => {
      const res = await chai
        .request(server)
        .post(`/friends`)
        .send({ evnt: "ddjdjd" });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //PUT TEST
  describe("PUT ONE FRIENDS", () => {
    it("should update a SINGLE friends", async () => {
      const friends = await Friends.create(friendsSample);
      const res = await chai
        .request(server)
        .put(`/friends/${friends.uuid}`)
        .send({ confirmed: false });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });

    //PUT TEST FAIL ONE friends
    it("should fail at updating a SINGLE Friends (interger values instead of string)", async () => {
      const changefriends = await Friends.create(friendsSample);
      const res = await chai
        .request(server)
        .put(`/friends/${changefriends.uuid}`)
        .send({ confirmed: 1342 });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //DELETE TEST
  describe("DELETE ONE FRIENDS", () => {
    it("should delete a SINGLE friends", async () => {
      const friends = await Friends.create(friendsSample);
      const res = await chai.request(server).delete(`/friends/${friends.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
