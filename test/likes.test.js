const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Like = require("../sequelize/models/likes");
const User = require("../sequelize/models/users");
const Post = require("../sequelize/models/posts");

chai.use(chaiHttp);
const likesKeys = [
  "uuid",
  "like",
  "createdAt",
  "updatedAt",
  "UserUuid",
  "PostUuid"
];
let likesSample = {
  like: true
};
const usersSample = {
  firstName: "Toto",
  lastName: "Paul",
  avatar:
    "https://images.assetsdelivery.com/compings_v2/gmast3r/gmast3r1710/gmast3r171002485.jpg",
  age: 23,
  email: "totopaul@gmail.com",
  pseudo: "azerty",
  password: "ytreza23"
};
let postSample = {
  contents: "My plant",
  date: "1970-01-01T00:00:00.000Z",
  image: "https/"
};

describe("LIKE", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const user = await User.create(usersSample);
    postSample = {
      ...postSample,
      UserUuid: user.uuid
    };
    const post = await Post.create(postSample);
    likesSample = {
      ...likesSample,
      UserUuid: user.uuid,
      PostUuid: post.uuid
    };
  });

  //GET ALL TEST
  describe("GET * LIKES", () => {
    it("It should return all likes.", async () => {
      await Like.create(likesSample);
      const res = await chai.request(server).get("/likes");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(likesSample);
      res.body.length.should.be.eql(1);
    });
  });

  //GET TEST
  describe("GET ONE LIKES", () => {
    it("should return a SINGLE likes", async () => {
      const likes = await Like.create(likesSample);
      const res = await chai.request(server).get(`/likes/${likes.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(likesKeys);
    });
  });

  //POST TEST
  describe("POST ONE LIKES", () => {
    it("should add a SINGLE likes", async () => {
      await Like.create(likesSample);
      const res = await chai
        .request(server)
        .post(`/likes`)
        .send(likesSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(likesSample);
      res.body.should.have.keys(likesKeys);
    });
    // FAIL POST TEST
    it("should fail at adding a SINGLE likes", async () => {
      const res = await chai
        .request(server)
        .post("/likes")
        .send({ like: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
    it("should fail at adding a SINGLE likes", async () => {
      const res = await chai
        .request(server)
        .post("/statsCity")
        .send({ nudfff: "ert" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //PUT TEST
  describe("PUT ONE LIKES", () => {
    it("should update a SINGLE likes", async () => {
      const likes = await Like.create(likesSample);
      const res = await chai
        .request(server)
        .put(`/likes/${likes.uuid}`)
        .send({ like: false });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });
    // FAIL PUT TEST
    it("should fail at updating a SINGLE likes", async () => {
      const likes = await Like.create(likesSample);
      const res = await chai
        .request(server)
        .put(`/likes/${likes.uuid}`)
        .send({ like: "aaaee" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //DELETE TEST
  describe("DELETE ONE LIKES", () => {
    it("should delete a SINGLE likes", async () => {
      const likes = await Like.create(likesSample);
      const res = await chai.request(server).delete(`/likes/${likes.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
