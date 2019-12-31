// module natif node.js
const router = require('express').Router();
const {
    verify
} = require('../controllers/user.controllers');
const {
    sendMessage,
    myProfil,
    newsfeedContent,
    searchUser,
    userSearchProfil,
    userProfilNewsfeed
} = require('../controllers/profil.controllers')

// HEADER COMPONENT : recherches d'utilisateurs.
router.post('/search', verify, searchUser);

// PROFIL COMPONENT : send les informations id, email pour profil
router.get('/current', verify, myProfil, (req, res) => {
    res.json(req.userKey);
});

// PROFIL COMPONENT : newsfeed de son profil
router.get('/user-newsfeed', verify, userProfilNewsfeed, (req, res) => {
    console.log('test');
});

// SEARCH PROFIL COMPONENT : send les informations id, email pour profil
router.post('/profilsearchnewsfeed', verify, userSearchProfil);


// NEWSFEED COMPONENT : publier un message sur fil d'actu
router.post('/message', verify, sendMessage, (req, res, next) => {
    res.json('envoyé');
});

// NEWSFEED COMPONENT : afficher le fil d'actu
router.get('/newsfeed', verify, newsfeedContent);

module.exports = router