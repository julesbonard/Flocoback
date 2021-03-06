const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Agenda = require("../sequelize/models/agenda");

const { joiValidate } = require("../middlewares/joiValidate");
const { agendaPost, agendaPut } = require("../middlewares/joiSchemas");
const { checkAuth } = require("../middlewares/tokenJwt");

//GET ALL
router.get("/", checkAuth, (req, res) => {
  Agenda.findAll()
    .then(agenda => res.status(200).json(agenda))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  Agenda.findOne({
    where: {
      uuid: id
    }
  })
    .then(agenda => {
      res.status(200).json(agenda);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT
router.put("/:id", joiValidate(agendaPut), checkAuth, (req, res) => {
  const { id } = req.params;
  const { event } = req.body;
  Agenda.update(
    {
      event
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return Agenda.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(agenda => {
      res.status(200).json(agenda);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST
router.post("/", joiValidate(agendaPost), checkAuth, (req, res) => {
  const { event, UserUuid } = req.body;
  Agenda.create({
    event,
    UserUuid
  })
    .then(agenda => res.status(201).json(agenda))
    .catch(err => res.status(400).json(err));
});

//DELETE
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const agenda = await Agenda.findOne({
      where: {
        uuid: id
      }
    });
    await Agenda.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(agenda);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
