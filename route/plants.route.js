const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Plants = require("../sequelize/models/plants");

const { joiValidate } = require("../middlewares/joiValidate");
const { plantsPost } = require("../middlewares/joiSchemas");

router.get("/", (req, res) => {
  Plants.findAll()
    .then(plants => res.status(200).json(plants))
    .catch(err => res.status(400).json(err));
});

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
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Plants.update(
    {
      number: req.body.number
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(plants => {
      res.status(200).json(plants);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/", joiValidate(plantsPost), (req, res) => {
  const { image } = req.body;
  Plants.create({
    image
  })
    .then(plants => res.status(201).json(plants))
    .catch(err => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Plants.destroy({
    where: {
      uuid: id
    }
  })
    .then(plants => {
      res.status(200).json(plants);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
