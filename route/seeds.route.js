const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Seed = require("../sequelize/models/seeds");

router.get("/", (req, res) => {
  Seed.findAll()
    .then(seeds => res.status(200).json(seeds))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
