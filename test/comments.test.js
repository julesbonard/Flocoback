const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Comment = require("../sequelize/models/comments");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const commentSample = {
  date: "1970-01-01T00:00:00.000Z",
  contents: "Super comment"
};
describe("COMMENT", () => {
  describe("GET * COMMENTS", () => {
    it("It should return all comments.", async () => {
      await Comment.create(commentSample);
      const res = await chai.request(server).get("/comments");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(commentSample);
      res.body.length.should.be.eql(1);
    });
  });
});
