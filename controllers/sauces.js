const fs = require('fs');

const Sauce = require('../models/Sauce'); //importation du modèle Sauce

//exports.function : export des fonctions createSauce, getOneSauce etc ...

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); //objet javscript sous forme de chaîne de caractère
  delete sauceObject._id; //delete supprime le champs id du corp de la requête
  const sauce = new Sauce({
    ...sauceObject, //opératue spread
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // les segments :{req.protocol (http ou https)} {recupère le host du serveur} /images
  }); //génération de l'url
  sauce.save() // la méthode save enregistre l'objet dans la base et retourne un promise
    .then(() => res.status(201).json({message: 'Sauce enregistrée !'})) //renvoi d'une réponse au frontend évitant l'expiration de la requête , code 201 bonne création de ressource
    .catch((error) => res.status(400).json({ error })); //recupère l'erreur avec un objet json error
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //méthode finfOne pour en trouver un et que son id soit identique au paramètre de requête
    .then(sauce => res.status(200).json(sauce)) //promise ou la sauce est retourné
    .catch(error => res.status(404).json({ error }))
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?  //opérateur ternaire ? si il existe
    {
      ...JSON.parse(req.body.sauce),  //recupère le corp de la requête et on parse
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };  //copie du req.body
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //méthode updateOne permet de mettre à jour un objet en vérifiant que l'id est identique à celui envoyé dans les paramètre de requête et le deuxième argument c'est le nouvel objet
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1]; //récupère le deuxième élément le nom
    fs.unlink(`images/${filename}`, () => { // unlink supprime le fichier
      Sauce.deleteOne({ _id: req.params.id }) //  call back : deletOne permet la suppression d'un objet
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
 Sauce.find() //méthode find qui trouve la liste complète des objets qui retourne une promise
    .then(sauces => res.status(200).json(sauces)) // recupération de tous les tableaux des sauces de la base de données et renvoi du tablau des sauces reçues
    .catch(error => res.status(400).json({ error }));
};

// $inc opérateur incrémente un champ d'une valeur spécifiée et a la forme suivante :
//$push :Ajoute un élément à un tableau.
//$pull opérateur supprime d'un tableau existant toutes les instances d'une valeur ou des valeurs qui correspondent à une condition spécifiée.
//Vous pouvez mettre à jour un seul document à l'aide de la méthode collection.updateOne() . updateOne()accepte un document filtre et un document de mise à jour.
exports.likeOrDislikeSauce= (req, res, next) => {
// Pour la route READ = Ajout/suppression d'un like / dislike à une sauce
  // Like présent dans le body
  const like = req.body.like
  // On prend le userID
  const userId = req.body.userId
  // On prend l'id de la sauce
  const sauceId = req.params.id

  if (like === 1) { // Si il s'agit d'un like // On push l'utilisateur et on incrémente le compteur de 1// On incrémente de 1
    Sauce.updateOne({_id: sauceId}, {$push: {usersLiked: userId},$inc: {likes: +1}}) 
      .then(() => res.status(200).json({message: 'like ajouté !'}))
      .catch((error) => res.status(400).json({error}))
  }
  if (like === -1) { // S'il s'agit d'un dislike
    Sauce.updateOne({_id: sauceId}, {$push: {usersDisliked: userId},$inc: {dislikes: +1}, })
      .then(() => {res.status(200).json({message: 'Dislike ajouté !'})})
      .catch((error) => res.status(400).json({error}))
  }
  if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
    Sauce.findOne({_id: sauceId})
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) { // Si il s'agit d'annuler un like
          Sauce.updateOne({_id: sauceId}, {$pull: {usersLiked: userId},$inc: {likes: -1}})
            .then(() => res.status(200).json({message: 'Like supprimé !'}))
            .catch((error) => res.status(400).json({error}))
        }
        else if (sauce.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
          Sauce.updateOne({_id: sauceId}, {$pull: {usersDisliked: userId},$inc: {dislikes: -1}})
            .then(() => res.status(200).json({message: 'Dislike supprimé !'}))
            .catch((error) => res.status(400).json({error}))
        }
      })
      .catch((error) => res.status(404).json({error}))
  }
}

