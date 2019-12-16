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
// Company.hasMany(User, { foreignKey: { allowNull: false} });
// User.belongsTo(Company, { foreignKey: { allowNull: false}, onDelete: "CASCADE" });

//MINIFLORA:
// MiniFlora.hasMany(StatsTaxons, { foreignKey: { allowNull: false}});
// StatsTaxons.belongsTo(MiniFlora, { foreignKey: { allowNull: false}});

// MiniFlora.hasMany(StatsCity, { foreignKey: { allowNull: false}});
// StatsCity.belongsTo(MiniFlora, { foreignKey: { allowNull: false}});

// //USER

User.hasOne(Agenda, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
// User.hasOne(Tresaury, { foreignKey: { allowNull: false}, onDelete: "CASCADE" })
// User.hasOne(Friends, { foreignKey: { allowNull: false}, onDelete: "CASCADE" })
// User.hasOne(Messages, { foreignKey: { allowNull: false}, onDelete: "CASCADE" })
// User.hasOne(Comments, { foreignKey: { allowNull: false}, onDelete: "CASCADE" })
// User.hasOne(Likes, { foreignKey: { allowNull: false}, onDelete: "CASCADE" })
User.hasMany(Posts, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
// User.hasMany(Pots, { foreignKey: { allowNull: false}, onDelete: "CASCADE"})

// //AGENDA
Agenda.belongsTo(User, { foreignKey: { allowNull: false } });

// // // //TRESAURY
// Tresaury.belongsTo(User, { foreignKey: { allowNull: false} })

// // ​

// // // //FRIENDS
// Friends.belongsTo(User, { foreignKey: { allowNull: false} })

// // ​

// // // //MESSAGE
// Messages.belongsTo(User, { foreignKey: { allowNull: false} })

// // ​

// // // //COMMENT
// Comments.belongsTo(User, { foreignKey: { allowNull: false} })
// Comments.belongsTo(Posts, { foreignKey: { allowNull: false} })

// //LIKES
// Likes.belongsTo(User, { foreignKey: { allowNull: false} })
// Likes.belongsTo(Posts, { foreignKey: { allowNull: false} })

// //POSTS

Posts.belongsTo(User, { foreignKey: { allowNull: false } });
// Posts.hasMany(Comments, { foreignKey: { allowNull: false} })
// Posts.hasMany(Likes, { foreignKey: { allowNull: false} })
// // //POTS
// Pots.belongsTo(User, { foreignKey: { allowNull: false} })
// Pots.hasOne(Seeds, {foreignKey: { allowNull: false}})

// // //SEEDS
// Seeds.belongsTo(Pots, { foreignKey: { allowNull: false} })
// Seeds.hasOne(Plants, { foreignKey: { allowNull: false} })
// Seeds.hasMany(Partners, { foreignKey: { allowNull: false} })

// // //PLANTS
// Plants.belongsTo(Seeds, { foreignKey: { allowNull: false} })
// Plants.hasOne(Locations, { foreignKey: { allowNull: false} })

// // //LOCATIONS
// Locations.belongsTo(Plants, { foreignKey: { allowNull: false} })

// //PARTNER
// Partners.hasMany(Seeds, { foreignKey: { allowNull: false} })
