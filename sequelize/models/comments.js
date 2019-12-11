const Sequelize = require("sequelize");
const sequelize = require("../index");

const Comment = sequelize.define(
  "Comment",
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
    contents: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {}
);

module.exports = Comment;
