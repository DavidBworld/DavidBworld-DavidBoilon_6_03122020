const express = require('express');  //Création d'application
const bodyParser = require('body-parser'); //Permet d'extraire les objets JSON
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize'); //supprimer complètement ces clés et les données associées de l'objet, ou
//remplacez les caractères interdits par un autre caractère autorisé. A tester "content-filter"
const helmet = require('helmet'); //protége l'application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP.
const session = require('cookie-session');
const app = express();  //appel d'une méthode qui permet de créer l'application express 

const path = require('path'); //permet d'importer le chemin de l'image

require('dotenv').config()

const saucesRoutes = require('./routes/sauces');//importation des routes sauces

const userRoutes = require('./routes/user'); //importation des routes user

const Sauce = require('./models/Sauce'); //importation du modèle

app.use(helmet());

mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true,
    useUnifiedTopology: true }) //mongoose permet d'utiliser des schémas de données
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => { //middleware général envoyé à toutes les routes  
    res.setHeader('Access-Control-Allow-Origin', '*'); // accès à tout le monde
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //verbs des reequêtes
    next(); //next passe au suivant middleware
  });

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({ // pour sécuriser les cookies
  name: 'session',
  secret: process.env.SECRET_KEY,
  cookie: {
    secure: true, //Garantit que le navigateur n’envoie le cookie que sur HTTPS
    httpOnly: true,  //renforce la protection contre les attaques de type cross-site scripting
    domain: 'http://localhost:3000',  //utilisez cette option pour une comparaison avec le chemin demandé
    expires: expiryDate
  }
}));

app.use(bodyParser.json()); //transforme le corp de la requête en objet json utilisable avec la méthode json de bodyParser
//A partir de ce middleware on a accès au corp de la requête
//to replace prohibited characters with _, use:
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

//rendre les images accessibles publiquement pour toutes les requêtes vers la route /images
app.use('/images', express.static(path.join(__dirname, 'images'))); //middleware serve le dossier static

app.use('/api/sauces', saucesRoutes);  // pour la route sauce => utilisation du routeur exporté par saucesRoutes
app.use('/api/auth', userRoutes) //pour la route auth => utilisation du routeur exporté par userRoutes

module.exports = app; //exportation de l'application