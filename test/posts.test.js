const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Post = require("../sequelize/models/posts");
const Users = require("../sequelize/models/users");

chai.use(chaiHttp);

const postsKeys = [
  "uuid",
  "contents",
  "date",
  "image",
  "createdAt",
  "updatedAt",
  "UserUuid"
];

let postSample = {
  contents: "My plant",
  date: "1970-01-01T00:00:00.000Z",
  image: "https/"
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
describe("POSTS", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const users = await Users.create(usersSample);
    postSample = {
      ...postSample,
      UserUuid: users.uuid
    };
  });

  //GET ALL TEST
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

  //GET TEST
  describe("GET ONE POSTS", () => {
    it("should return a SINGLE posts", async () => {
      const posts = await Post.create(postSample);
      const res = await chai.request(server).get(`/posts/${posts.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.keys(postsKeys);
    });
  });

  //POST TEST
  describe("POST ONE POSTS", () => {
    it("should add a SINGLE posts", async () => {
      await Post.create(postSample);
      const res = await chai
        .request(server)
        .post(`/posts`)
        .send(postSample);
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.include(postSample);
      res.body.should.have.keys(postsKeys);
    });
    // FAIL POST TEST
    it("should fail at adding a SINGLE posts", async () => {
      const res = await chai
        .request(server)
        .post("/posts")
        .send({ date: 30 });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
    it("should fail at adding a SINGLE posts", async () => {
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
  describe("PUT ONE POSTS", () => {
    it("should update a SINGLE posts", async () => {
      const posts = await Post.create(postSample);
      const res = await chai
        .request(server)
        .put(`/posts/${posts.uuid}`)
        .send({ contents: "scfresxcf" });
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
    });
    // FAIL PUT TEST
    it("should fail at updating a SINGLE posts", async () => {
      const posts = await Post.create(postSample);
      const res = await chai
        .request(server)
        .put(`/posts/${posts.uuid}`)
        .send({ date: "aaaee" });
      res.should.have.status(422);
      res.should.be.json;
      res.body.should.be.a("array");
    });
  });

  //DELETE TEST
  describe("DELETE ONE POSTS", () => {
    it("should delete a SINGLE posts", async () => {
      const posts = await Post.create(postSample);
      const res = await chai.request(server).delete(`/posts/${posts.uuid}`);
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
