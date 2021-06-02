const express = require('express');
const router = express.Router();  //création d'un router avec la méthode Router d'express permet de remplacer app par router

const saucesCtrl = require('../controllers/sauces'); //importation du controllers sauces

const auth = require('../middleware/auth'); // importation du middleware pour protéger les routes de l'application
const multer = require('../middleware/multer-config'); //importation du middleware multer

router.post('/', auth, multer, saucesCtrl.createSauce);//application des saucesCtrl.function(nom sémantique)
router.get('/:id', auth, saucesCtrl.getOneSauce);  //multer après auth
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/:id/like', auth, saucesCtrl.likeOrDislikeSauce);
//besoin d'une route poste pour les like ou dislike

module.exports = router;