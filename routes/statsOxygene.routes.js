const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const {
  statsOxygenePost,
  statsOxygenePut
} = require("../middlewares/joiSchemas");
const StatsOxygene = require("../sequelize/models/statsOxygene");

//GET ALL
router.get("/", (req, res) => {
  StatsOxygene.findAll()
    .then(statsOxygene => res.status(200).json(statsOxygene))
    .catch(err => res.status(400).json(err));
});

//GET ONE
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

//PUT ONE
router.put("/:id", joiValidate(statsOxygenePut), (req, res) => {
  const { id } = req.params;
  const { rate, date } = req.body;
  StatsOxygene.update(
    {
      rate,
      date
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

//POST ONE
router.post("/", joiValidate(statsOxygenePost), (req, res) => {
  const { date, rate } = req.body;
  StatsOxygene.create({
    date,
    rate
  })
    .then(statsOxygene => res.status(201).json(statsOxygene))
    .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const statsOxygene = await StatsOxygene.findOne({
      where: {
        uuid: id
      }
    });
    await StatsOxygene.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(statsOxygene);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
