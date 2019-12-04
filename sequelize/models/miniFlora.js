const Sequelize = require("sequelize");
const sequelize = require("../index");

const MiniFlora = sequelize.define(
  "miniFlora",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {}
);

module.exports = MiniFlora;
