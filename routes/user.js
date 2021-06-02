const express = require('express');
const router = express.Router();
const rate= require("../middleware/email-limit")

const userCtrl = require('../controllers/user'); //associe les fonctions aux différentes routes

router.post('/signup', userCtrl.signup); //utilisation de la méthode signup
router.post('/login', rate.limiter, userCtrl.login); //utilisation de la méthode login
//route post car le frontend envoi des adresses mail et mdp

module.exports = router;