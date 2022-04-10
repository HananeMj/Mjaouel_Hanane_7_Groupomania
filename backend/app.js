//import packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./config/db");
const cors = require("cors");
require("pg");

require("dotenv").config();

//import routes
const userRoute = require("./routes/user-routes");
const postRoute = require("./routes/post-routes");
//const commentRoute = require("./routes/comment-route");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept,Accept-Encoding, Content-Type,X-CSRF-Token, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(bodyParser.json());
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//app.use permet d'attribuer un middleware à une route spécifique de l'application.
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
//app.use("/api/comment", commentRoute);

module.exports = app;
