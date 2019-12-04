const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const StatsTaxons = require("../sequelize/models/statsTaxons");

router.get("/", (req, res) => {
  StatsTaxons.findAll()
    .then(statsTaxons => res.status(200).json(statsTaxons))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
