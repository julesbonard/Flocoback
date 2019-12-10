const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const {
  statsTaxonsPost,
  statsTaxonsPut
} = require("../middlewares/joiSchemas");
const StatsTaxons = require("../sequelize/models/statsTaxons");

//GET ALL
router.get("/", (req, res) => {
  StatsTaxons.findAll()
    .then(statsTaxons => res.status(200).json(statsTaxons))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", (req, res) => {
  const { id } = req.params;
  StatsTaxons.findOne({
    where: {
      uuid: id
    }
  })
    .then(statsTaxons => {
      res.status(200).json(statsTaxons);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT ONE
router.put("/:id", joiValidate(statsTaxonsPut), (req, res) => {
  const { id } = req.params;
  const { number, restored, status } = req.body;
  StatsTaxons.update(
    {
      number,
      restored,
      status
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return StatsTaxons.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(statsTaxons => {
      res.status(200).json(statsTaxons);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST ONE
router.post("/", joiValidate(statsTaxonsPost), (req, res) => {
  const { restored, status, number } = req.body;
  StatsTaxons.create({
    number,
    restored,
    status
  })
    .then(statsTaxons => res.status(201).json(statsTaxons))
    .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const statsTaxons = await StatsTaxons.findOne({
      where: {
        uuid: id
      }
    });
    await StatsTaxons.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(statsTaxons);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
