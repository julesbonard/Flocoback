const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { usersPost, usersPut } = require("../middlewares/joiSchemas");
const User = require("../sequelize/models/users");

//GET ALL
router.get("/", (req, res) => {
  User.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", (req, res) => {
  const { id } = req.params;
  User.findOne({
    where: {
      uuid: id
    }
  })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT ONE
router.put("/:id", joiValidate(usersPut), (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    pseudo,
    password,
    avatar,
    isOAuth
  } = req.body;
  User.update(
    {
      firstName,
      lastName,
      email,
      pseudo,
      password,
      avatar,
      isOAuth
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return User.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST ONE
router.post("/", joiValidate(usersPost), (req, res) => {
  const {
    firstName,
    lastName,
    email,
    pseudo,
    password,
    avatar,
    isOAuth
  } = req.body;
  User.create({
    firstName,
    lastName,
    email,
    pseudo,
    password,
    avatar,
    isOAuth
  })
    .then(users => res.status(201).json(users))
    .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findOne({
      where: {
        uuid: id
      }
    });
    await User.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
