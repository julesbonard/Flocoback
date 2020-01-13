const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { likePost, likePut } = require("../middlewares/joiSchemas");
const Like = require("../sequelize/models/likes");
const { checkAuth } = require("../middlewares/tokenJwt");

//GET ALL
router.get("/", checkAuth, (req, res) => {
  Like.findAll()
    .then(likes => res.status(200).json(likes))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  Like.findOne({
    where: {
      uuid: id
    }
  })
    .then(likes => {
      res.status(200).json(likes);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT ONE
router.put("/:id", joiValidate(likePut), checkAuth, (req, res) => {
  const { id } = req.params;
  const { like } = req.body;
  Like.update(
    {
      like
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return Like.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(likes => {
      res.status(200).json(likes);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST ONE
router.post("/", joiValidate(likePost), checkAuth, (req, res) => {
  const { like, UserUuid, PostUuid } = req.body;
  Like.create({
    like,
    UserUuid,
    PostUuid
  })
    .then(likes => res.status(201).json(likes))
    .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const likes = await Like.findOne({
      where: {
        uuid: id
      }
    });
    await Like.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(likes);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
