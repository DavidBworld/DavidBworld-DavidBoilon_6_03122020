const mongoose = require('mongoose');    // utilisation de mongoose. ODM (Object Data Modeling) 
const uniqueValidator = require('mongoose-unique-validator');  // plugin 

// Modèle user
const userSchema = mongoose.Schema({ //création du schéma utilisateur
  email: { type: String, required: true, unique: true },   //unique : true permet d'avaoir un seul utilisateur par e-mail 
  password: { type: String, required: true } //mot de passe crypté en string
});

// Plugin qui restreint à une création de user par adresse mail 
userSchema.plugin(uniqueValidator);//méthode plugin à unqueValidator permet d'avoir un seul e-mail par compte utilisateur


module.exports = mongoose.model('User', userSchema);//export du modèle