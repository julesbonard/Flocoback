const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { statsCityPost, statsCityPut } = require("../middlewares/joiSchemas");
const StatsCity = require("../sequelize/models/statsCity");

//GET ALL
router.get("/", (req, res) => {
  StatsCity.findAll()
    .then(statsCity => res.status(200).json(statsCity))
    .catch(err => res.status(400).json(err));
});

//GET ONE
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

//PUT ONE
router.put("/:id", joiValidate(statsCityPut), (req, res) => {
  const { id } = req.params;
  const { street, district } = req.body;
  StatsCity.update(
    {
      street,
      district
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return StatsCity.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(statsCity => {
      res.status(200).json(statsCity);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST ONE
router.post("/", joiValidate(statsCityPost), (req, res) => {
  const { district, street, miniFloraUuid } = req.body;
  StatsCity.create({
    district,
    street,
    miniFloraUuid
  })
    .then(statsCity => res.status(201).json(statsCity))
    .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const statsCity = await StatsCity.findOne({
      where: {
        uuid: id
      }
    });
    await StatsCity.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(statsCity);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
