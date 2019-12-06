const Sequelize = require("sequelize");
const sequelize = require("../index");

const StatsTaxons = sequelize.define(
  "statsTaxons",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    restored: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
);

module.exports = StatsTaxons;
