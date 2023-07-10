const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '64ac64b47a08c48f8ed54d2f'
  };
  next();
});
app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.listen(PORT);