const Sequelize = require("sequelize");
const sequelize = require("../index");

const Tresaury = sequelize.define("Tresaury", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  badge: {
    type: Sequelize.STRING,
    allowNull: true
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Tresaury;
