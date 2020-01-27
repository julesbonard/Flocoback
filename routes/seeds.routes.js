const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { seedsPost, seedsPut } = require("../middlewares/joiSchemas");
const Seed = require("../sequelize/models/seeds");
const { checkAuth } = require("../middlewares/tokenJwt");

//GET ALL
router.get("/", (req, res) => {
  Seed.findAll()
    .then(seeds => res.status(200).json(seeds))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Seed.findOne({
    where: {
      uuid: id
    }
  })
    .then(seeds => {
      res.status(200).json(seeds);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT ONE
router.put("/:id", joiValidate(seedsPut), checkAuth, (req, res) => {
  const { id } = req.params;
  const { name, status, type, environment, season, exposure, spray } = req.body;
  Seed.update(
    {
      name,
      status,
      type,
      environment,
      season,
      exposure,
      spray
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return Seed.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(seeds => {
      res.status(200).json(seeds);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST ONE
router.post("/", joiValidate(seedsPost), checkAuth, (req, res) => {
  const { name, status, type, environment, season, exposure, spray } = req.body;
  Seed.create({
    name,
    status,
    type,
    environment,
    season,
    exposure,
    spray
  })
    .then(seeds => res.status(201).json(seeds))
    .catch(err => res.status(400).json(err));
});

//DELETE ONE
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const seeds = await Seed.findOne({
      where: {
        uuid: id
      }
    });
    await Seed.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(seeds);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
