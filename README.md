## 📎 Projet 6 - Construire une API sécurisée pour l'application d'avis gastronomiques So Pekocko


***

Le sujet du projet 6 du parcours Développeur web chez Openclassrooms porte sur le développement d'une application d’évaluation des sauces piquantes pour la marque "So Pekocko". L'objectif étant de créer un MVP permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.

* 👀  &nbsp; Voir : [Le projet sur OpenClassrooms](https://openclassrooms.com/fr/projects/676/assignment "Cliquez pour voir le projet")

### Contexte du projet

* So Pekocko est une entreprise familiale de 10 salariés.
* Son activité principale est la création de sauces piquantes dont la composition est tenue secrète.
* Forte de son succès, l’entreprise souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.

#### Objectifs et Compétences évaluées

***Le but est de créer le backend de l'application, le frontend étant déjà codé et fourni***

* Implémenter un modèle logique de données conformément à la réglementation
* Stocker des données de manière sécurisée
* Mettre en œuvre des opérations CRUD de manière sécurisée

##### API REST

* Sécurité **OWASP** et **RGPD**

***

#### Instructions relatives à l'API

* [Note de cadrage](Instructions/Cadrage.pdf)
* [Guidelines](Instructions/Guidelines.pdf)

#### Contenus de ce repository

* Ce repo contient uniquement la partie `Backend`.
Vous pouvez cloner ce repository pour récupérer en local dans un dossier nommé Backend qui sera le backend de l'application.

Avec le terminal, aller dans le dossier backend, puis:

        - créer un fichier ".env" et y implémenter les lignes de code qui vous ont été envoyées séparément,
        ce sont les identifiant et password de mongoDB et le dossier node_module
        - penser à bien enregistrer,


* Vous trouverez la partie Frontend séparément sur [github](https://github.com/OpenClassrooms-Student-Center/dwj-projet6).
Cloner le dans un répertoire nommé frontend

***

### 🔨 &nbsp; Installation

* Cloner ce projet depuis GitHub.

#### 💡 &nbsp; Faire tourner le Frontend

* Ouvrir le terminal sur ce dossier et exécuter  `npm install` pour installer les dépendances.
* Exécuter `npm install node-sass` pour installer sass.Attention à prendre la version correspondante à NodeJS. Pour Node 14.0 par exemple, installer node-sass en version 4.14+.
* Le projet a été généré avec Angular CLI version 7.0.2.
* Démarrer ng serve (ou `npm run start`) pour avoir accès au serveur de développement.
* Rendez-vous sur `http://localhost:4200`.
* L'application va se recharger automatiquement si vous modifiez un fichier source.

#### 💡 &nbsp; Faire tourner le Backend

* Ouvrir le terminal sur ce dossier.
* Pour utiliser le serveur, chargez le package nodemon : `npm install -g nodemon`.
* Puis lancez le serveur: `nodemon server`.

#### Pour résumer

Si les packages sont déja installés, ces commandes suffisent à démarrer les serveurs.

* `npm run start` via le terminal sur le frontend
* `nodemon server` via le terminal sur le backend
* Se connecter à l'url : `http://localhost:4200`

##### 🖥 &nbsp; Connexion

* Ouvrir [localhost:4200](http://localhost:4200/) dans votre navigateur.
* Pour s'inscrire sur l'application, l'utilisateur doit fournir un email et un mot de passe 
***

#### 📦  &nbsp; Utilisé dans ce projet

| Technologies             | et outils          |
|:------------------------:|:------------------:|
| Framework: Express       | Visual Studio Code |
| Serveur: NodeJS          | Git/GitHub         |
| Base de données: MongoDB | Mongoose           |
| Javascript               |                    |

* Hébergement sur MongoDB Atlas
* Toutes les opérations de la base de données utilisent le pack Mongoose avec des schémas de données stricts.

***
