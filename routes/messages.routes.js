const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { messagePost, messagePut } = require("../middlewares/joiSchemas");
const Message = require("../sequelize/models/messages");
const { checkAuth } = require("../middlewares/tokenJwt");

//GET ALL
router.get("/", checkAuth, (req, res) => {
  Message.findAll()
    .then(messages => res.status(200).json(messages))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  Message.findOne({
    where: {
      uuid: id
    }
  })
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT ONE
router.put("/:id", joiValidate(messagePut), checkAuth, (req, res) => {
  const { id } = req.params;
  const { date, contents } = req.body;
  Message.update(
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
      return Message.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST ONE
router.post("/", joiValidate(messagePost), checkAuth, (req, res) => {
  const { date, contents, UserUuid, receiverUuid } = req.body;
  Message.create({
    date,
    contents,
    UserUuid,
    receiverUuid
  })
    .then(messages => res.status(201).json(messages))
    .catch(err => res.status(400).json({ err }));
});

//DELETE ONE
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await Message.findOne({
      where: {
        uuid: id
      }
    });
    await Message.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

module.exports = router;
