const User = require('../models/user.model');
const MessageUser = require('../models/message.model');

// queries pour send les informations id, email pour profil.
exports.myProfilQueries = function (decoded, req, res, next) {
    const sub = decoded;
    console.log(decoded);
    User.findOne({
        '_id': sub
    }).exec().then((user) => {
        let userObj = {};
        userObj.nom = user.nom;
        userObj.email = user.email;
        req.userKey = userObj;
        next();
    }).catch((err) => {
        console.log(err);
    });
};

// queries pour le newsfeed de l'utilisateur connecté (son propre newsfeed)
exports.userProfilNewsfeedQueries = async function (decoded, res, res, next) {
    const sub = decoded;
    const user = await User.findOne({
        '_id': sub
    }).exec().then((data) => {
        return data
    });
    const userMessages = await MessageUser.find({
        '_id': user.message
    }).exec().then((data) => {
        return data
    });
    console.log(userMessages);
    
    res.json(userMessages);
}

// queries pour le newsfeed lors de la recherche d'un user 
exports.userSearchProfilQueries = async function (id, req, res, next) {
    const user = await User.findOne({
        '_id': id
    }).exec().then((data) => {
        return data
    });

    const userMessages = await MessageUser.find({
        '_id': user.message
    }).exec().then((data) => {
        return data
    });
    res.json(userMessages);
}

// queries pour les recherches d'utilisateurs.
exports.searchUserQueries = async function (searchData, req, res, next) {
    console.log(searchData);
    if (searchData !== null) {
            const user = await User.find({
                'nom': { $regex: searchData, $options: 'i' }
            }).exec().then((user)=>{
               return user
            }).catch(()=>{});
            let tab = [];
            for (let i = 0; i < user.length; i++) {
                var obj = {};
                obj.nom = user[i].nom;
                obj.prenom = user[i].prenom;
                obj.id = user[i]._id;
                tab.push(obj);
            }
            res.status(200).json(tab);
    }
    else {
        res.status(200).json('');
    }
};
 
// queries pour envoyer un message sur fil d'actu.
exports.sendMessageQueries = function (decoded, message) {
    User.findOne({
            '_id': decoded
        }).exec()
        .then((user) => {
            const newMessage = new MessageUser({
                message: message,
                date: new Date(),
                nom: user.nom,
                prenom: user.prenom,
                userID: user._id,
            });
            newMessage.save((err, newMessage) => {
                console.log(newMessage);
                if (err) {
                    console.log(err);
                } else {
                    User.findOne({
                        '_id': decoded
                    }).exec((err, user) => {
                        user.message.push(newMessage);
                        user.save()
                    });
                };
            });
        })
        .catch((err) => {
            console.log(err)
        });
};

// queries pour afficher le fil d'actu
exports.newsfeedContentQueries = async function (decoded, req, res, next) {
    const user = await User.findOne({
        '_id': decoded
    }).exec().then((data) => {
        return data
    });
    
    const messageList = await MessageUser.find({
        'userID': user.amis
    }).exec().then((data) => {
        return data
    });

    res.json(messageList);
};

