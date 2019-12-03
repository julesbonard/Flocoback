const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const User = require("../sequelize/models/users");

router.get("/", (req, res) => {
  User.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
