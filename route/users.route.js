const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { usersPost } = require("../middlewares/joiSchemas");
const User = require("../sequelize/models/users");

router.get("/", (req, res) => {
  User.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err));
});

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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  User.update(
    {
      age: req.body.age
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/", joiValidate(usersPost), (req, res) => {
  const { firstName, lastName, age, email, pseudo, password } = req.body;
  User.create({
    firstName,
    lastName,
    age,
    email,
    pseudo,
    password
  })
    .then(users => res.status(201).json(users))
    .catch(err => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  User.destroy({
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

module.exports = router;
