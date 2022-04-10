/*const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const sequelize = require("../config/db");

const Comment = sequelize.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("synced successfully !");
  })
  .catch((err) => {
    console.log("Error syncing !" + err);
  });

module.exports = Comment;*/
