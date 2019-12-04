const Sequelize = require("sequelize");
const sequelize = require("../index");

const Pot = sequelize.define(
  "Pot",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    Width: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    length: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    Depth: {
      type: Sequelize.FLOAT
    }
  },
  {}
);

module.exports = Pot;
