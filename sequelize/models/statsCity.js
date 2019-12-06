const Sequelize = require("sequelize");
const sequelize = require("../index");

const StatsCity = sequelize.define(
  "statsCity",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    district: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    street: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    }
  },
);

module.exports = StatsCity;
