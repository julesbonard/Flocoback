const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const Partners = require("../sequelize/models/partners");

const { joiValidate } = require("../middlewares/joiValidate");
const { partnersPost, partnersPut } = require("../middlewares/joiSchemas");

//GET ALL
router.get("/", (req, res) => {
  Partners.findAll()
    .then(partners => res.status(200).json(partners))
    .catch(err => res.status(400).json(err));
});

//GET ONE
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Partners.findOne({
    where: {
      uuid: id
    }
  })
    .then(partners => {
      res.status(200).json(partners);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//PUT
router.put("/:id", joiValidate(partnersPut), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  Partners.update(
    {
      name
    },
    {
      where: {
        uuid: id
      }
    }
  )
    .then(() => {
      return Partners.findOne({
        where: {
          uuid: id
        }
      });
    })
    .then(partners => {
      res.status(200).json(partners);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//POST
router.post("/", joiValidate(partnersPost), (req, res) => {
  const { name, address, tags, phone, score, website } = req.body;
  Partners.create({
    name,
    address,
    tags,
    phone,
    score,
    website
  })
    .then(partners => res.status(201).json(partners))
    .catch(err => res.status(400).json(err));
});

//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const partners = await Partners.findOne({
      where: {
        uuid: id
      }
    });
    await Partners.destroy({
      where: {
        uuid: id
      }
    });
    res.status(200).json(partners);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
