const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Like = require("../sequelize/models/likes");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const likeSample = {
  like: true
};
describe("LIKE", () => {
  describe("GET * LIKES", () => {
    it("It should return all likes.", async () => {
      await Like.create(likeSample);
      const res = await chai.request(server).get("/likes");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(likeSample);
      res.body.length.should.be.eql(1);
    });
  });
});
