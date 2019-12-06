const Joi = require("@hapi/joi");

module.exports.locationPost = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
});
