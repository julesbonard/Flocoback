const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { commentPost, commentPut } = require("../middlewares/joiSchemas");
const Comment = require("../sequelize/models/comments");
const { checkAuth } = require("../middlewares/tokenJwt");

//GET ALL
router.get("/", checkAuth, (req, res) => {
  Comment.findAll()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  Comment.findOne({
    where: {
      uuid: id
    }
  })
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT ONE
router.put("/:id", joiValidate(commentPut), checkAuth, (req, res) => {
  const { id } = req.params;
  const { date, contents } = req.body;
  Comment.update(
    {
      date,
      contents
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return Comment.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST ONE
router.post("/", joiValidate(commentPost), checkAuth, (req, res) => {
  const { date, contents, UserUuid, PostUuid } = req.body;
  Comment.create({
    date,
    contents,
    UserUuid,
    PostUuid
  })
    .then(comments => res.status(201).json(comments))
    .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.findOne({
      where: {
        uuid: id
      }
    });
    await Comment.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
