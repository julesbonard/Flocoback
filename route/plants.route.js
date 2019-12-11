const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Plants = require("../sequelize/models/plants");

const { joiValidate } = require("../middlewares/joiValidate");
const { plantsPost } = require("../middlewares/joiSchemas");

//GET ROUTE:
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

//PUT ROUTE:
router.put("/:id", joiValidate(plantsPost), (req, res) => {
  const { id } = req.params;
  Plants.update(
    {
      image: req.body.image
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

//POST ROUTE:
router.post("/", joiValidate(plantsPost), (req, res) => {
  const { image } = req.body;
  Plants.create({
    image
  })
    .then(plants => res.status(201).json(plants))
    .catch(err => res.status(400).json(err));
});

//DELETE ROUTE:
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
