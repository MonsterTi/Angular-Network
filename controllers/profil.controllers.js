const {
    sendMessageQueries,
    myProfilQueries,
    newsfeedContentQueries,
    searchUserQueries
} = require('../queries/profil.queries');

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

exports.searchUser =  async (req, res, next) =>{
    try {
        const searchData = req.body.search
        await searchUserQueries(searchData, req, res, next)
    } catch (e) {
        console.log(e);
    }
};

exports.myProfil = async (req, res, next) => {
    try {
        const decoded = req.decoded;
        await myProfilQueries(decoded, req, res, next); 
    } catch (e) {
        console.log(['erreur'], e);        
    }
};

exports.newsfeedContent = async (req, res, next) => {
    try {
        const decoded = req.decoded;
        await newsfeedContentQueries(decoded, req, res, next);
    } catch (e) {
        console.log(['erreur'],e)        
    }
};
