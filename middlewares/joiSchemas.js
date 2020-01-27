const Joi = require("@hapi/joi");

//LOCATION
module.exports.locationPost = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  PlantUuid: Joi.string()
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
  street: Joi.number().required(),
  miniFloraUuid: Joi.string()
});
module.exports.statsCityPut = Joi.object({
  district: Joi.number(),
  street: Joi.number()
});

//STATSTAXONS
module.exports.statsTaxonsPost = Joi.object({
  number: Joi.number().required(),
  restored: Joi.boolean().required(),
  status: Joi.string().required(),
  miniFloraUuid: Joi.string()
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
  email: Joi.string().required(),
  pseudo: Joi.string().required(),
  isOAuth: Joi.boolean().required(),
  password: Joi.string(),
  avatar: Joi.string()
});
module.exports.usersPut = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string(),
  pseudo: Joi.string(),
  isOAuth: Joi.boolean(),
  password: Joi.string(),
  avatar: Joi.string()
});

//COMMENT
module.exports.commentPost = Joi.object({
  date: Joi.date().required(),
  contents: Joi.string().required(),
  UserUuid: Joi.string(),
  PostUuid: Joi.string()
});
module.exports.commentPut = Joi.object({
  date: Joi.date(),
  contents: Joi.string()
});

//LIKE
module.exports.likePost = Joi.object({
  like: Joi.boolean().required(),
  UserUuid: Joi.string(),
  PostUuid: Joi.string()
});
module.exports.likePut = Joi.object({
  like: Joi.boolean()
});

//POSTS
module.exports.postsPost = Joi.object({
  contents: Joi.string().required(),
  date: Joi.date().required(),
  image: Joi.string().required(),
  UserUuid: Joi.string()
});
module.exports.postsPut = Joi.object({
  contents: Joi.string(),
  date: Joi.date(),
  image: Joi.string()
});

//MESSAGE
module.exports.messagePost = Joi.object({
  date: Joi.date().required(),
  contents: Joi.string().required(),
  UserUuid: Joi.string(),
  receiverUuid: Joi.string()
});
module.exports.messagePut = Joi.object({
  date: Joi.date(),
  contents: Joi.string()
});

//POTS
module.exports.potsPost = Joi.object({
  width: Joi.number().required(),
  length: Joi.number().required(),
  depth: Joi.number().required(),
  UserUuid: Joi.string()
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
  image: Joi.string(),
  SeedUuid: Joi.string(),
  PotUuid: Joi.string()
});
module.exports.plantsPut = Joi.object({
  image: Joi.string()
});

//AGENDA
module.exports.agendaPost = Joi.object({
  event: Joi.string(),
  UserUuid: Joi.string()
});
module.exports.agendaPut = Joi.object({
  event: Joi.string()
});

//TRESAURY
module.exports.tresauryPost = Joi.object({
  level: Joi.number(),
  badge: Joi.string(),
  points: Joi.number(),
  UserUuid: Joi.string()
});
module.exports.tresauryPut = Joi.object({
  level: Joi.number(),
  badge: Joi.string(),
  points: Joi.number()
});

//FRIENDS
module.exports.friendsPost = Joi.object({
  confirmed: Joi.boolean(),
  UserUuid: Joi.string()
});
module.exports.friendsPut = Joi.object({
  confirmed: Joi.boolean()
});
