// Chiffrer le mot de passe
const bcrypt = require('bcrypt'); //importation package bcrypt

//package token
const jwt = require('jsonwebtoken'); //permet de créer des token et de les vérifier

// Importer l'utilisateur
const User = require('../models/User'); //importation du modèle User

// Inscription de l'utilisateur
exports.signup = (req, res, next) => {  //nouvel utilisateur
    bcrypt.hash(req.body.password, 10)  //hasher le mot de passe du corp de la requête avec 10 tours de l'algorythme
        .then(hash => { //méthode asynchrone
            const user = new User({ //création new utilisateur avec le mot de passe crypté et l'adresse mail passé dans le corp de la requête
            email: req.body.email,
            password: hash  //
            });
            user.save() //enregistrement de l'utilisateur dans la base de donnée
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) //
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

  // Connexion de l'utilisateur
exports.login = (req, res, next) => { //utilisatuer existant
    User.findOne({ email: req.body.email }) //méthode findOne trouve un seul utilisateur de la base de donnée
        .then(user => {
            if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' }); //connexion non autorisé
            }
            bcrypt.compare(req.body.password, user.password) //fonction compare compare les mot de passe
            .then(valid => {  //then recoit un boolean
                if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({ //renvoi une bonne connexion avec un objet json
                userId: user._id, //avec userId
                token: jwt.sign(   //fonction sign
                    { userId: user._id }, //paramètre payload permet userId correspond bien et permet de rajouter modifier des sauces avec un seul id
                    'RANDOM_TOKEN_SECRET', //deuxième argument un secret (préférer une chaine de caractère longue en production)
                    { expiresIn: '4h' } // troisième c'est l'expiration du token
                )
                });
            })
            .catch(error => res.status(500).json({ error }));  //erreur serveur
        })
        .catch(error => res.status(500).json({ error }));
};