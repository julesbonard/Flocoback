const Joi = require("@hapi/joi");

module.exports.statsOxygene = Joi.object({
  date: Joi.date().required(),
  rate: Joi.number().required()
});
