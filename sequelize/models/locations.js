const Sequelize = require("sequelize");
const sequelize = require("../index");

const Location = sequelize.define(
  "Location",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    latitude: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    longitude: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {}
);

module.exports = Location;
