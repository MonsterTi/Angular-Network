const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/forcebat';
const index = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connexion à mongodb
mongoose.connect(url,{
  useUnifiedTopology: true,
  useNewUrlParser: true
}, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('connecté à mongodb');
  };
});

// déclaration de ma route sur le fichier app
app.use(index);

app.listen(2020,function(){
  console.log('écoute sur le port 2020');
});

module.exports = app;
