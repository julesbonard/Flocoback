const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const MiniFlora = require("../sequelize/models/miniFlora");

router.get("/", (req, res) => {
  MiniFlora.findAll()
    .then(miniFlora => res.status(200).json(miniFlora))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
