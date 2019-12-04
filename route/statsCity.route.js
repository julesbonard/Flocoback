const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const StatsCity = require("../sequelize/models/statsCity");

router.get("/", (req, res) => {
  StatsCity.findAll()
    .then(statsCity => res.status(200).json(statsCity))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
