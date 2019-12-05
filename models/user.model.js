const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserMessage = require('./message.model')

const userSchema = Schema({
    email: String,
    nom: String,
    prenom: String,
    password: String,
    message: [{ type: Schema.ObjectId, ref: UserMessage }],
    amis: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;