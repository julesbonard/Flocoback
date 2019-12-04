const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../index");
const sequelize = require("../sequelize");
const Message = require("../sequelize/models/messages");

chai.use(chaiHttp);
beforeEach(() => sequelize.sync({ force: true }));
const MessageSample = {
  Date: "1970-01-01T00:00:00.000Z",
  Contents: "Salut Toto !"
};
describe("MESSAGE", () => {
  describe("GET * messages", () => {
    it("It should return all messages.", async () => {
      console.log(MessageSample.Date);
      await Message.create(MessageSample);
      const res = await chai.request(server).get("/messages");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body[0].should.include(MessageSample);
      res.body.length.should.be.eql(1);
    });
  });
});
