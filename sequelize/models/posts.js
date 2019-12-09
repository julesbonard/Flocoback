const Sequelize = require("sequelize");
const sequelize = require("../index");

const Post = sequelize.define(
  "Post",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    contents: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {}
);

module.exports = Post;
