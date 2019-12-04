const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Like = require("../sequelize/models/likes");

router.get("/", (req, res) => {
  Like.findAll()
    .then(likes => res.status(200).json(likes))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
