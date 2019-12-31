const {
    sendMessageQueries,
    myProfilQueries,
    newsfeedContentQueries,
    searchUserQueries,
    userSearchProfilQueries,
    userProfilNewsfeedQueries
} = require('../queries/profil.queries');

// controllers pour envoyer un message sur fil d'actu
exports.sendMessage = async (req, res, next) => {
    try {
        const message = req.body.message;
        const decoded = req.decoded;
        await sendMessageQueries(decoded, message);
        next();
    } catch (e) {
        console.log(e)
    };
};

// controllers pour afficher le newsfeed de l'utilsateur sur son profil 
exports.userProfilNewsfeed = async (req, res, next) => {
    try {
        const decoded = req.decoded;
        await userProfilNewsfeedQueries(decoded, req, res, next);
    } catch (error) {
        console.log(error);
    }
};

// controllers pour afficher le newsfeed lors de la recherche d'un user
exports.userSearchProfil = async (req, res, next) => {
    try {
        const id = req.body.id;
        await userSearchProfilQueries(id, req, res, next)
    } catch (e) {
        console.log(e); 
    }
};

// controllers pour les recherches d'utilisateurs.
exports.searchUser =  async (req, res, next) =>{
    try {
        const searchData = req.body.search
        await searchUserQueries(searchData, req, res, next)
    } catch (e) {
        console.log(e);
    }
};

// controllers pour send les informations id, email pour profil
exports.myProfil = async (req, res, next) => {
    try {
        const decoded = req.decoded;
        await myProfilQueries(decoded, req, res, next); 
    } catch (e) {
        console.log(['erreur'], e);        
    }
};

// controllers pour afficher le fil d'actu
exports.newsfeedContent = async (req, res, next) => {
    try {
        const decoded = req.decoded;
        await newsfeedContentQueries(decoded, req, res, next);
    } catch (e) {
        console.log(['erreur'],e)        
    }
};
