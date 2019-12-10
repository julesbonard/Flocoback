// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const should = chai.should();
// const server = require("../index");
// const sequelize = require("../sequelize");
// const Tresaury = require("../sequelize/models/tresaury");

// chai.use(chaiHttp);
// describe("TRESAURY", () => {
// before(() => sequelize.sync({ force: true }));
// const tresaurySample = {
//   level: 3,
//   badge: "captain",
//   points: 3,
// };
//   describe("GET * TRESAURY", () => {
//     it("It should return all tresaury.", async () => {
//       await Tresaury.create(tresaurySample)

//       const res = await chai.request(server).get("/tresaury");
//       res.should.have.status(200);
//       res.body.should.be.a("array");
//       res.body[0].should.include(tresaurySample);
//       res.body.length.should.be.eql(1);
//     });
//   });
// });
