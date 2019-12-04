const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Comment = require("../sequelize/models/comments");

router.get("/", (req, res) => {
  Comment.findAll()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
