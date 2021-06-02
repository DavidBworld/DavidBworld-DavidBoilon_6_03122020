const multer = require('multer'); //importation de multer

const MIME_TYPES = { //petit dictionnaire pour les traductions des images
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ //objet de configuration avec fonction diskStorage
  destination: (req, file, callback) => { //destination : où enregistrer le fichier
    callback(null, 'images'); //fonction callback avec null pas de problème
  },
  filename: (req, file, callback) => { //2ème élément pour le nom de fichier pour qu'il est qu'un seul nom
    const name = file.originalname.split(' ').join('_'); //nom d'origine qui remplace les espaces par des _
    const extension = MIME_TYPES[file.mimetype]; // elément du dictionnaire correspondant au MIME8TYPES envoyé du frontend
    callback(null, name + Date.now() + '.' + extension); //création du nom pour générer un nom unique
  }
});

module.exports = multer({storage: storage}).single('image'); //single fichier unique image