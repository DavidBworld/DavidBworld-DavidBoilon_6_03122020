  
const mongoose = require('mongoose'); //utilisation de mongoose pour créer le schéma

const sauceSchema = mongoose.Schema({ //fonction schéma du package mongoose
  userId: { type: String, required: true }, //required signifie que le champ est requis pour enregistrer dans la base
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 }, //attribut la valeur par défaut 0
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: [] }, //le type Array pour le chemin définit également un getter
  usersDisliked: { type: Array, default: [] }, //Ainsi l'accès au champ de valeur [0,1,2,...] fournit la valeur '0,1,2,...'.
});

module.exports = mongoose.model('Sauce', sauceSchema); //méthode modèle du package mongoose avec Sauce (le modèle) comme premier paramètre
                                                    // le deuxièle paramètre est le schéma créer 