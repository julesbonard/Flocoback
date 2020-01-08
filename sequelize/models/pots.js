const Sequelize = require("sequelize");
const sequelize = require("../index");

const Pot = sequelize.define(
  "Pot",
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
    width: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    length: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    depth: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    }
  },
  {}
);

module.exports = Pot;
