const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { statsOxygene } = require("../middlewares/joiSchemas");
const StatsOxygene = require("../sequelize/models/statsOxygene");

router.get("/", (req, res) => {
  StatsOxygene.findAll()
    .then(statsOxygene => res.status(200).json(statsOxygene))
    .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  StatsOxygene.findOne({
    where: {
      uuid: id
    }
  })
    .then(statsOxygene => {
      res.status(200).json(statsOxygene);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  StatsOxygene.findOne({
    where: {
      uuid: id
    }
  })
    .then(statsOxygene => {
      res.status(200).json(statsOxygene);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/", joiValidate(statsOxygene), (req, res) => {
  const { date, rate } = req.body;
  StatsOxygene.create({
    date,
    rate
  })
    .then(location => res.status(201).json(location))
    .catch(err => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  StatsOxygene.findOne({
    where: {
      uuid: id
    }
  })
    .then(statsOxygene => {
      res.status(200).json(statsOxygene);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
