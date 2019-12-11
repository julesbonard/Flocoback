const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const { joiValidate } = require("../middlewares/joiValidate");
const { miniFloraPost, miniFloraPut } = require("../middlewares/joiSchemas");
const MiniFlora = require("../sequelize/models/miniFlora");

//GET ALL
router.get("/", (req, res) => {
  MiniFlora.findAll()
    .then(miniFlora => res.status(200).json(miniFlora))
    .catch(err => res.status(400).json(err));
});

//GET ONE
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

//PUT 
router.put("/:id", joiValidate(miniFloraPut), (req, res) => {
  const { id } = req.params;
  const { number } = req.body
  MiniFlora.update(
    {
      number
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

//POST
router.post("/", joiValidate(miniFloraPost), (req, res) => {
  const { number } = req.body;
  MiniFlora.create({
    number
  })
    .then(miniFlora => res.status(201).json(miniFlora))
    .catch(err => res.status(400).json(err));
});

//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const miniFlora = await MiniFlora.findOne({
      where: {
        uuid: id
      }
    });
    await MiniFlora.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(miniFlora);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
