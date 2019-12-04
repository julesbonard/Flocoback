const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Post = require("../sequelize/models/posts");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const postSample = {
  contents: "My plant",
  date: "1970-01-01T00:00:00.000Z",
  image: "https/"
};
describe("POST", () => {
  describe("GET * POSTS", () => {
    it("It should return all posts.", async () => {
      await Post.create(postSample);
      const res = await chai.request(server).get("/posts");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(postSample);
      res.body.length.should.be.eql(1);
    });
  });
});
