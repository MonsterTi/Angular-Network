// module natif node.js
const router = require('express').Router();
const {
    verify
} = require('../controllers/user.controllers');
const {
    sendMessage,
    myProfil,
    newsfeedContent,
    searchUser
} = require('../controllers/profil.controllers')

router.post('/search', verify, searchUser, (req, res, next)=>{
    
})

router.get('/current', verify, myProfil, (req, res) => {
    res.json(req.userKey);
});

router.post('/message', verify, sendMessage, (req, res, next) => {
    res.json('envoyé');
});

router.get('/newsfeed', verify, newsfeedContent);

module.exports = router