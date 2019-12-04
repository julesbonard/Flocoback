const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const User = require("../sequelize/models/users");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const userSample = {
  firstName: "Toto",
  lastName: "Paul",
  age: 23,
  email: "totopaul@gmail.com",
  pseudo: "azerty",
  password: "ytreza23"
};
describe("USERS", () => {
  describe("GET * USERS", () => {
    it("It should return all users.", async () => {
      await User.create(userSample);
      const res = await chai.request(server).get("/users");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("array");
      res.body[0].should.include(userSample);
      res.body.length.should.be.eql(1);
    });
  });
});
