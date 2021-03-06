const Sequelize = require("sequelize");
const sequelize = require("../index");

const Partner = sequelize.define(
  "Partner",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tags: {
      type: Sequelize.STRING,
      allowNull: true
    },
    website: {
      type: Sequelize.STRING,
      allowNull: true
    },
    phone: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: { min: 0 }
    }
  },
  {}
);

module.exports = Partner;
