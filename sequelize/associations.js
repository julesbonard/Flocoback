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

//USER
User.hasOne(Agenda, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
User.hasMany(Posts, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });

//AGENDA
Agenda.belongsTo(User, { foreignKey: { allowNull: false } });

//POSTS
Posts.belongsTo(User, { foreignKey: { allowNull: false } });
