const Sequelize = require("sequelize");
const sequelize = require("../index");

const Like = sequelize.define(
  "Like",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    like: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {}
);

module.exports = Like;
