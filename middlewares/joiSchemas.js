const Joi = require("@hapi/joi");

//LOCATION
module.exports.locationPost = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
});
module.exports.locationPut = Joi.object({
  latitude: Joi.number(),
  longitude: Joi.number()
});

//STATSOXYGENE
module.exports.statsOxygenePost = Joi.object({
  date: Joi.date().required(),
  rate: Joi.number().required()
});
module.exports.statsOxygenePut = Joi.object({
  date: Joi.date(),
  rate: Joi.number()
});

//MINIFLORA
module.exports.miniFloraPost = Joi.object({
  number: Joi.number().required()
});
module.exports.miniFloraPut = Joi.object({
  number: Joi.number()
});

//STATSCITY
module.exports.statsCityPost = Joi.object({
  district: Joi.number().required(),
  street: Joi.number().required()
});
module.exports.statsCityPut = Joi.object({
  district: Joi.number(),
  street: Joi.number()
});

//STATSTAXONS
module.exports.statsTaxonsPost = Joi.object({
  number: Joi.number().required(),
  restored: Joi.boolean().required(),
  status: Joi.string().required()
});
module.exports.statsTaxonsPut = Joi.object({
  number: Joi.number(),
  restored: Joi.boolean(),
  status: Joi.string()
});

//USERS
module.exports.usersPost = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().required(),
  pseudo: Joi.string().required(),
  password: Joi.string().required(),
  avatar: Joi.string()
});
module.exports.usersPut = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  age: Joi.number(),
  email: Joi.string(),
  pseudo: Joi.string(),
  password: Joi.string(),
  avatar: Joi.string()
});

//COMMENT
module.exports.commentPost = Joi.object({
  date: Joi.date().required(),
  contents: Joi.string().required()
});
module.exports.commentPut = Joi.object({
  date: Joi.date(),
  contents: Joi.string()
});

//LIKE
module.exports.likePost = Joi.object({
  like: Joi.boolean().required()
});
module.exports.likePut = Joi.object({
  like: Joi.boolean()
});

//POSTS
module.exports.postsPost = Joi.object({
  contents: Joi.string().required(),
  date: Joi.date().required(),
  image: Joi.string().required()
});
module.exports.postsPut = Joi.object({
  contents: Joi.string(),
  date: Joi.date(),
  image: Joi.string()
});

//MESSAGE
module.exports.messagePost = Joi.object({
  date: Joi.date().required(),
  contents: Joi.string().required()
});
module.exports.messagePut = Joi.object({
  date: Joi.date(),
  contents: Joi.string()
});

//POTS
module.exports.potsPost = Joi.object({
  width: Joi.number().required(),
  length: Joi.number().required(),
  depth: Joi.number().required()
});
module.exports.potsPut = Joi.object({
  width: Joi.number(),
  length: Joi.number(),
  depth: Joi.number()
});

//SEEDS
module.exports.seedsPost = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().required(),
  type: Joi.string().required(),
  environment: Joi.string().required(),
  season: Joi.string().required(),
  exposure: Joi.string().required(),
  spray: Joi.string().required()
});
module.exports.seedsPut = Joi.object({
  name: Joi.string(),
  status: Joi.string(),
  type: Joi.string(),
  environment: Joi.string(),
  season: Joi.string(),
  exposure: Joi.string(),
  spray: Joi.string()
});
