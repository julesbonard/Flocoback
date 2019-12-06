const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { statsTaxonsPost } = require("../middlewares/joiSchemas");
const StatsTaxons = require("../sequelize/models/statsTaxons");

router.get("/", (req, res) => {
  StatsTaxons.findAll()
    .then(statsTaxons => res.status(200).json(statsTaxons))
    .catch(err => res.status(400).json(err));
});

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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  StatsTaxons.update(
    {
      number: req.body.number
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(statsTaxons => {
      res.status(200).json(statsTaxons);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  StatsTaxons.destroy({
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

module.exports = router;
