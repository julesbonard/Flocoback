const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { statsOxygenePost } = require("../middlewares/joiSchemas");
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
  const { rate } = req.body;
  StatsOxygene.update(
    {
      rate
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return StatsOxygene.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(statsOxygene => {
      res.status(200).json(statsOxygene);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/", joiValidate(statsOxygenePost), (req, res) => {
  const { date, rate } = req.body;
  StatsOxygene.create({
    date,
    rate
  })
    .then(statsOxygene => res.status(201).json(statsOxygene))
    .catch(err => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  StatsOxygene.destroy({
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
