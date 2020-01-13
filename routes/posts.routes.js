const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { postsPost, postsPut } = require("../middlewares/joiSchemas");
const Post = require("../sequelize/models/posts");
const { checkAuth } = require("../middlewares/tokenJwt");

//GET ALL
router.get("/", checkAuth, (req, res) => {
  Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  Post.findOne({
    where: {
      uuid: id
    }
  })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT ONE
router.put("/:id", joiValidate(postsPut), checkAuth, (req, res) => {
  const { id } = req.params;
  const { contents, date, image } = req.body;
  Post.update(
    {
      contents,
      date,
      image
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return Post.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST ONE
router.post("/", joiValidate(postsPost), checkAuth, (req, res) => {
  const { contents, date, image, UserUuid } = req.body;
  Post.create({
    contents,
    date,
    image,
    UserUuid
  })
    .then(posts => res.status(201).json(posts))
    .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.findOne({
      where: {
        uuid: id
      }
    });
    await Post.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
