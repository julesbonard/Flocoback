const Sequelize = require("sequelize");
const sequelize = require("../index");

const StatsOxygene = sequelize.define(
  "statsOxygene",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    rate: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {}
);

module.exports = StatsOxygene;
