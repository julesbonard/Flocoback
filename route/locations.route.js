const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { locationPost } = require("../middlewares/joiSchemas");
const Location = require("../sequelize/models/locations");

router.get("/", (req, res) => {
  Location.findAll()
    .then(locations => res.status(200).json(locations))
    .catch(err => res.status(400).json(err));
});

router.put("/", (req, res) => {
  Location.findAll()
    .then(locations => res.status(200).json(locations))
    .catch(err => res.status(400).json(err));
});

router.post("/", joiValidate(locationPost), (req, res) => {
  const { latitude, longitude } = req.body;
  Location.create({
    latitude,
    longitude
  })
    .then(location => res.status(201).json(location))
    .catch(err => res.status(400).json(err));
});

router.delete("/:id", async (req, res) => {
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
