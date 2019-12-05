const Joi = require("@hapi/joi");

module.exports.statsOxygene = Joi.object({
  date: Joi.date().required(),
  rate: Joi.number().required()
});
module.exports.miniFlora = Joi.object({
  number: Joi.number().required()
});
module.exports.statsCity = Joi.object({
  district: Joi.number().required(),
  street: Joi.number().required()
});
module.exports.statsTaxons = Joi.object({
  number: Joi.number().required(),
  restored: Joi.bool().required(),
  status: Joi.string().required()
});
module.exports.users = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().required(),
  pseudo: Joi.string().required(),
  password: Joi.string().required(),
  avatar: Joi.string().required()
});
