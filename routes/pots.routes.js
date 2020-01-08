const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { potsPost, potsPut } = require("../middlewares/joiSchemas");
const Pot = require("../sequelize/models/pots");

//GET ALL
router.get("/", (req, res) => {
  Pot.findAll()
    .then(pots => res.status(200).json(pots))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Pot.findOne({
    where: {
      uuid: id
    }
  })
    .then(pots => {
      res.status(200).json(pots);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT ONE
router.put("/:id", joiValidate(potsPut), (req, res) => {
  const { id } = req.params;
  const { width, length, depth } = req.body;
  Pot.update(
    {
      width,
      length,
      depth
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return Pot.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(pots => {
      res.status(200).json(pots);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST ONE
router.post("/", joiValidate(potsPost), (req, res) => {
  const { width, length, depth, UserUuid } = req.body;
  Pot.create({
    width,
    length,
    depth,
    UserUuid
  })
    .then(pots => res.status(201).json(pots))
    .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pots = await Pot.findOne({
      where: {
        uuid: id
      }
    });
    await Pot.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(pots);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
