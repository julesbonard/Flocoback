const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Partner = require("../sequelize/models/partners");

router.get("/", (req, res) => {
  Partner.findAll()
    .then(partners => res.status(200).json(partners))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
