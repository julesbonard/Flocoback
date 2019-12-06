const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { miniFloraPost } = require("../middlewares/joiSchemas");
const MiniFlora = require("../sequelize/models/miniFlora");

router.get("/", (req, res) => {
  MiniFlora.findAll()
    .then(miniFlora => res.status(200).json(miniFlora))
    .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  MiniFlora.findOne({
    where: {
      uuid: id
    }
  })
    .then(miniFlora => {
      res.status(200).json(miniFlora);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  MiniFlora.update(
    {
      number: req.body.number
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(miniFlora => {
      res.status(200).json(miniFlora);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/", joiValidate(miniFloraPost), (req, res) => {
  const { number } = req.body;
  MiniFlora.create({
    number
  })
    .then(miniFlora => res.status(201).json(miniFlora))
    .catch(err => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  MiniFlora.destroy({
    where: {
      uuid: id
    }
  })
    .then(miniFlora => {
      res.status(200).json(miniFlora);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
