const User = require('../models/user.model');
const MessageUser = require('../models/message.model');
const fs = require('fs');
const bcrypt = require('bcrypt');
const RSA_KEY_PUBLIC = fs.readFileSync('./rsa/jwtRS256.key.pub');
const RSA_KEY_PRIVATE = fs.readFileSync('./rsa/jwtRS256.key');
const jwt = require('jsonwebtoken');

exports.verifyQueries = function (token, req, res, next) {
    if (token) {
        jwt.verify(token, RSA_KEY_PUBLIC, (err, decoded) => {
            if (err) {
                return res.status(401).json('Token invalid');
            }
            if (decoded) {
                req.decoded = decoded.sub
                next();
            };
        });
    } else {
        res.status(401).json('Pas de token');
    }
};

exports.signinUserQueries = function (email, password, req, res, next) {
    User.findOne({
        'email': email
    }).exec().then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({}, RSA_KEY_PRIVATE, {
                algorithm: 'RS256',
                expiresIn: 60 * 1,
                subject: user._id.toString()
            });
            res.status(200).json(token);
        } else {
            res.status(401).json('Le mot de passe est incorrect.')
        };
    }).catch((e) => {
        console.log(e);
    });
}

exports.refreshTokenQueries = function (decoded, req, res, next) {
    const newToken = jwt.sign({}, RSA_KEY_PRIVATE, {
        algorithm: 'RS256',
        expiresIn: 60 * 6,
        subject: decoded
    });
    res.status(200).json(newToken);
}

exports.messageUserQueries = function (decoded, message) {
    User.findOne({
            '_id': decoded
        }).exec()
        .then((user) => {
            const newMessage = new MessageUser({
                message: message,
                date: new Date(),
                nom: user.nom,
                prenom: user.prenom,
                userID: user._id
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

exports.existUserQueries = function (email, req, res, next) {
    User.countDocuments({
            'email': email
        }).exec()
        .then((email) => {
            if (!email) {
                res.status(401).json("Cette adresse e-mail n'est pas reconnue.")
            }
            if (email) {
                next();
            }
        });
};

exports.existUserSignupQueries = function (email, req, res, next) {
    User.countDocuments({
            'email': email
        }).exec()
        .then((email) => {
            if (email) {
                res.status(401).json('Cette adresse e-mail est déjà utilisée par un utilisateur');
            }
            if (!email) {
                next();
            }
        });
};

exports.createUserQueries = function (data, req, res, next) {
    const newUser = new User({
        email: data.email,
        nom: data.nom,
        prenom: data.prenom,
        password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(8))
    });
    newUser.save((err) => {
        if (err) {
            res.status(500).json('Erreur ligne 23')
        };
        User.findOne({
            'email': data.email
        }).exec((err, user) => {
            user.amis.push(user._id);
            user.save()
            next();
        });
        res.status(200).json('signup ok')
    });
};