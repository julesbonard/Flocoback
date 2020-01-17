const Agenda = require("./models/agenda");
const Comments = require("./models/comments");
const Friends = require("./models/friends");
const Likes = require("./models/likes");
const Locations = require("./models/locations");
const Messages = require("./models/messages");
const MiniFlora = require("./models/miniFlora");
const Partners = require("./models/partners");
const Plants = require("./models/plants");
const Posts = require("./models/posts");
const Pots = require("./models/pots");
const Seeds = require("./models/seeds");
const StatsCity = require("./models/statsCity");
const StatsTaxons = require("./models/statsTaxons");
const Tresaury = require("./models/tresaury");
const User = require("./models/users");
const Seed_Partner = require("./models/seed_Partner");

// //USER
User.hasOne(Agenda, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
User.hasOne(Comments, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE"
});
User.hasOne(Friends, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
User.belongsToMany(User, { as: "receiver", through: Messages });
User.hasMany(Likes, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
User.hasOne(Tresaury, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE"
});
User.hasMany(Pots, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
User.hasOne(Agenda, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
User.hasMany(Posts, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });

//AGENDA
Agenda.belongsTo(User, { foreignKey: { allowNull: false } });

//COMENTS
Comments.belongsTo(User, { foreignKey: { allowNull: false } });
Comments.belongsTo(Posts, { foreignKey: { allowNull: false } });

//FRIENDS
Friends.belongsTo(User, { foreignKey: { allowNull: false } });

//LIKES
Likes.belongsTo(User, { foreignKey: { allowNull: false } });
Likes.belongsTo(Posts, { foreignKey: { allowNull: false } });

//POSTS
Posts.hasMany(Likes, { foreignKey: { allowNull: false } });
Posts.hasMany(Comments, { foreignKey: { allowNull: false } });
Posts.belongsTo(User, { foreignKey: { allowNull: false } });

//POTS
Pots.belongsTo(User, { foreignKey: { allowNull: false } });
Pots.hasOne(Plants, { foreignKey: { allowNull: false } });

//LOCATIONS
Locations.belongsTo(Plants, { foreignKey: { allowNull: false } });

//PLANTS
Plants.hasOne(Locations, { foreignKey: { allowNull: false } });
Plants.belongsTo(Pots, { foreignKey: { allowNull: false } });
Plants.belongsTo(Seeds, { foreignKey: { allowNull: false } });

//SEEDS
Seeds.hasOne(Plants, { foreignKey: { allowNull: false } });

//MINIFLORA:
MiniFlora.hasOne(StatsTaxons, { foreignKey: { allowNull: false } });
MiniFlora.hasOne(StatsCity, { foreignKey: { allowNull: false } });

//STATSTAXONS
StatsTaxons.belongsTo(MiniFlora, { foreignKey: { allowNull: false } });

//STATSCITY
StatsCity.belongsTo(MiniFlora, { foreignKey: { allowNull: false } });

//PARTNERS
Partners.belongsToMany(Seeds, { through: Seed_Partner });

//TRESAURY
Tresaury.belongsTo(User, { foreignKey: { allowNull: false } });

//SEEDS
Seeds.belongsToMany(Partners, { through: Seed_Partner });
