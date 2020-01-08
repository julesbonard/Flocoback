const Sequelize = require("sequelize");
const sequelize = require("../index");

const Location = sequelize.define("Location", {
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
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = Location;
