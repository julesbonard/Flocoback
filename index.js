require("dotenv").config(); // To get environment variables from a .env file
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;

// Get the Sequelize config
const sequelize = require("./sequelize");
require("./sequelize/associations"); // If you have associations

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello world !"));

//route
app.use("/users", require("./route/users.route"));
app.use("/miniFlora", require("./route/miniFlora.route"));
app.use("/statsTaxons", require("./route/statsTaxons.route"));
app.use("/statsCity", require("./route/statsCity.route"));
app.use("/statsOxygene", require("./route/statsOxygene.route"));
app.use("/plants", require("./route/plants.route"));
app.use("/locations", require("./route/locations.route"));
app.use("/partners", require("./route/partners.route"));
app.use("/tresaury", require("./route/tresaury.route"));
app.use("/agenda", require("./route/agenda.route"));
app.use("/friends", require("./route/friends.route"));
app.use("/comments", require("./route/comments.route"));
app.use("/likes", require("./route/likes.route"));
app.use("/posts", require("./route/posts.route"));
app.use("/seeds", require("./route/seeds.route"));
app.use("/pots", require("./route/pots.route"));
app.use("/messages", require("./route/messages.route"));

async function main() {
  try {
    await sequelize.sync(); // Sync Method will create Database using the config & models
    console.log("Database connection sucessfull");
    app.listen(PORT, err => {
      if (err) throw new Error("Something bad happened...");
      console.log(`Listening to port ${PORT}.`);
    });
  } catch (err) {
    console.error("Unable to reach database", err);
  }
}

if (process.env.NODE_ENV !== "test") {
  main();
}

// If you want to add tests with Mocha & Chai
module.exports = app;
