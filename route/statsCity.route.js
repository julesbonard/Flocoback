const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { statsCityPost } = require("../middlewares/joiSchemas");
const StatsCity = require("../sequelize/models/statsCity");

router.get("/", (req, res) => {
  StatsCity.findAll()
    .then(statsCity => res.status(200).json(statsCity))
    .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  StatsCity.findOne({
    where: {
      uuid: id
    }
  })
    .then(statsCity => {
      res.status(200).json(statsCity);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  StatsCity.update(
    {
      street: req.body.street
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(statsCity => {
      res.status(200).json(statsCity);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/", joiValidate(statsCityPost), (req, res) => {
  const { district, street } = req.body;
  StatsCity.create({
    district,
    street
  })
    .then(statsCity => res.status(201).json(statsCity))
    .catch(err => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  StatsCity.destroy({
    where: {
      uuid: id
    }
  })
    .then(statsCity => {
      res.status(200).json(statsCity);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
