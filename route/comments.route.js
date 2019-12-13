const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { commentPost, commentPut } = require("../middlewares/joiSchemas");
const Comment = require("../sequelize/models/comments");

//GET ALL
router.get("/", (req, res) => {
  Comment.findAll()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", (req, res) => {
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
router.put("/:id", joiValidate(commentPut), (req, res) => {
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
router.post("/", joiValidate(commentPost), (req, res) => {
  const { date, contents, UserUuid } = req.body;
  Comment.create({
    date,
    contents,
    UserUuid
  })
    .then(comments => res.status(201).json(comments))
    .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", async (req, res) => {
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
