const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Plant = require("../sequelize/models/plants");

router.get("/", (req, res) => {
  Plant.findAll()
    .then(plants => res.status(200).json(plants))
    .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Plant.findOne({
    where: {
      uuid: id
    }
  })
    .then(plant => {
      res.status(200).json(plant);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
