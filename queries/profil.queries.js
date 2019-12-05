const User = require('../models/user.model');
const MessageUser = require('../models/message.model');

exports.myProfilQueries = function (decoded, req, res, next) {
    const sub = decoded;
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

exports.searchUserQueries = async function (searchData, req, res, next) {
    // console.log(searchData);
    const user = await User.find({
        'nom': { $regex: searchData, $options: 'i' }
    }).exec().then((user)=>{
       return user
    }).catch(()=>{});

    let tab = [];
    for (let i = 0; i < user.length; i++) {
        let obj = {};
        obj.nom = user[i].nom;
        obj.prenom = user[i].prenom;
        obj.id = user[i]._id;
        tab.push(obj);
    }
    res.status(200).json(tab);
};

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
    //req.newsfeed = messageList
    res.json(messageList);
};