const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { locationPost, locationPut } = require("../middlewares/joiSchemas");
const Location = require("../sequelize/models/locations");
const { checkAuth } = require("../middlewares/tokenJwt");

//GET ALL LOCATIONS
router.get("/", (req, res) => {
  Location.findAll()
    .then(locations => res.status(200).json(locations))
    .catch(err => res.status(400).json(err));
});

//GET ONE LOCATION
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Location.findOne({
    where: {
      uuid: id
    }
  })
    .then(location => {
      res.status(200).json(location);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT ONE LOCATION
router.put("/:id", joiValidate(locationPut), checkAuth, (req, res) => {
  const { id } = req.params;
  const { latitude, longitude } = req.body;

  Location.update(
    {
      latitude,
      longitude
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return Location.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(location => res.status(200).json(location))
    .catch(err => res.status(400).json(err));
});

//POST ONE LOCATION
router.post("/", joiValidate(locationPost), checkAuth, (req, res) => {
  const { latitude, longitude, PlantUuid } = req.body;
  Location.create({
    latitude,
    longitude,
    PlantUuid
  })
    .then(location => res.status(201).json(location))
    .catch(err => res.status(422).json(err));
});

//DELETE ONE LOCATION
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findOne({
      where: {
        uuid: id
      }
    });
    await Location.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(location);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
