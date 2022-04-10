const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const sequelize = require("../config/db");
const post = require("./post-model");
//const comment = require("./comments-model");

//creating a model for user
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    serial: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

User.hasMany(post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
post.belongsTo(User, { foreignKey: "user_id" });

//User.hasMany(comment, {
//foreignKey: "user_id",
//onDelete: "CASCADE",
//onUpdate: "CASCADE",
//});

//comment.belongsTo(User, { foreignKey: "user_id" });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("user-model synced successfully !");
  })
  .catch((err) => {
    console.log("Error syncing user-model !" + err);
  });

module.exports = User;
