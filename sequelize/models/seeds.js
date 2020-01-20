const Sequelize = require("sequelize");
const sequelize = require("../index");

const Seed = sequelize.define(
  "Seed",
  {
    uuid: {
      // type: Sequelize.UUID,
      // allowNull: false,
      // primaryKey: true,
      // defaultValue: Sequelize.UUIDV4
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING
    },
    environment: {
      type: Sequelize.STRING,
      allowNull: false
    },
    season: {
      type: Sequelize.STRING,
      allowNull: false
    },
    exposure: {
      type: Sequelize.STRING,
      allowNull: false
    },
    spray: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {}
);

module.exports = Seed;
