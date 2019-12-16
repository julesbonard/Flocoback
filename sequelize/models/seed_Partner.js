const Sequelize = require("sequelize");
const sequelize = require("../index");

const Seed_Partner = sequelize.define("Seed_Partner", {}, {});

module.exports = Seed_Partner;
