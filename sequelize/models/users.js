const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../index");

const User = sequelize.define(
  "User",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pseudo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    isOAuth: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    hooks: {
      beforeCreate: user => {
        if (user.password) {
          const salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  }
);

User.prototype.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
