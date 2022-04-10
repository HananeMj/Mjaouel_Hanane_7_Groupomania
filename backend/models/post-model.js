const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const sequelize = require("../config/db");

//const comment = require("./comments-model");

//creating a model for posts
const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
});

//Post.hasMany(comment, {
//foreignKey: "post_id",
//onDelete: "CASCADE",
//onUpdate: "CASCADE",
//});
//comment.belongsTo(Post, { foreignKey: "post_id" });

sequelize
  .sync(/*{force: true}*/)
  .then(() => {
    console.log("post-model synced successfully !");
  })
  .catch((err) => {
    console.log("Error syncing post-model !" + err);
  });

module.exports = Post;
