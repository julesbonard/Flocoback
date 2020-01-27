const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Tresaury = require("../sequelize/models/tresaury");

const { joiValidate } = require("../middlewares/joiValidate");
const { tresauryPost, tresauryPut } = require("../middlewares/joiSchemas");
const { checkAuth } = require("../middlewares/tokenJwt");

//GET ALL
router.get("/", checkAuth, (req, res) => {
  Tresaury.findAll()
    .then(tresaury => res.status(200).json(tresaury))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", checkAuth, (req, res) => {
  const { id } = req.params;
  Tresaury.findOne({
    where: {
      uuid: id
    }
  })
    .then(tresaury => {
      res.status(200).json(tresaury);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT
router.put("/:id", joiValidate(tresauryPut), checkAuth, (req, res) => {
  const { id } = req.params;
  const { level, badge, points } = req.body;

  Tresaury.update(
    {
      level,
      badge,
      points
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return Tresaury.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(tresaury => {
      res.status(200).json(tresaury);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST
router.post("/", joiValidate(tresauryPost), checkAuth, (req, res) => {
  const { level, badge, points, UserUuid } = req.body;
  Tresaury.create({
    level,
    badge,
    points,
    UserUuid
  })
    .then(tresaury => res.status(201).json(tresaury))
    .catch(err => res.status(400).json(err));
});

//DELETE
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const tresaury = await Tresaury.findOne({
      where: {
        uuid: id
      }
    });
    await Tresaury.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(tresaury);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
