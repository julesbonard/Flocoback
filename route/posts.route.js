const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Post = require("../sequelize/models/posts");

router.get("/", (req, res) => {
  Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
