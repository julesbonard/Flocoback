const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Tresaury = require("../sequelize/models/tresaury");

const { joiValidate } = require("../middlewares/joiValidate");
const { tresauryPost, tresauryPut } = require("../middlewares/joiSchemas");

//GET ROUTE:
router.get("/", (req, res) => {
  Tresaury.findAll()
    .then(tresaury => res.status(200).json(tresaury))
    .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
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

//PUT ROUTE:
router.put("/:id", joiValidate(tresauryPost), (req, res) => {
  const { id } = req.params;
  Tresaury.update(
    {
      level: req.body.level
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

//POST ROUTE:
router.post("/", joiValidate(tresauryPost), (req, res) => {
  const { level, badge, points } = req.body;
  Tresaury.create({
    level,
    badge,
    points
  })
    .then(tresaury => res.status(201).json(tresaury))
    .catch(err => res.status(400).json(err));
});

//DELETE ROUTE:
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Tresaury.destroy({
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

module.exports = router;
