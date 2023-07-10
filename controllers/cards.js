const Card = require('../models/card');
const { BadRequestError, NotFoundError, DefaultError } = require('../utils/errors.js');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user.payload;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(error);
      }
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.payload } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена.'))
    .then((card) => res.send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.payload } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена.'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Карточка не найдена.'))
    .then((card) => {
      return card.remove();
    })
    .catch(next);
};



module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};