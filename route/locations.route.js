const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Location = require("../sequelize/models/locations");

router.get("/", (req, res) => {
  Location.findAll()
    .then(locations => res.status(200).json(locations))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
