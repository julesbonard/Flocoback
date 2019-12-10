const Joi = require("@hapi/joi");

module.exports.locationPost = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
});
module.exports.statsOxygenePost = Joi.object({
  date: Joi.date().required(),
  rate: Joi.number().required()
});
module.exports.miniFloraPost = Joi.object({
  number: Joi.number().required()
});
module.exports.statsCityPost = Joi.object({
  district: Joi.number().required(),
  street: Joi.number().required()
});
module.exports.statsTaxonsPost = Joi.object({
  number: Joi.number().required(),
  restored: Joi.boolean().required(),
  status: Joi.string().required()
});
module.exports.usersPost = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().required(),
  pseudo: Joi.string().required(),
  password: Joi.string().required(),
  avatar: Joi.string()
});
module.exports.commentPost = Joi.object({
  date: Joi.date().required(),
  contents: Joi.string().required()
});
module.exports.likePost = Joi.object({
  like: Joi.boolean().required()
});
module.exports.postsPost = Joi.object({
  contents: Joi.string().required(),
  date: Joi.date().required(),
  image: Joi.string().required()
});
module.exports.messagePost = Joi.object({
  date: Joi.date().required(),
  contents: Joi.string().required()
});
module.exports.potsPost = Joi.object({
  width: Joi.number().required(),
  length: Joi.number().required(),
  depth: Joi.number().required()
});
module.exports.seedsPost = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().required(),
  type: Joi.string().required(),
  environment: Joi.string().required(),
  season: Joi.string().required(),
  exposure: Joi.string().required(),
  spray: Joi.string().required()
});
