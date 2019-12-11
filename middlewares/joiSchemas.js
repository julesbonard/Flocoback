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
  restored: Joi.bool().required(),
  status: Joi.string().required()
});
module.exports.usersPost = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().required(),
  pseudo: Joi.string().required(),
  password: Joi.string().required()
});

//PARTNERS
module.exports.partnersPost = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  tags: Joi.string(),
  website: Joi.string(),
  phone: Joi.number().required(),
  score: Joi.number()
});
module.exports.partnersPut = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  tags: Joi.string(),
  website: Joi.string(),
  phone: Joi.number(),
  score: Joi.number()
});

//PLANTS
module.exports.plantsPost = Joi.object({
  image: Joi.string()
});

//AGENDA
module.exports.agendaPost = Joi.object({
  event: Joi.string()
});
module.exports.agendaPut = Joi.object({
  event: Joi.string()
});

//TRESAURY
module.exports.tresauryPost = Joi.object({
  level: Joi.number(),
  badge: Joi.string(),
  points: Joi.number()
});
module.exports.tresauryPut = Joi.object({
  level: Joi.number(),
  badge: Joi.string(),
  points: Joi.number()
});

//FRIENDS
module.exports.friendsPost = Joi.object({
  confirmed: Joi.boolean()
});
module.exports.friendsPut = Joi.object({
  confirmed: Joi.boolean()
});
