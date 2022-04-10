const Post = require("../models/post-model");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs");

//Créer un post
exports.createPost = (req, res) => {
  console.log(JSON.stringify(req.body));
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;

  if (req.file) {
    Post.create({
      user_id: userId,
      content: req.body.content,
      picture: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    })
      .then(() => {
        res.status(201).json({ message: "Post crée !" });
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } else {
    Post.create({
      user_id: userId,
      content: req.body.content,
      picture: "",
    })
      .then(() => res.status(201).json({ message: "Post créé !" }))
      .catch((error) =>
        res
          .status(400)
          .json({ message: "Vous ne pouvez pas publier de post", error })
      );
  }
};

//Modifier un post
/*exports.modifyPost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post && post.user_id == userId) {
        console.log(req.body.content + "/////////////////");
        let postUpdate = new Post();
        postUpdate.user_id = post.user_id;
        postUpdate.content = req.body.content;
        postUpdate.updatedAt = post.updatedAt;
        postUpdate.createdAt = post.createdAt;

        if (req.file) {
          picture = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        } else {
          postUpdate.picture = "";
        }
        postUpdate.update({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post modifié !" }))
          .catch((error) => {
            console.log(error);
            res.status(400).json({ message: error.message });
          });
      } else {
        res.status(403).json({ message: "Action non autorisé!!" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};*/

exports.modifyPost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      console.log(post);
      if (post && post.user_id == userId) {
        if (post.picture != "") {
          const filename = post.picture.split("/images/")[1];
          fs.unlink("images/" + filename, () => {});

          post.content = req.body.content;
          (post.picture = req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : ""),
            post.save();
        } else {
          post.content = req.body.content;
          (post.picture = req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : ""),
            post.save();
        }
      }
    })
    .then(() => {
      res.status(200).json({ message: "Post modifié !" });
    })
    .catch((err) => {
      console.log("Le post n'a pas pu être modifié !");
      res.status(400).json(err);
    });
};

//Supprimer un post
exports.deletePost = (req, res) => {
  Post.findOne({ where: { id: req.params.id } });

  Post.destroy({ where: { id: req.params.id } })
    .then(() => res.status(201).json("Post supprimé"))
    .catch((error) => res.status(400).json({ error }));
};

//récupère tous les posts
exports.getAllPosts = (req, res) => {
  Post.findAll({
    attributes: ["id", "user_id", "content", "picture", "createdAt"],
  })
    .then((posts) => {
      console.log(posts);
      res.status(200).json({ posts });
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
};

//retrouver un post
exports.getOnePost = (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error,
      });
    });
};
