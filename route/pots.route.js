const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Pot = require("../sequelize/models/pots");

router.get("/", (req, res) => {
  Pot.findAll()
    .then(pots => res.status(200).json(pots))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
