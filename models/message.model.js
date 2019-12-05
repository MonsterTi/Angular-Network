const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    profilLink: String,
    userID: String,
    nom: String,
    prenom: String,
    date: String,
    message: String,
    image: String || null,
    nbView: Number,
    nbLike: Number,
    points: Number,
});


const MessageSchema = mongoose.model('message', messageSchema);

module.exports = MessageSchema;