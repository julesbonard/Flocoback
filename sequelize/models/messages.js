const Sequelize = require("sequelize");
const sequelize = require("../index");

const Message = sequelize.define(
  "Message",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    Date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    Contents: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  {}
);

module.exports = Message;
