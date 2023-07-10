const User = require('../models/user');
const { BadRequestError, NotFoundError, ServerError } = require('../utils/errors.js');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users.length === 1) {
        throw new NotFoundError('Пользователи не найдены.');
      }
      res.send(users);
    })
    .catch(next);
};

const findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден.'));
      } else res.send(user);
    })
    .catch(next);
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.send({ data: user }))
  .catch((error) => {
     if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы неккоректные данные.'));
    } else {
      next(error);
    }
  });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден.'))
    .then(user => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ObjectIdIsNotFound') {
        next(new NotFoundError('Пользователь не найден.'))

      } else if (error.name === 'ValidationError') {

        next(new BadRequestError('Переданы некорректные данные.'))

      } else {

        next(new ServerError('Произошла ошибка.'))
      }
    })
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден.'))
    .then(user => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ObjectIdIsNotFound') {
        next(new NotFoundError('Пользователь не найден.'))

      } else if (error.name === 'ValidationError') {

        next(new BadRequestError('Переданы некорректные данные.'))

      } else {

        next(new ServerError('Произошла ошибка.'))
      }
    })
};

module.exports = {
  getUsers,
  createUser,
  findUser,
  updateUserInfo,
  updateUserAvatar
};