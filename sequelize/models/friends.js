const Sequelize = require("sequelize");
const sequelize = require("../index");

const Friends = sequelize.define("Friends", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
});

module.exports = Friends;
