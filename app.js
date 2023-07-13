const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
const helmet = require('helmet');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');

const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/errors/notfounderror');
const handlerError = require('./middlewares/handlererror');

mongoose.connect(DB_URL);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use(errors());
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});
app.use(handlerError);

app.listen(PORT);
