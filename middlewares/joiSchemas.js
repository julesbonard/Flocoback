const Joi = require("@hapi/joi");

module.exports.locationPost = Joi.object({
  longitude: Joi.number().required(),
  latitude: Joi.number().required()
});
