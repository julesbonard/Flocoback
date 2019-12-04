const Sequelize = require("sequelize");
const sequelize = require("../index");

const Plant = sequelize.define(
  "Plant",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {}
);

module.exports = Plant;
