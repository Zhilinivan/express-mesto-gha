const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
const helmet = require('helmet');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

mongoose.connect(DB_URL);

app.use(helmet());
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
app.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
})

app.listen(PORT);