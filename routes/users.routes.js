require("dotenv").config();

const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { usersPost, usersPut } = require("../middlewares/joiSchemas");
const { checkAuth } = require("../middlewares/tokenJwt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const User = require("../sequelize/models/users");
const Tresaury = require("../sequelize/models/tresaury");
const Pot = require("../sequelize/models/pots");
const Plant = require("../sequelize/models/plants");
const Location = require("../sequelize/models/locations");

//GET ALL
router.get("/", (req, res) => {
  User.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err));
});

//GET ALL LOCATIONS
router.get("/:id/plants", async (req, res) => {
  const { id } = req.params;
  try {
    const pots = await Plant.findAll({
      include: [
        {
          model: Pot,
          where: {
            UserUuid: id
          }
        },
        {
          model: Location
        }
      ]
    });
    console.log(pots);
    res.status(200).json(pots);
  } catch (err) {
    console.log(err);

    res.status(400).json({ error: err });
  }
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

//GET ONE TRESAURY
router.get("/:id/tresaury", (req, res) => {
  const { id } = req.params;
  Tresaury.findOne({
    where: {
      UserUuid: id
    }
  })
    .then(tresaury => {
      res.status(200).json(tresaury);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT ONE
router.put("/:id", joiValidate(usersPut), checkAuth, (req, res) => {
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
router.post("/", joiValidate(usersPost), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      pseudo,
      password,
      avatar,
      isOAuth
    } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      email,
      pseudo,
      password,
      avatar,
      isOAuth
    });
    const id = user.uuid;
    const payload = { email };
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h"
    });
    res.status(201).json({ user, token, id });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//DELETE ONE
router.delete("/:id", checkAuth, async (req, res) => {
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
