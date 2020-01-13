const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Friends = require("../sequelize/models/friends");

const { joiValidate } = require("../middlewares/joiValidate");
const { friendsPost, friendsPut } = require("../middlewares/joiSchemas");
const { checkAuth } = require("../middlewares/tokenJwt");

//GET ALL
router.get("/", checkAuth, (req, res) => {
  Friends.findAll()
    .then(friends => res.status(200).json(friends))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  Friends.findOne({
    where: {
      uuid: id
    }
  })
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT
router.put("/:id", joiValidate(friendsPut), checkAuth, (req, res) => {
  const { id } = req.params;
  const { confirmed } = req.body;
  Friends.update(
    {
      confirmed
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return Friends.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST
router.post("/", joiValidate(friendsPost), checkAuth, (req, res) => {
  const { confirmed, UserUuid } = req.body;
  Friends.create({
    confirmed,
    UserUuid
  })
    .then(friends => res.status(201).json(friends))
    .catch(err => res.status(400).json(err));
});

//DELETE
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const friends = await Friends.findOne({
      where: {
        uuid: id
      }
    });
    await Friends.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(friends);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
