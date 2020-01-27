const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Agenda = require("../sequelize/models/agenda");
const User = require("../sequelize/models/users");

chai.use(chaiHttp);

const agendaKeys = ["uuid", "event", "createdAt", "updatedAt", "UserUuid"];

let agendaSample = {
  event: "ete"
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
let token = "";

describe("AGENDA", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const user = await User.create(usersSample);
    agendaSample = {
      ...agendaSample,
      UserUuid: user.uuid
    };
    const res = await chai
      .request(server)
      .post(`/users`)
      .send(usersSample);
    token = res.body.token;
  });

  //GET ALL TEST
  describe("GET * AGENDA", () => {
    it("It should return all agenda.", async () => {
      await Agenda.create(agendaSample);
      const res = await chai
        .request(server)
        .get("/agenda")
        .set("access-token", token);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(agendaSample);
      res.body[0].should.have.keys(agendaKeys);
      res.body.length.should.be.eql(1);
    });
  });

  //GET ONE TEST
  describe("GET ONE AGENDA", () => {
    it("should return a SINGLE agenda", async () => {
      const agenda = await Agenda.create(agendaSample);
      const res = await chai
        .request(server)
        .get(`/agenda/${agenda.uuid}`)
        .set("access-token", token);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(agendaKeys);
    });
  });

  //POST TEST
  describe("POST ONE AGENDA", () => {
    it("should add a SINGLE agenda", async () => {
      const res = await chai
        .request(server)
        .post(`/agenda`)
        .set("access-token", token)
        .send(agendaSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(agendaSample);
      res.body.should.have.keys(agendaKeys);
    });

    //POST TEST FAIL ONE PARTNER
    it("should fail at adding one agenda (wrong keys)", async () => {
      const res = await chai
        .request(server)
        .post(`/agenda`)
        .set("access-token", token)
        .send({ event: false });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
    it("should fail at adding one agenda (wrong keys)", async () => {
      const res = await chai
        .request(server)
        .post(`/agenda`)
        .set("access-token", token)
        .send({ evnt: "ddjdjd" });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //PUT TEST
  describe("PUT ONE AGENDA", () => {
    it("should update a SINGLE agenda", async () => {
      const agenda = await Agenda.create(agendaSample);
      const res = await chai
        .request(server)
        .put(`/agenda/${agenda.uuid}`)
        .set("access-token", token)
        .send({ event: "hivers" });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });

    //PUT TEST FAIL ONE AGENDA
    it("should fail at updating a SINGLE agenda (interger values instead of string)", async () => {
      const changeAgenda = await Agenda.create(agendaSample);
      const res = await chai
        .request(server)
        .put(`/agenda/${changeAgenda.uuid}`)
        .set("access-token", token)
        .send({ event: 1342 });
      res.should.have.status(422);
      res.should.be.json;
      res.should.be.a("object");
    });
  });

  //DELETE TEST
  describe("DELETE ONE AGENDA", () => {
    it("should delete a SINGLE agenda", async () => {
      const agenda = await Agenda.create(agendaSample);
      const res = await chai
        .request(server)
        .delete(`/agenda/${agenda.uuid}`)
        .set("access-token", token);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
