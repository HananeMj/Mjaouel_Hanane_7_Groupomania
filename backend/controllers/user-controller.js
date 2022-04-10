const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptoJs = require("crypto-js");
const user = require("../models/user-model");
require("dotenv").config();

//créer un nouvel utilisateur
exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      user
        .create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: cryptoJs
            .HmacSHA256(req.body.email, process.env.SECRET_KEY)
            .toString(),
          password: hash,
          isAdmin: req.body.isAdmin,
        })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ message: error.message }));
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

//connexion utilisateur
exports.login = (req, res) => {
  //retrouver l'email crypté
  const emailCryptedResearch = cryptoJs
    .HmacSHA256(req.body.email, `${process.env.SECRET_KEY}`)
    .toString();
  user
    .findOne({ where: { email: emailCryptedResearch } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              `${process.env.SECRET_TOKEN}`,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

exports.getAllUsers = (req, res) => {
  try {
    user
      .findAll()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};

exports.getOneUser = (req, res) => {
  try {
    user
      .findOne()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => res.status(400).json(error));
  } catch {
    (error) => res.status(500).json(error);
  }
};
