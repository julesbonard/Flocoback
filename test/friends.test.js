const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Friends = require("../sequelize/models/friends");

const friendsKeys = ["uuid", "confirmed", "createdAt", "updatedAt"];

chai.use(chaiHttp);

const friendsSample = {
  confirmed: true
};

describe("friends", () => {
  before(() => sequelize.sync({ force: true }));
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

  //GET TEST
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
