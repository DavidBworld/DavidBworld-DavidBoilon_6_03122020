  
const jwt = require('jsonwebtoken'); //vérifier les tokens
const User = require('../models/User');

module.exports = (req, res, next) => {
  try { // regroupe les instructions
    const token = req.headers.authorization.split(' ')[1]; //récupération du token depuis le header Authorization et split retourne le 2eme élément du tableau
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //fonction verify vérifie le token avec la clé secrète
    const userId = decodedToken.userId; // decode le token de l'userId
    if (req.body.userId && req.body.userId !== userId) { // si le userId est dans le corp de la requête et est différent de l'uderId retourne une erreur
      throw 'User ID non valide !'; // throw renvoi l'erreur
    } else {
      User.findOne({ _id: userId })
        .then(user => {
          req.user = user;
          next();
        })
    }
  } catch(error) {
    res.status(401).json({ //401 problème d'autentification
      error: new Error('Requête non authentifiée !')
    });
  }
};