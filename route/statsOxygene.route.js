const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const StatsOxygene = require("../sequelize/models/statsOxygene");

router.get("/", (req, res) => {
  StatsOxygene.findAll()
    .then(statsOxygene => res.status(200).json(statsOxygene))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
