const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Comment = require("../sequelize/models/comments");
const User = require("../sequelize/models/users");
const Post = require("../sequelize/models/posts");

chai.use(chaiHttp);

const commentKeys = [
  "uuid",
  "date",
  "contents",
  "createdAt",
  "updatedAt",
  "UserUuid",
  "PostUuid"
];
let commentsSample = {
  date: "1970-01-01T00:00:00.000Z",
  contents: "Super comment"
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
let postSample = {
  contents: "My plant",
  date: "1970-01-01T00:00:00.000Z",
  image: "https/"
};
let token = "";

describe("COMMENT", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const user = await User.create(usersSample);
    postSample = {
      ...postSample,
      UserUuid: user.uuid
    };
    const post = await Post.create(postSample);
    commentsSample = {
      ...commentsSample,
      UserUuid: user.uuid,
      PostUuid: post.uuid
    };
    const res = await chai
      .request(server)
      .post(`/users`)
      .send(usersSample);
    token = res.body.token;
  });

  //GET ALL TEST
  describe("GET * COMMENTS", () => {
    it("It should return all comments.", async () => {
      await Comment.create(commentsSample);
      const res = await chai
        .request(server)
        .get("/comments")
        .set("access-token", token);
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(commentsSample);
      res.body.length.should.be.eql(1);
    });
  });

  //GET TEST
  describe("GET ONE COMMENTS", () => {
    it("should return a SINGLE comments", async () => {
      const comments = await Comment.create(commentsSample);
      const res = await chai
        .request(server)
        .get(`/comments/${comments.uuid}`)
        .set("access-token", token);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(commentKeys);
    });
  });

  //POST TEST
  describe("POST ONE COMMENTS", () => {
    it("should add a SINGLE comments", async () => {
      await Comment.create(commentsSample);
      const res = await chai
        .request(server)
        .post(`/comments`)
        .set("access-token", token)
        .send(commentsSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(commentsSample);
      res.body.should.have.keys(commentKeys);
    });
    // FAIL POST TEST
    it("should fail at adding a SINGLE comments", async () => {
      const res = await chai
        .request(server)
        .post("/comments")
        .set("access-token", token)
        .send({ dte: 23 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
    it("should fail at adding a SINGLE comments", async () => {
      const res = await chai
        .request(server)
        .post("/statsCity")
        .set("access-token", token)
        .send({ nudfff: "ert", qsd: "xcvb" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //PUT TEST
  describe("PUT ONE COMMENTS", () => {
    it("should update a SINGLE comments", async () => {
      const comments = await Comment.create(commentsSample);
      const res = await chai
        .request(server)
        .put(`/comments/${comments.uuid}`)
        .set("access-token", token)
        .send({ contents: "scfresxcf" });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });
    // FAIL PUT TEST
    it("should fail at updating a SINGLE comments", async () => {
      const comments = await Comment.create(commentsSample);
      const res = await chai
        .request(server)
        .put(`/comments/${comments.uuid}`)
        .set("access-token", token)
        .send({ date: "aaaee" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //DELETE TEST
  describe("DELETE ONE COMMENTS", () => {
    it("should delete a SINGLE comments", async () => {
      const comments = await Comment.create(commentsSample);
      const res = await chai
        .request(server)
        .delete(`/comments/${comments.uuid}`)
        .set("access-token", token);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
