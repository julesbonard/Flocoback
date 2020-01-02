require("dotenv").config(); // To get environment variables from a .env file
const express = require("express");
const passport = require("passport");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;

// Get the Sequelize config
const sequelize = require("./sequelize");
require("./sequelize/associations"); // If you have associations

// Middlewares
app.use(cors());
app.use(express.json());

app.use(passport.initialize());
require("./passport");

app.get("/", (req, res) => res.send("Hello world !"));

//route
app.use("/login", require("./routes/login.routes"));
app.use("/users", require("./routes/users.routes"));
app.use("/miniFlora", require("./routes/miniFlora.routes"));
app.use("/statsTaxons", require("./routes/statsTaxons.routes"));
app.use("/statsCity", require("./routes/statsCity.routes"));
app.use("/statsOxygene", require("./routes/statsOxygene.routes"));
app.use("/plants", require("./routes/plants.routes"));
app.use("/locations", require("./routes/locations.routes"));
app.use("/partners", require("./routes/partners.routes"));
app.use("/tresaury", require("./routes/tresaury.routes"));
app.use("/agenda", require("./routes/agenda.routes"));
app.use("/friends", require("./routes/friends.routes"));
app.use("/comments", require("./routes/comments.routes"));
app.use("/likes", require("./routes/likes.routes"));
app.use("/posts", require("./routes/posts.routes"));
app.use("/seeds", require("./routes/seeds.routes"));
app.use("/pots", require("./routes/pots.routes"));
app.use("/messages", require("./routes/messages.routes"));

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
