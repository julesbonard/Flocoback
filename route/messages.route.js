const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Message = require("../sequelize/models/messages");

router.get("/", (req, res) => {
  Message.findAll()
    .then(messages => res.status(200).json(messages))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
