const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "groupomania",
  "hananemjaouel",
  "123456",

  {
    host: "localhost",
    dialect: "postgres",
  }
);

//test db
sequelize
  .authenticate()
  .then(() => console.log("Database successfully connected !"))
  .catch((err) => console.log("Error connecting to database" + err));

module.exports = sequelize;
