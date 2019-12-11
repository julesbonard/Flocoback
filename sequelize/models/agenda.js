const Sequelize = require("sequelize");
const sequelize = require("../index");

const Agenda = sequelize.define("Agenda", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  event: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Agenda;
