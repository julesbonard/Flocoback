const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Message = require("../sequelize/models/messages");

const messagesKeys = ["uuid", "date", "contents", "createdAt", "updatedAt"];

describe("MESSAGE", () => {
  chai.use(chaiHttp);
  before(() => sequelize.sync({ force: true }));
  const messageSample = {
    date: "1970-01-01T00:00:00.000Z",
    contents: "Salut Toto !"
  };
  //GET ALL TEST
  describe("GET * MESSAGES", () => {
    it("It should return all messages.", async () => {
      await Message.create(messageSample);
      const res = await chai.request(server).get("/messages");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(messageSample);
      res.body.length.should.be.eql(1);
    });
  });

  //GET TEST
  describe("GET ONE MESSAGES", () => {
    it("should return a SINGLE messages", async () => {
      const messages = await Message.create(messageSample);
      const res = await chai.request(server).get(`/messages/${messages.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(messagesKeys);
    });
  });

  //POST TEST
  describe("POST ONE MESSAGES", () => {
    it("should add a SINGLE messages", async () => {
      await Message.create(messageSample);
      const res = await chai
        .request(server)
        .post(`/messages`)
        .send(messageSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(messageSample);
      res.body.should.have.keys(messagesKeys);
    });
    // FAIL POST TEST
    it("should fail at adding a SINGLE messages", async () => {
      const res = await chai
        .request(server)
        .post("/messages")
        .send({ date: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
    it("should fail at adding a SINGLE messages", async () => {
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
  describe("PUT ONE MESSAGES", () => {
    it("should update a SINGLE messages", async () => {
      const messages = await Message.create(messageSample);
      const res = await chai
        .request(server)
        .put(`/messages/${messages.uuid}`)
        .send({ contents: "scfresxcf" });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });
    // FAIL PUT TEST
    it("should fail at updating a SINGLE messages", async () => {
      const messages = await Message.create(messageSample);
      const res = await chai
        .request(server)
        .put(`/messages/${messages.uuid}`)
        .send({ date: "aaaee" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //DELETE TEST
  describe("DELETE ONE MESSAGES", () => {
    it("should delete a SINGLE messages", async () => {
      const messages = await Message.create(messageSample);
      const res = await chai
        .request(server)
        .delete(`/messages/${messages.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
