const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Plants = require("../sequelize/models/plants");
const Location = require("../sequelize/models/locations");
const User = require("../sequelize/models/users");
const Pot = require("../sequelize/models/pots");

const { joiValidate } = require("../middlewares/joiValidate");
const { plantsPost, plantsPut } = require("../middlewares/joiSchemas");
const { checkAuth } = require("../middlewares/tokenJwt");

//GET ALL
router.get("/", (req, res) => {
  Plants.findAll({
    include: [{ model: Location }, { model: Pot, include: { model: User } }]
  })
    .then(plants => res.status(200).json(plants))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

//GET ONE
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Plants.findOne({
    where: {
      uuid: id
    }
  })
    .then(plants => {
      res.status(200).json(plants);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

//PUT
router.put("/:id", joiValidate(plantsPut), checkAuth, (req, res) => {
  const { id } = req.params;
  const { image } = req.body;
  Plants.update(
    {
      image
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return Plants.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(plants => {
      res.status(200).json(plants);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST
router.post("/", joiValidate(plantsPost), checkAuth, (req, res) => {
  const { image, SeedUuid, PotUuid } = req.body;
  Plants.create({
    image,
    SeedUuid,
    PotUuid
  })
    .then(plants => res.status(201).json(plants))
    .catch(err => res.status(400).json(err));
});

//DELETE
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const plants = await Plants.findOne({
      where: {
        uuid: id
      }
    });
    await Plants.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(plants);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
